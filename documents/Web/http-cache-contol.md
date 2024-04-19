---
title: "HTTP - Cache Contol"
createdAt: 2024-02-27
---

> HTTP의 cache manipulation을 위한 header들을 확인하며 cache contol strategy에 대해서 알아보자.


## Cache-Control 헤더를 이용해 브라우저에 응답을 캐싱하자

`cache-control` 헤더는 웹 서버 측에서 Response를 보낼 때 붙이게 된다. 해당 응답을 브라우저 캐시에 저장하되, `max-age`로 언제까지 해당 cache가 이용 가능한지 지정하게 된다.

``` http
HTTP/1.1 200 OK 
Content-Type: image/jpeg
cache-control: max-age=60
// ...
```

이러한 응답을 받으면 브라우저는 브라우저 캐시에 응답 결과를 `max-age` 만큼 보관하게되고, 동일한 리소스에 대한 <u>재요청이 일어난다면 브라우저 캐시에 저장된 결과를 참조</u>한다.

- max-age의 유효 범위에 있다면 cache validation을 위한 요청을 날리지 않는다. (기본적인 `must-revalidate` 전략을 사용하는 경우)

> shared cache에 대한 유효 기간을 설정하기 위해서는 `s-max-age` directive를 사용하면 된다.

## Cache Validation: 캐시를 아직도 써도 될까? 

브라우저 캐시 스토리지에 저장은 되어있지만, <u>cache가 만료된 경우엔 cache validation을 하게 된다</u>. 보통 cache-control은 짧은 시간을 가지게 한다. 변경되었는지 검증도 하지 않고 브라우저 캐시만 조회하므로 길게 두면 정합성 문제가 쉽게 발생할 수 있기 떄문이다. 

이 때 Cache Validation을 위해 크게 2가지 방법을 사용한다.

1. Last-Modified & if-modified-since
   - 변경 시점을 기반으로 한 cache validation
2. Etag & If-None-Match
   - 리소스 자체의 변경을 감지하는 cache validation

1번 방법을 이용하든 2번 방법을 이용하든 서버 측에서 보낼 응답은 동일하다. 만일 아직 cache가 유효하다면 (변경되지 않았다면), `304 Not Modified` 응답을 돌려보내준다.

``` http
HTTP/1.1 304 Not Modified
Content-Type: image/jpeg
cache-control: max-age=60
Last-Modified: 2020년 11월 10일 10:00:00 // 시간 기반으로 cache control 하는 경우 
Etag: "aveadfeadafe" // 리소스 변경 감지 기반으로 cache control 하는 경우
```

- 이 때 리소스는 body에 담아 반환하지 않으므로 메타데이터만 전달하게 되어 굉장히 가벼운 확인용 응답이다.
- 브라우저는 캐시 스토리지에 저장된 데이터를 끌어와서 쓰게되며, 다시 cache-control의 유효 기간을 갱신해주게 된다. 

만약 cache가 유효하지 않다면 (변경된 새로운 버전이 있다면) 변경된 원본 응답을 보내주면 된다. 



## 캐시 검증: Last-Modified & if-modified-since 를 이용해서

서버는 클라이언트에게 응답을 보낼 때 `Last-Modified` 헤더를 이용해 <u>해당 리소스가 언제 마지막으로 수정되었는지</u> 알려주게된다.

그러면, client는 추후에 캐시 유효기간은 만료되었지만 스토리지에 저장되어있는 경우 다음과 같이 요청을 보내 캐시를 아직 이용해도 되는지 묻게된다.

``` http
GET /star.jpg HTTP/1.1
if-modified-since: 2020년 11월 11일 10:00:00 
```

- 이 때 `if-modified-since`의 헤더는 해당 요청에 대해 캐시된 응답에서 알려준 `Last-Modified`의 값이다.
- 즉, 변경시점이 동일한지. 내가 가지고 있는게 최신 버전이 맞는지를 확인한다.

cache가 유효한 경우 위의 `304 Not Modified` 응답을 얻게되고, 유효하지 않을 경우 원본이 담긴 응답을 받게 된다.



