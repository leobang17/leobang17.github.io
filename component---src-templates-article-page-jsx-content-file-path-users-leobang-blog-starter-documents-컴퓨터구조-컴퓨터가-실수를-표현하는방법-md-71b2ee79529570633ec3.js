"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[9350],{1700:function(e,n,t){t.r(n),t.d(n,{Head:function(){return u.py},default:function(){return g}});var l=t(1151),a=t(7294);function i(e){const n=Object.assign({blockquote:"blockquote",p:"p",h2:"h2",a:"a",div:"div",ol:"ol",li:"li",em:"em",h5:"h5",ul:"ul",h4:"h4",code:"code",strong:"strong"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"컴퓨터는 실수를 어떻게 표현할까?"),"\n"),"\n",a.createElement(n.h2,{id:"실수-표현하기---고정-소수점",style:{position:"relative"}},a.createElement(n.a,{href:"#%EC%8B%A4%EC%88%98-%ED%91%9C%ED%98%84%ED%95%98%EA%B8%B0---%EA%B3%A0%EC%A0%95-%EC%86%8C%EC%88%98%EC%A0%90","aria-label":"실수 표현하기   고정 소수점 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"실수 표현하기 - 고정 소수점"),"\n",a.createElement(n.p,null,"32bit 컴퓨터를 가정했을 때,"),"\n",a.createElement(n.ol,null,"\n",a.createElement(n.li,null,"맨 앞의 1bit: 부호를 표시함"),"\n",a.createElement(n.li,null,"15bit: 정수부를 표시함"),"\n",a.createElement(n.li,null,"16bit: 실수부를 표시함"),"\n"),"\n",a.createElement(n.p,null,"직관적으로 정수부와 실수부를 분리한다는 장점이 있지만 표현 가능한 범위가 적다는 단점이 있다. 이에 대부분은 ",a.createElement(n.em,null,"부동 소수점 방식을 채택"),"한다."),"\n",a.createElement(n.h2,{id:"실수-표현하기---부동-소수점-floating-points",style:{position:"relative"}},a.createElement(n.a,{href:"#%EC%8B%A4%EC%88%98-%ED%91%9C%ED%98%84%ED%95%98%EA%B8%B0---%EB%B6%80%EB%8F%99-%EC%86%8C%EC%88%98%EC%A0%90-floating-points","aria-label":"실수 표현하기   부동 소수점 floating points permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"실수 표현하기 - 부동 소수점 (floating points)"),"\n",a.createElement(n.p,null,"소수점이 동동 떠다니는 기법이라고 해서 floating points이다. 부동소수점을 구현한 가장 일반적인 방식은 IEEE754 표준이다."),"\n",a.createElement(n.h5,{id:"부동-소수점을-이루는-3가지-정보",style:{position:"relative"}},a.createElement(n.a,{href:"#%EB%B6%80%EB%8F%99-%EC%86%8C%EC%88%98%EC%A0%90%EC%9D%84-%EC%9D%B4%EB%A3%A8%EB%8A%94-3%EA%B0%80%EC%A7%80-%EC%A0%95%EB%B3%B4","aria-label":"부동 소수점을 이루는 3가지 정보 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"부동 소수점을 이루는 3가지 정보"),"\n",a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<figure class="gatsby-resp-image-figure" style="">\n    <span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 660px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 27.272727272727277%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAABYlAAAWJQFJUiTwAAABEklEQVR42j2QgW6CQBBE+f+/MqlKq4KCpZYqgkGoUkj1uMNTuNcUEjeZ7GR3M5lZq6oqgiDA931GoxGu67KYz3Edl6osud1uPaSS1LJGNQopJUqpAY1CCIExhv+yMF1P0kPCePzC3HGYuQu89zVLb8V4OsG2bXzPx56+4jpLPoINs7cZ3spjOpn2vFFNL2pJ3SEfkBRXws+YUxiRBVuyzY7TLqFIjqT7HcfiQJRviU8RyXlPVhzJy4ysSPkuc7TWg8P0cmeVK8IfjWjBZCXKj2mChHtyhm6IolpJ+OuTiC2xCGk6SceQDsyzWbo1RJXuRWvd9vN7dUXtMuTmwONSP4+FvhBfvnqE1Zr6LoaVMc8f/gFOnnUqoGZUHgAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <picture>\n          <source\n              srcset="/static/3319d7997f45767ed81a53844fb5529c/3cd7a/image-20231229134259186.webp 165w,\n/static/3319d7997f45767ed81a53844fb5529c/89fe6/image-20231229134259186.webp 330w,\n/static/3319d7997f45767ed81a53844fb5529c/3d671/image-20231229134259186.webp 660w,\n/static/3319d7997f45767ed81a53844fb5529c/7dc77/image-20231229134259186.webp 990w,\n/static/3319d7997f45767ed81a53844fb5529c/04d22/image-20231229134259186.webp 1320w,\n/static/3319d7997f45767ed81a53844fb5529c/4c79b/image-20231229134259186.webp 1530w"\n              sizes="(max-width: 660px) 100vw, 660px"\n              type="image/webp"\n            />\n          <source\n            srcset="/static/3319d7997f45767ed81a53844fb5529c/103f2/image-20231229134259186.png 165w,\n/static/3319d7997f45767ed81a53844fb5529c/748ba/image-20231229134259186.png 330w,\n/static/3319d7997f45767ed81a53844fb5529c/7c811/image-20231229134259186.png 660w,\n/static/3319d7997f45767ed81a53844fb5529c/d28e0/image-20231229134259186.png 990w,\n/static/3319d7997f45767ed81a53844fb5529c/bb51b/image-20231229134259186.png 1320w,\n/static/3319d7997f45767ed81a53844fb5529c/77e4e/image-20231229134259186.png 1530w"\n            sizes="(max-width: 660px) 100vw, 660px"\n            type="image/png"\n          />\n          <img\n            class="gatsby-resp-image-image"\n            src="/static/3319d7997f45767ed81a53844fb5529c/7c811/image-20231229134259186.png"\n            alt="image-20231229134259186"\n            title=""\n            loading="lazy"\n            decoding="async"\n            style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n          />\n        </picture>\n    </span>\n    <figcaption class="gatsby-resp-image-figcaption">image-20231229134259186</figcaption>\n  </figure>'}}),"\n",a.createElement(n.p,null,"625.9라는 소수를 표현해보자. 먼저, 1미만의 소수로 변형시키고, 이를 10의 배수로 곱한 형태를 취하도록 만들어야 한다."),"\n",a.createElement(n.p,null,"=> 0.6259 * 10^3^ 으로 표시한다."),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"여기서 6259 부분은 ",a.createElement("u",null,"significand"),"이다"),"\n",a.createElement(n.li,null,"3은 ",a.createElement("u",null,"exponent"),"이다"),"\n",a.createElement(n.li,null,"그리고 생략되어있지만, 음/양수를 표기하는 ",a.createElement("u",null,"sign"),"이다."),"\n"),"\n",a.createElement(n.p,null,"실제로 소수를 표현할 때 10진수로 치환하지는 않는다. 실제로는 2진수로 변환한 후, 소수점을 이동시키는 방식이지만 10진수로 표기할 때 이해가 쉽기에 이렇게 했음."),"\n",a.createElement(n.p,null,"하지만 3가지 정보인 significand, exponent, sign 부분은 동일하게 활용한다."),"\n",a.createElement(n.h5,{id:"부동-소수점은-고정-소수점보다-더-큰-범위의-소수를-표현할-수-있다",style:{position:"relative"}},a.createElement(n.a,{href:"#%EB%B6%80%EB%8F%99-%EC%86%8C%EC%88%98%EC%A0%90%EC%9D%80-%EA%B3%A0%EC%A0%95-%EC%86%8C%EC%88%98%EC%A0%90%EB%B3%B4%EB%8B%A4-%EB%8D%94-%ED%81%B0-%EB%B2%94%EC%9C%84%EC%9D%98-%EC%86%8C%EC%88%98%EB%A5%BC-%ED%91%9C%ED%98%84%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8B%A4","aria-label":"부동 소수점은 고정 소수점보다 더 큰 범위의 소수를 표현할 수 있다 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"부동 소수점은 고정 소수점보다 더 큰 범위의 소수를 표현할 수 있다."),"\n",a.createElement(n.p,null,"고정 소수점은 물리적으로 정수부와 소수부를 절반씩 나누어 사용했다. 하지만 부동소수점 방식은 실수의 값 자체를 significand (23bit)에 넣어 표현하기 때문에 보다 큰 bit의 범위를 가진다."),"\n",a.createElement(n.p,null,"정수가 크든 작든 모두 significand에 밀어넣은 뒤에 전체 실수를 표현하기 때문에 공간 낭비도 해결되는 것이다."),"\n",a.createElement(n.h4,{id:"01을-올바르게-표현하지-못하는-이유",style:{position:"relative"}},a.createElement(n.a,{href:"#01%EC%9D%84-%EC%98%AC%EB%B0%94%EB%A5%B4%EA%B2%8C-%ED%91%9C%ED%98%84%ED%95%98%EC%A7%80-%EB%AA%BB%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0","aria-label":"01을 올바르게 표현하지 못하는 이유 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"0.1을 올바르게 표현하지 못하는 이유"),"\n",a.createElement(n.p,null,"컴퓨터는 binary로 표현되는 세상이다. 정수 부분을 2진수로 변환하는 과정은 쉬웠다."),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"15 = 1 * 2^3^ + 1 * 2^2^ + 1*  2^1^ + 1 * 2^0^ = 1111 (2)"),"\n"),"\n",a.createElement(n.p,null,"하지만 소수점 아래의 숫자 (실수부)를 2진수로 변환하는 것은 쉽지 않다. 2의 마이너스 승의 덧셈 조합으로 소수점의 값을 도출해내야 하는데, 모든 경우의 수를 표현하는 것이 불가능하기 때문이다."),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"예를들어, 0.625 라는 숫자는 2진수로 깔끔하게 표현할 수 있다.","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"1 * 2^-1^ + 0 * 2^-2^ + 1* 2^-3^ = 1 * 0.5 + 0 * 0.25 + 1 * 0.125","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"0.101 (2)"),"\n"),"\n"),"\n"),"\n"),"\n",a.createElement(n.li,null,"하지만, 0.1이라는 숫자는 2진수로 깔끔하게 표기할 수 없다.","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"값이 올바르게 나누어 떨어지지 않고, ",a.createElement(n.code,null,"0.0001100110011···"),"을 반복하는 현상이 나타난다."),"\n"),"\n"),"\n"),"\n",a.createElement(n.p,null,"이러한 소수들을 ",a.createElement(n.strong,null,"무한소수"),"라고 한다."),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"소수의 끝이 5가 아닌 수를 2진수로 표현하고자 할 경우 무한 소수가 발생한다고 보면 된다."),"\n"),"\n",a.createElement(n.p,null,"무한소수는 소수부의 표현 범위가 더 넓은 부동소수점 표현 방식으로도 감당할 수 없다. 아울러 이는 프로그래밍 언어에 귀속되는 특성이 아니라, 컴퓨터가 소수를 표현하는 메커니즘에서 오는 문제점이기에 모든 프로그래밍 언어는 실수 표현에 애로사항이 있다."),"\n",a.createElement(n.h5,{id:"이러한-실수-연산의-오차를-해결하려면",style:{position:"relative"}},a.createElement(n.a,{href:"#%EC%9D%B4%EB%9F%AC%ED%95%9C-%EC%8B%A4%EC%88%98-%EC%97%B0%EC%82%B0%EC%9D%98-%EC%98%A4%EC%B0%A8%EB%A5%BC-%ED%95%B4%EA%B2%B0%ED%95%98%EB%A0%A4%EB%A9%B4","aria-label":"이러한 실수 연산의 오차를 해결하려면 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"이러한 실수 연산의 오차를 해결하려면?"),"\n",a.createElement(n.p,null,"소수를 정수형 타입으로 치환하고 사용하거나, 실수 표기를 위한 클래스를 활용하면 된다. Java의 경우 ",a.createElement(n.code,null,"BigDecimal"),"이 있다."))}var c=function(e={}){const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(i,e)):i(e)},r=t(5670),E=t(1326),s=t(4517),m=t(698),o=t(8627),d=t(662),u=t(1873);const h=({data:e,children:n,serverData:t})=>{const{prevPost:l,nextPost:i}=e,c={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return a.createElement(m.Z,{data:e},a.createElement(r.Z,null,a.createElement(s.Z,c),a.createElement(E.Z,null,n),a.createElement(d.Z,{prev:l,next:i}),a.createElement(o.Z)))};function g(e){return a.createElement(h,e,a.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-컴퓨터구조-컴퓨터가-실수를-표현하는방법-md-71b2ee79529570633ec3.js.map