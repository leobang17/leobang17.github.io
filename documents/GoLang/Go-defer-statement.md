---
title: "Go - Defer statement"
createdAt: 2024-03-30
---

`defer` keyword는 다른 일반적인 programming language에는 등장하지 않는 Go의 특별한 기능이다. **함수가 반환하기 직전에 특정한 코드를 실행하도록 예약**하는 기능이다. 말그대로, *해당 함수 내의 defer된 동작*을 정의한다. 주로 clean-up 작업에 유용하게 쓰인다. 

- resource를 정리하거나 (i.e. file, network connection 등을 닫을 때)
- Lock을 해제하거나
- Callstack을 타고 올라오는 `Panic`을 처리하는데 사용된다.

`defer` statement는 **해당 키워드 뒤에 오는 *function call*을 "*defer stack*"에 삽입**한다. 주의할 점은, function이 아니라 *function call*이라는 점이다. 실행되는 function의 호출을 defer statement에 제공해야하므로, anonymous function을 `defer` 뒤에 작성하는 경우 `()` 을 붙여 function call임을 명시해야한다.

resource 정리의 측면에서 `defer`가 유용하게 이용되는 용례를 확인해보자.

``` go 
func main() {
	if err := write("readme.txt", "This is a readme file"); err != nil {
		log.Fatal("failed to write file:", err)
	}
}

func write(fileName string, text string) error {
	file, err := os.Create(fileName)
	if err != nil {
		return err
	}
	_, err = io.WriteString(file, text)
	if err != nil {
    file.Close()		// < duplicated close call # 1
		return err
	}
	file.Close()			// < duplicated close call # 2
	return nil
}
```

- `io.WriteString`이 실패하든 실패하지 않든, 열린 파일은 함수가 return되기 전에 닫혀야 불필요한 메모리 점유를 피할 수 있다.
- 지금은 2가지 경우의 수만 있지만, 앞으로도 file이 열린 후 발생할 예외처리가 늘어난다면? 

어차피 함수를 탈출하기 전에 닫아야 하는 것이라면, `defer`를 이용해 보다 직관적인 코드 작성이 가능하다.

``` go 
func main() {
	if err := write("readme.txt", "This is a readme file"); err != nil {
		log.Fatal("failed to write file:", err)
	}
}

func write(fileName string, text string) error {
	file, err := os.Create(fileName)
	if err != nil {
		return err
	}
	defer file.Close()
	_, err = io.WriteString(file, text)
	if err != nil {
		return err
	}
	return nil
}
```

## Multiple defer statements

Go runtime은 `defer`를 관리하기 위해 내부적으로 *`defer` stack*을 유지한다. 다른 언어와 동일하게 Go에서 함수 호출 시, 각 함수는 자신의 stack frame을 가지게 되며, `defer`된 함수의 호출이 담긴 `defer` stack은 이 stack frame 내부에 저장되게 된다. (= 각 함수의 stack frame 속에 해당 함수 안에 정의된 defer stack이 유지된다)

이름 그대로, defer stack 역시 LIFO 구조다. 하나의 함수 내에서 여러 개의 `defer` statement가 등장하면 어떻게 될까? 답은 선언된 역순으로 실행된다.

``` go 
func main() {
  defer fmt.Println("one")
  defer fmt.Println("two")
  defer fmt.Println("three")
}

// three two one
```

하나의 함수 안에서 원하는 만큼 `defer` 문을 선언할 수 있다. **모든 `defer` 동작은 선언된 역순으로 실행된다**는 것을 기억하자.

물론 defer stack이 선언되기 전의 insturction에서 return한다면, 그보다 아래의 defer statement들은 무시된다. defer stack의 head는 실제 runtime에서 return에 걸리는 부분 직전에 선언된 defer statement가 된다.


## Panic Handling 

Go에서 일반적인 Error handling은 Error value를 반환하고 이를 처리하는 방식으로 진행되지만, 다른 일반적인 programming language에서 지원하는 throw 메커니즘과 비슷한 Error 역시 존재한다. 

**Panic**은 타 language의 exception처럼 발생하는 즉시 함수의 실행이 중단되고 함수의 call stack을 거슬어 올라가게 된다. 이 때, *stack을 거슬러 올라가며 거치는 함수의 모든 `defer` 문을 실행*하게 된다. 이를 통해 프로그램이 비정상 중단되기 전에 중요한 clean-up 작업을 수행할 수 있는 기회를 제공한다.

또한 `defer` statement는 그 뒤에 등장하는 function call 속에서 `recover()`라는 특수한 함수를 호출할 수 있게 한다. `recover` 함수는 말그대로 `panic` 상황을 restore하고 panic에 의해 설정된 error value를 반환한다. 

> `restore` function은 오직 `defer` 뒤에 오는 function call에서만 유효하다. 다른 곳에서 `restore`를 호출해도 panic 상황을 복구하지 않는다. 애초에 panic 상황에서는 defer stack 속의 함수만을 호출하므로 생각해보면 당연하다.

따라서, 일반적인 `try···catch` 메커니즘을 Go에서는 `defer`와 `restore` 함수를 이용해 구현할 수 있겠다.

``` go 
func mayPanic() {
  panic("something bad happened")
}

func main() {
  defer func() {
    if r := recover(); r != nil {
      fmt.Println("Recovered in main", r)
    }
  }()
  mayPanic()
  fmt.Println("This statement will not be executed")
}
```





