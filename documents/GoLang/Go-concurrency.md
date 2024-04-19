---
title: "Go - Concurrency: Goroutine과 Channel"
createdAt: 2024-04-02
---

Go는 동시성 프로그래밍을 아주 쉽게 달성할 수 있도록 설계되었다. 단순히 함수 앞에 `go` 키워드를 붙여주는 것만으로 해당 task를 분리된 lightweight thread에서 실행시킬 수 있다.

``` go 
go doSomethingConcurrently()
```

`go` 키워드는 새로운 **goroutine**을 생성한다. goroutine은 Go runtime에서 스케줄링/관리되는 lightweight한 실행단위이다.



## Goroutine

goroutine은 *Go runtime에 의해 관리되는 lightweight한 execution 단위*이다. user thread이자, green thread라고 보면 된다. N:M (N > M)모델을 이용해서 os thread와 매핑하기 때문에 각 실행단위가 매우 lightweight하고, 또 그만큼 많은 수의 goroutine이 하나의 프로그램에서 효율적으로 동작할 수 있다. 

> standalone Go program의 entrypoint인 `main()` 함수 역시 goroutine으로 실행된다. 따라서 모든 executable한 Go program은 하나 이상의 goroutine으로 구성된다고 할 수 있겠다.

goroutine은 Go runtime에 의해 user mode에서 관리되고 스케줄링되기 때문에 thread의 switching에도 kernel mode로 진입하지 않는다. 그만큼 오버헤드가 적다는 장점을 가지고 있다.

