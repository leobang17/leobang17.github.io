---
title: "Go - Map"
createdAt: 2024-03-29
---

Go에서 map은 다른 언어의 Hash Map과 같이 key-value 쌍으로 데이터를 저장하는 자료구조이다. map은 일반적으로 O(1)의 조회, 쓰기 연산을 지원한다. 

다음과 같이 map을 이용할 수 있다: 

```  go 
// map declaration & initialize
m := make(map[string]int)

// map insert
m["apple"] = 5
m["banana"] = 3

// delete key
delete(m, "apple") // key 삭제 

// check if a key exists
elem, ok := m["apple"] // ok는 error가 아닌 boolean이다. key가 없을 경우 ok는 false를 반환하고, elem에는 0이 반환된다.
```

## Restriction in Key Types 

map의 key와 value는 다양한 type으로 구성할 수 있다. value의 경우 모든 type을 수용할 수 있지만, **key로 사용될 type은 모두 comparable**해야한다.

in terms of "comparable", 다음과 같이 구분 지을 수 있다,

- comparable
  - boolean, numeric, string, pointer, channel, interface, struct, array
  - struct와 array는 *포함하는 field나 element의 type이 모두 comparable할 때에만* 그 역시 comparable하다.
- incomparable
  - slices, map, function 
  - 이들은 pointer를 비교하는 것이지 각 value를 비교하는 것이 아니다.

> array는 comparable하지만, slice는 incomparable하다. array는 길이가 고정되어있기 때문에 비교할 수 있는 것이다.

struct를 map의 key로 이용하는 예시를 보자. 특정 웹사이트의 endpoint에 접속한 조회수를 기록하고자 하는데, 이 때 국가별로 조회수를 관리하고자 한다. 단순히 생각하자면, map의 map으로 자료를 저장할 수 있겠다.

``` go 
hits := make(map[string]map[string]int) // endpoint: country : hit_count

hits["/docs/"]["au"] // /docs path의 호주 조회수를 알고 싶다면.
```

이러한 접근법은 직관적이긴 하지만, map을 초기화하고 이용하는데 여러 불편함이 생긴다. 데이터를 추가하고자할 때, 먼저 inner map이 존재하는지 확인하고 outer map을 조작해야하기 때문이다. 

``` go 
func add(m map[string]map[string]int, path, country string) {
    mm, ok := m[path]
    if !ok {
        mm = make(map[string]int)
        m[path] = mm
    }
    mm[country]++
}
add(hits, "/doc/", "au")
```

위와 같은 방식 대신, struct 자료형을 key로 활용함으로서 요구사항을 보다 간단하게 구현할 수 있다.  

``` go 
type Key struct {
  Path, Country string
}
hits := make(map[Key]int)

hits[Key { "/", "au" }]++
n := hits[Key{ "/ref/spec", "ch" }]
```

## Map을 이용할 때 주의해야할 점 

1. Map의 key-value는 순서를 보장하지 않는다.

   - Map은 iterable한 collection이지만, key-value는 순서를 보장하지 않는다. 따라서 `for := range` 구문을 활용해 map을 iterate할 때 매번 key-value 쌍의 순서가 다를 수 있으므로 이에 유의하여 코드를 작성해야한다. 

2. Nil Map

   - initialize되지 않은 Map, 즉, 선언만 하고 `nil`인 상태의 Map 변수에 접근해 *데이터를 쓰려고 하면* runtime panic이 발생한다. 따라서 map을 이용하기 전에 `make` function을 이용해 초기화해주어야 한다.

   - 하지만 `nil` map에서 읽기 시도는 panic을 발생시키지 않고, 단지 `zero value`를 반환한다.

