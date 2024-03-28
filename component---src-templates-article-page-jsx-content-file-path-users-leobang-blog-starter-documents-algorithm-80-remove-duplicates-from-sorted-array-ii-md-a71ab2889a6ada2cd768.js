"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[1605],{7019:function(e,n,t){t.r(n),t.d(n,{Head:function(){return u.py},default:function(){return v}});var l=t(1151),a=t(7294);function r(e){const n=Object.assign({h2:"h2",a:"a",div:"div",p:"p",code:"code",h4:"h4",ul:"ul",li:"li",pre:"pre"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.h2,{id:"문제",style:{position:"relative"}},a.createElement(n.a,{href:"#%EB%AC%B8%EC%A0%9C","aria-label":"문제 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"문제"),"\n",a.createElement(n.p,null,"정수 배열 ",a.createElement(n.code,null,"nums")," 가 오름차순으로 정렬되어있다. 연속으로 동일한 수가 2회를 초과하여 나오지 않도록 배열을 조작하라."),"\n",a.createElement(n.h4,{id:"constraints",style:{position:"relative"}},a.createElement(n.a,{href:"#constraints","aria-label":"constraints permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Constraints"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,a.createElement(n.code,null,"1 <= nums.length <= 3 * 10^4^")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"104 <= nums[i] <= 104")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"nums is sorted in non-decreasing order.")),"\n"),"\n",a.createElement(n.h2,{id:"풀이",style:{position:"relative"}},a.createElement(n.a,{href:"#%ED%92%80%EC%9D%B4","aria-label":"풀이 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"풀이"),"\n",a.createElement(n.h4,{id:"approach",style:{position:"relative"}},a.createElement(n.a,{href:"#approach","aria-label":"approach permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach"),"\n",a.createElement(n.p,null,"n = 10,000이므로 최대 ",a.createElement(n.code,null,"O(nlogn)"),"의 시간 복잡도 안으로 끝내야 한다.\nlinear 순회하면서 prev와 현재가 동일할 경우 count ++\ncount > 2 인 경우 3회 이상 반복되는 수이므로 이를 제외하고, 나머지 상황에서 pointer를 옮겨가며 in-place로 대체"),"\n",a.createElement(n.h4,{id:"complexity",style:{position:"relative"}},a.createElement(n.a,{href:"#complexity","aria-label":"complexity permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"시간복잡도: ",a.createElement(n.code,null,"O(n)")),"\n"),"\n",a.createElement(n.h4,{id:"code",style:{position:"relative"}},a.createElement(n.a,{href:"#code","aria-label":"code permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-Python"},"class Solution:\n    def removeDuplicates(self, nums: List[int]) -> int:\n        count = 1\n        ptr = 1\n\n        # O(n) = 10_000\n        for i in range(1, len(nums)):\n            if nums[i - 1] == nums[i]:\n                count += 1\n            else:\n                count = 1\n            if count <= 2: \n                nums[ptr] = nums[i]\n                ptr += 1\n\n            prev = nums[i]\n\n        return ptr\n")))}var c=function(e={}){const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(r,e)):r(e)},i=t(5670),s=t(1326),h=t(4517),o=t(698),m=t(8627),d=t(662),u=t(1873);const p=({data:e,children:n,serverData:t})=>{const{prevPost:l,nextPost:r}=e,c={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return a.createElement(o.Z,{data:e},a.createElement(i.Z,null,a.createElement(h.Z,c),a.createElement(s.Z,null,n),a.createElement(d.Z,{prev:l,next:r}),a.createElement(m.Z)))};function v(e){return a.createElement(p,e,a.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-algorithm-80-remove-duplicates-from-sorted-array-ii-md-a71ab2889a6ada2cd768.js.map