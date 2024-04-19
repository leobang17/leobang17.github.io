---
title: "Go - Concurrency: Mutex와 Semaphore"
createdAt: 2024-04-03
---

여러 goroutine을 통해 공유 자원에 접근하는 경우 동시성 프로그래밍의 고전적인 문제상황인 *race condition*이 발생할 수 있다. Go 역시 critical section을 정의하고 해당 section의 상호배제를 제공하는 동기화 솔루션을 built-in으로 제공한다.

Go의 standard `sync` package를 통해 *Mutex*와 *Semaphore*와 같은 동기화 솔루션을 손쉽게 이용할 수 있다. 



## Mutex

Go는 standard library인 `sync.Mutex`를 통해 built-in Mutex를 제공한다. `sync.Mutex`에는 Lock을 다루는 메서드인 `.Lock()`과 `.Unlock()`이 노출되어있다. 

이용하는 방법은 일반적인 Mutex의 동작원리와 동일하다. Lock을 획득한 goroutineA가 critical section에 들어가면, 다른 나머지 goroutine은 critical section에 접근할 경우 goroutineA가 Lock을 내려놓을 때까지 blocking 되는 것이다.

`defer` 키워드를 통해 Mutex의 Lock을 반환하는 것은 Go를 통해 sychronize를 구현할 수 있는 좋은 practice이다. 

``` go 
func criticalSection() {
  mu.Lock()
  defer mu.Unlock()
  // do something that is NOT thread-safe
  // right before this function returns, defered function call will be executed and Mutex Lock will be restoreds
}
```



## RW Mutex

read-write Mutex를 의미한다. built-in package인 `sync.RWMutex`를 import하여 사용할 수 있다. `RWMutex`는 기본적인 Read-Write Mutex의 *Read Lock* operation을 지원한다. 

즉, 여러 goroutine이 동일 자원에 대해 접근하는 critical section을 ReadLock을 통해 정의할 경우 write operation에 대해서만 Mutex를 보장한다.

- read를 시도하는 goroutine은 write goroutine이 Lock을 내려놓을 때까지 blocking된다. write goroutine이 Lock을 쥐고있지 않은 경우엔 모두 ReadLock을 획득하고 critical section으로 진입할 수 있다
- write를 시도하는 goroutine은 모든 goroutine이 Lock을 내려놓을 때까지 blocking된다. (read던 write던)

`RWMutex`는 기존 `Mutex`의 메서드에 추가적으로 ReadLock을 위한 메서드를 2개 더 지원한다.

- `RLock()`
- `RUnlock()`

간단한 코드를 통해 ReadLock의 용례를 확인해보자.

``` go 
var (
  myData = make(map[int]int)
  rwMutex = sync.RWMutex{}
)

func readData(key int) {
  rwMutex.RLock()
  defer rwMutex.RUnlock()
  fmt.Println(myData[key])
}

func writeData(key int, val int) {
  rwMutex.Lock()
  defer rwMutex.Unlock()
  myData[key] = val
}

func main() {
  go writeData(1, 100)	// aquire write lock
  
  for i := 0; i < 5; i ++ {
    go readData(1)	// read operation is blocked until write lock is released
  }
  
}
```

RW Mutex는 read/write의 비율이 read에 치중되어 있을 경우 유용하게 활용될 수 있다. 일반 Lock (write lock)이 더 자주 사용되는 경우에는 경우에 따라 오버헤드가 발생할 수도 있다.



## WaitGroup

`WaitGroup`은 Go가 제공하는 동기화 기법 중 하나로, Semaphore와 유사한 동기화 메커니즘을 제공한다.

Semaphore와 동일하게 `WaitGroup`은 내부적으로 counter를 유지한다. 그리고 이 counter를 조작하는 메서드들을 외부로 노출하는데, 다음과 같다: 

- `Add` 메서드는 `WaitGroup`의 counter를 늘리는데 이용된다.

- `Done` 메서드는 `WaitGroup`의 counter를 줄이는데 이용된다. 특히 `defer` statement와 함께 해당 실행 단위의 작업을 완료한 후 호출할 수 있도록 이용한다.
- `Wait` 메서드는 모든 `WaitGroup`의 counter가 0이 될 때까지 호출자 goroutine을 block한다. 즉, 모든 `WaitGroup`에 등록한 모든 goroutine이 끝날 때까지 호출자를 block하는 것.

``` go
func main() {
  var wg sync.WaitGroup
  var i int = -1
  var file string
  for i, file := range os.Args[1:] {
    wg.Add(1)		// add before async call
    go func(){		// goroutine created
      compress(file)
      wg.Done()
    }()
  }
  
  wg.Wait()	// blocked until all semaphore counter set to 0
  fmt.Printf("compressed %d files,", i + 1)
}
```

WaitGroup은 주로 goroutine의 완료를 기다리는데 초점이 맞춰져 있다. Semaphore의 메커니즘을 활용해 gorountine을 기다리고, 동기적으로 수행하도록 하는 특정 상황에 특화되도록 설계한 셈.