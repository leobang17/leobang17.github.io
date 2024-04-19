---
title: "Javascript의 배열에 대해서"
createdAt: 2024-04-15
---

## Javascript의 배열은 Object다

Javascript에는 엄밀한 수준의 'static array'를 지원하지 않는다. `Array`라는 배열을 흉내낸 type을 지원하지만 사실 이마저도 내부적으로 보면 *배열이 아닌 객체에 가깝다*. ArrayList도 아니고 LinkedList도 아닌 것이, 그냥 **배열의 형태를 흉내낸 객체**이다.

#### Javascript Array는 index를 문자열로 접근한다? 

Javascript의 배열은 Object와 같이, **key-value 쌍으로 데이터를 저장**한다.이 때의 key 값은 *주로 `number` 타입의 index를 사용*한다. 

하지만 Javascript의 Array는 객체인 것을 잊지말자. Object의 key는 `string` 혹은 `symbol` type을 허용한다. 만약 Object type의 key로 `number` type을 제공할 경우 자동으로 `string` type으로 변환된다. `1` 이라는 index는 사실 내부적으로 `"1"`로 변환되어 key로 들어가게 된다. 따라서, Array의 key 값으로 `number` 형식의 `string`을 던져주어도 '당연히' 동작한다. Javascript는 참 요상하다.

``` javascript
const name = ["leo", "bang", "seok", "jin"];
console.log(name["2"]); // seok 
```

다음으로는 Array의 property를 직접 확인해보자.

```  javascript
Object.getOwnPropertyDescriptors([1, 2, 3]));
/*
{
  '0': { value: 1, writable: true, enumerable: true, configurable: true },
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '2': { value: 3, writable: true, enumerable: true, configurable: true },
  length: { value: 3, writable: true, enumerable: false, configurable: false }
}
*/
```

key는 역시 number 형식의  `string` type으로 저장되어있다. 또한, Javascript의 배열은 index를 property key로 갖는 객체에 불과하다는 것을 눈으로 확인할 수 있다. 



#### 그럼 Javascript의 배열은 연속된 공간에 저장되지 않는가?

Javascript의 배열은 Object이다. 그렇기에 사실 내부적으로 `Array` 내부의 *data type이 동일할 것을 강요 받지 않는다*. 그런데 data type이 동일하지 않다면, 어떠한 크기를 갖는 자료가 연속적으로 위치할지 예측할 수 없기 때문에 연속적인 메모리 영역을 할당하기 어렵다··· 

그렇기에 Javascript는 일반적으로는 *sparse array*라고 할 수 있다. Array 내부에 다양한 type의 data가 혼재해있는 경우 `Array`는 일반적인 'array' 보다는 <u>Hash Table과 유사한 방식</u>으로 관리된다. 그렇기에 연속적인 공간을 할당받지 않는다. 유연성을 얻고 속도를 희생한 셈이다.

하지만 `Array`는 이름부터 '배열'임을 선포한 자료형인만큼, Javascript 엔진은 이에 대한 최적화를 내부에서 수행한다. Javascript 엔진은 `Array`에 저장된 자료형이 모두 동일하고, 자료형의 메모리 공간이 동적으로 확장/축소되지 않는 primitive type일 경우엔 내부적으로 C++과 유사하게 관리하며 data들을 연속된 메모리에 저장한다. 예를들어, 모두 `number` type으로 저장된 `Array`에 대해서는 일반적인 'array'에게 기대할 수 있는 cache hit과 같은 성능 이점을 기대할 수 있는 것이다.



