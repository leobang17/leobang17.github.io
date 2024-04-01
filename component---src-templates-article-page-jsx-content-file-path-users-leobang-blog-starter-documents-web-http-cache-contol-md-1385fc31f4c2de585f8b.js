"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[2568],{5676:function(e,l,n){n.r(l),n.d(l,{Head:function(){return h.py},default:function(){return v}});var t=n(1151),a=n(7294);function c(e){const l=Object.assign({blockquote:"blockquote",p:"p",h2:"h2",a:"a",div:"div",code:"code",pre:"pre",ul:"ul",li:"li",ol:"ol",h5:"h5"},(0,t.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(l.blockquote,null,"\n",a.createElement(l.p,null,"HTTP의 cache manipulation을 위한 header들을 확인하며 cache contol strategy에 대해서 알아보자."),"\n"),"\n",a.createElement(l.h2,{id:"cache-control-헤더를-이용해-브라우저에-응답을-캐싱하자",style:{position:"relative"}},a.createElement(l.a,{href:"#cache-control-%ED%97%A4%EB%8D%94%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%97%90-%EC%9D%91%EB%8B%B5%EC%9D%84-%EC%BA%90%EC%8B%B1%ED%95%98%EC%9E%90","aria-label":"cache control 헤더를 이용해 브라우저에 응답을 캐싱하자 permalink",className:"header-links before"},a.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Cache-Control 헤더를 이용해 브라우저에 응답을 캐싱하자"),"\n",a.createElement(l.p,null,a.createElement(l.code,null,"cache-control")," 헤더는 웹 서버 측에서 Response를 보낼 때 붙이게 된다. 해당 응답을 브라우저 캐시에 저장하되, ",a.createElement(l.code,null,"max-age"),"로 언제까지 해당 cache가 이용 가능한지 지정하게 된다."),"\n",a.createElement(l.pre,null,a.createElement(l.code,{className:"language-http"},"HTTP/1.1 200 OK \nContent-Type: image/jpeg\ncache-control: max-age=60\n// ...\n")),"\n",a.createElement(l.p,null,"이러한 응답을 받으면 브라우저는 브라우저 캐시에 응답 결과를 ",a.createElement(l.code,null,"max-age")," 만큼 보관하게되고, 동일한 리소스에 대한 ",a.createElement("u",null,"재요청이 일어난다면 브라우저 캐시에 저장된 결과를 참조"),"한다."),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"max-age의 유효 범위에 있다면 cache validation을 위한 요청을 날리지 않는다. (기본적인 ",a.createElement(l.code,null,"must-revalidate")," 전략을 사용하는 경우)"),"\n"),"\n",a.createElement(l.blockquote,null,"\n",a.createElement(l.p,null,"shared cache에 대한 유효 기간을 설정하기 위해서는 ",a.createElement(l.code,null,"s-max-age")," directive를 사용하면 된다."),"\n"),"\n",a.createElement(l.h2,{id:"cache-validation-캐시를-아직도-써도-될까",style:{position:"relative"}},a.createElement(l.a,{href:"#cache-validation-%EC%BA%90%EC%8B%9C%EB%A5%BC-%EC%95%84%EC%A7%81%EB%8F%84-%EC%8D%A8%EB%8F%84-%EB%90%A0%EA%B9%8C","aria-label":"cache validation 캐시를 아직도 써도 될까 permalink",className:"header-links before"},a.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Cache Validation: 캐시를 아직도 써도 될까?"),"\n",a.createElement(l.p,null,"브라우저 캐시 스토리지에 저장은 되어있지만, ",a.createElement("u",null,"cache가 만료된 경우엔 cache validation을 하게 된다"),". 보통 cache-control은 짧은 시간을 가지게 한다. 변경되었는지 검증도 하지 않고 브라우저 캐시만 조회하므로 길게 두면 정합성 문제가 쉽게 발생할 수 있기 떄문이다."),"\n",a.createElement(l.p,null,"이 때 Cache Validation을 위해 크게 2가지 방법을 사용한다."),"\n",a.createElement(l.ol,null,"\n",a.createElement(l.li,null,"Last-Modified & if-modified-since","\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"변경 시점을 기반으로 한 cache validation"),"\n"),"\n"),"\n",a.createElement(l.li,null,"Etag & If-None-Match","\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"리소스 자체의 변경을 감지하는 cache validation"),"\n"),"\n"),"\n"),"\n",a.createElement(l.p,null,"1번 방법을 이용하든 2번 방법을 이용하든 서버 측에서 보낼 응답은 동일하다. 만일 아직 cache가 유효하다면 (변경되지 않았다면), ",a.createElement(l.code,null,"304 Not Modified")," 응답을 돌려보내준다."),"\n",a.createElement(l.pre,null,a.createElement(l.code,{className:"language-http"},'HTTP/1.1 304 Not Modified\nContent-Type: image/jpeg\ncache-control: max-age=60\nLast-Modified: 2020년 11월 10일 10:00:00 // 시간 기반으로 cache control 하는 경우 \nEtag: "aveadfeadafe" // 리소스 변경 감지 기반으로 cache control 하는 경우\n')),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"이 때 리소스는 body에 담아 반환하지 않으므로 메타데이터만 전달하게 되어 굉장히 가벼운 확인용 응답이다."),"\n",a.createElement(l.li,null,"브라우저는 캐시 스토리지에 저장된 데이터를 끌어와서 쓰게되며, 다시 cache-control의 유효 기간을 갱신해주게 된다."),"\n"),"\n",a.createElement(l.p,null,"만약 cache가 유효하지 않다면 (변경된 새로운 버전이 있다면) 변경된 원본 응답을 보내주면 된다."),"\n",a.createElement(l.h2,{id:"캐시-검증-last-modified--if-modified-since-를-이용해서",style:{position:"relative"}},a.createElement(l.a,{href:"#%EC%BA%90%EC%8B%9C-%EA%B2%80%EC%A6%9D-last-modified--if-modified-since-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C","aria-label":"캐시 검증 last modified  if modified since 를 이용해서 permalink",className:"header-links before"},a.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"캐시 검증: Last-Modified & if-modified-since 를 이용해서"),"\n",a.createElement(l.p,null,"서버는 클라이언트에게 응답을 보낼 때 ",a.createElement(l.code,null,"Last-Modified")," 헤더를 이용해 ",a.createElement("u",null,"해당 리소스가 언제 마지막으로 수정되었는지")," 알려주게된다."),"\n",a.createElement(l.p,null,"그러면, client는 추후에 캐시 유효기간은 만료되었지만 스토리지에 저장되어있는 경우 다음과 같이 요청을 보내 캐시를 아직 이용해도 되는지 묻게된다."),"\n",a.createElement(l.pre,null,a.createElement(l.code,{className:"language-http"},"GET /star.jpg HTTP/1.1\nif-modified-since: 2020년 11월 11일 10:00:00 \n")),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"이 때 ",a.createElement(l.code,null,"if-modified-since"),"의 헤더는 해당 요청에 대해 캐시된 응답에서 알려준 ",a.createElement(l.code,null,"Last-Modified"),"의 값이다."),"\n",a.createElement(l.li,null,"즉, 변경시점이 동일한지. 내가 가지고 있는게 최신 버전이 맞는지를 확인한다."),"\n"),"\n",a.createElement(l.p,null,"cache가 유효한 경우 위의 ",a.createElement(l.code,null,"304 Not Modified")," 응답을 얻게되고, 유효하지 않을 경우 원본이 담긴 응답을 받게 된다."),"\n",a.createElement(l.h2,{id:"캐시-검증-etag--if-none-match를-이용해서",style:{position:"relative"}},a.createElement(l.a,{href:"#%EC%BA%90%EC%8B%9C-%EA%B2%80%EC%A6%9D-etag--if-none-match%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C","aria-label":"캐시 검증 etag  if none match를 이용해서 permalink",className:"header-links before"},a.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"캐시 검증: Etag & If-None-Match를 이용해서"),"\n",a.createElement(l.p,null,"Etag는 해당 데이터를 이용해 ",a.createElement("u",null,"생성한 임의의 hash 값"),"이다. 시간보다는 원본 데이터의 변경 그 자체를 감지하게 된다."),"\n",a.createElement(l.p,null,"Hash 함수의 특성상 input 데이터가 변경되면 output 데이터가 변경되는 것이므로 ",a.createElement("u",null,"단순히 ",a.createElement(l.code,null,"Etag"),"가 동일한지 확인하여 데이터가 수정되었는지 아닌지 확인"),"할 수 있다."),"\n",a.createElement(l.p,null,"서버는 클라이언트에게 응답을 보낼 때 ",a.createElement(l.code,null,"Etag")," 헤더를 이용해 ",a.createElement("u",null,"리소스의 마지막 버전"),"을 알려주게 된다."),"\n",a.createElement(l.p,null,"그러면, client는 추후에 캐시 유효기간은 만료되었지만 스토리지에 저장되어있는 경우 다음과 같이 요청을 보내 캐시를 아직 이용해도 되는지 묻게된다."),"\n",a.createElement(l.pre,null,a.createElement(l.code,{className:"language-http"},'GET /star.jpg HTTP/1.1\nIf-None-Match: "aveadfeadafe"\n')),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"서버 측이 가지고 있는 Etag 값과 동일하다면 ",a.createElement(l.code,null,"304 Not Modified"),"를 응답하고, 아닐 경우 원본 응답을 돌려준다."),"\n"),"\n",a.createElement(l.h2,{id:"캐시-검증에-어떤-방식을-쓰는-것이-좋은가",style:{position:"relative"}},a.createElement(l.a,{href:"#%EC%BA%90%EC%8B%9C-%EA%B2%80%EC%A6%9D%EC%97%90-%EC%96%B4%EB%96%A4-%EB%B0%A9%EC%8B%9D%EC%9D%84-%EC%93%B0%EB%8A%94-%EA%B2%83%EC%9D%B4-%EC%A2%8B%EC%9D%80%EA%B0%80","aria-label":"캐시 검증에 어떤 방식을 쓰는 것이 좋은가 permalink",className:"header-links before"},a.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"캐시 검증에 어떤 방식을 쓰는 것이 좋은가?"),"\n",a.createElement(l.p,null,"보통은 ",a.createElement(l.code,null,"Etag"),"을 이용하는 방식이 더 자유도가 높다."),"\n",a.createElement(l.ol,null,"\n",a.createElement(l.li,null,"시간 기반의 캐시 검증은 ",a.createElement("u",null,"1초 미만 단위 (0.x초)"),"의 캐시 조정이 불가능하다."),"\n",a.createElement(l.li,null,"서버 측에서 캐시 전략을 보다 자유롭게 수립할 수 있다.","\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"Etag의 경우 ",a.createElement("u",null,"서버에서 별도로 캐시 로직을 관리"),"할 수 있다. 예를들어, 주석이나 스페이스처럼 크게 영향이 없는 modification에 대해 cache를 유지하도록 할 수도 있다."),"\n"),"\n"),"\n",a.createElement(l.li,null,"원본 데이터로 rollback된 경우","\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"브라우저 캐시에 ",a.createElement(l.code,null,"A")," 데이터가 저장되어있다고 가정하자. 서버 측에서 ",a.createElement(l.code,null,"A -> B"),"로 수정했지만, 바로 ",a.createElement(l.code,null,"B -> A"),"로 롤백한 경우를 생각해보자."),"\n",a.createElement(l.li,null,"시간 기반으로 캐시 검증을 할 경우 다시 받아오게 된다."),"\n",a.createElement(l.li,null,"Etag  기반으로 검증할 경우 리소스의 변경사항이 없으므로 브라우저 캐시를 활용한다."),"\n"),"\n"),"\n"),"\n",a.createElement(l.h2,{id:"cache-control-헤더를-이용한-다양한-캐시-전략",style:{position:"relative"}},a.createElement(l.a,{href:"#cache-control-%ED%97%A4%EB%8D%94%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%8B%A4%EC%96%91%ED%95%9C-%EC%BA%90%EC%8B%9C-%EC%A0%84%EB%9E%B5","aria-label":"cache control 헤더를 이용한 다양한 캐시 전략 permalink",className:"header-links before"},a.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Cache-Control 헤더를 이용한 다양한 캐시 전략"),"\n",a.createElement(l.p,null,a.createElement(l.code,null,"Cache-Control")," 헤더의 directives를 이용해 다양한 캐시 전략을 수립할 수 있다."),"\n",a.createElement(l.p,null,a.createElement(l.code,null,"no-cache")),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"응답이 캐싱될 수 있지만, 매 요청마다 cache validation을 선행해야한다는 지침."),"\n",a.createElement(l.li,null,a.createElement(l.code,null,"max-age=0"),"과 동일한 효과를 가진다."),"\n",a.createElement(l.li,null,"Origin Server에 접근할 수 없는 경우, proxy에 저장된 캐시를 200 OK로 던져주어도 된다."),"\n"),"\n",a.createElement(l.p,null,a.createElement(l.code,null,"no-store")),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"응답을 아예 캐싱하지 않는다."),"\n"),"\n",a.createElement(l.p,null,a.createElement(l.code,null,"must-revalidate")),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"캐시 만료 후 최초 조회 시 origin server에 cache validation을 진행하라는 의미"),"\n",a.createElement(l.li,null,"\n",a.createElement("u",null,"origin server에 접근 실패할 경우 504 Gateway Timeout을 반드시 던져야 한다."),"\n"),"\n",a.createElement(l.li,null,a.createElement(l.code,null,"max-age"),"보다 많이 남아있을 경우 캐시를 먼저 이용한다. ",a.createElement(l.code,null,"max-age"),"와 함께 이용되는 가장 기본적인 전략."),"\n"),"\n",a.createElement(l.p,null,a.createElement(l.code,null,"proxy-revalidate")),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,a.createElement(l.code,null,"must-revalidate"),"와 동일한 역할을 수행한다. CDN이나 프록시 서버와 같은 shared cache에 적용할 때 이용함."),"\n",a.createElement(l.li,null,a.createElement(l.code,null,"must-revalidate"),"는 private cache에 이용된다."),"\n"),"\n",a.createElement(l.h5,{id:"private-cache와-shared-cache",style:{position:"relative"}},a.createElement(l.a,{href:"#private-cache%EC%99%80-shared-cache","aria-label":"private cache와 shared cache permalink",className:"header-links before"},a.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"private cache와 shared cache"),"\n",a.createElement(l.p,null,"private cache는 특정 클라이언트를 위한 캐시이다. 일반적인 브라우저에 저장하는 캐시를 생각하면 된다."),"\n",a.createElement(l.p,null,"반면 shared cache는 ",a.createElement("u",null,"CDN 혹은 프록시 서버"),"와 같이 다수의 client에게 캐시를 제공하는 입장에서의 캐시를 의미한다."),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,a.createElement(l.code,null,"private")," directive를 이용해 private cache임을 명시할 수 있고, ",a.createElement(l.code,null,"public")," directive를 이용해 shared cache임을 명시할 수 있다."),"\n"))}var r=function(e={}){const{wrapper:l}=Object.assign({},(0,t.ah)(),e.components);return l?a.createElement(l,e,a.createElement(c,e)):c(e)},i=n(5670),E=n(1326),m=n(4517),o=n(698),u=n(8627),d=n(662),h=n(1873);const s=({data:e,children:l,serverData:n})=>{const{prevPost:t,nextPost:c}=e,r={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return a.createElement(o.Z,{data:e},a.createElement(i.Z,null,a.createElement(m.Z,r),a.createElement(E.Z,null,l),a.createElement(d.Z,{prev:t,next:c}),a.createElement(u.Z)))};function v(e){return a.createElement(s,e,a.createElement(r,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-web-http-cache-contol-md-1385fc31f4c2de585f8b.js.map