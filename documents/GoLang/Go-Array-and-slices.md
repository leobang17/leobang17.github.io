---
title: "Go - Array and Slices"
createdAt: 2024-03-29
---

Go의 **Array**는 동일한 자료형을 저장하는 순서를 가진 (sequence) 크기가 '**고정**'된, 정말 기본적인 배열을 말한다. 즉, <u>static array</u>이다. Array는 물리적으로 연속적인 공간에 저장되므로, 각 element를 iterate할 때 cache hit을 달성할 확률이 높다. 

Array를 선언하는 방법은 다음과 같다.

``` go
var a [5]int // int type의 element 5개를 저장할 수 있다. 64bit * 5 만큼의 메모리를 차지하겠지? 
b := [5]int{ 1, 2, 3, 4, 5} // initialize while declaring 
```

## Slice: Dynamic Array

크기가 고정된 static array는 그다지 좋지 못한 developer experience를 제공한다. 이를 위해 Go는 **Slice**라는 dynamic array를 제공한다. Slice는 **array를 기반으로 구현된 가변길이 Array**이다. 

> Go 개발의 99%는 기본 Array보다는 Slice를 활용할 것이다. 

Slice는 내부적으로 3가지 주요 구성 요소를 가지고 있다.

1. pointer
   - Slice의 첫번째 element의 위치를 가리키는 pointer. Slice가 reference하는 내부 Array의 시작점을 나타낸다.
2. Length 
   - Slice가 현재 '저장하고 있는' element의 수. `len()` 함수를 통해 얻을 수 있다.
3. Capacity
   - Slice가 의존하고 있는 '내부 Array의 고정된 길이'를 나타낸다. `cap()` 함수를 통해 얻을 수 있다. 

Capacity가 있는 것을 보면 알 수 있듯이, Slice는 Array를 기반으로 구현된 여느 다른 Dynamic Array들과 동일한 메커니즘을 가지고 있다. 예컨데, Java의 ArrayList와 동일하다. 

현재 Slice의 length가 capacity를 초과하지 않을 경우, 새 element는 내부 array에 추가된다. 반면 length가 capacity를 초과할 경우, Go runtime은 보다 큰 capacity를 가진 Array를 pre-allocate한 후 기존 Array의 element를 새 Array로 복사한다. 그리고 기존 Array의 Pointer를 새 Array의 Pointer로 업데이트한다. 이와 같은 방식으로 Dynamic Array를 구현한다.

Slice는 다음과 같이 빈 square bracket으로 선언할 수 있다.

``` go 
var sliceExample []string
```

주의할 점은, slice와 array는 서로 다른 자료형이라는 것이다. 강타입인 Go는 이 둘을 엄격하게 구분하기 때문에 만약 function signature가 slice의 return 타입을 가진다면 array를 반환할 경우 Type Error가 발생한다.

``` go 
func getArrReturnSlice(arrays [3]int) []int {
  return arrays // Type Error! Slice를 반환해야하는데 고정길이인 array를 반환함.
}
```

## Tricky Slices: Slice의 동작을 살펴보자

 `append()` function을 활용해서 Slice의 under the hood를 살펴보자.

``` go
a := make([]int, 3)
fmt.Println("len of a:", len(a))
// len of a: 3 
fmt.Println("cap of a:", cap(a))
// cap of a: 3
fmt.Println("appending 4 to b from a")
// appending 4 to b from a
b := append(a, 4)
fmt.Println("b:", b)
// b: [0 0 0 4]
fmt.Println("addr of b:", &b[0])
// addr of b: 0x44a0c0
fmt.Println("appending 5 to c from a")
// appending 5 to c from a
c := append(a, 5)
fmt.Println("addr of c:", &c[0])
// addr of c: 0x44a180
fmt.Println("a:", a)
// a: [0 0 0]
fmt.Println("b:", b)
// b: [0 0 0 4]
fmt.Println("c:", c)
// c: [0 0 0 5]
```

a, b, c가 모두 기대와 같이 동작한 이유는, b와 c에게 walrus operator로 배열을 할당하는 시점에, a의 slice의 capacity를 넘어섰기 때문에 배열이 새로 할당되었으며, 새로 할당된 배열의 첫번째 요소를 가리키는 pointer가 반환되었기 때문이다.

기대와 같이 동작하지 않는 예시를 살펴보자:

```  go 
i := make([]int, 3, 8)
fmt.Println("len of i:", len(i))
// len of i: 3
fmt.Println("cap of i:", cap(i))
// cap of i: 8
fmt.Println("appending 4 to j from i")
// appending 4 to j from i
j := append(i, 4)
fmt.Println("j:", j)
// j: [0 0 0 4]
fmt.Println("addr of j:", &j[0])
// addr of j: 0x454000
fmt.Println("appending 5 to g from i")
// appending 5 to g from i
g := append(i, 5)
fmt.Println("addr of g:", &g[0])
// addr of g: 0x454000
fmt.Println("i:", i)
// i: [0 0 0]
fmt.Println("j:", j)
// j: [0 0 0 5]
fmt.Println("g:", g)
// g: [0 0 0 5]
```

 b와 c는 모두 동일한 addr을 공유하기 때문에.

## Variadic Funciton과 Spread Operator

Variadic Function은 argument의 개수가 정해지지 않은 함수를 말한다. 즉, 가변길이의 argument를 받아들일 수 있다. Go의 variadic function은 `...` operator를 사용해 정의한다. 

variadic function 내부에서 spread operator로 전달받은 argument는 해당 타입의 Slice로 처리된다.

``` go 
func sum(nums ...int) int {
  total := 0
  for _, num := range nums {
    total += num
  }
  return total
}


fmt.Println(sum(1, 2))		 	// 3
fmt.Println(sum(1, 2, 3, 4)) // 10
```

variadic operator가 이용되는 대표적인 예시는 바로 `fmt` 패키지의 `Println()` 함수이다. 

``` go
func Println(a ...interface{}) (n int, err error) 
```

- 아무것도 구현하지 않은 interface, 즉 모든 값을 가변길이로 수용하는 print문을 볼 수 있다.

spread operator는 `...` 으로 표현하며, 배열이나 객체와 같은 *iterable*한 element를 개별 element로 확장할 때 이용된다. Javascript를 이용한 개발자라면 매우 익숙할 것이다.

```go 
nums := []int { 1, 2, 3, 4, 5 }
fmt.Println(sum(...nums)) // 개별 인자로 전달한다.
```