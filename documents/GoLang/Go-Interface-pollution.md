---
title: "Go - Interface Pollution"
createdAt: 2024-04-17
---


interface pollution은 *불필요한 abstraction으로 코드가 복잡해져서 이해하기 힘들어지는 현상*을 말한다. 특히 Go 언어의 컨셉과는 거리가 먼 언어를 사용하던 개발자가 이런 실수를 저지르기 쉽다.

> Interface (혹은 abstraction)은 설계하는 것이 아니다. 찾아내는 것이다.

특별한 이유 없이 abstraction을 만들면 안된다. '혹시 필요할지도 모른다'는 생각으로 '설계'하면 안된다. 당장 필요한 부분을 찾아서 만드는 것이지 미리 만드는 것이 아니라는 말이다. 나중에 필요할지도 모른다는 생각에 추상화 단계를 결정하면 필요 이상으로 코드 진행이 복잡해진다.



## 인터페이스는 최대한 간결하게

interface를 설계할 때 granuality (*입도: interface에서 제공하는 method의 개수)를 반드시 고려해야한다. interface는 최대한 간결하게 정의되어야 한다. 하위 interface (hierachy가 있는건 아니지만···)와 조합하여 상위 수준의 abstraction을 정의할 수도 있다.

```go 
type Reader interface {
  Read(p []byte) (n int, err error)
}

type Writer interface {
  Write(p []byte) (n int, err error)
}

type ReadWriter interface {
  Reader
  Writer
}
```



## Decoupling 

코드와 구현을 분리(decouple)하자. 구체적인 구현 대신 abstraction을 작성하면, 나중에 구현을 바꾸더라도 작성한 코드를 고치지 않아도 된다. 이것이 바로 LSP (리스코프 치환 원칙)이다. 디커플링을 이용해 unit test를 쉽게 하는 예제를 확인하자.

``` go 
type CustomService struct {
  store mysql.Store
}

func (cs CustomerService) CreateNewCustomer(id string) error {
  customer := Customer{ id: id }
  return cs.store.StoreCustomer(customer)
}
```

'새로운 Customer를 생성'하는 요구사항을 가진 Service Layer에서 mysql store의 구현을 실제로 호출하고 있다. 이와 같은 경우엔 `CustomerService.CreateNewCustomer` 메서드를 test하기 위해서 MySQL 인스턴스를 실제로 띄우는 통합 테스트를 진행해야한다. 

보다 유연하게 CustomerService를 특정 구현과 분리해보자.

``` go 
type CustomerService struct {
  store customerStore
}

func (cs CustomerService) CreateNewCustomer(id string) error {
  customer := Customer{ id: id }
  return cs.store.StoreCustomer(customer)
}
```

이번엔 Service Layer에서 Repository Layer를 추상화하여 실제 구현과 분리했다. 훨씬 유연하게 test할 수 있으며, 의존성 주입을 사용하는 경우 `customerStore`라는 repository interface를 구현하는 어떠한 구현체던 외부에서 손쉽게 갈아끼울 수 있다.



## Interface는 사용자 측에 두어야 한다

이 절은 사실 아직까지는 크게 와닿지는 않는다. `interface`를 제공하지 않고 구현만 제공하는 package라니··· 아직까지는 Go보다는 OOP 스타일에 익숙한 내 입장에서는 알듯말듯하다.

Golang에서 interface는 암묵적으로 적용된다. '추상화는 찾아야지, 창조하면 안된다'와 흐름이 맞는 접근방식이다. 특정한 추상화를 모든 사용자에게 강요하는 것은 제공자의 역할이 아니다. 추상화가 필요하다고 판단하고, *필요에 맞는 추상화 수준을 결정하는 것은 '사용자'*이다.

예를들어, customer와 contract를 다루는 package의 struct를 예시로 들어보자.

``` go 
package store

type Store struct {
  // field
}

func (s *Store) GetContract(id string) (Contract, error) { /** */ }
func (s *Store) SetContract(id string, contract Contract) error { /** */ }
func (s *Store) GetCustomer(id string) (Customer, error) { /** */ }
func (s *Store) SetCustomer(id string, customer Customer) error { /** */ }
```

그리고 만약 해당 `store` 패키지를 이용하는 사용자가 Contract와 관련한 메서드에만 관심이 있다면 user 측에서 적절한 추상화를 해서 사용하는 것이다.

``` go 
package client 

type ContractStore struct {
	GetContract(id string) (store.Contract, error)
  SetContract(id string, contract store.Contract) error 
}
```



## 위와 연계해서, Interface를 return하지 마라

일반적으로 interface를 return하면 유연성이 떨어진다. 모든 client가 특정한 추상화만 사용해야하기 때문이다.

원칙으로 보다 명확하게 제공하면 다음 둘을 제시할 수 있다:

- interface보다는 struct를 return한다.
- 받을 때는 가능하면 interface로 받는다.

물론 예외도 있다. 대표적으로는 `error` interface를 들 수 있다.

물론 제공자 측에서 반드시 지켜져야 하는, 유용하다고 확신할 수 있는 추상화가 있다면 이를 표현한 interface를 return해도 된다. 그렇지 않다면 특정 추상화를 강요해서는 안된다. 해당 함수의 이용자가 적합한 것을 찾을 기회를 줘야 한다.

