---
title: "HTTP를 stateful하게 - cookie"
createdAt: 2024-02-13
---

HTTP는 본래 Stateless한 Protocol으로 설계되었으므로 각 request/response는 state의 측면에서 상호 독립적이다. 즉, 이전의 history를 공유하지 않기 때문에 연계되는 작업을 원한다면 그만큼의 증분된 정보를 매번 누적해서 HTTP에 실어 보내야한다는 말이다.

모든 정보를 HTTP traffic에 실어보내는 것은 당연히 비효율적이고, 보안의 측면에서 좋지 못한 설계이다.
대신, client 혹은 server 측의 storage에 핵심 정보를 저장해두고 해당 정보와 match 하는 key만을 주고받는 방식을 취함으로서 stateful을 달성할 수 있다. 이때 주로 이용되는 요소가 `HTTP Cookie`이다.


## 세션(서버 측)과 쿠키

##### 쿠키란? 

HTTP 쿠키란 <u>서버가 유저의 웹 브라우저에 전송하는 작은 데이터 조각</u>이다. 브라우저는 그 쿠키들을 저장해놓았다가, 동일한 서버 도메인에 Request를 보낼 때 Cookie를 실어 보낸다. 

서버에서 Response로 `Set-Cookie` 헤더를 전송하면 브라우저는 수신하고 브라우저 저장공간에 해당 Cookie를 저장한다. 엄밀히 말하면 브라우저 프로세스가 점유하고 있는 메인 메모리 공간 혹은 디스크에 Text 형식으로 저장한다.

이 후 브라우저는 해당 도메인에 Request를 보낼 때 `Cookie` 헤더에 값들을 넣고 전송한다. 

이를 이용해 HTTP의 stateless한 성질을 극복할 수 있다.

##### 쿠키의 제약사항

클라이언트도 모르게 계속 브라우저 프로세스의 메모리 공간을 점유할 수도 있다. 이를 방지하기 위해 <u>한 도메인 당 20개</u>, 하나의 쿠키 당 <u>4KB</u>로 사이즈를 제한해둔다.

##### Secure와 HttpOnly, SameSite 옵션

서버 측에서 쿠키를 설정할 때 쿠키의 성격을 지정할 수 있는 옵션이다. `Set-Cookie` 헤더로 쿠키를 설정할 때 함께 옵션을 지정한다.

```
Set-Cookie: <key>=<value>; path=/; HttpOnly; secure; sameSite=None;
```

- `Secure` 옵션이 설정된 쿠키는 HTTPS 프로토콜 상에서 암호화된 요청일 경우에만 전송된다.
- `HttpOnly` 옵션이 설정된 쿠키는 브라우저 런타임에서 `Document.cookie` API로 cookie에 접근할 수 없다. 서버에 전송되기만 한다. 즉, HTTP 통신에만 이용된다는 것.
- `SameSite` 옵션은 쿠키의 CORS 관련 정책을 설정한다. 특정 오리진 혹은 메서드에서 기원한 요청에 대해서 쿠키를 포함시킬 것인가의 CORS 수준을 설정할 수 있다.

## Web Storage

HTML5에 추가된 client 기반 key-value 저장소이다. **Local Storage**와 **Session Storage**로 나눌 수 있다. key-value 형태이므로 기본적으로 session-id와 같은 유저 정보를 다룰 때 사용된다. 

저장 공간 역시 <u>5-10MB</u>로 cookie보다 넉넉한 편이다.

##### Local Storage와 Session Storage

Local Storage의 경우엔 브라우저를 종료해도 데이터를 영구적으로 보관한다. 로컬 디바이스의 disk 스토리지에 저장하므로 휘발되지 않는다. 

반면 Session Storage는 휘발적이다. 브라우저를 종료하거나, 혹은 탭 간에서도 공유되지 않는다.