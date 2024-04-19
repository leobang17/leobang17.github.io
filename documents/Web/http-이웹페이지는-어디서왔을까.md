---
title: "HTTP Referer - 이 웹페이지는 어디에서 왔을까?"
createdAt: 2024-02-19
---

웹 호스팅을 관리해주는 서비스에는 종종 트래픽 분석 기능이 뒤따라오는데, 이 때 어느 source를 통해서 내 웹페이지에 도달했는지에 대한 통계도 알려주곤 한다. 물론 Origin만으로도 어느 도메인을 통해 내 웹페이지를 요청했는지 러프하게 확인할 수 있지만, 보다 자세한 통계를 위해 이러한 경우에는 HTTP Referer를 활용한다.

## HTTP Referer 

HTTP Request 헤더 중 하나로 브라우저가 현재 request를 보내기 전에 방문했던 웹페이지의 주소를 포함한다. 음··· 현실적인 예를 들자면 추천인 (레퍼럴) 같은 느낌이다. 내 서버에 들어오게 된 경로가 어떻게 되는지, 내 서버에 대한 추천인이 누구인지. 

서버는 `Referer` 헤더를 참고함으로서 해당 요청이 어느 웹페이지(URI)로부터 전달되었는지 알 수 있다.  

## HTTP request 헤더인 Origin과의 차이

뒤의 경로 정보를 포함하는가/안하는가의 차이를 가진다.

예를들어 `https://www.naver.com/search?query=leobang`에 대응하는 웹페이지로부터 `https://leobang.me`에 들어왔다고 하자. 

그러면 브라우저는 다음과 같은 HTTP GET request를 보낼텐데, 거기서 `Referer`와 `Origin` 헤더는 다음과 같다.

```http
GET / HTTP/1.1
...
Origin: "https://naver.com"
Referer: "https://naver.com/search?query=leobang"
...
```

Origin의 정의는 `scheme + domain + port`이다. HTTP 요청의 경우 scheme에 따라 `443` 혹은 `80` 포트를 이용하므로 포트 넘버는 생략하고, 해당 요청이 시작된 웹페이지의 도메인 정보만을 보여준다.

Referer의 경우는 도메인 정보 뿐 아니라 URI의 모든 구성요소를 전달해준다. 

## Referer 헤더의 용례 

1. 통계 수집 
   - 어느 웹사이트로부터 유입되었는지 트래픽을 분석/추적할 수 있다.
   - 블로그 유입 경로가 어떻게 되는지 알 수 있는 것도 Referer 헤더를 분석한 것이다.
2. 보안
   - 검증된 `Referer`로부터의 요청만을 허용하도록 보안을 강화할 수 있다. CSRF 방어에 효과적이다. 라고 하지만
   - 사실 Origin 헤더를 체크하는 것만으로도 충분하고, 웹사이트 보안의 기본적인 대전제는 SOP이므로··· 이중 체크 외에 큰 의미가 있는지는 의문이다. 
3. 캐싱
   - 프록시 서버 혹은 캐시 시스템에서 `Referer` 헤더를 사용해 적절한 캐시 전략을 사용할 수 있다.
