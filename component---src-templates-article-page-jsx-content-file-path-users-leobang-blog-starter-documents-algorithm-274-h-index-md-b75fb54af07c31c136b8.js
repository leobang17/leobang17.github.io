"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[8184],{4353:function(e,n,t){t.r(n),t.d(n,{Head:function(){return u.py},default:function(){return E}});var l=t(1151),a=t(7294);function c(e){const n=Object.assign({h2:"h2",a:"a",div:"div",p:"p",code:"code",h4:"h4",ul:"ul",li:"li",ol:"ol",pre:"pre"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.h2,{id:"문제",style:{position:"relative"}},a.createElement(n.a,{href:"#%EB%AC%B8%EC%A0%9C","aria-label":"문제 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"문제"),"\n",a.createElement(n.p,null,"논문의 인용 횟수를 담은 정수 배열 ",a.createElement(n.code,null,"citations"),"가 주어진다. ",a.createElement(n.code,null,"i"),"번째 논문의 인용 횟수는 ",a.createElement(n.code,null,"citations[i]"),"번 이다."),"\n",a.createElement(n.p,null,"h-index란, h번 이상 인용된 논문이 h개 일 때, 이 때 h값의 최대값을 말한다.\nh-index를 구하라."),"\n",a.createElement(n.h4,{id:"constraints",style:{position:"relative"}},a.createElement(n.a,{href:"#constraints","aria-label":"constraints permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Constraints"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,a.createElement(n.code,null,"n == citations.length")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"1 <= n <= 5000")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"0 <= citations[i] <= 1000")),"\n"),"\n",a.createElement(n.h2,{id:"approach---bruteforce",style:{position:"relative"}},a.createElement(n.a,{href:"#approach---bruteforce","aria-label":"approach   bruteforce permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach - BruteForce"),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"n = 5,000"),"이기 때문에 ",a.createElement(n.code,null,"O(N^2)"),"의 시간복잡도도 노려볼 수 있다고 생각해 BruteForce로 해결하는 방법을 찾아보았다."),"\n",a.createElement(n.p,null,"알고리즘은 다음과 같다."),"\n",a.createElement(n.ol,null,"\n",a.createElement(n.li,null,"k번 인용된 논문의 갯수를 저장할 배열 ",a.createElement(n.code,null,"arr"),"을 할당한다. ",a.createElement(n.code,null,"citations[i]"),"의 최대 값이 1,000이므로 길이가 1,001인 배열을 생성한다."),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"citations")," 배열을 순회하며 ",a.createElement(n.code,null,"arr")," 배열의 1 ~ citations[i] 인덱스에 1씩 추가해준다."),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"arr")," 배열을 순회하며 index보다 해당 index 위치에 저장된 값이 큰 최대 index를 찾는다. (h-index)"),"\n"),"\n",a.createElement(n.h4,{id:"complexity",style:{position:"relative"}},a.createElement(n.a,{href:"#complexity","aria-label":"complexity permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"time complexity: ",a.createElement(n.code,null,"O(NM)")," = 5,000 * 1,000 = 5,000,000 이므로 safe"),"\n",a.createElement(n.li,null,"space complexity: ",a.createElement(n.code,null,"O(M)")," = 1,000"),"\n"),"\n",a.createElement(n.h4,{id:"code",style:{position:"relative"}},a.createElement(n.a,{href:"#code","aria-label":"code permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"class Solution:\n    def hIndex(self, citations: List[int]) -> int:\n        hIndex = 0\n        arr = [0 for _ in range(1001)]\n        \n        # 5,000\n        for c in citations:\n            # 1,000\n            for i in range(1, c + 1):\n                arr[i] += 1\n        for i in range(1, 1001):\n            if arr[i] >= i:\n                hIndex = i\n                \n        return hIndex\n")),"\n",a.createElement(n.h2,{id:"approach---sort",style:{position:"relative"}},a.createElement(n.a,{href:"#approach---sort","aria-label":"approach   sort permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach - Sort"),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"n = 5000"),"이니 ",a.createElement(n.code,null,"O(NlogN)"),"의 시간복잡도를 가지는 정렬도 이용할 수 있다."),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"[3,0,6,1,5]"),"의 배열을 정렬하면,\n[0, 1, 3, 5, 6] 번 이상 인용된 논문은\n[5, 4, 3, 2, 1] 개 인 셈이다."),"\n",a.createElement(n.p,null,"정렬된 배열을 순회하며 논문 숫자보다 인용된 횟수가 같거나 높은 첫번째 iteration의 count가 h-index이다."),"\n",a.createElement(n.h4,{id:"complexity-1",style:{position:"relative"}},a.createElement(n.a,{href:"#complexity-1","aria-label":"complexity 1 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"time complexity: ",a.createElement(n.code,null,"O(NlogN)")),"\n",a.createElement(n.li,null,"space complexity: ",a.createElement(n.code,null,"O(1)")),"\n"),"\n",a.createElement(n.h4,{id:"code-1",style:{position:"relative"}},a.createElement(n.a,{href:"#code-1","aria-label":"code 1 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"class Solution:\n    def hIndex(self, citations: List[int]) -> int:\n        count = len(citations)\n        citations.sort()\n        \n        for c in citations:\n            if count <= c:\n                return count\n            count -= 1 \n                \n        return 0\n")))}var r=function(e={}){const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(c,e)):c(e)},i=t(5670),o=t(1326),h=t(4517),s=t(698),m=t(8627),d=t(662),u=t(1873);const p=({data:e,children:n,serverData:t})=>{const{prevPost:l,nextPost:c}=e,r={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return a.createElement(s.Z,{data:e},a.createElement(i.Z,null,a.createElement(h.Z,r),a.createElement(o.Z,null,n),a.createElement(d.Z,{prev:l,next:c}),a.createElement(m.Z)))};function E(e){return a.createElement(p,e,a.createElement(r,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-algorithm-274-h-index-md-b75fb54af07c31c136b8.js.map