"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[3430],{4170:function(e,n,t){t.r(n),t.d(n,{Head:function(){return u.py},default:function(){return f}});var a=t(1151),r=t(7294);function l(e){const n=Object.assign({h2:"h2",a:"a",div:"div",p:"p",code:"code",h4:"h4",ul:"ul",li:"li",pre:"pre"},(0,a.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.h2,{id:"문제",style:{position:"relative"}},r.createElement(n.a,{href:"#%EB%AC%B8%EC%A0%9C","aria-label":"문제 permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"문제"),"\n",r.createElement(n.p,null,r.createElement(n.a,{href:"https://leetcode.com/problems/snakes-and-ladders/description/?envType=study-plan-v2&envId=top-interview-150",target:"_self",rel:"nofollow"},"909. Snakes and Ladders")),"\n",r.createElement(n.p,null,"You are given an ",r.createElement(n.code,null,"n x n")," integer matrix ",r.createElement(n.code,null,"board")," where the cells are labeled from 1 to n2 in a Boustrophedon style starting from the bottom left of the board (i.e. ",r.createElement(n.code,null,"board[n - 1][0])")," and alternating direction each row."),"\n",r.createElement(n.p,null,"You start on square 1 of the board. In each move, starting from square curr, do the following:"),"\n",r.createElement(n.p,null,"Choose a destination square next with a label in the range ",r.createElement(n.code,null,"[curr + 1, min(curr + 6, n2)]"),".\nThis choice simulates the result of a standard 6-sided die roll: i.e., there are always at most 6 destinations, regardless of the size of the board.\nIf next has a snake or ladder, you must move to the destination of that snake or ladder. Otherwise, you move to next.\nThe game ends when you reach the square n2.\nA board square on row r and column c has a snake or ladder if ",r.createElement(n.code,null,"board[r][c] != -1"),". The destination of that snake or ladder is ",r.createElement(n.code,null,"board[r][c]"),". Squares 1 and n2 do not have a snake or ladder."),"\n",r.createElement(n.p,null,"Note that you only take a snake or ladder at most once per move. If the destination to a snake or ladder is the start of another snake or ladder, you do not follow the subsequent snake or ladder."),"\n",r.createElement(n.p,null,"For example, suppose the board is ",r.createElement(n.code,null,"[[-1,4],[-1,3]]"),", and on the first move, your destination square is 2. You follow the ladder to square 3, but do not follow the subsequent ladder to 4.\nReturn the least number of moves required to reach the square n2. If it is not possible to reach the square, return -1."),"\n",r.createElement(n.h4,{id:"constraints",style:{position:"relative"}},r.createElement(n.a,{href:"#constraints","aria-label":"constraints permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Constraints"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,r.createElement(n.code,null,"n == board.length == board[i].length")),"\n",r.createElement(n.li,null,r.createElement(n.code,null,"2 <= n <= 20")),"\n",r.createElement(n.li,null,r.createElement(n.code,null,"board[i][j] is either -1 or in the range [1, n2].")),"\n",r.createElement(n.li,null,r.createElement(n.code,null,"The squares labeled 1 and n2 do not have any ladders or snakes.")),"\n"),"\n",r.createElement(n.h2,{id:"approach---graph-djikstra-bfs",style:{position:"relative"}},r.createElement(n.a,{href:"#approach---graph-djikstra-bfs","aria-label":"approach   graph djikstra bfs permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach - Graph: Djikstra (BFS)"),"\n",r.createElement(n.p,null,"문제를 보자마자 다익스트라 알고리즘 문제겠거니.. 싶었지만 귀찮은 부분은 따로 있었다."),"\n",r.createElement(n.p,null,"바로 문제에 나오는 ",r.createElement(n.code,null,"board"),"가 실제로 나타내는 숫자들을 매칭하는 것이었는데, 이 문제 때문에 처음으로 Boustrophedon 양식이란걸 알게되었다…\n우하단부터 시작해서 S자로 작성하는 방식을 Boustrophedon이라고 한다. 이 때문에 ",r.createElement(n.code,null,"board"),"의 위치를 저장해둔 배열을 하나 더 만들었는데 그 과정이 꽤나 까다로웠다. 만약 실전 코테였다면.. 후반부에 나올만한 문제인 것 같은데 이 앞부분 구현하다가 시간 다 날리고 못풀었을 것 같다."),"\n",r.createElement(n.p,null,"뒷 부분은 단순한 다익스트라로 해결할 수 있었다.. 실전에서 틀렸다면 엄청 억울할 듯"),"\n",r.createElement(n.h4,{id:"complexity",style:{position:"relative"}},r.createElement(n.a,{href:"#complexity","aria-label":"complexity permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"time complexity: ",r.createElement(n.code,null,"O(ElogV)")," Edge, Vertex"),"\n",r.createElement(n.li,null,"space complexity: ",r.createElement(n.code,null,"O(V + E)")),"\n"),"\n",r.createElement(n.h4,{id:"code",style:{position:"relative"}},r.createElement(n.a,{href:"#code","aria-label":"code permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-python"},"import heapq\n\nclass Solution:\n    def snakesAndLadders(self, board: List[List[int]]) -> int:\n        N = len(board)\n        INF = 1e9\n        bou = [0 for _ in range(N ** 2 + 1)] \n        dist = [INF for _ in range(N ** 2 + 1)]\n        count = 0\n        # Boustrophedon 접근 인덱스 저장 \n        for i in range(N):\n            for j in range(N):\n                bou[i * N + j + 1] = (N - 1 - i, j if count % 2 == 0 else N - 1 - j)\n            count += 1\n\n        q = [(0, 1)]\n        dist[1] = 0\n        \n        # Dijkstra\n        while q:\n            d, node = heapq.heappop(q)\n            if d > dist[node]:\n                continue\n            \n            for i in range(1, 7):\n                next = min(node + i, N ** 2)\n                i, j = bou[next]\n                # snake or ladder일 경우 목적지 변경\n                if board[i][j] != -1:\n                    next = board[i][j]\n                \n                if dist[next] > d + 1:\n                    heapq.heappush(q, (d + 1, next))\n                    dist[next] = d + 1\n\n        return dist[N ** 2] if dist[N ** 2] != INF else -1\n")),"\n",r.createElement(n.h2,{id:"approach---graph-bfs",style:{position:"relative"}},r.createElement(n.a,{href:"#approach---graph-bfs","aria-label":"approach   graph bfs permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach - Graph: BFS"),"\n",r.createElement(n.p,null,"생각해보니까 각 vertex들 간의 거리가 1이므로 그냥 BFS로도 풀 수 있는 문제였다.\nBoustrophedon 배열을 저장하는 것은 똑같고, 나머지 풀이만 BFS로 바꾸었다."),"\n",r.createElement(n.h4,{id:"complexity-1",style:{position:"relative"}},r.createElement(n.a,{href:"#complexity-1","aria-label":"complexity 1 permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"time complexity:"),"\n",r.createElement(n.li,null,"space complexity:"),"\n"),"\n",r.createElement(n.h4,{id:"code-1",style:{position:"relative"}},r.createElement(n.a,{href:"#code-1","aria-label":"code 1 permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-python"},"from collections import deque\n\nclass Solution:\n    def snakesAndLadders(self, board: List[List[int]]) -> int:\n        N = len(board)\n        bou = [0 for _ in range(N ** 2 + 1)]\n        visited = [False for _ in range(N ** 2 + 1)]\n        count = 0\n        for i in range(N):\n            for j in range(N):\n                bou[i * N + j + 1] = (N - 1 - i, j if count % 2 == 0 else N - 1 - j)\n            count += 1\n\n        q = deque([(1, 0)])\n        visited[1] = True\n\n        while q:\n            cord, d= q.popleft()\n            if cord == N ** 2:\n                return d\n\n            for i in range(1, 7):\n                next = min(cord + i, N ** 2)\n                i, j = bou[next]\n                if board[i][j] != -1:\n                    next = board[i][j]\n                \n                if not visited[next]:\n                    q.append((next, d + 1))\n                    visited[next] = True\n                    \n        return -1\n")))}var o=function(e={}){const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?r.createElement(n,e,r.createElement(l,e)):l(e)},i=t(5670),c=t(1326),s=t(4517),d=t(698),h=t(8627),m=t(662),u=t(1873);const p=({data:e,children:n,serverData:t})=>{const{prevPost:a,nextPost:l}=e,o={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return r.createElement(d.Z,{data:e},r.createElement(i.Z,null,r.createElement(s.Z,o),r.createElement(c.Z,null,n),r.createElement(m.Z,{prev:a,next:l}),r.createElement(h.Z)))};function f(e){return r.createElement(p,e,r.createElement(o,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-algorithm-909-snakes-and-ladders-md-b084a6bf27d4dfdc9ee1.js.map