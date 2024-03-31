"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[9411],{6825:function(e,n,t){t.r(n),t.d(n,{Head:function(){return d.py},default:function(){return f}});var a=t(1151),l=t(7294);function r(e){const n=Object.assign({p:"p",strong:"strong",pre:"pre",code:"code",h2:"h2",a:"a",div:"div",blockquote:"blockquote",ol:"ol",li:"li",ul:"ul",em:"em"},(0,a.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(n.p,null,"Go의 ",l.createElement(n.strong,null,"Array"),"는 동일한 자료형을 저장하는 순서를 가진 (sequence) 크기가 ’",l.createElement(n.strong,null,"고정"),"‘된, 정말 기본적인 배열을 말한다. 즉, ",l.createElement("u",null,"static array"),"이다. Array는 물리적으로 연속적인 공간에 저장되므로, 각 element를 iterate할 때 cache hit을 달성할 확률이 높다."),"\n",l.createElement(n.p,null,"Array를 선언하는 방법은 다음과 같다."),"\n",l.createElement(n.pre,null,l.createElement(n.code,{className:"language-go"},"var a [5]int // int type의 element 5개를 저장할 수 있다. 64bit * 5 만큼의 메모리를 차지하겠지? \nb := [5]int{ 1, 2, 3, 4, 5} // initialize while declaring \n")),"\n",l.createElement(n.h2,{id:"slice-dynamic-array",style:{position:"relative"}},l.createElement(n.a,{href:"#slice-dynamic-array","aria-label":"slice dynamic array permalink",className:"header-links before"},l.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Slice: Dynamic Array"),"\n",l.createElement(n.p,null,"크기가 고정된 static array는 그다지 좋지 못한 developer experience를 제공한다. 이를 위해 Go는 ",l.createElement(n.strong,null,"Slice"),"라는 dynamic array를 제공한다. Slice는 ",l.createElement(n.strong,null,"array를 기반으로 구현된 가변길이 Array"),"이다."),"\n",l.createElement(n.blockquote,null,"\n",l.createElement(n.p,null,"Go 개발의 99%는 기본 Array보다는 Slice를 활용할 것이다."),"\n"),"\n",l.createElement(n.p,null,"Slice는 내부적으로 3가지 주요 구성 요소를 가지고 있다."),"\n",l.createElement(n.ol,null,"\n",l.createElement(n.li,null,"pointer","\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"Slice의 첫번째 element의 위치를 가리키는 pointer. Slice가 reference하는 내부 Array의 시작점을 나타낸다."),"\n"),"\n"),"\n",l.createElement(n.li,null,"Length","\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"Slice가 현재 ‘저장하고 있는’ element의 수. ",l.createElement(n.code,null,"len()")," 함수를 통해 얻을 수 있다."),"\n"),"\n"),"\n",l.createElement(n.li,null,"Capacity","\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"Slice가 의존하고 있는 ‘내부 Array의 고정된 길이’를 나타낸다. ",l.createElement(n.code,null,"cap()")," 함수를 통해 얻을 수 있다."),"\n"),"\n"),"\n"),"\n",l.createElement(n.p,null,"Capacity가 있는 것을 보면 알 수 있듯이, Slice는 Array를 기반으로 구현된 여느 다른 Dynamic Array들과 동일한 메커니즘을 가지고 있다. 예컨데, Java의 ArrayList와 동일하다."),"\n",l.createElement(n.p,null,"현재 Slice의 length가 capacity를 초과하지 않을 경우, 새 element는 내부 array에 추가된다. 반면 length가 capacity를 초과할 경우, Go runtime은 보다 큰 capacity를 가진 Array를 pre-allocate한 후 기존 Array의 element를 새 Array로 복사한다. 그리고 기존 Array의 Pointer를 새 Array의 Pointer로 업데이트한다. 이와 같은 방식으로 Dynamic Array를 구현한다."),"\n",l.createElement(n.p,null,"Slice는 다음과 같이 빈 square bracket으로 선언할 수 있다."),"\n",l.createElement(n.pre,null,l.createElement(n.code,{className:"language-go"},"var sliceExample []string\n")),"\n",l.createElement(n.p,null,"주의할 점은, slice와 array는 서로 다른 자료형이라는 것이다. 강타입인 Go는 이 둘을 엄격하게 구분하기 때문에 만약 function signature가 slice의 return 타입을 가진다면 array를 반환할 경우 Type Error가 발생한다."),"\n",l.createElement(n.pre,null,l.createElement(n.code,{className:"language-go"},"func getArrReturnSlice(arrays [3]int) []int {\n  return arrays // Type Error! Slice를 반환해야하는데 고정길이인 array를 반환함.\n}\n")),"\n",l.createElement(n.h2,{id:"tricky-slices-slice의-동작을-살펴보자",style:{position:"relative"}},l.createElement(n.a,{href:"#tricky-slices-slice%EC%9D%98-%EB%8F%99%EC%9E%91%EC%9D%84-%EC%82%B4%ED%8E%B4%EB%B3%B4%EC%9E%90","aria-label":"tricky slices slice의 동작을 살펴보자 permalink",className:"header-links before"},l.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Tricky Slices: Slice의 동작을 살펴보자"),"\n",l.createElement(n.p,null,l.createElement(n.code,null,"append()")," function을 활용해서 Slice의 under the hood를 살펴보자."),"\n",l.createElement(n.pre,null,l.createElement(n.code,{className:"language-go"},'a := make([]int, 3)\nfmt.Println("len of a:", len(a))\n// len of a: 3 \nfmt.Println("cap of a:", cap(a))\n// cap of a: 3\nfmt.Println("appending 4 to b from a")\n// appending 4 to b from a\nb := append(a, 4)\nfmt.Println("b:", b)\n// b: [0 0 0 4]\nfmt.Println("addr of b:", &b[0])\n// addr of b: 0x44a0c0\nfmt.Println("appending 5 to c from a")\n// appending 5 to c from a\nc := append(a, 5)\nfmt.Println("addr of c:", &c[0])\n// addr of c: 0x44a180\nfmt.Println("a:", a)\n// a: [0 0 0]\nfmt.Println("b:", b)\n// b: [0 0 0 4]\nfmt.Println("c:", c)\n// c: [0 0 0 5]\n')),"\n",l.createElement(n.p,null,"a, b, c가 모두 기대와 같이 동작한 이유는, b와 c에게 walrus operator로 배열을 할당하는 시점에, a의 slice의 capacity를 넘어섰기 때문에 배열이 새로 할당되었으며, 새로 할당된 배열의 첫번째 요소를 가리키는 pointer가 반환되었기 때문이다."),"\n",l.createElement(n.p,null,"기대와 같이 동작하지 않는 예시를 살펴보자:"),"\n",l.createElement(n.pre,null,l.createElement(n.code,{className:"language-go"},'i := make([]int, 3, 8)\nfmt.Println("len of i:", len(i))\n// len of i: 3\nfmt.Println("cap of i:", cap(i))\n// cap of i: 8\nfmt.Println("appending 4 to j from i")\n// appending 4 to j from i\nj := append(i, 4)\nfmt.Println("j:", j)\n// j: [0 0 0 4]\nfmt.Println("addr of j:", &j[0])\n// addr of j: 0x454000\nfmt.Println("appending 5 to g from i")\n// appending 5 to g from i\ng := append(i, 5)\nfmt.Println("addr of g:", &g[0])\n// addr of g: 0x454000\nfmt.Println("i:", i)\n// i: [0 0 0]\nfmt.Println("j:", j)\n// j: [0 0 0 5]\nfmt.Println("g:", g)\n// g: [0 0 0 5]\n')),"\n",l.createElement(n.p,null,"b와 c는 모두 동일한 addr을 공유하기 때문에."),"\n",l.createElement(n.h2,{id:"variadic-funciton과-spread-operator",style:{position:"relative"}},l.createElement(n.a,{href:"#variadic-funciton%EA%B3%BC-spread-operator","aria-label":"variadic funciton과 spread operator permalink",className:"header-links before"},l.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Variadic Funciton과 Spread Operator"),"\n",l.createElement(n.p,null,"Variadic Function은 argument의 개수가 정해지지 않은 함수를 말한다. 즉, 가변길이의 argument를 받아들일 수 있다. Go의 variadic function은 ",l.createElement(n.code,null,"...")," operator를 사용해 정의한다."),"\n",l.createElement(n.p,null,"variadic function 내부에서 spread operator로 전달받은 argument는 해당 타입의 Slice로 처리된다."),"\n",l.createElement(n.pre,null,l.createElement(n.code,{className:"language-go"},"func sum(nums ...int) int {\n  total := 0\n  for _, num := range nums {\n    total += num\n  }\n  return total\n}\n\n\nfmt.Println(sum(1, 2))\t\t \t// 3\nfmt.Println(sum(1, 2, 3, 4)) // 10\n")),"\n",l.createElement(n.p,null,"variadic operator가 이용되는 대표적인 예시는 바로 ",l.createElement(n.code,null,"fmt")," 패키지의 ",l.createElement(n.code,null,"Println()")," 함수이다."),"\n",l.createElement(n.pre,null,l.createElement(n.code,{className:"language-go"},"func Println(a ...interface{}) (n int, err error) \n")),"\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"아무것도 구현하지 않은 interface, 즉 모든 값을 가변길이로 수용하는 print문을 볼 수 있다."),"\n"),"\n",l.createElement(n.p,null,"spread operator는 ",l.createElement(n.code,null,"...")," 으로 표현하며, 배열이나 객체와 같은 ",l.createElement(n.em,null,"iterable"),"한 element를 개별 element로 확장할 때 이용된다. Javascript를 이용한 개발자라면 매우 익숙할 것이다."),"\n",l.createElement(n.pre,null,l.createElement(n.code,{className:"language-go"},"nums := []int { 1, 2, 3, 4, 5 }\nfmt.Println(sum(...nums)) // 개별 인자로 전달한다.\n")))}var c=function(e={}){const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?l.createElement(n,e,l.createElement(r,e)):r(e)},i=t(5670),m=t(1326),o=t(4517),u=t(698),p=t(8627),s=t(662),d=t(1873);const E=({data:e,children:n,serverData:t})=>{const{prevPost:a,nextPost:r}=e,c={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return l.createElement(u.Z,{data:e},l.createElement(i.Z,null,l.createElement(o.Z,c),l.createElement(m.Z,null,n),l.createElement(s.Z,{prev:a,next:r}),l.createElement(p.Z)))};function f(e){return l.createElement(E,e,l.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-go-lang-go-array-and-slices-md-73e6ccd862c5d1993b5b.js.map