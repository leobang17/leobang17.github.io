---
title: "Gatsby Rendering 옵션들"
createdAt: 2023-04-10
---

> SSG (Static Site Generation)이나 DSG (Deferred Static Generation)이 더 권장되지만, 특정 use case를 위해서는 SSR을 활용하도록 한다.

## Rendering 옵션이란? 

유저가 마주하게될 HTML이 조립되는 시점을 정의하는 것이 렌더링 옵션. 

- 빌드 타임에 HTML을 생성: SSG 혹은 pre-rendering
- HTTP request가 오면 HTML을 생성:  server-side rendering
- 브라우저에서 javascript를 읽고 HTML을 생성: client-side rendering


## Static Site Generation (SSG)

빌드 시점에 페이지를 미리 HTML, CSS, Javascript로 렌더링 해놓는 방식을 말한다. 유저가 방문하기도 전에 이미 페이지는 빌드시점에 준비되어있다.

Gatsby에서 SSG가 동작하는 방식:

1. Gatsby가 SSG 페이지를 대상으로 모든 asset과 HTML을 빌드 시점에 빌드 서버 (주로 로컬 머신 혹은 빌드 서비스)에서 생성한다. 
2. 정적 파일들이 CDN에 업로드되어 엔드유저에게 전달된다. (Gatsby cloud를 이용하는 경우일 듯?)

유저 입장에서는 가장 쾌적한 환경을 제공하지만, 페이지가 늘어날수록 빌드 시간이 길어진다는 단점이 있다. 

## Deferred Static Generation (DSG)

SSG와 컨셉은 매우 유사하다. DSG의 다른 점은 개발자들이 특정 페이지에 대해서 유저가 처음 요청하기 전까지 빌드를 지연할 수 있다. 웹사이트의 빌드타임에 대해 보다 넓은 옵션을 제공한다. 

예를들어, 생성한지 오래되어 거의 아카이브 용도로 작성된 페이지가 있다고 하자. 이 페이지를 매 빌드시점에 다시 렌더링 해놓기에는 비효율적일 수 있다. 이 페이지들을 DSG 옵션으로 스킵할 수 있고, 유저들은 CDN에 저장된 캐시를 바라보게 된다.

하지만 빌드 시점을 뒤로 미루는 것이므로 빌드 서버를 빌드 이후에도 유지(`gatsby serve` 커맨드)시켜야한다는 단점이 있다. 따라서 기본적인 Gatsby 앱과는 다른 인프라 및 백엔드 구조가 필요할 수 있다. gatsby cloud를 쓰면 다 해결해준다.


## Server-side Rendering (SSR)

SSG와 DSG로 거의 모든 상황을 커버할 수 있지만, 그래도 특정 유즈케이스에는 HTML을 on-the-fly로 생성해야하는 경우가 있다. 

SSR은 유저가 방문하는 시점에 웹페이지 콘텐츠가 런타임에서 렌더링되어 제공되는 방식이다. 페이지의 빌드 프로세스는 각 request 마다 실행된다. 콘텐츠가 런타임에서 렌더링되므로 방문자들은 항상 <u>가장 최신의 페이지</u>를 서버로부터 응답 받게 된다. 

예를들어 유저의 리뷰를 보여주는 웹사이트를 만든다고 가정하자. 모든 리뷰들이 항상 최신의 상태로 검색 엔진에 의해 색인되길 바라므로, client-side rendering은 고려할 대상이 아니다. 이 경우에 유저 리뷰를 보여주는 페이지를 SSR 방식으로 렌더링할 수 있다. 유저가 해당 페이지를 request하는 시점에 Gatsby가 page component에 정의된 `getServerData` 함수를 실행한다. Gatsby는 해당 함수의 결과를 page component의 `serverData` 프로퍼티로 전달한 후 런타임에서 페이지를 렌더링해 방문자에게 제공한다.