## 캐시 검증: Etag & If-None-Match를 이용해서

Etag는 해당 데이터를 이용해 <u>생성한 임의의 hash 값</u>이다. 시간보다는 원본 데이터의 변경 그 자체를 감지하게 된다.

Hash 함수의 특성상 input 데이터가 변경되면 output 데이터가 변경되는 것이므로 <u>단순히 `Etag`가 동일한지 확인하여 데이터가 수정되었는지 아닌지 확인</u>할 수 있다.

서버는 클라이언트에게 응답을 보낼 때 `Etag` 헤더를 이용해 <u>리소스의 마지막 버전</u>을 알려주게 된다.

그러면, client는 추후에 캐시 유효기간은 만료되었지만 스토리지에 저장되어있는 경우 다음과 같이 요청을 보내 캐시를 아직 이용해도 되는지 묻게된다.

``` http
GET /star.jpg HTTP/1.1
If-None-Match: "aveadfeadafe"
```

- 서버 측이 가지고 있는 Etag 값과 동일하다면 `304 Not Modified`를 응답하고, 아닐 경우 원본 응답을 돌려준다.



## 캐시 검증에 어떤 방식을 쓰는 것이 좋은가? 

보통은 `Etag`을 이용하는 방식이 더 자유도가 높다. 

1. 시간 기반의 캐시 검증은 <u>1초 미만 단위 (0.x초)</u>의 캐시 조정이 불가능하다. 
2. 서버 측에서 캐시 전략을 보다 자유롭게 수립할 수 있다.
   - Etag의 경우 <u>서버에서 별도로 캐시 로직을 관리</u>할 수 있다. 예를들어, 주석이나 스페이스처럼 크게 영향이 없는 modification에 대해 cache를 유지하도록 할 수도 있다.
3. 원본 데이터로 rollback된 경우
   - 브라우저 캐시에 `A` 데이터가 저장되어있다고 가정하자. 서버 측에서 `A -> B`로 수정했지만, 바로 `B -> A`로 롤백한 경우를 생각해보자.
   - 시간 기반으로 캐시 검증을 할 경우 다시 받아오게 된다.
   - Etag  기반으로 검증할 경우 리소스의 변경사항이 없으므로 브라우저 캐시를 활용한다.



## Cache-Control 헤더를 이용한 다양한 캐시 전략 

`Cache-Control` 헤더의 directives를 이용해 다양한 캐시 전략을 수립할 수 있다. 

`no-cache`

- 응답이 캐싱될 수 있지만, 매 요청마다 cache validation을 선행해야한다는 지침.
- `max-age=0`과 동일한 효과를 가진다.
- Origin Server에 접근할 수 없는 경우, proxy에 저장된 캐시를 200 OK로 던져주어도 된다.

`no-store`

- 응답을 아예 캐싱하지 않는다.

`must-revalidate`

- 캐시 만료 후 최초 조회 시 origin server에 cache validation을 진행하라는 의미
- <u>origin server에 접근 실패할 경우 504 Gateway Timeout을 반드시 던져야 한다.</u>
- `max-age`보다 많이 남아있을 경우 캐시를 먼저 이용한다. `max-age`와 함께 이용되는 가장 기본적인 전략.

`proxy-revalidate`

- `must-revalidate`와 동일한 역할을 수행한다. CDN이나 프록시 서버와 같은 shared cache에 적용할 때 이용함. 
- `must-revalidate`는 private cache에 이용된다.



##### private cache와 shared cache

private cache는 특정 클라이언트를 위한 캐시이다. 일반적인 브라우저에 저장하는 캐시를 생각하면 된다.

반면 shared cache는 <u>CDN 혹은 프록시 서버</u>와 같이 다수의 client에게 캐시를 제공하는 입장에서의 캐시를 의미한다. 

- `private` directive를 이용해 private cache임을 명시할 수 있고, `public` directive를 이용해 shared cache임을 명시할 수 있다. 

