---
title: "Go - Advanced Functions"
createdAt: 2024-03-30
---

## First-Class Function 

first-class function은 함수를 **first-class citizen**으로 취급하는 개념이다. 

first-class citizen(일급 객체)란 해당 언어의 기능 중에서 모든 연산에 사용될 수 있고, 다른 객체와 동일하게 취급되는 객체를 말한다. 어렵게 설명했지만 first-class citizen은 우리가 일반적으로 programming language에서 이용하는 객체를 생각하면 된다. first-class citizen의 특징을 나열하면 다음과 같다:

1. 변수에 할당할 수 있다
2. function의 argument로 전달할 수 있다.
3. function의 return 값으로 사용될 수 있다. 
4. dynamic하게 생성할 수 있다: runtime에 동적으로 생성할 수 있다. 

따라서, fist-class function이란건 별거 없이 그냥, 함수를 다른 객체와 동일하게 변수에 할당하고, 다른 함수의 argument로 전달하고, return 값으로 반환하고 동적으로 생성될 수 있는 특징을 가졌다는 말이다. Javascript와 같은 언어를 했다면 익숙한 개념일 것이다.

``` go 
// 변수에 할당
var add = func(a int, b int) int {
  return a + b
}

add(2, 3)

// 함수의 인자로 전달 
func addAll(add func(int, int) int, args ...int) iny {
  count = 0
  for _, elem := range args {
    count = add(count, elem)
  }
  return count
}
```



## Higher-Order Function

Higher-Order function은 함수를 argument로 받거나, 함수를 return 으로 반환하는 함수를 말한다. 역시 Go에서 fucntion을 first-class citizen으로 취급하기 때문에 HOF를 표현할 수 있다.

대표젹인 함수형 프로그래밍인 Javascript의 `Array.map` function을 Go로 구현해보자:

``` go 
func mapFunc(slice []int, fn func(int) int) []int {
  var result [] int
  for _, val := range slice {
    result = append(result, fn(value))
  }
  return result
}

doubled := mapFunc([]int { 1, 2, 3 }, func(i int) int {
  return i * 2
})
// doubled = [2, 3, 5]
```

## Anonymous Functions

이름없이 선언되고 실행될 수 있는 함수이다. 함수를 변수에 할당하거나, 다른 함수에 인자로 전달하거나, closure를 생성하는데에도 다양하게 이용될 수 있다.

``` go
// function value를 변수에 할당
sum := func(a, b int) int {
  return a + b
}
fmt.Println(sum(5, 3))
```


## Closures 

closure는 function scope 바깥에서 선언된 variable을 referencing하는 function value를 말한다. 이러한 관점에서 closure는 해당 variable에게 "bound"되었다고 말한다. Javascript 개발자라면 closure에 보다 익숙하겠지만, 일단 말보다는 Go 코드로 확인해보자:

``` go 
func concatter() func(string) string {
  doc := ""	// closure function의 scope 바깥에 선언되었다. 
  return func(word string) string {	
    doc += word + " "	// closure function. scope 바깥의 변수를 참조하고 있다.
    return doc
  }
}

func main() {
  strAggregator := concatter()
  strAggregator("A")
  strAggregator("B")
  strAggregator("C")
  strAggregator("D")
  res := strAggregator("E")
  fmt.Println(res) // "ABCDE"
}
```

- doc은 closure function의 scope 바깥에 선언되었다. 
- concatter의 scope안에 선언된 `doc` 변수이므로 원래는 `concatter()` 호출의 return과 함께 (callstack에서 사라질 때) Go runtime에 의해 해제되어야 하지만, closure function에 의해 referencing되고 있으므로 closure function이 정리될 때까지 계속해서 메모리 공간에 남아있게된다.

Closure의 원리에 대해 좀 더 설명해보자면, 대부분의 현대 programming language가 채택한 scoping 컨셉인 <u>lexical scope 혹은 static scope</u>의 개념을 알아야 한다. 사실 Go의 공식문서에서 scoping 메커니즘에 lexical scope라고 명시하진 않았지만, Go의 execution context는 Javascript의 그 것과 비슷한 개념을 가지고 있다.

Lexical scope 메커니즘에서는 함수가 참조할 수 있는 범위(scope)가 그 **함수가 선언된 시점**에 결정된다. Go에서 함수는 자신이 정의된 function body 바깥의 변수에 접근할 수 있는데, 이 때 해당 변수들은 closure에 의해 "캡처"된다. 이러한 capture 메커니즘은 함수가 변수와 함께 closure라는 execution context를 형성한다. 

Garbage Collection은 closure execution context에 의해 참조되는 변수에 대해서 특별한 memory management를 지원한다. 함수가 반환되어 callstack에서 빠져나가도, closure에 의해 참조되는 변수는 메모리에서 해제되지 않고 계속 유지된다. 

여기까지는 일반적인 lexical scope와 closure의 개념을 설명한 것이다. 주로 Javascript의 실행 컨텍스트를 참고했다. Golang에서 closure란 함수 그 자체를 지칭할 때 이용되는 듯 하다. 하지만 Go에서 역시 개념 자체는 비슷하다. 그렇기에 위 예시의 `strAggregator`는 `concatter()` 호출시에 결정된 lexical scope에 따라, 그 만의 `doc` 변수를 closure의 바깥이지만 계속해서 참조할 수 있는 것이다.

