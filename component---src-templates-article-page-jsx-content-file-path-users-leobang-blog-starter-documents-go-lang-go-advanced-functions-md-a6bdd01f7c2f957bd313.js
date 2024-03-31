"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[7403],{4535:function(e,n,t){t.r(n),t.d(n,{Head:function(){return g.py},default:function(){return h}});var l=t(1151),r=t(7294);function c(e){const n=Object.assign({h2:"h2",a:"a",div:"div",p:"p",strong:"strong",ol:"ol",li:"li",pre:"pre",code:"code",ul:"ul"},(0,l.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.h2,{id:"first-class-function",style:{position:"relative"}},r.createElement(n.a,{href:"#first-class-function","aria-label":"first class function permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"First-Class Function"),"\n",r.createElement(n.p,null,"first-class function은 함수를 ",r.createElement(n.strong,null,"first-class citizen"),"으로 취급하는 개념이다."),"\n",r.createElement(n.p,null,"first-class citizen(일급 객체)란 해당 언어의 기능 중에서 모든 연산에 사용될 수 있고, 다른 객체와 동일하게 취급되는 객체를 말한다. 어렵게 설명했지만 first-class citizen은 우리가 일반적으로 programming language에서 이용하는 객체를 생각하면 된다. first-class citizen의 특징을 나열하면 다음과 같다:"),"\n",r.createElement(n.ol,null,"\n",r.createElement(n.li,null,"변수에 할당할 수 있다"),"\n",r.createElement(n.li,null,"function의 argument로 전달할 수 있다."),"\n",r.createElement(n.li,null,"function의 return 값으로 사용될 수 있다."),"\n",r.createElement(n.li,null,"dynamic하게 생성할 수 있다: runtime에 동적으로 생성할 수 있다."),"\n"),"\n",r.createElement(n.p,null,"따라서, fist-class function이란건 별거 없이 그냥, 함수를 다른 객체와 동일하게 변수에 할당하고, 다른 함수의 argument로 전달하고, return 값으로 반환하고 동적으로 생성될 수 있는 특징을 가졌다는 말이다. Javascript와 같은 언어를 했다면 익숙한 개념일 것이다."),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-go"},"// 변수에 할당\nvar add = func(a int, b int) int {\n  return a + b\n}\n\nadd(2, 3)\n\n// 함수의 인자로 전달 \nfunc addAll(add func(int, int) int, args ...int) iny {\n  count = 0\n  for _, elem := range args {\n    count = add(count, elem)\n  }\n  return count\n}\n")),"\n",r.createElement(n.h2,{id:"higher-order-function",style:{position:"relative"}},r.createElement(n.a,{href:"#higher-order-function","aria-label":"higher order function permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Higher-Order Function"),"\n",r.createElement(n.p,null,"Higher-Order function은 함수를 argument로 받거나, 함수를 return 으로 반환하는 함수를 말한다. 역시 Go에서 fucntion을 first-class citizen으로 취급하기 때문에 HOF를 표현할 수 있다."),"\n",r.createElement(n.p,null,"대표젹인 함수형 프로그래밍인 Javascript의 ",r.createElement(n.code,null,"Array.map")," function을 Go로 구현해보자:"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-go"},"func mapFunc(slice []int, fn func(int) int) []int {\n  var result [] int\n  for _, val := range slice {\n    result = append(result, fn(value))\n  }\n  return result\n}\n\ndoubled := mapFunc([]int { 1, 2, 3 }, func(i int) int {\n  return i * 2\n})\n// doubled = [2, 3, 5]\n")),"\n",r.createElement(n.h2,{id:"anonymous-functions",style:{position:"relative"}},r.createElement(n.a,{href:"#anonymous-functions","aria-label":"anonymous functions permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Anonymous Functions"),"\n",r.createElement(n.p,null,"이름없이 선언되고 실행될 수 있는 함수이다. 함수를 변수에 할당하거나, 다른 함수에 인자로 전달하거나, closure를 생성하는데에도 다양하게 이용될 수 있다."),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-go"},"// function value를 변수에 할당\nsum := func(a, b int) int {\n  return a + b\n}\nfmt.Println(sum(5, 3))\n")),"\n",r.createElement(n.h2,{id:"closures",style:{position:"relative"}},r.createElement(n.a,{href:"#closures","aria-label":"closures permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Closures"),"\n",r.createElement(n.p,null,"closure는 function scope 바깥에서 선언된 variable을 referencing하는 function value를 말한다. 이러한 관점에서 closure는 해당 variable에게 “bound”되었다고 말한다. Javascript 개발자라면 closure에 보다 익숙하겠지만, 일단 말보다는 Go 코드로 확인해보자:"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-go"},'func concatter() func(string) string {\n  doc := ""\t// closure function의 scope 바깥에 선언되었다. \n  return func(word string) string {\t\n    doc += word + " "\t// closure function. scope 바깥의 변수를 참조하고 있다.\n    return doc\n  }\n}\n\nfunc main() {\n  strAggregator := concatter()\n  strAggregator("A")\n  strAggregator("B")\n  strAggregator("C")\n  strAggregator("D")\n  res := strAggregator("E")\n  fmt.Println(res) // "ABCDE"\n}\n')),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"doc은 closure function의 scope 바깥에 선언되었다."),"\n",r.createElement(n.li,null,"concatter의 scope안에 선언된 ",r.createElement(n.code,null,"doc")," 변수이므로 원래는 ",r.createElement(n.code,null,"concatter()")," 호출의 return과 함께 (callstack에서 사라질 때) Go runtime에 의해 해제되어야 하지만, closure function에 의해 referencing되고 있으므로 closure function이 정리될 때까지 계속해서 메모리 공간에 남아있게된다."),"\n"),"\n",r.createElement(n.p,null,"Closure의 원리에 대해 좀 더 설명해보자면, 대부분의 현대 programming language가 채택한 scoping 컨셉인 ",r.createElement("u",null,"lexical scope 혹은 static scope"),"의 개념을 알아야 한다. 사실 Go의 공식문서에서 scoping 메커니즘에 lexical scope라고 명시하진 않았지만, Go의 execution context는 Javascript의 그 것과 비슷한 개념을 가지고 있다."),"\n",r.createElement(n.p,null,"Lexical scope 메커니즘에서는 함수가 참조할 수 있는 범위(scope)가 그 ",r.createElement(n.strong,null,"함수가 선언된 시점"),"에 결정된다. Go에서 함수는 자신이 정의된 function body 바깥의 변수에 접근할 수 있는데, 이 때 해당 변수들은 closure에 의해 “캡처”된다. 이러한 capture 메커니즘은 함수가 변수와 함께 closure라는 execution context를 형성한다."),"\n",r.createElement(n.p,null,"Garbage Collection은 closure execution context에 의해 참조되는 변수에 대해서 특별한 memory management를 지원한다. 함수가 반환되어 callstack에서 빠져나가도, closure에 의해 참조되는 변수는 메모리에서 해제되지 않고 계속 유지된다."),"\n",r.createElement(n.p,null,"여기까지는 일반적인 lexical scope와 closure의 개념을 설명한 것이다. 주로 Javascript의 실행 컨텍스트를 참고했다. Golang에서 closure란 함수 그 자체를 지칭할 때 이용되는 듯 하다. 하지만 Go에서 역시 개념 자체는 비슷하다. 그렇기에 위 예시의 ",r.createElement(n.code,null,"strAggregator"),"는 ",r.createElement(n.code,null,"concatter()")," 호출시에 결정된 lexical scope에 따라, 그 만의 ",r.createElement(n.code,null,"doc")," 변수를 closure의 바깥이지만 계속해서 참조할 수 있는 것이다."))}var a=function(e={}){const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?r.createElement(n,e,r.createElement(c,e)):c(e)},o=t(5670),i=t(1326),s=t(4517),u=t(698),m=t(8627),d=t(662),g=t(1873);const f=({data:e,children:n,serverData:t})=>{const{prevPost:l,nextPost:c}=e,a={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return r.createElement(u.Z,{data:e},r.createElement(o.Z,null,r.createElement(s.Z,a),r.createElement(i.Z,null,n),r.createElement(d.Z,{prev:l,next:c}),r.createElement(m.Z)))};function h(e){return r.createElement(f,e,r.createElement(a,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-go-lang-go-advanced-functions-md-a6bdd01f7c2f957bd313.js.map