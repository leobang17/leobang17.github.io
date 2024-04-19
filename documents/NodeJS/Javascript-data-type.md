---
title: "Javascript의 Data Type, 그리고 Wrapper Class"
createdAt: 2024-04-15
---

> Node가 아니라 Javascript에 대한 내용이지만 어쨌든...

Javascript에는 다양한 data type이 있는데, 이를 크게 Primitive Type과 Reference Type으로 구분 지을 수 있다.

## Primitive Type (= Immutable)

가장 기본적인 data type으로 **immutable**한 값을 나타낸다. immutable이라는 것은 선언 및 할당하는 시점에 메모리의 크기가 결정되고, 이후에는 해당 값에 변동을 줄 수 없는 것을 뜻한다. (= 해당 변수의 메모리 크기가 변할 일이 없다.) primitive type의 데이터에 *무언가 변화를 주는 연산*을 수행하는 것은 사실 under the hood에서는:

1) 기존의 값을 삭제하고 
2) 새로운 메모리에 연산의 결과 값을 새로이 저장하는 행위의 일련이다. 

Primitive type의 하나인 Number의 `+=` 연산을 address의 예시를 확인해보자. Javascript에는 변수의 메모리 address를 반환하는 `&` 연산자가 없어 직접 확인할 수는 없지만, 다음과 같을 것이다.

``` javascript
// Javascript에서도 메모리 refernce 연산자가 가능하다고 가정해보자.
let a = 1;
console.log(&a); // 0X7FFF
a += 1;
console.log(&a); // 0X3A32 >> 메모리 주소가 변경되었다! 아예 기존 메모리를 해제하고 새로운 값을 재할당해버리는 것.
```

Primitive Type이 값 그자체로서 immutable하기 때문에 가지는 특성 중 하나는 **Stack Memory 영역에 저장**된다는 점이다. 생각해보면 너무나 당연한게, primitive type은 값 그 자체로서 동작하기 때문에 *다른 scope에게 건네질 때 pass by value에 의해 값 자체를 복사해서 전달*하게 된다. 값의 참조를 공유할 일이 전혀 없고 모든 값은 해당 함수의 block안에서만 참조되며 해당 stack frame이 해제될 경우 더 이상 쓰일 일이 없다.

Primitive Type의 종류에는 다음과 같은 기본적인 자료형이 해당된다.

#### number 

Javascript의 Number 타입은 특이하게, **모든 종류의 숫자를 포함하는 타입**이다. Javascipt에는 다른 언어처럼 `int` 타입과 `float` 혹은 `double` 타입을 구분하지 않는다. 대신 모든 숫자 종류의 자료를 *IEEE 754 표준의 Double Precision* 방식으로 표현하는 `number` 타입으로 포괄한다. 

Double Precision이 64bit를 이용해 부동소수점 방식으로 실수를 표현하므로, Javascript에서 기본 number type으로는 다음과 같은 범위 및 정밀도를 가진다. 

``` javascript
console.log(Number.MAX_VALUE);	// 1.7976931348623157 * 10^308
console.log(Number.MIN_VALUE);	// 5 * 10^-324
```

- 최대 크기를 넘어서는 값에 대해서는 `Infinity`로 
- 최소 크기보다 작은 값에 대해서는 `0`으로 처리된다.

아무래도 모든 숫자 타입을 부동소수점으로 표현하다보니 *부동소수점의 단점* 역시 그대로 가져온다.

1. 부동소수점 방식은 소수점을 binary로 평가하므로 소수점 아래 연산에서 예상치 못한 결과를 초래할 수 있다. 대표적으로 `0.1 + 0.2 != 0.3` 이라던가···

2. 정밀도에 한계가 존재한다. Javascript의 경우엔 실제 표현 가능한 정수 범위외에도, *안전한 정수 범위*가 존재한다. `Number.Max_Safe_INTEGER`와 `Number.MIN_SAFE_INTEGER`의 범위를 벗어나는 경우 정밀도 손실이 일어날 수 있다. 대규모 정수를 정확하게 다뤄야할 경우엔 적합하지 않을 수 있다.
3. 정수에도 부동소수점을 반영하다보니, 기타 언어의 정수타입 연산에 비해 비교적 느릴 수 있다. HW 수준에서 최적화된 정수 연산에 비해 부동소수점 방식은 추가적인 처리 시간이 필요하기 때문이다.

물론 이러한 단점 대신, 모든 숫자 타입을 하나의 `number`로 퉁쳐서 개발할 수 있다는 점에서 개발자에게 굉장한 편의성을 가져오기도 한다. 

#### bigInt



#### string

텍스트 데이터를 저장하는 자료형. Primitive 자료형으로서 역시 immutable하기 때문에 내부의 개별 문자를 직접 변경할 수 없다. 개발자 입장에서 조작한다고 생각이 들 때에도, 사실은 내부에서 기존 문자열을 삭제하고 새 문자열을 생성하고 할당하는 일이 일어난다. 

