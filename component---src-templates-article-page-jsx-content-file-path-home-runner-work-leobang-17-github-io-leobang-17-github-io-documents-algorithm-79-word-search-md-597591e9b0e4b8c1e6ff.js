"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[8194],{905:function(e,n,t){t.r(n),t.d(n,{Head:function(){return u.py},default:function(){return v}});var l=t(1151),r=t(7294);function a(e){const n=Object.assign({h2:"h2",a:"a",div:"div",p:"p",code:"code",h4:"h4",ul:"ul",li:"li",pre:"pre"},(0,l.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.h2,{id:"문제",style:{position:"relative"}},r.createElement(n.a,{href:"#%EB%AC%B8%EC%A0%9C","aria-label":"문제 permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"문제"),"\n",r.createElement(n.p,null,r.createElement(n.a,{href:"https://leetcode.com/problems/word-search/description/?envType=study-plan-v2&envId=top-interview-150",target:"_self",rel:"nofollow"},"79. Word Search")),"\n",r.createElement(n.p,null,r.createElement(n.code,null,"m"),"* ",r.createElement(n.code,null,"n"),"의 문자열 배열 ",r.createElement(n.code,null,"board"),"와 문자열 ",r.createElement(n.code,null,"word"),"가 주어진다. ",r.createElement(n.code,null,"board"),"안의 인접한 노드들로 이루어진 문자열로 ",r.createElement(n.code,null,"word"),"를 구성할 수 있는지 확인하고, 구성할 수 있다면 ",r.createElement(n.code,null,"True"),"를, 구성할 수 없다면 ",r.createElement(n.code,null,"False"),"를 반환하라."),"\n",r.createElement(n.h4,{id:"constraints",style:{position:"relative"}},r.createElement(n.a,{href:"#constraints","aria-label":"constraints permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Constraints"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,r.createElement(n.code,null,"m == board.length")),"\n",r.createElement(n.li,null,r.createElement(n.code,null,"n = board[i].length")),"\n",r.createElement(n.li,null,r.createElement(n.code,null,"1 <= m, n <= 6")),"\n",r.createElement(n.li,null,r.createElement(n.code,null,"1 <= word.length <= 15")),"\n",r.createElement(n.li,null,r.createElement(n.code,null,"board and word consists of only lowercase and uppercase English letters.")),"\n"),"\n",r.createElement(n.h2,{id:"approach-1-backtracking",style:{position:"relative"}},r.createElement(n.a,{href:"#approach-1-backtracking","aria-label":"approach 1 backtracking permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Approach 1: Backtracking"),"\n",r.createElement(n.p,null,"기본적인 완전탐색 + 실패지점을 만났을 때 Backtracking 기법을 사용했다."),"\n",r.createElement(n.p,null,"board의 모든 시작점에서부터 인접노드로 dfs를 이용해 완전탐색하면서, 현재 depth의 문자열을 비교해가면서 종료 조건을 맞춘다."),"\n",r.createElement(n.p,null,"재귀함수 바깥의 변수를 재귀 함수 안에서 변경하는데 시간이 좀 걸렸다… 원래는 ",r.createElement(n.code,null,"global")," 키워드로 outer scope의 변수에 접근했었는데, 중첩 함수 안에서는 ",r.createElement(n.code,null,"nonlocal")," 키워드를 사용해야한다더다.\n나는 그냥 재귀함수의 return 값을 조정해주는 방식으로 해결했다."),"\n",r.createElement(n.h4,{id:"complexity",style:{position:"relative"}},r.createElement(n.a,{href:"#complexity","aria-label":"complexity permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Complexity"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"time complexity:"),"\n",r.createElement(n.li,null,"space complexity:"),"\n"),"\n",r.createElement(n.h4,{id:"code",style:{position:"relative"}},r.createElement(n.a,{href:"#code","aria-label":"code permalink",className:"header-links before"},r.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Code"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-python"},"class Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        N, M, K = len(board), len(board[0]), len(word)\n        dx, dy = [-1, 0, 1, 0], [0, 1, 0, -1]\n        visited = [[False for _ in range(M)] for _ in range(N)]\n\n        def traverse(x, y, w, ptr):\n            if word[ptr] != w[ptr]:\n                return False\n            if ptr == K - 1 and word == w:\n                return True\n\n            result = False\n\n            for k in range(4):\n                nx, ny = x + dx[k], y + dy[k]\n                if 0 <= nx < N and 0 <= ny < M and not visited[nx][ny]:\n                    visited[nx][ny] = True\n                    result = traverse(nx, ny, w + board[nx][ny], ptr + 1) or result\n                    visited[nx][ny] = False\n\n            return result \n            \n        for i in range(N):\n            for j in range(M):\n                visited[i][j] = True\n                if traverse(i, j, board[i][j], 0):\n                    return True\n                visited[i][j] = False\n\n        return False\n")))}var c=function(e={}){const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?r.createElement(n,e,r.createElement(a,e)):a(e)},i=t(5670),o=t(1326),s=t(4517),d=t(698),m=t(8627),h=t(662),u=t(1873);const p=({data:e,children:n,serverData:t})=>{const{prevPost:l,nextPost:a}=e,c={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return r.createElement(d.Z,{data:e},r.createElement(i.Z,null,r.createElement(s.Z,c),r.createElement(o.Z,null,n),r.createElement(h.Z,{prev:l,next:a}),r.createElement(m.Z)))};function v(e){return r.createElement(p,e,r.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-home-runner-work-leobang-17-github-io-leobang-17-github-io-documents-algorithm-79-word-search-md-597591e9b0e4b8c1e6ff.js.map