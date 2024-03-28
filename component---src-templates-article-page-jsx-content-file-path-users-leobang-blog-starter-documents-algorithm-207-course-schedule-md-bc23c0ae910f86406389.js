"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[8514],{6051:function(e,n,l){l.r(n),l.d(n,{Head:function(){return h.py},default:function(){return v}});var t=l(1151),r=l(7294);function a(e){const n=Object.assign({h2:"h2",a:"a",div:"div",p:"p",code:"code",h4:"h4",ul:"ul",li:"li",pre:"pre",blockquote:"blockquote",ol:"ol"},(0,t.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.h2,{id:"문제",style:{position:"relative"}},r.createElement(n.a,{href:"#%EB%AC%B8%EC%A0%9C","aria-label":"문제 permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"문제"),"\n",r.createElement(n.p,null,r.createElement(n.a,{href:"https://leetcode.com/problems/course-schedule/?envType=study-plan-v2&envId=top-interview-150",target:"_self",rel:"nofollow"},"207. Course Schedule")),"\n",r.createElement(n.p,null,"수강해야하는 과목들을 나타내는 정수 ",r.createElement(n.code,null,"numCourses"),"가 주어진다. ",r.createElement(n.code,null,"0")," ~ ",r.createElement(n.code,null,"numCourses - 1"),"까지가 수강해아햐는 과목이다. ",r.createElement(n.code,null,"[Ai, Bi]"),"로 이루어진 배열 ",r.createElement(n.code,null,"prerequisites"),"은 선수강과목에 대한 정보를 나타낸다.\n",r.createElement(n.code,null,"[Ai, Bi]"),"는 ",r.createElement(n.code,null,"Ai")," 과목을 수강하기 위해서는 ",r.createElement(n.code,null,"Bi"),"를 먼저 수강해야한다는 뜻이다."),"\n",r.createElement(n.p,null,"모든 과목을 수강할 수 있다면 ",r.createElement(n.code,null,"True"),"를 반환하고 그렇지 않다면 ",r.createElement(n.code,null,"False"),"를 반환하라."),"\n",r.createElement(n.h4,{id:"constraints",style:{position:"relative"}},r.createElement(n.a,{href:"#constraints","aria-label":"constraints permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Constraints"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,r.createElement(n.code,null,"1 <= numCourses <= 2000")),"\n",r.createElement(n.li,null,r.createElement(n.code,null,"0 <= prerequisites.length <= 5000")),"\n",r.createElement(n.li,null,r.createElement(n.code,null,"prerequisites[i].length == 2")),"\n",r.createElement(n.li,null,r.createElement(n.code,null,"0 <= ai, bi < numCourses")),"\n",r.createElement(n.li,null,r.createElement(n.code,null,"All the pairs prerequisites[i] are unique.")),"\n"),"\n",r.createElement(n.h2,{id:"approach---graph-bfs",style:{position:"relative"}},r.createElement(n.a,{href:"#approach---graph-bfs","aria-label":"approach   graph bfs permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach - Graph: BFS"),"\n",r.createElement(n.p,null,"더 쉽게 풀 수 있는 방법이 있을 것 같은데.. 내 방식대로 구현하느라 귀찮은 구현사항들이 많았다."),"\n",r.createElement(n.p,null,"각 수강과목들의 선수강 관계와 해당 과목을 수강했다면 다음에 어떤 과목을 수강할 수 있는지에 대한 정보를 담은 graph를 저장한다.\n수강과목 ",r.createElement(n.code,null,"i"),"에 대해서 ",r.createElement(n.code,null,"graph[i]")," = ",r.createElement(n.code,null,"[next, required]"),"가 저장되는데 ",r.createElement(n.code,null,"next"),"는 ",r.createElement(n.code,null,"i")," 강의를 수강한 후에 수강할 수 있는 강의들을 담은 배열이고 ",r.createElement(n.code,null,"required"),"는 ",r.createElement(n.code,null,"i"),"강의를 듣기 위해서 선수강해야하는 강의들을 담은 배열이다."),"\n",r.createElement(n.p,null,"그리고 선수강과목이 필요없는 = 언제든지 첫번째로 수강할 수 있는 강의를 ",r.createElement(n.code,null,"root")," 스택에 담아준다."),"\n",r.createElement(n.p,null,r.createElement(n.code,null,"root")," 스택에서 1개씩 pop하며 강의수강을 시작한다. 강의수강은 그래프 탐색 (BFS)를 따른다.\n인접노드 (= 다음에 수강할 강의)가 선수강과목을 모두 수강했는지 확인한다. ",r.createElement(n.code,null,"visited[required]"),"가 모두 True일 경우에만 해당 노드를 queue에 넣고, 아직 선수강과목을 수강하지 않은 상태라면 ",r.createElement(n.code,null,"root")," 스택에 있는 언제든 처음 들을 수 있는 강의를 대신 queue에 넣는다."),"\n",r.createElement(n.p,null,"그리고 마지막으로 ",r.createElement(n.code,null,"visited")," 배열을 방문하며 모든 강의가 방문처리되었는지 확인한다."),"\n",r.createElement(n.h4,{id:"complexity",style:{position:"relative"}},r.createElement(n.a,{href:"#complexity","aria-label":"complexity permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"time complexity:"),"\n",r.createElement(n.li,null,"space complexity:"),"\n"),"\n",r.createElement(n.h4,{id:"code",style:{position:"relative"}},r.createElement(n.a,{href:"#code","aria-label":"code permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-python"},"from collections import deque\n\nclass Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        graph = [[[],[]] for _ in range(numCourses)]\n        visited = [False for _ in range(numCourses)]\n        root = []\n        for c, r in prerequisites:\n            graph[r][0].append(c)\n            graph[c][1].append(r)\n\n        # 선수강 과목이 없는 강의들을 root에 저장\n        for i, v in enumerate(graph):\n            if len(v[1]) == 0:\n                root.append(i)\n\n        while root:\n            r = root.pop()\n            q = deque([r])\n            visited[r] = True\n            \n            while q:\n                node = q.popleft()\n                \n                for adj in graph[node][0]:\n                    next = adj\n                    all_solved = True\n                    # 방문하지 않은 인접 노드 \n                    if not visited[adj]:\n                        for k in graph[adj][1]:\n                            if not visited[k]:\n                                all_solved = False\n                        # + 선수강 과목까지 모두 들었다면 해당 인접 노드를 queue에 추가\n                        # 선수강 과목을 모두 듣지 않았다면 다른 root node를 queue에 추가\n                        if not all_solved:\n                            if root:\n                                next = root.pop()\n                            else:\n                                continue\n                        q.append(next)\n                        visited[next] = True\n        \n        for v in visited:\n            if not v:\n                return False\n        return True\n")),"\n",r.createElement(n.h2,{id:"approach---graph-topological-sort-위상정렬",style:{position:"relative"}},r.createElement(n.a,{href:"#approach---graph-topological-sort-%EC%9C%84%EC%83%81%EC%A0%95%EB%A0%AC","aria-label":"approach   graph topological sort 위상정렬 permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach - Graph: Topological Sort (위상정렬)"),"\n",r.createElement(n.p,null,"위상정렬 키워드를 확인하고 해당 알고리즘을 배운 후에 다시 풀어봤다.\n위상정렬이란 방향성이 있는 그래프를 방향성이 어긋나지 않도록 순차대로 방문하도록 하는 정렬방식이다."),"\n",r.createElement(n.p,null,"생각보다 방법은 간단한데, 그래프 정보와 함깨 각 노드의 ",r.createElement(n.code,null,"진입차수(indegree)")," 정보를 저장한다."),"\n",r.createElement(n.blockquote,null,"\n",r.createElement(n.p,null,"진입차수 (indegree)\n해당 노드에게로 들어오는 간선 (edge)의 갯수. 이 문제에서는 선수강해야하는 과목으로부터의 edge가 진입차수들이 되겠다."),"\n"),"\n",r.createElement(n.p,null,"그리고 진입차수가 0인 노드들을 queue에 담고, 해당 queue가 빌 때까지 다음의 과정을 수행한다."),"\n",r.createElement(n.ol,null,"\n",r.createElement(n.li,null,"queue에서 노드 하나를 뺀 후 해당 노드의 인접노드들에 대해"),"\n"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"인접노드의 indegree 값을 1 뺀다."),"\n",r.createElement(n.li,null,"인접노드의 indegree 값이 0이 되었을 경우 queue에 넣는다. (root 노드로의 자격이 되므로)"),"\n"),"\n",r.createElement(n.p,null,"해당 문제의 경우에는 cycle이 발생하는 경우를 확인해야하므로 ",r.createElement(n.code,null,"visited")," 배열로 방문했는지도 확인해주었다."),"\n",r.createElement(n.h4,{id:"complexity-1",style:{position:"relative"}},r.createElement(n.a,{href:"#complexity-1","aria-label":"complexity 1 permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"time complexity:"),"\n",r.createElement(n.li,null,"space complexity:"),"\n"),"\n",r.createElement(n.h4,{id:"code-1",style:{position:"relative"}},r.createElement(n.a,{href:"#code-1","aria-label":"code 1 permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-python"},"class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        graph = [[] for _ in range(numCourses)]\n        visited = [False for _ in range(numCourses)]\n        topology = [0 for _ in range(numCourses)]\n\n        for a, b in prerequisites:\n            graph[b].append(a)\n            topology[a] += 1\n        \n        root = deque([])\n        for i, v in enumerate(topology):\n            if v == 0:\n                root.append(i)\n                visited[i] = True\n        \n        while root:\n            node = root.popleft()\n            \n            for adj in graph[node]:\n                topology[adj] -= 1\n                if topology[adj] == 0 and not visited[adj]:\n                    root.append(adj)\n                    visited[adj] = True\n        \n        for v in visited:\n            if not v:\n                return False\n        \n        return True\n")))}var i=function(e={}){const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?r.createElement(n,e,r.createElement(a,e)):a(e)},o=l(5670),c=l(1326),s=l(4517),u=l(698),d=l(8627),m=l(662),h=l(1873);const p=({data:e,children:n,serverData:l})=>{const{prevPost:t,nextPost:a}=e,i={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return r.createElement(u.Z,{data:e},r.createElement(o.Z,null,r.createElement(s.Z,i),r.createElement(c.Z,null,n),r.createElement(m.Z,{prev:t,next:a}),r.createElement(d.Z)))};function v(e){return r.createElement(p,e,r.createElement(i,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-algorithm-207-course-schedule-md-bc23c0ae910f86406389.js.map