`string` 타입은 Unicode 문자들의 sequence로 구성된다. Unicode의 버전중에서는 **UTF-16 인코딩**을 따른다. UTF-16은 변동길이 인코딩 방식으로서 대부분의 문자(char)를 16bit (= 2byte)로 표현하고, 특수한 경우에만 2byte의 두 쌍으로 4byte로 표현한다. 

*UTF-8에서는 한글은 3byte*를 할애하지만, *UTF-16에서는 <u>2byte</u>*로 표현할 수 있다. 따라서 다음의 `string` 변수에는 선언/할당 시점에 10byte의 메모리가 할당된다:

``` javascript
const greetings = "안녕하세요"; // 2byte * 5 = 10byte
```



#### undefined

#### null

#### symbol



## Primitive Type은 불변값인데 어떻게 메서드를 가질까? - Wrapper Type 

생각해보면 이상하다! Primitive Type은 값 그 자체로서 저장되며 불변하다. 그런데 우리는 `string` 이나 `number` 타입을 이용하며 `.trim()` 혹은 `.toStirng()`과 같은 메서드를 호출한 적이있을 것이다.

primitive type에 메서드가 있다는 건 뭔가 이상하다. 내부에 Key가 존재하는 Object 같잖아? 그런데 Object는 Reference Type이다···  

#### Javascript 엔진이 일시적으로 Wrapper Type으로 wrapping 해준다

Primitive Type은 데이터를 효율적으로 저장하고 처리할 수 있게 해주지만, 복잡한 기능이나 메서드를 가지고 있지는 않다. 이에 대한 생산성을 보완하기 위해 Javascript 엔진은 필요에 따라 <u>Primitive Type에 해당하는 Wrapper Object로 일시적으로 Wrapping</u>하게 된다.

Wrapper Type은 모든 Primitive type에 대응할 수 있도록 존재한다. `number` type의 wrapper는 `Number`이고, `string` type의 wrapper는 `String` 인 식이다.

Wrapper Object는 **primitive type을 *일시적*으로 감싸는 객체**로 primitive type에 대한 추가적인 기능과 메서드를 제공한다. *일시적*이라는 말에 주목해서 Javascript가 어떠한 시점에 어떻게 wrapping을 수행하는지 다음의 예시를 통해 확인해보자: 

``` javascript
let str = "hello";	
let upperStr = str.toUpperCase();
console.log(upperStr); // HELLO
```

1. `str` 변수에 `hello` 라는 string 값이 할당되었다. 이는 불변값으로서 stack 메모리 영역에 저장된다.

2. `str.toUppercase()` 를 호출했다! 

   이 시점에 Javascript Engine은 `str` 변수를 `String`이라는 *wrapper object로 wrapping을 수행*한다. `String` 객체의 instance가 생성된 셈이다. 해당 `String` object는 reference type으로서 heap 영역에 '잠시' 존재할 것이다.

   그리고 해당 `.toUppercase()` 메서드는 불변값인 `string` type을 반환한다. 당연히 기존의 `str`과는 관련이 없는 값 그 자체이므로, `upperStr`라는 변수에 담긴 `HELLO`는 stack 메모레 영역에 위치하게된다.

3. wrapper object가 GC에 의해 heap 영역에서 해제된다. 

   해당 `Stirng` 인스턴스는 js 엔진에 의해 일시적으로 생성된 후, 메서드 반환 후에는 더 이상 참조되지 않으므로 빠른 시일 내에 GC에 의해 수거된다.



## Reference Type (= Mutable)

Reference Type이란 이름 그대로 data가 *메모리에 저장된 위치를 reference*하는 type을 말한다. 변수가 값을 직접 저장하지 않고, 값이 저장된 메모리의 위치를 가리키는 '참조'를 저장한다. 

다시 풀어 말해보자. Reference Type의 자료를 할당한 변수는, 값이 아닌 '참조' 혹은 '주소값'을 저장한다. 이 값은 메모리의 stack 영역에 존재한다. 그리고 이 '참조'가 가리키는 곳을 dereference하면, heap 영역에 저장된 진짜 값이 등장하는 것이다.

Primitive Type이 Stack 영역에 저장되는 것과 반대로, **Reference Type의 값은 일반적으로 Heap 영역에 위치**한다. Reference Type은 Primitive Typer과는 달리 크기가 mutable하므로, *선언 및 할당 이후에도 런타임 도중 해당 변수가 차지하는 메모리의 크기가 가변적*이기 때문에 동적 메모리 할당에 사용되는 영역일 heap에 위치하는 것이 자연스럽다. 

Javascript의 Reference Type은 다음과 같이 나열할 수 있다.

1. 일반 객체 'Object'
2. Array (사실 Array도 엄밀한 array는 아니다. Object임)
3. Function: Javascript에서는 함수 역시 first clas citizen으로, 어디에든 건네질 수 있는 객체 취급을 받는다.
4. Date type
5. RegExp 등등··· 

reference type을 다룰 때 주의해야할 점은 너무 당연해서 쓰지 않으겠삼 . . . 

