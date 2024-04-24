"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[6686],{9324:function(e,n,t){t.r(n),t.d(n,{Head:function(){return h.py},default:function(){return E}});var l=t(1151),a=t(7294);function i(e){const n=Object.assign({h2:"h2",a:"a",div:"div",p:"p",code:"code",blockquote:"blockquote",h4:"h4",ul:"ul",li:"li",ol:"ol",pre:"pre"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.h2,{id:"문제",style:{position:"relative"}},a.createElement(n.a,{href:"#%EB%AC%B8%EC%A0%9C","aria-label":"문제 permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"문제"),"\n",a.createElement(n.p,null,a.createElement(n.a,{href:"https://leetcode.com/problems/evaluate-division/description/?envType=study-plan-v2&envId=top-interview-150",target:"_self",rel:"nofollow"},"399. Evaluate Division")),"\n",a.createElement(n.p,null,"한 쌍의 문자열 타입의 “변수명”으로 이루어진 배열 ",a.createElement(n.code,null,"equations"),"와 정수 배열 ",a.createElement(n.code,null,"values"),"가 주어진다. ",a.createElement(n.code,null,"equations[i]"),"에는 ",a.createElement(n.code,null,"[Ai, Bi]"),"의 값이 들어있는데, 이 떄 ",a.createElement(n.code,null,"value[i]"),"는 ",a.createElement(n.code,null,"Ai / Bi"),"의 계산의 결과를 나타낸다."),"\n",a.createElement(n.p,null,"세번째 인자로는 배열 ",a.createElement(n.code,null,"queries"),"가 주어지는데 우리는 이 ",a.createElement(n.code,null,"queries")," 배열에 담긴 값에 따라서 응답을 해야한다. ",a.createElement(n.code,null,"queries[j]"),"는 ",a.createElement(n.code,null,"[Aj, Bj]"),"를 담고 있다. 각 ",a.createElement(n.code,null,"queries")," 원소의 ",a.createElement(n.code,null,"Aj / Bj"),"의 결과를 계산해 정답이 담긴 배열로 반환하면 된다."),"\n",a.createElement(n.p,null,"만약 계산할 수 없는 query가 주어진다면 ",a.createElement(n.code,null,"-1.0"),"을 담는다."),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"Note\n",a.createElement(n.code,null,"equations"),"에 등장하지 않는 원소가 ",a.createElement(n.code,null,"queries"),"에는 등장할 수도 있다. 이 경우엔 정보가 없어 계산을 하지 하는 것으로 판단한다."),"\n"),"\n",a.createElement(n.h4,{id:"constraints",style:{position:"relative"}},a.createElement(n.a,{href:"#constraints","aria-label":"constraints permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Constraints"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,a.createElement(n.code,null,"1 <= equations.length <= 20")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"equations[i].length == 2")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"1 <= Ai.length, Bi.length <= 5")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"values.length == equations.length")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"0.0 < values[i] <= 20.0")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"1 <= queries.length <= 20")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"queries[i].length == 2")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"1 <= Cj.length, Dj.length <= 5")),"\n",a.createElement(n.li,null,a.createElement(n.code,null,"Ai, Bi, Cj, Dj consist of lower case English letters and digits.")),"\n"),"\n",a.createElement(n.h2,{id:"approach---graph-dfs-iterative",style:{position:"relative"}},a.createElement(n.a,{href:"#approach---graph-dfs-iterative","aria-label":"approach   graph dfs iterative permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach - Graph: DFS (Iterative)"),"\n",a.createElement(n.p,null,"아이디어 자체는 간단했는데 구현이 조금 귀찮은 면이 있다."),"\n",a.createElement(n.p,null,"두 부분으로 나누어 생각해보자."),"\n",a.createElement(n.ol,null,"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"그래프 저장\n그래프의 자료구조는 hashmap을 선택했다. hashmap의 key는 ",a.createElement(n.code,null,"equations"),"의 변수 문자열값이고, hashmap의 value는 길이가 2인 ",a.createElement(n.code,null,"tuple")," 타입으로 이루어져 있는 배열이다.\n",a.createElement(n.code,null,"tuple"),"의 ",a.createElement(n.code,null,"index=0")," 에는 나눌 수 있는 문자열 변수값이, ",a.createElement(n.code,null,"index=1"),"에는 나누었을 때의 결과 값이 저장된다.\n방문처리를 위한 자료구조도 역시 hashmap을 사용한다."),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"그래프 탐색\n그래프 탐색으로 풀 수 있는 이유는 간단하다. ",a.createElement(n.code,null,"a / c"),"의 쿼리를 처리하고 싶은 경우, ",a.createElement(n.code,null,"a / b"),"와 ",a.createElement(n.code,null,"b / c"),"의 결과값을 알면 되기 때문이다. graph에 저장된 나눌 수 있는 값들이 일종의 인접한 노드인 셈이다.\n아이디어는 단순하게 떠올릴 수 있었지만 결과값 계산이나 graph에 없는 변수가 query에 들어가있는 경우 등을 처리하는게 까다로웠다."),"\n"),"\n"),"\n",a.createElement(n.h4,{id:"complexity",style:{position:"relative"}},a.createElement(n.a,{href:"#complexity","aria-label":"complexity permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"time complexity: ",a.createElement(n.code,null,"O(N * (V + E))")," = query * graph"),"\n",a.createElement(n.li,null,"space complexity: ",a.createElement(n.code,null,"O(V + E)")),"\n"),"\n",a.createElement(n.h4,{id:"code",style:{position:"relative"}},a.createElement(n.a,{href:"#code","aria-label":"code permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"class Solution:\n    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:\n        graph = dict()\n        visited = dict()\n        result = []\n\n        # Graph 만들기\n        for i in range(len(equations)):\n            if equations[i][0] in graph:\n                graph[equations[i][0]].append((equations[i][1], values[i]))\n            else:\n                graph[equations[i][0]] = [(equations[i][1], values[i])]\n            if equations[i][1] in graph:\n                graph[equations[i][1]].append((equations[i][0], 1.0 / values[i]))\n            else:\n                graph[equations[i][1]] = [(equations[i][0], 1.0 / values[i])]\n            visited[equations[i][0]] = False\n            visited[equations[i][1]] = False\n        \n        # DFS로 계산\n        for start, destination in queries:\n            for k in visited.keys(): visited[k] = False  # visited 초기화\n                \n            answer = -1.0\n            stack = [(start, 1.0)]  # index=0 에는 노드 번호를, index=1 에는 노드 이동을 통해 계산한 결과값을 담는다.\n            visited[start] = True\n\n            while stack:\n                node, val = stack.pop()\n                if node not in graph: # equation에 등장하지 않은 값이었을 경우 계산하지 않음 \n                    break \n                if node == destination: \n                    answer = val\n                    break   \n                \n                for adj, cal in graph[node]:\n                    if not visited[adj]:\n                        stack.append((adj, val * cal))\n                        visited[adj] = True\n        \n            result.append(answer)\n\n        return result\n")))}var r=function(e={}){const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(i,e)):i(e)},c=t(5670),s=t(1326),o=t(4517),u=t(698),d=t(8627),m=t(662),h=t(1873);const p=({data:e,children:n,serverData:t})=>{const{prevPost:l,nextPost:i}=e,r={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return a.createElement(u.Z,{data:e},a.createElement(c.Z,null,a.createElement(o.Z,r),a.createElement(s.Z,null,n),a.createElement(m.Z,{prev:l,next:i}),a.createElement(d.Z)))};function E(e){return a.createElement(p,e,a.createElement(r,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-algorithm-399-evaluate-division-md-5149013ebacd62d8aa0c.js.map