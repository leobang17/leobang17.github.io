"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[999],{1163:function(e,n,t){t.r(n),t.d(n,{Head:function(){return d.py},default:function(){return E}});var l=t(1151),a=t(7294);function r(e){const n=Object.assign({h2:"h2",a:"a",div:"div",p:"p",code:"code",blockquote:"blockquote",h4:"h4",ul:"ul",li:"li",em:"em",ol:"ol",pre:"pre"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.h2,{id:"문제",style:{position:"relative"}},a.createElement(n.a,{href:"#%EB%AC%B8%EC%A0%9C","aria-label":"문제 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"문제"),"\n",a.createElement(n.p,null,a.createElement(n.a,{href:"https://leetcode.com/problems/combinations/?envType=study-plan-v2&envId=top-interview-150",target:"_self",rel:"nofollow"},"77. Combinations"),"\n",a.createElement(n.code,null,"n"),"과 ",a.createElement(n.code,null,"k"),"의 두 정수가 주어진다. ",a.createElement(n.code,null,"[1, n]"),"의 구간 (구간은 inclusive 하다.) 중 ",a.createElement(n.code,null,"k"),"개의 원소를 뽑아 만들 수 있는 모든 가능한 조합 (combinations)를 구하라."),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"[1, 2]와 [2, 1]은 같은 조합으로 판단한다."),"\n"),"\n",a.createElement(n.h4,{id:"constraints",style:{position:"relative"}},a.createElement(n.a,{href:"#constraints","aria-label":"constraints permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Constraints"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,a.createElement(n.code,null,"1 <= n <= 20")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"1 <= k <= n")),"\n"),"\n",a.createElement(n.h2,{id:"approach",style:{position:"relative"}},a.createElement(n.a,{href:"#approach","aria-label":"approach permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach"),"\n",a.createElement(n.p,null,"백트래킹 딱지가 붙었었지만 역시 단순하게 재귀로 풀었다.\n재귀함수는 ",a.createElement(n.em,null,"현재 담고 있는 element의 array"),"와 ",a.createElement(n.em,null,"다음에 뽑을 원소의 시작점"),"을 인자로 건네받는다."),"\n",a.createElement(n.ol,null,"\n",a.createElement(n.li,null,"종료조건: array의 길이가 k와 같다면"),"\n"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,a.createElement(n.code,null,"answer")," 배열에 현재 array를 추가하고 return한다."),"\n"),"\n",a.createElement(n.ol,{start:"2"},"\n",a.createElement(n.li,null,"그래프 탐색: 인자로 받은 시작점 ~ n 까지를 순회하며 원소 i를 array에 추가한다."),"\n"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"이 때 매 순회마다 복사된 배열을 만든다. array에 추가한다는 말은 사실 복사된 array에 추가한다는 말이다.\n만약 값 복사를 해주지 않으면 모든 재귀함수가 하나의 array를 참조하고 있는 셈이므로.. 원하지 않는 결과가 나올 것이다."),"\n",a.createElement(n.li,null,"array와 i + 1를 재귀함수에 넣고 재귀를 돌린다."),"\n"),"\n",a.createElement(n.p,null,"이러면 k개의 원소를 지닌 ",a.createElement(n.code,null,"[1, n]")," 구간의 조합 완성~\n근데 시간 효율이나 공간효율이 별로로 나왔다 ㅜ"),"\n",a.createElement(n.h4,{id:"complexity",style:{position:"relative"}},a.createElement(n.a,{href:"#complexity","aria-label":"complexity permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"time complexity: ",a.createElement(n.code,null,"O(nCk)")," = ",a.createElement(n.code,null,"O(n! / (n - k)!*k!)")),"\n",a.createElement(n.li,null,"space complexity:"),"\n"),"\n",a.createElement(n.h4,{id:"code",style:{position:"relative"}},a.createElement(n.a,{href:"#code","aria-label":"code permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"class Solution:\n    def combine(self, n: int, k: int) -> List[List[int]]:\n        answer = []\n\n        def recur(arr, start):\n            if len(arr) == k:\n                answer.append(arr)\n                return \n\n            for i in range(start, n + 1):\n                copied_arr = arr[:]\n                copied_arr.append(i)\n                recur(copied_arr, i + 1)\n\n        recur([], 1)\n\n        return answer\n")))}var c=function(e={}){const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(r,e)):r(e)},i=t(5670),o=t(1326),m=t(4517),s=t(698),h=t(8627),u=t(662),d=t(1873);const p=({data:e,children:n,serverData:t})=>{const{prevPost:l,nextPost:r}=e,c={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return a.createElement(s.Z,{data:e},a.createElement(i.Z,null,a.createElement(m.Z,c),a.createElement(o.Z,null,n),a.createElement(u.Z,{prev:l,next:r}),a.createElement(h.Z)))};function E(e){return a.createElement(p,e,a.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-home-runner-work-leobang-17-github-io-leobang-17-github-io-documents-algorithm-77-combinations-md-a1bb80e67190095dc64d.js.map