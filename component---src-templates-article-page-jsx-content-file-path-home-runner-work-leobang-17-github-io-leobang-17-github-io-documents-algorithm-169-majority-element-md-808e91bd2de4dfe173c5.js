"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[937],{5637:function(e,n,l){l.r(n),l.d(n,{Head:function(){return u.py},default:function(){return p}});var t=l(1151),a=l(7294);function r(e){const n=Object.assign({h2:"h2",a:"a",div:"div",p:"p",code:"code",blockquote:"blockquote",h4:"h4",ul:"ul",li:"li",pre:"pre"},(0,t.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.h2,{id:"문제",style:{position:"relative"}},a.createElement(n.a,{href:"#%EB%AC%B8%EC%A0%9C","aria-label":"문제 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"문제"),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"n"),"의 길이를 가지는 정수 배열 ",a.createElement(n.code,null,"nums"),"가 존재한다. majority element를 구하라. majority element는 항상 존재한다."),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"majority element란 배열이서 ",a.createElement(n.code,null,"[n / 2]")," 회 이상 나타나는 원소를 뜻한다."),"\n"),"\n",a.createElement(n.h4,{id:"constraints",style:{position:"relative"}},a.createElement(n.a,{href:"#constraints","aria-label":"constraints permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Constraints"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,a.createElement(n.code,null,"n == nums.length")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"1 <= n <= 5 * 104")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"109 <= nums[i] <= 109")),"\n"),"\n",a.createElement(n.h2,{id:"풀이1-hashmap",style:{position:"relative"}},a.createElement(n.a,{href:"#%ED%92%80%EC%9D%B41-hashmap","aria-label":"풀이1 hashmap permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"풀이1 (Hashmap)"),"\n",a.createElement(n.h4,{id:"approach",style:{position:"relative"}},a.createElement(n.a,{href:"#approach","aria-label":"approach permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach"),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"nums")," 배열을 순회하며 hashmap을 이용해 각 원소의 개수를 세준 후, ",a.createElement(n.code,null,"[n / 2]"),"회를 넘을 경우 해당 원소를 반환한다."),"\n",a.createElement(n.h4,{id:"complexity",style:{position:"relative"}},a.createElement(n.a,{href:"#complexity","aria-label":"complexity permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"time complexity: ",a.createElement(n.code,null,"O(N)")),"\n",a.createElement(n.li,null,"space complexity: ",a.createElement(n.code,null,"O(N)")," (사실상 최대 n / 2 - 1 개의 서로 다른 원소가 존재한다)"),"\n"),"\n",a.createElement(n.h4,{id:"code",style:{position:"relative"}},a.createElement(n.a,{href:"#code","aria-label":"code permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-Python"},"class Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        threshold = len(nums) / 2 \n        counter = dict()\n        for n in nums:\n            if n in counter:\n                counter[n] += 1\n            else:\n                counter[n] = 1\n            if counter[n] >= threshold:\n                return n\n\n")),"\n",a.createElement(n.h2,{id:"풀이2-정렬",style:{position:"relative"}},a.createElement(n.a,{href:"#%ED%92%80%EC%9D%B42-%EC%A0%95%EB%A0%AC","aria-label":"풀이2 정렬 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"풀이2 (정렬)"),"\n",a.createElement(n.h4,{id:"approach-1",style:{position:"relative"}},a.createElement(n.a,{href:"#approach-1","aria-label":"approach 1 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach"),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"nums")," 배열을 내장 sort 라이브러리를 이용해 정렬한다. 이 때 무조건 정렬된 배열의 중심에는 ",a.createElement(n.code,null,"n / 2")," 회 이상 나타나는 원소가 존재한다.\nn이 ",a.createElement(n.code,null,"50_000"),"이므로 nlogn의 시간복잡도도 허용한다."),"\n",a.createElement(n.h4,{id:"complexity-1",style:{position:"relative"}},a.createElement(n.a,{href:"#complexity-1","aria-label":"complexity 1 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"time complexity: ",a.createElement(n.code,null,"O(NlogN)")),"\n",a.createElement(n.li,null,"space complexity: ",a.createElement(n.code,null,"O(1)")),"\n"),"\n",a.createElement(n.h4,{id:"code-1",style:{position:"relative"}},a.createElement(n.a,{href:"#code-1","aria-label":"code 1 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"class Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        nums.sort()\n        n = len(nums)\n        return nums[n//2]\n")),"\n",a.createElement(n.h2,{id:"풀이3-boyer-moore의-다수결-투표-알고리즘",style:{position:"relative"}},a.createElement(n.a,{href:"#%ED%92%80%EC%9D%B43-boyer-moore%EC%9D%98-%EB%8B%A4%EC%88%98%EA%B2%B0-%ED%88%AC%ED%91%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98","aria-label":"풀이3 boyer moore의 다수결 투표 알고리즘 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"풀이3 (Boyer-Moore의 다수결 투표 알고리즘)"),"\n",a.createElement(n.h4,{id:"approach-2",style:{position:"relative"}},a.createElement(n.a,{href:"#approach-2","aria-label":"approach 2 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach"),"\n",a.createElement(n.h4,{id:"complexity-2",style:{position:"relative"}},a.createElement(n.a,{href:"#complexity-2","aria-label":"complexity 2 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"time complexity: ",a.createElement(n.code,null,"O(N)")),"\n",a.createElement(n.li,null,"space complexity: ",a.createElement(n.code,null,"O(1)")),"\n"),"\n",a.createElement(n.h4,{id:"code-2",style:{position:"relative"}},a.createElement(n.a,{href:"#code-2","aria-label":"code 2 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"class Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        major = None\n        count = 0\n        for n in nums:\n            if count == 0:\n                major = n\n            if major == n:\n                count += 1\n            else:\n                count -= 1\n        return major\n")))}var c=function(e={}){const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?a.createElement(n,e,a.createElement(r,e)):r(e)},i=l(5670),o=l(1326),h=l(4517),s=l(698),m=l(8627),d=l(662),u=l(1873);const v=({data:e,children:n,serverData:l})=>{const{prevPost:t,nextPost:r}=e,c={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return a.createElement(s.Z,{data:e},a.createElement(i.Z,null,a.createElement(h.Z,c),a.createElement(o.Z,null,n),a.createElement(d.Z,{prev:t,next:r}),a.createElement(m.Z)))};function p(e){return a.createElement(v,e,a.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-home-runner-work-leobang-17-github-io-leobang-17-github-io-documents-algorithm-169-majority-element-md-808e91bd2de4dfe173c5.js.map