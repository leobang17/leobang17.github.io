"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[8495],{7441:function(e,t,l){l.r(t),l.d(t,{Head:function(){return E.py},default:function(){return h}});var n=l(1151),r=l(7294);function a(e){const t=Object.assign({blockquote:"blockquote",p:"p",h2:"h2",a:"a",div:"div",strong:"strong",em:"em",ol:"ol",li:"li",code:"code",pre:"pre",h4:"h4",ul:"ul"},(0,n.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(t.blockquote,null,"\n",r.createElement(t.p,null,"Node가 아니라 Javascript에 대한 내용이지만 어쨌든…"),"\n"),"\n",r.createElement(t.p,null,"Javascript에는 다양한 data type이 있는데, 이를 크게 Primitive Type과 Reference Type으로 구분 지을 수 있다."),"\n",r.createElement(t.h2,{id:"primitive-type--immutable",style:{position:"relative"}},r.createElement(t.a,{href:"#primitive-type--immutable","aria-label":"primitive type  immutable permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Primitive Type (= Immutable)"),"\n",r.createElement(t.p,null,"가장 기본적인 data type으로 ",r.createElement(t.strong,null,"immutable"),"한 값을 나타낸다. immutable이라는 것은 선언 및 할당하는 시점에 메모리의 크기가 결정되고, 이후에는 해당 값에 변동을 줄 수 없는 것을 뜻한다. (= 해당 변수의 메모리 크기가 변할 일이 없다.) primitive type의 데이터에 ",r.createElement(t.em,null,"무언가 변화를 주는 연산"),"을 수행하는 것은 사실 under the hood에서는:"),"\n",r.createElement(t.ol,null,"\n",r.createElement(t.li,null,"기존의 값을 삭제하고"),"\n",r.createElement(t.li,null,"새로운 메모리에 연산의 결과 값을 새로이 저장하는 행위의 일련이다."),"\n"),"\n",r.createElement(t.p,null,"Primitive type의 하나인 Number의 ",r.createElement(t.code,null,"+=")," 연산을 address의 예시를 확인해보자. Javascript에는 변수의 메모리 address를 반환하는 ",r.createElement(t.code,null,"&")," 연산자가 없어 직접 확인할 수는 없지만, 다음과 같을 것이다."),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-javascript"},"// Javascript에서도 메모리 refernce 연산자가 가능하다고 가정해보자.\nlet a = 1;\nconsole.log(&a); // 0X7FFF\na += 1;\nconsole.log(&a); // 0X3A32 >> 메모리 주소가 변경되었다! 아예 기존 메모리를 해제하고 새로운 값을 재할당해버리는 것.\n")),"\n",r.createElement(t.p,null,"Primitive Type이 값 그자체로서 immutable하기 때문에 가지는 특성 중 하나는 ",r.createElement(t.strong,null,"Stack Memory 영역에 저장"),"된다는 점이다. 생각해보면 너무나 당연한게, primitive type은 값 그 자체로서 동작하기 때문에 ",r.createElement(t.em,null,"다른 scope에게 건네질 때 pass by value에 의해 값 자체를 복사해서 전달"),"하게 된다. 값의 참조를 공유할 일이 전혀 없고 모든 값은 해당 함수의 block안에서만 참조되며 해당 stack frame이 해제될 경우 더 이상 쓰일 일이 없다."),"\n",r.createElement(t.p,null,"Primitive Type의 종류에는 다음과 같은 기본적인 자료형이 해당된다."),"\n",r.createElement(t.h4,{id:"number",style:{position:"relative"}},r.createElement(t.a,{href:"#number","aria-label":"number permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"number"),"\n",r.createElement(t.p,null,"Javascript의 Number 타입은 특이하게, ",r.createElement(t.strong,null,"모든 종류의 숫자를 포함하는 타입"),"이다. Javascipt에는 다른 언어처럼 ",r.createElement(t.code,null,"int")," 타입과 ",r.createElement(t.code,null,"float")," 혹은 ",r.createElement(t.code,null,"double")," 타입을 구분하지 않는다. 대신 모든 숫자 종류의 자료를 ",r.createElement(t.em,null,"IEEE 754 표준의 Double Precision")," 방식으로 표현하는 ",r.createElement(t.code,null,"number")," 타입으로 포괄한다."),"\n",r.createElement(t.p,null,"Double Precision이 64bit를 이용해 부동소수점 방식으로 실수를 표현하므로, Javascript에서 기본 number type으로는 다음과 같은 범위 및 정밀도를 가진다."),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-javascript"},"console.log(Number.MAX_VALUE);\t// 1.7976931348623157 * 10^308\nconsole.log(Number.MIN_VALUE);\t// 5 * 10^-324\n")),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"최대 크기를 넘어서는 값에 대해서는 ",r.createElement(t.code,null,"Infinity"),"로"),"\n",r.createElement(t.li,null,"최소 크기보다 작은 값에 대해서는 ",r.createElement(t.code,null,"0"),"으로 처리된다."),"\n"),"\n",r.createElement(t.p,null,"아무래도 모든 숫자 타입을 부동소수점으로 표현하다보니 ",r.createElement(t.em,null,"부동소수점의 단점")," 역시 그대로 가져온다."),"\n",r.createElement(t.ol,null,"\n",r.createElement(t.li,null,"\n",r.createElement(t.p,null,"부동소수점 방식은 소수점을 binary로 평가하므로 소수점 아래 연산에서 예상치 못한 결과를 초래할 수 있다. 대표적으로 ",r.createElement(t.code,null,"0.1 + 0.2 != 0.3")," 이라던가···"),"\n"),"\n",r.createElement(t.li,null,"\n",r.createElement(t.p,null,"정밀도에 한계가 존재한다. Javascript의 경우엔 실제 표현 가능한 정수 범위외에도, ",r.createElement(t.em,null,"안전한 정수 범위"),"가 존재한다. ",r.createElement(t.code,null,"Number.Max_Safe_INTEGER"),"와 ",r.createElement(t.code,null,"Number.MIN_SAFE_INTEGER"),"의 범위를 벗어나는 경우 정밀도 손실이 일어날 수 있다. 대규모 정수를 정확하게 다뤄야할 경우엔 적합하지 않을 수 있다."),"\n"),"\n",r.createElement(t.li,null,"\n",r.createElement(t.p,null,"정수에도 부동소수점을 반영하다보니, 기타 언어의 정수타입 연산에 비해 비교적 느릴 수 있다. HW 수준에서 최적화된 정수 연산에 비해 부동소수점 방식은 추가적인 처리 시간이 필요하기 때문이다."),"\n"),"\n"),"\n",r.createElement(t.p,null,"물론 이러한 단점 대신, 모든 숫자 타입을 하나의 ",r.createElement(t.code,null,"number"),"로 퉁쳐서 개발할 수 있다는 점에서 개발자에게 굉장한 편의성을 가져오기도 한다."),"\n",r.createElement(t.h4,{id:"bigint",style:{position:"relative"}},r.createElement(t.a,{href:"#bigint","aria-label":"bigint permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"bigInt"),"\n",r.createElement(t.h4,{id:"string",style:{position:"relative"}},r.createElement(t.a,{href:"#string","aria-label":"string permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"string"),"\n",r.createElement(t.p,null,"텍스트 데이터를 저장하는 자료형. Primitive 자료형으로서 역시 immutable하기 때문에 내부의 개별 문자를 직접 변경할 수 없다. 개발자 입장에서 조작한다고 생각이 들 때에도, 사실은 내부에서 기존 문자열을 삭제하고 새 문자열을 생성하고 할당하는 일이 일어난다."),"\n",r.createElement(t.p,null,r.createElement(t.code,null,"string")," 타입은 Unicode 문자들의 sequence로 구성된다. Unicode의 버전중에서는 ",r.createElement(t.strong,null,"UTF-16 인코딩"),"을 따른다. UTF-16은 변동길이 인코딩 방식으로서 대부분의 문자(char)를 16bit (= 2byte)로 표현하고, 특수한 경우에만 2byte의 두 쌍으로 4byte로 표현한다."),"\n",r.createElement(t.p,null,r.createElement(t.em,null,"UTF-8에서는 한글은 3byte"),"를 할애하지만, *UTF-16에서는 ",r.createElement("u",null,"2byte"),"*로 표현할 수 있다. 따라서 다음의 ",r.createElement(t.code,null,"string")," 변수에는 선언/할당 시점에 10byte의 메모리가 할당된다:"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-javascript"},'const greetings = "안녕하세요"; // 2byte * 5 = 10byte\n')),"\n",r.createElement(t.h4,{id:"undefined",style:{position:"relative"}},r.createElement(t.a,{href:"#undefined","aria-label":"undefined permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"undefined"),"\n",r.createElement(t.h4,{id:"null",style:{position:"relative"}},r.createElement(t.a,{href:"#null","aria-label":"null permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"null"),"\n",r.createElement(t.h4,{id:"symbol",style:{position:"relative"}},r.createElement(t.a,{href:"#symbol","aria-label":"symbol permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"symbol"),"\n",r.createElement(t.h2,{id:"primitive-type은-불변값인데-어떻게-메서드를-가질까---wrapper-type",style:{position:"relative"}},r.createElement(t.a,{href:"#primitive-type%EC%9D%80-%EB%B6%88%EB%B3%80%EA%B0%92%EC%9D%B8%EB%8D%B0-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%A9%94%EC%84%9C%EB%93%9C%EB%A5%BC-%EA%B0%80%EC%A7%88%EA%B9%8C---wrapper-type","aria-label":"primitive type은 불변값인데 어떻게 메서드를 가질까   wrapper type permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Primitive Type은 불변값인데 어떻게 메서드를 가질까? - Wrapper Type"),"\n",r.createElement(t.p,null,"생각해보면 이상하다! Primitive Type은 값 그 자체로서 저장되며 불변하다. 그런데 우리는 ",r.createElement(t.code,null,"string")," 이나 ",r.createElement(t.code,null,"number")," 타입을 이용하며 ",r.createElement(t.code,null,".trim()")," 혹은 ",r.createElement(t.code,null,".toStirng()"),"과 같은 메서드를 호출한 적이있을 것이다."),"\n",r.createElement(t.p,null,"primitive type에 메서드가 있다는 건 뭔가 이상하다. 내부에 Key가 존재하는 Object 같잖아? 그런데 Object는 Reference Type이다···"),"\n",r.createElement(t.h4,{id:"javascript-엔진이-일시적으로-wrapper-type으로-wrapping-해준다",style:{position:"relative"}},r.createElement(t.a,{href:"#javascript-%EC%97%94%EC%A7%84%EC%9D%B4-%EC%9D%BC%EC%8B%9C%EC%A0%81%EC%9C%BC%EB%A1%9C-wrapper-type%EC%9C%BC%EB%A1%9C-wrapping-%ED%95%B4%EC%A4%80%EB%8B%A4","aria-label":"javascript 엔진이 일시적으로 wrapper type으로 wrapping 해준다 permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Javascript 엔진이 일시적으로 Wrapper Type으로 wrapping 해준다"),"\n",r.createElement(t.p,null,"Primitive Type은 데이터를 효율적으로 저장하고 처리할 수 있게 해주지만, 복잡한 기능이나 메서드를 가지고 있지는 않다. 이에 대한 생산성을 보완하기 위해 Javascript 엔진은 필요에 따라 ",r.createElement("u",null,"Primitive Type에 해당하는 Wrapper Object로 일시적으로 Wrapping"),"하게 된다."),"\n",r.createElement(t.p,null,"Wrapper Type은 모든 Primitive type에 대응할 수 있도록 존재한다. ",r.createElement(t.code,null,"number")," type의 wrapper는 ",r.createElement(t.code,null,"Number"),"이고, ",r.createElement(t.code,null,"string")," type의 wrapper는 ",r.createElement(t.code,null,"String")," 인 식이다."),"\n",r.createElement(t.p,null,"Wrapper Object는 ",r.createElement(t.strong,null,"primitive type을 ",r.createElement(t.em,null,"일시적"),"으로 감싸는 객체"),"로 primitive type에 대한 추가적인 기능과 메서드를 제공한다. ",r.createElement(t.em,null,"일시적"),"이라는 말에 주목해서 Javascript가 어떠한 시점에 어떻게 wrapping을 수행하는지 다음의 예시를 통해 확인해보자:"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-javascript"},'let str = "hello";\t\nlet upperStr = str.toUpperCase();\nconsole.log(upperStr); // HELLO\n')),"\n",r.createElement(t.ol,null,"\n",r.createElement(t.li,null,"\n",r.createElement(t.p,null,r.createElement(t.code,null,"str")," 변수에 ",r.createElement(t.code,null,"hello")," 라는 string 값이 할당되었다. 이는 불변값으로서 stack 메모리 영역에 저장된다."),"\n"),"\n",r.createElement(t.li,null,"\n",r.createElement(t.p,null,r.createElement(t.code,null,"str.toUppercase()")," 를 호출했다!"),"\n",r.createElement(t.p,null,"이 시점에 Javascript Engine은 ",r.createElement(t.code,null,"str")," 변수를 ",r.createElement(t.code,null,"String"),"이라는 ",r.createElement(t.em,null,"wrapper object로 wrapping을 수행"),"한다. ",r.createElement(t.code,null,"String")," 객체의 instance가 생성된 셈이다. 해당 ",r.createElement(t.code,null,"String")," object는 reference type으로서 heap 영역에 ‘잠시’ 존재할 것이다."),"\n",r.createElement(t.p,null,"그리고 해당 ",r.createElement(t.code,null,".toUppercase()")," 메서드는 불변값인 ",r.createElement(t.code,null,"string")," type을 반환한다. 당연히 기존의 ",r.createElement(t.code,null,"str"),"과는 관련이 없는 값 그 자체이므로, ",r.createElement(t.code,null,"upperStr"),"라는 변수에 담긴 ",r.createElement(t.code,null,"HELLO"),"는 stack 메모레 영역에 위치하게된다."),"\n"),"\n",r.createElement(t.li,null,"\n",r.createElement(t.p,null,"wrapper object가 GC에 의해 heap 영역에서 해제된다."),"\n",r.createElement(t.p,null,"해당 ",r.createElement(t.code,null,"Stirng")," 인스턴스는 js 엔진에 의해 일시적으로 생성된 후, 메서드 반환 후에는 더 이상 참조되지 않으므로 빠른 시일 내에 GC에 의해 수거된다."),"\n"),"\n"),"\n",r.createElement(t.h2,{id:"reference-type--mutable",style:{position:"relative"}},r.createElement(t.a,{href:"#reference-type--mutable","aria-label":"reference type  mutable permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Reference Type (= Mutable)"),"\n",r.createElement(t.p,null,"Reference Type이란 이름 그대로 data가 ",r.createElement(t.em,null,"메모리에 저장된 위치를 reference"),"하는 type을 말한다. 변수가 값을 직접 저장하지 않고, 값이 저장된 메모리의 위치를 가리키는 ‘참조’를 저장한다."),"\n",r.createElement(t.p,null,"다시 풀어 말해보자. Reference Type의 자료를 할당한 변수는, 값이 아닌 ‘참조’ 혹은 ‘주소값’을 저장한다. 이 값은 메모리의 stack 영역에 존재한다. 그리고 이 ‘참조’가 가리키는 곳을 dereference하면, heap 영역에 저장된 진짜 값이 등장하는 것이다."),"\n",r.createElement(t.p,null,"Primitive Type이 Stack 영역에 저장되는 것과 반대로, ",r.createElement(t.strong,null,"Reference Type의 값은 일반적으로 Heap 영역에 위치"),"한다. Reference Type은 Primitive Typer과는 달리 크기가 mutable하므로, ",r.createElement(t.em,null,"선언 및 할당 이후에도 런타임 도중 해당 변수가 차지하는 메모리의 크기가 가변적"),"이기 때문에 동적 메모리 할당에 사용되는 영역일 heap에 위치하는 것이 자연스럽다."),"\n",r.createElement(t.p,null,"Javascript의 Reference Type은 다음과 같이 나열할 수 있다."),"\n",r.createElement(t.ol,null,"\n",r.createElement(t.li,null,"일반 객체 ‘Object’"),"\n",r.createElement(t.li,null,"Array (사실 Array도 엄밀한 array는 아니다. Object임)"),"\n",r.createElement(t.li,null,"Function: Javascript에서는 함수 역시 first clas citizen으로, 어디에든 건네질 수 있는 객체 취급을 받는다."),"\n",r.createElement(t.li,null,"Date type"),"\n",r.createElement(t.li,null,"RegExp 등등···"),"\n"),"\n",r.createElement(t.p,null,"reference type을 다룰 때 주의해야할 점은 너무 당연해서 쓰지 않으겠삼 …"))}var c=function(e={}){const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?r.createElement(t,e,r.createElement(a,e)):a(e)},i=l(5670),m=l(1326),p=l(4517),u=l(698),s=l(8627),o=l(662),E=l(1873);const d=({data:e,children:t,serverData:l})=>{const{prevPost:n,nextPost:a}=e,c={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return r.createElement(u.Z,{data:e},r.createElement(i.Z,null,r.createElement(p.Z,c),r.createElement(m.Z,null,t),r.createElement(o.Z,{prev:n,next:a}),r.createElement(s.Z)))};function h(e){return r.createElement(d,e,r.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-node-js-javascript-data-type-md-db308eed0654e83ba305.js.map