Goroutine은 기본 2KB의 독립적인 stack 크기를 할당받는다. OS thread가 일반적으로 100KiB ~ MiB 단위를 할당받는 것을 생각하면 경량이라고 할 수 있겠다. ([thread stack size ref](https://ariadne.space/2021/06/25/understanding-thread-stack-sizes-and-how-alpine-is-different/)) runtime에 goroutine의 stack이 가득찰 경우, Go runtime은 더 큰 stack을 할당하고 기존 stack의 데이터를 새 stack으로 복사한다. 

그러면 Go runtime은 N개의 goroutine을 어떻게 M개의 OS thread에 multiplexing하는걸까? 의 동작원리에 대한 답은 나중에 찾아보도록 하자. ㅎㅎ

생성된 goroutine이 `main()`의 goroutine보다 늦게 종료되는 경우를 주의해야한다. Go runtime은 `main()`의 실행이 끝날 때 모든 goroutine을 종료시킨다. 따라서 필요한 경우 `sync.WaitGroup`이나 channel을 사용해 `main()`이 goroutine의 실행 완료를 기다리도록 해야한다.

## Channels

channel은 *type이 있는 thread-safe한 queue 자료구조*이다. 독립적인 실행단위인 goroutine들은 channel을 통해 서로 소통하게 된다. OS 시간에 배운 bounded buffer producer/consumer 문제를 해결한, 언어레벨에서 제공하는 추상화된 buffer라고 생각해도 될 것 같다. 

map이나 slices 같이, channel 역시 이용되기 전에 `make` 키워드를 이용해 초기화되어야 한다. 이 때, buffer size를 지정해주지 않을 경우 *buffer size가 0인 unbounded buffer*가 생성된다. 반대로 *buffer size를 직접 지정하여 bounded buffer를 생성*할 수도 있다.

``` go 
unboundedCh := make(chan int)	// unbounded buffer: length 0
boundedCh := make(chan int, 100) // bounded buffer : length int(일반적으로 8byte) * 100
```

다음은 channel 자료구조를 조작하는 operation들이다.

``` go 
ch <- 90 // Channel에 데이터를 push한다.
v := <- ch // Channel에서 데이터를 pop한다.
```

`<-` operator는 *channel operator*라고 불리며, channel에만 이용 가능한 연산자이다. data flow는 channel operator의 방향대로 흐른다. 

중요한 점은, channel operation은 channel의 상태에 따라 **channel operation을 호출한 thread를 blocking**한다는 점이다.

- push 작업의 경우, channel의 buffer가 가득찼을 경우 호출자 goroutine을 block한다.
- pop 작업의 경우, channel에서 buffer가 비어있을 경우 호출자 goroutine을 block한다.



#### Unbuffered Channels

크기를 지정하지 않고 channel을 초기화할 경우 buffer size가 0인 *unbuffered channel*이 생성된다. unbuffered channel은 Goroutine끼리 동기적으로 통신하는 방식을 구현할 때 주로 이용된다. 동작 순서를 나타내보자면 다음과 같다.

- goroutine A에서 channel에 데이터를 push하려고 하면, 해당 goroutine은 다른 어떤 goroutine이 데이터를 pop할 준비가 될 때까지 block된다.
- 다른 goroutine B에서 channel로부터 데이터를 pop하려고할 때, data를 push하려고 block되었던 goroutine A이 block에서 해제되고, data를 push하게 된다.
- gorountine B가 block 상태에서 해제되고 channel로부터 data를 pop한다.

이와 같은 메커니즘으로 두 개 이상의 goroutine의 sender-receiver 모델에서 동기적인  실행을 획득하는 것이다.

실제 코드 예시로 확인해보자.

``` go 
// main goroutine (위 예시의 goroutine B)
func main() {
    ch := make(chan int) // Unbuffered channel

  	// goroutune A
    go func() {
        fmt.Println("Sending value")
        ch <- 42 // channel에 push. 해당 channel에 pop을 시도하는 goroutine이 나타날 때까지 block된다.
        fmt.Println("Value sent")
    }()

    time.Sleep(2 * time.Second) 
    value := <-ch // channel에 pop. 해당 channel에 push하는 goroutine이 push를 완료할 때까지 block된다.
    fmt.Println("Received:", value)

    // Output:
    // Sending value
    // (2초 대기)
    // Value sent
    // Received: 42
}
```



#### Closing Channels

Channel은 `close()` 함수를 통해 **명시적으로 종료될** 수 있다. channel은 생성한 goroutine이 아닌 다른 goroutine에 의해서도 종료될 수 있다. 해당 *channel에 대한 참조를 가지고 있다면 누구든지 channel을 'close'*할 수 있다.

``` go 
ch := make(chan int)
// do something with the channel
close(ch)
```

channel operation `<-`를 pop으로 이용할 경우, 두번째 인자로 *해당 channel이 close되었는지 확인하는 boolean 값*이 전달된다.

```go 
v, ok := <- channel
```

만약 `ok`의 값이 false라면 channel이 닫혔음을 확인하고 그에 맞는 로직을 분기처리하면 된다.

주의해야할 점은, close된 channel에서 pop을 시도하는 것은 괜찮지만 <u>close된 channel에 push를 시도할 경우 Go runtime은 panic에 빠진다</u>는 것이다. 위에서 말했듯 channel에 대한 참조를 가진 모든 goroutine이 channel을 close할 수 있으므로, channel을 닫을 때는 항상 방어적으로 프로그래밍 해야한다.

> 사실 channel을 굳이 닫지 않는 것이 좋다. 이용되지 않은 channel은 Go runtime의 GC가 메모리 공간을 알아서 수집한다. receiver에게 이제 정말 channel을 통해 전달할 것이 없음을 명시적으로 전달하는 경우에만 channel을 닫도록 하자.



#### read-only channel과 write-only channel

channel은 그 자체로는 sender와 receiver가 명시되어있지 않다. channel에 대한 참조를 가지고 있는 function이라면 누구나 channel에 읽거나 쓰고, 심지어 channel을 닫을 수도 있다. 이와 같이 channel에 대한 역할을 구분짓지 않는다면 누가 어디서 channel을 조작하는지에 대해 자유로워지므로 개발자가 오류를 범할 가능성이 커진다. 

Go에는 function에 channel을 건네줄 때 **`<-` keyword** *를 통해 해당 channel이 read-only인지, write-only인지 명시적으로 제한*할 수 있다. 이를 통해 channel을 소비하는 각 주체의 역할을 명확하게 좁혀 개발자의 오류를 줄일 수 있다.

`<-` keyword의 흐름에 따라 read-only와 write-only가 결정된다. read-only는 pop만을 할 수 있고, write-only는 close와 push만을 수행할 수 있다.

```  go 
func readonlyConsumer(ch <- chan int) {} // read-only

func writeonlyProducer(ch chan<- int) {} // write-only 
```

역할에 벗어난 연산을 수행한다면 Go는 compile time에 에러를 뱉는다. 

당연하게도, channel을 생성한 goroutine은 channel에 대해 모든 권한을 가진다.



#### Range로 channel 순회하기

slices나 map과 같이 channel 역시 `range` 키워드를 통해 range over될 수 있다. 어차피 channel은 선입선출의 순서가 보장된 queue인데 뭐하러 range하냐? 일종의 while loop처럼 이용하기 위해 `range` 키워드를 사용한다.

`range`는 channel이 close될 때 까지 반복적으로 channel에서 값을 읽어온다. 해당 channel이 close되면, `range` loop는 자동으로 종료된다. 주로 channel을 통한 data stream처리에 특히 유용하게 쓰인다.

``` go 
ch := make(chan int)
go func() {
  for i := 0; i < 5; i ++ {
    ch <- i
  }
  close(ch)
}()

// 매 iteration이 val := <- ch 과 동일하다.
for val := range ch {
  fmt.Println(valuef)
}
```



#### Select

`select` keyword는 **다수의 channel을 한번에 처리하기 위한 일종의 `switch`문의 channel 버전**이다. 하나의 gorountine 로직 속에서 2개 이상의 channel을 처리해야할 때 유용하게 활용할 수 있다. 

여러 channel에 대해서 pop 연산을 실행하기 위해 동시에 block되고 있다가, 어느 한 channel이 실행 준비가 되면 해당 channel에 대한 연산을 실행한다. 

``` go 
func dealWithNumbersOfChannels(ch1, ch2, ch3 <-chan string) {
  select {
  case msg, ok := <- ch1:
    fmt.Println(msg)
  case msg, ok := <- ch2:
    fmt.Println(msg)
  case msg, ok <- ch3:
    fmt.Println(msg)
  }
}
```

