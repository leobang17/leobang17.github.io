"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[9675],{1407:function(e,n,l){l.r(n),l.d(n,{Head:function(){return E.py},default:function(){return d}});var t=l(1151),a=l(7294);function c(e){const n=Object.assign({p:"p",h2:"h2",a:"a",div:"div",strong:"strong",ul:"ul",li:"li",code:"code",em:"em",pre:"pre",blockquote:"blockquote",h4:"h4"},(0,t.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"Go의 변수는 Go 프로세스의 어느 memory section에 저장될 것인가? programming context에서의 memory allocation에 대해서 먼저 알아보자."),"\n",a.createElement(n.h2,{id:"stack과-heap",style:{position:"relative"}},a.createElement(n.a,{href:"#stack%EA%B3%BC-heap","aria-label":"stack과 heap permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Stack과 Heap"),"\n",a.createElement(n.p,null,"운영체제 시간에 배웠던 그림이 또 나올 시간이다. stack은 thread끼리 공유하고, heap은 프로세스 레벨에서 공유하고··· 등등.! 간단히 복습해보자."),"\n",a.createElement(n.p,null,a.createElement(n.strong,null,"Stack")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"Stack은 thread끼리 (golang의 경우 lightweight thread인 goroutine이 되겠다.) 독립적인 공간을 보장받는 메모리 영역이다."),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"stack은 ",a.createElement(n.code,null,"stack frame"),"이라는 블록 형태가 LIFO style로 쌓여있는 모습인데, Stack 영역과 관련된 layout은 ",a.createElement(n.strong,null,"프로그램이 compile되는 시점"),"에 결정된다. 물론 stack memory 영역에 ",a.createElement(n.strong,null,"allocate 되는 것은 runtime"),"에 수행된다."),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"함수가 return할 경우 stack frame 블록은 메모리 영역에서 해제되어 ",a.createElement(n.em,null,"unused")," 상태가 되고, 다음 호출될 시점을 기다리게 된다."),"\n"),"\n"),"\n",a.createElement(n.p,null,a.createElement(n.strong,null,"Heap")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"heap은 stack과 달리 reserved되는 방식에 순서가 존재하지 않는다. 따라서 heap allocation은 프로그램에 의해 manual하게 수행되어야 한다. (개발자가 할 필요는 없다. 각 언어의 runtime이 GC를 지원하는 경우가 대부분이기 때문에.)"),"\n",a.createElement(n.li,null,"heap memory allocation은 ",a.createElement(n.strong,null,"run time"),"에 수행된다."),"\n"),"\n",a.createElement(n.p,null,"당연히 ",a.createElement(n.strong,null,"Stack 메모리 영역이 더 성능이 좋다"),". 메모리 공간이 항상 contiguous하기 때문이다. (물리적으로는 아닐지라도, 적어도 virtual memory 매핑된 상태에서는) LIFO 형태로 관리되기 때문에 각 stack frame의 메모리 할당, 해제에 대해서 골머리 썩일 일도 없다. head stack frame에 pointer만 유지하면 되기 때문이다. 특히 Stack의 allocation/deallocation은 ",a.createElement(n.em,null,"CPU 명령어 2개"),"로 끝난다."),"\n",a.createElement(n.p,null,"Heap의 경우엔 언어의 runtime의 memory allocation/deallocation에 대한 오버헤드가 발생한다. 해당 언어가 GC를 지원한다면 runtime의 오버헤드만 발생하겠지만, 개발자가 manual하게 메모리 관리를 해줘야 하는 언어라면 잘못 코딩할 경우 오버헤드보다 끔찍한 메모리 누수가 일어날 것이다."),"\n",a.createElement(n.h2,{id:"what-is-escape-analysis",style:{position:"relative"}},a.createElement(n.a,{href:"#what-is-escape-analysis","aria-label":"what is escape analysis permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"What is Escape Analysis"),"\n",a.createElement(n.p,null,"Go에서는 다른 programming language처럼 변수가 stack 메모리 혹은 heap 메모리에 위치할 수 있다. 위에서 말했다시피 stack allocation이 heap allocation 보다 빠르고 효율적이기 때문에, 변수를 메모리 어느 영역에 할당할 것인가는 퍼포먼스에 영향을 미치는 의사결정이다."),"\n",a.createElement(n.p,null,"Go는 ",a.createElement(n.strong,null,"Escape Analysis"),"를 통해 compile time에 ",a.createElement(n.em,null,"각 변수가 함수를 escape하는지")," 판단하여 해당 변수를 stack 영역에 할당할지, heap 영역에 할당할지를 결정한다."),"\n",a.createElement(n.p,null,"메커니즘은 단순하다. escape한다고 판단한다면 heap 영역에, escape하지 않는다고 판단하면 stack 영역에 할당하게 된다."),"\n",a.createElement(n.p,null,"물론 Case by Case를 따지자면 끝도 없겠지만 일반적으로 escape하는 상황은 메모리에서 stack이 어떻게 관리되는지를 생각해보면 직관적으로 유추할 수 있다. ",a.createElement(n.em,null,"변수가 함수 범위를 벗어나 다른 곳에서 참조될 수 있다면"),", 해당 변수는 escape한다고 판단한다. 반대로 ",a.createElement(n.em,null,"변수가 함수 내에서만 존재하고 함수의 실행이 끝남과 동시에 더 이상 필요하지 않다면"),", escape하지 않는다고 판단한다."),"\n",a.createElement(n.p,null,"가장 일반적인 상황들을 나열하자면 다음과 같겠다:"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"함수가 pointer를 반환하는 경우 (stack frame이 pop되었음에도 해당 변수에 참조해야한다. escape!)"),"\n",a.createElement(n.li,null,"closure를 이용하는 경우 (closure 함수가 참조하는 변수는 이미 반환된 함수 레벨에서 선언되어있다. escape)"),"\n"),"\n",a.createElement(n.p,null,"코드의 예시로 확인해보자."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-go"},"func printInt(x int) {\n fmt.Println(x)\n}\n\nfunc main() {\n x := 42\n printInt(x)\n}\n")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,a.createElement(n.code,null,"main")," 함수는 ",a.createElement(n.code,null,"printInt"),"함수를 호출하는데, 이 때 argument를 pass by value로 전달한다. 이 경우 ",a.createElement(n.code,null,"x"),"은 stack 영역을 벗어나지 않는다."),"\n"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-go"},"func main() {\n  n := answer()\n  fmt.Println\n}\n\nfunc answer() *int {\n  x := 42\n  return &x\n}\n")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,a.createElement(n.code,null,"answer"),"의 function level에서 선언된 변수인 x가, pointer를 반환함으로서 ",a.createElement(n.code,null,"answer"),"가 return되어 stack에서 제거된 후에도 ",a.createElement(n.code,null,"main")," 함수에 의해 참조되고 있다. 이 경우 명백한 escape."),"\n"),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"아래에 설명하겠지만, 사실 위의 ",a.createElement(n.em,null,"예시는 변수를 모두 escape한다고 판단"),"한다. ",a.createElement(n.strong,null,"print로 출력하는 행위에 전달된 변수는 escape"),"한다고 Go compiler가 판단하기 때문이다. 그러니 너무 엄밀히 생각하지말고, 출력이 아니라 다른 일반적인 예시를 생각한다고 치자."),"\n"),"\n",a.createElement(n.h4,{id:"pass-by-reference-혹은-pointer를-사용하면-모두-escape하는가",style:{position:"relative"}},a.createElement(n.a,{href:"#pass-by-reference-%ED%98%B9%EC%9D%80-pointer%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%A9%B4-%EB%AA%A8%EB%91%90-escape%ED%95%98%EB%8A%94%EA%B0%80","aria-label":"pass by reference 혹은 pointer를 사용하면 모두 escape하는가 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Pass by Reference, 혹은 pointer를 사용하면 모두 escape하는가?"),"\n",a.createElement(n.p,null,"답은 아니오입니다."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-go"},"func main() {\n\tk := &[]int { 1, 2, 3}\n\tprintLns(k)\n}\n\nfunc justsum(x *[]int) {\n\tsum := 0\n\tfor _, e := range *x {\n\t\tsum += e \n\t}\n}\n")),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"main")," 함수는 slices를 생성하고 해당 slices의 pointer를 반환한다. 그냥 slice를 전달해도 pass by reference이지만, 일부러 pointer 타입을 전달해봤다."),"\n",a.createElement(n.p,null,"slice ",a.createElement(n.code,null,"k")," 가 ",a.createElement(n.code,null,"justsum"),"함수에게 reference로 전달되어 뭔가 ",a.createElement(n.em,null,"escape"),"하는 것 같지만, ",a.createElement(n.code,null,"justsum"),"함수가 stack 메모리에 올라오고, 해제되는 모든 lifecycle 동안에도 ",a.createElement(n.code,null,"k"),"가 참조되는 원래 공간인 ",a.createElement(n.code,null,"main")," 함수의 stack frame은 stack memory위에 올라와 있는 상태이기 때문에 Go compilier는 해당 상황을 escape하지 않는다고 판단한다."),"\n",a.createElement(n.h2,{id:"직접-눈으로-확인해보자",style:{position:"relative"}},a.createElement(n.a,{href:"#%EC%A7%81%EC%A0%91-%EB%88%88%EC%9C%BC%EB%A1%9C-%ED%99%95%EC%9D%B8%ED%95%B4%EB%B3%B4%EC%9E%90","aria-label":"직접 눈으로 확인해보자 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"직접 눈으로 확인해보자"),"\n",a.createElement(n.p,null,"go build 커맨드의 gcflag를 -m으로 설정함으로서 Go compiler가 각 변수를 escape한다고 판단하는지를 눈으로 확인할 수 있다."),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"go build -gcflags='-m'\n")),"\n",a.createElement(n.p,null,"![image-20240405182911284](/Users/leobang/Library/Application Support/typora-user-images/image-20240405182911284.png)"),"\n",a.createElement(n.p,null,"Go 컴파일러가 각 line을 확인하며 변수가 escape하는 경우가 있는지 판단한다."),"\n",a.createElement(n.p,null,"정확히 왜 인지는 Println 메서드를 까봐야 알 것 같지만, 아무튼 ",a.createElement("u",null,"출력 함수에 인자를 넘길 경우 항상 escape 한다고 판단"),"한다. 아까 말했듯이, Go Compiler는 변수가 전달되는 경로를 모두 확인하고, 해당 변수가 한 번이라도 escaping하는 경우가 있다고 판단하면 해당 변수를 heap으로 escape 시킨다."),"\n",a.createElement(n.p,null,"따라서 어디선가 print문을 실행하고 있다면, stack allocation만으로도 충분한 변수가 heap에 할당되고 있을 수도 있다··· 주의할 것"))}var r=function(e={}){const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?a.createElement(n,e,a.createElement(c,e)):c(e)},m=l(5670),s=l(1326),i=l(4517),u=l(698),o=l(8627),p=l(662),E=l(1873);const h=({data:e,children:n,serverData:l})=>{const{prevPost:t,nextPost:c}=e,r={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return a.createElement(u.Z,{data:e},a.createElement(m.Z,null,a.createElement(i.Z,r),a.createElement(s.Z,null,n),a.createElement(p.Z,{prev:t,next:c}),a.createElement(o.Z)))};function d(e){return a.createElement(h,e,a.createElement(r,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-go-lang-go-memory-allocation-md-a23677f6a0cd4f240b5c.js.map