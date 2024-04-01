"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[2774],{6666:function(e,t,l){l.r(t),l.d(t,{Head:function(){return d.py},default:function(){return v}});var n=l(1151),a=l(7294);function r(e){const t=Object.assign({p:"p",code:"code",h2:"h2",a:"a",div:"div",h5:"h5",pre:"pre",ul:"ul",li:"li",strong:"strong"},(0,n.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(t.p,null,"HTTP는 본래 Stateless한 Protocol으로 설계되었으므로 각 request/response는 state의 측면에서 상호 독립적이다. 즉, 이전의 history를 공유하지 않기 때문에 연계되는 작업을 원한다면 그만큼의 증분된 정보를 매번 누적해서 HTTP에 실어 보내야한다는 말이다."),"\n",a.createElement(t.p,null,"모든 정보를 HTTP traffic에 실어보내는 것은 당연히 비효율적이고, 보안의 측면에서 좋지 못한 설계이다.\n대신, client 혹은 server 측의 storage에 핵심 정보를 저장해두고 해당 정보와 match 하는 key만을 주고받는 방식을 취함으로서 stateful을 달성할 수 있다. 이때 주로 이용되는 요소가 ",a.createElement(t.code,null,"HTTP Cookie"),"이다."),"\n",a.createElement(t.h2,{id:"세션서버-측과-쿠키",style:{position:"relative"}},a.createElement(t.a,{href:"#%EC%84%B8%EC%85%98%EC%84%9C%EB%B2%84-%EC%B8%A1%EA%B3%BC-%EC%BF%A0%ED%82%A4","aria-label":"세션서버 측과 쿠키 permalink",className:"header-links before"},a.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"세션(서버 측)과 쿠키"),"\n",a.createElement(t.h5,{id:"쿠키란",style:{position:"relative"}},a.createElement(t.a,{href:"#%EC%BF%A0%ED%82%A4%EB%9E%80","aria-label":"쿠키란 permalink",className:"header-links before"},a.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"쿠키란?"),"\n",a.createElement(t.p,null,"HTTP 쿠키란 ",a.createElement("u",null,"서버가 유저의 웹 브라우저에 전송하는 작은 데이터 조각"),"이다. 브라우저는 그 쿠키들을 저장해놓았다가, 동일한 서버 도메인에 Request를 보낼 때 Cookie를 실어 보낸다."),"\n",a.createElement(t.p,null,"서버에서 Response로 ",a.createElement(t.code,null,"Set-Cookie")," 헤더를 전송하면 브라우저는 수신하고 브라우저 저장공간에 해당 Cookie를 저장한다. 엄밀히 말하면 브라우저 프로세스가 점유하고 있는 메인 메모리 공간 혹은 디스크에 Text 형식으로 저장한다."),"\n",a.createElement(t.p,null,"이 후 브라우저는 해당 도메인에 Request를 보낼 때 ",a.createElement(t.code,null,"Cookie")," 헤더에 값들을 넣고 전송한다."),"\n",a.createElement(t.p,null,"이를 이용해 HTTP의 stateless한 성질을 극복할 수 있다."),"\n",a.createElement(t.h5,{id:"쿠키의-제약사항",style:{position:"relative"}},a.createElement(t.a,{href:"#%EC%BF%A0%ED%82%A4%EC%9D%98-%EC%A0%9C%EC%95%BD%EC%82%AC%ED%95%AD","aria-label":"쿠키의 제약사항 permalink",className:"header-links before"},a.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"쿠키의 제약사항"),"\n",a.createElement(t.p,null,"클라이언트도 모르게 계속 브라우저 프로세스의 메모리 공간을 점유할 수도 있다. 이를 방지하기 위해 ",a.createElement("u",null,"한 도메인 당 20개"),", 하나의 쿠키 당 ",a.createElement("u",null,"4KB"),"로 사이즈를 제한해둔다."),"\n",a.createElement(t.h5,{id:"secure와-httponly-samesite-옵션",style:{position:"relative"}},a.createElement(t.a,{href:"#secure%EC%99%80-httponly-samesite-%EC%98%B5%EC%85%98","aria-label":"secure와 httponly samesite 옵션 permalink",className:"header-links before"},a.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Secure와 HttpOnly, SameSite 옵션"),"\n",a.createElement(t.p,null,"서버 측에서 쿠키를 설정할 때 쿠키의 성격을 지정할 수 있는 옵션이다. ",a.createElement(t.code,null,"Set-Cookie")," 헤더로 쿠키를 설정할 때 함께 옵션을 지정한다."),"\n",a.createElement(t.pre,null,a.createElement(t.code,null,"Set-Cookie: <key>=<value>; path=/; HttpOnly; secure; sameSite=None;\n")),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,a.createElement(t.code,null,"Secure")," 옵션이 설정된 쿠키는 HTTPS 프로토콜 상에서 암호화된 요청일 경우에만 전송된다."),"\n",a.createElement(t.li,null,a.createElement(t.code,null,"HttpOnly")," 옵션이 설정된 쿠키는 브라우저 런타임에서 ",a.createElement(t.code,null,"Document.cookie")," API로 cookie에 접근할 수 없다. 서버에 전송되기만 한다. 즉, HTTP 통신에만 이용된다는 것."),"\n",a.createElement(t.li,null,a.createElement(t.code,null,"SameSite")," 옵션은 쿠키의 CORS 관련 정책을 설정한다. 특정 오리진 혹은 메서드에서 기원한 요청에 대해서 쿠키를 포함시킬 것인가의 CORS 수준을 설정할 수 있다."),"\n"),"\n",a.createElement(t.h2,{id:"web-storage",style:{position:"relative"}},a.createElement(t.a,{href:"#web-storage","aria-label":"web storage permalink",className:"header-links before"},a.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Web Storage"),"\n",a.createElement(t.p,null,"HTML5에 추가된 client 기반 key-value 저장소이다. ",a.createElement(t.strong,null,"Local Storage"),"와 ",a.createElement(t.strong,null,"Session Storage"),"로 나눌 수 있다. key-value 형태이므로 기본적으로 session-id와 같은 유저 정보를 다룰 때 사용된다."),"\n",a.createElement(t.p,null,"저장 공간 역시 ",a.createElement("u",null,"5-10MB"),"로 cookie보다 넉넉한 편이다."),"\n",a.createElement(t.h5,{id:"local-storage와-session-storage",style:{position:"relative"}},a.createElement(t.a,{href:"#local-storage%EC%99%80-session-storage","aria-label":"local storage와 session storage permalink",className:"header-links before"},a.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Local Storage와 Session Storage"),"\n",a.createElement(t.p,null,"Local Storage의 경우엔 브라우저를 종료해도 데이터를 영구적으로 보관한다. 로컬 디바이스의 disk 스토리지에 저장하므로 휘발되지 않는다."),"\n",a.createElement(t.p,null,"반면 Session Storage는 휘발적이다. 브라우저를 종료하거나, 혹은 탭 간에서도 공유되지 않는다."))}var c=function(e={}){const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?a.createElement(t,e,a.createElement(r,e)):r(e)},s=l(5670),o=l(1326),i=l(4517),h=l(698),m=l(8627),u=l(662),d=l(1873);const E=({data:e,children:t,serverData:l})=>{const{prevPost:n,nextPost:r}=e,c={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return a.createElement(h.Z,{data:e},a.createElement(s.Z,null,a.createElement(i.Z,c),a.createElement(o.Z,null,t),a.createElement(u.Z,{prev:n,next:r}),a.createElement(m.Z)))};function v(e){return a.createElement(E,e,a.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-web-http를-stateful하게-md-63898dc7fb22731b9297.js.map