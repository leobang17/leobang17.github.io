"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[1333],{7371:function(e,l,n){n.r(l),n.d(l,{Head:function(){return E.py},default:function(){return d}});var t=n(1151),r=n(7294);function a(e){const l=Object.assign({h1:"h1",a:"a",div:"div",p:"p",strong:"strong",em:"em",blockquote:"blockquote",ul:"ul",li:"li",code:"code",h2:"h2",pre:"pre",h3:"h3",ol:"ol"},(0,t.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(l.h1,{id:"shell",style:{position:"relative"}},r.createElement(l.a,{href:"#shell","aria-label":"shell permalink",className:"header-links before"},r.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Shell"),"\n",r.createElement(l.p,null,"shell은 유저 input 커맨드를 받아들여 kernel이 이해할 수 있는 형태로 전달하는 역할을 한다. 즉, ",r.createElement(l.strong,null,"유저와 OS의 kernel 사이의 통역사 역할"),"이 shell 프로그램의 본질이다."),"\n",r.createElement(l.p,null,r.createElement(l.strong,null,"Shell의 종류와 Startup 파일의 역할")),"\n",r.createElement(l.p,null,"Shell이 실행되는 환경은 ",r.createElement(l.em,null,"interactivity와 login 여부"),"에 따라서 그 종류를 나눌 수 있다."),"\n",r.createElement(l.p,null,"Shell이 시작될 때, 해당 shell을 이용하기 위한 환경을 구성해주는 작업이 필요하다. startup 파일은 shell이 시작될 때 실행할 수 있는 커맨드를 포함하는 파일이다. Shell이 시작될 때 shell은 이 startup 파일들을 읽어들여 shell 환경을 구성하게 된다."),"\n",r.createElement(l.p,null,"shell의 종류마다 읽어들이는 startup 파일이 다르며, 이 글을 통해 shell의 종류와 각 상황에서 읽어들이는 startup 파일에 대해 알아보겠당."),"\n",r.createElement(l.blockquote,null,"\n",r.createElement(l.p,null,r.createElement(l.strong,null,"startup 파일")),"\n",r.createElement(l.p,null,"대부분 Linux 배포판에 default로 제공하는 bash shell의 경우 다음과 같은 startup 파일들이 있다."),"\n",r.createElement(l.ul,null,"\n",r.createElement(l.li,null,"\n",r.createElement(l.p,null,r.createElement(l.code,null,"/etc/profile")),"\n"),"\n",r.createElement(l.li,null,"\n",r.createElement(l.p,null,r.createElement(l.code,null,"/etc/bash.bashrc")),"\n"),"\n",r.createElement(l.li,null,"\n",r.createElement(l.p,null,r.createElement(l.code,null,"~/.bash_profile")),"\n"),"\n",r.createElement(l.li,null,"\n",r.createElement(l.p,null,r.createElement(l.code,null,"~/.bash_login")),"\n"),"\n",r.createElement(l.li,null,"\n",r.createElement(l.p,null,r.createElement(l.code,null,"~/.profile")),"\n"),"\n",r.createElement(l.li,null,"\n",r.createElement(l.p,null,r.createElement(l.code,null,"~/.bashrc")),"\n"),"\n"),"\n"),"\n",r.createElement(l.h2,{id:"interactive-shell-vs-non-interactive-shell",style:{position:"relative"}},r.createElement(l.a,{href:"#interactive-shell-vs-non-interactive-shell","aria-label":"interactive shell vs non interactive shell permalink",className:"header-links before"},r.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Interactive Shell vs Non-Interactive Shell"),"\n",r.createElement(l.p,null,"Shell이 실행되는 환경을 user와의 상호작용(Interaction)이 필요한지 여부에 따라 두 가지로 나누어 볼 수 있다."),"\n",r.createElement(l.p,null,"Interactive Shell인지 아닌지는 다음 커맨드를 통해서 확인할 수 있다. Interactive Shell의 경우 직접 커맨드를 입력하면 되고, Non-Interactive Shell의 경우 스크립트에 다음 커맨드를 추가하면 된다."),"\n",r.createElement(l.pre,null,r.createElement(l.code,{className:"language-shell"},"$ [[ $- == *i* ]] && echo ‘Interactive’ || echo ‘not-interactive’\n")),"\n",r.createElement(l.h3,{id:"interactive-shell",style:{position:"relative"}},r.createElement(l.a,{href:"#interactive-shell","aria-label":"interactive shell permalink",className:"header-links before"},r.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Interactive Shell"),"\n",r.createElement(l.p,null,"user input과 같이 user와 상호작용(interact)이 필요한 shell 환경을 interactive shell이라고 한다. prompt에 커맨드를 입력하는 shell은 모두 Interactive Shell."),"\n",r.createElement(l.p,null,"Interactive Shell의 경우 ",r.createElement(l.strong,null,"shell이 실제로 사용되기 전에 shell environment를 설정하기 위한 startup 파일이 필요"),"하다."),"\n",r.createElement(l.p,null,"이 startup 파일들은 후술할 login shell인지, non-login shell인지에 따라 로드되는 대상이 달라진다. 후술할 항목 참조."),"\n",r.createElement(l.h3,{id:"non-interactive-shell",style:{position:"relative"}},r.createElement(l.a,{href:"#non-interactive-shell","aria-label":"non interactive shell permalink",className:"header-links before"},r.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Non-Interactive Shell"),"\n",r.createElement(l.p,null,"shell ",r.createElement(l.strong,null,"script 파일"),"을 실행하는 경우는 항상 non-interactive shell이다. 예를들어, ",r.createElement(l.code,null,".sh")," 스크립트를 실행하기 위해 child shell을 fork하는 경우, fork 된 child shell은 non-interactive shell이다."),"\n",r.createElement(l.p,null,r.createElement(l.strong,null,"non-interactive shell은 startup 파일을 실행(source)하지 않으며"),", 부모 shell의 설정 값을 상속받게 된다. 그리고 ",r.createElement(l.code,null,"BASH_ENV"),"의 환경 변수 값을 이용하게 된다."),"\n",r.createElement(l.h2,{id:"login-shell-vs-non-login-shell",style:{position:"relative"}},r.createElement(l.a,{href:"#login-shell-vs-non-login-shell","aria-label":"login shell vs non login shell permalink",className:"header-links before"},r.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Login Shell vs Non-login Shell"),"\n",r.createElement(l.p,null,"shell을 시작할 때 로그인 과정이 필요한지 여부에 따라서 두 가지로 분류할 수 있다."),"\n",r.createElement(l.h3,{id:"login-shell",style:{position:"relative"}},r.createElement(l.a,{href:"#login-shell","aria-label":"login shell permalink",className:"header-links before"},r.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Login Shell"),"\n",r.createElement(l.p,null,"remote host에 ",r.createElement(l.em,null,"로그인 과정을 거쳐 사용하게 되는 shell")," 환경을 Login Shell이라고 한다."),"\n",r.createElement(l.p,null,"Login Shell의 좋은 예시는 ",r.createElement(l.a,{href:"https://linux.die.net/man/1/ssh",target:"_self",rel:"nofollow"},"ssh"),"이다. ssh client를 이용해서 remote host에 로그인하면 Login Shell이 시작된다."),"\n",r.createElement(l.blockquote,null,"\n",r.createElement(l.p,null,r.createElement(l.strong,null,"SSH란")),"\n",r.createElement(l.p,null,"ssh은 Secure Shell의 약어로, ",r.createElement(l.strong,null,"remote machine에 안전하게 접속하기 위해 사용되는 보안 프로토콜"),"이다. local machine과 remote machine간에 오고가는 패킷의 내용을 ssh key를 이용해 암/복호화하는 기술이 ssh 프로토콜의 핵심이다."),"\n"),"\n",r.createElement(l.p,null,"interactive login shell이 시작될 때, shell은 다음의 startup 파일들을 순서대로 찾아서 실행한다:"),"\n",r.createElement(l.ol,null,"\n",r.createElement(l.li,null,r.createElement(l.code,null,"/etc/profile")),"\n",r.createElement(l.li,null,r.createElement(l.code,null,"~/.bash_profile")),"\n",r.createElement(l.li,null,r.createElement(l.code,null,"~/.bash_login")),"\n",r.createElement(l.li,null,r.createElement(l.code,null,"~/.profile")),"\n"),"\n",r.createElement(l.p,null,"2, 3, 4의 경우 그 순서대로 가장 먼저 발견되는 startup 파일만 source하고, 나머지는 무시한다."),"\n",r.createElement(l.blockquote,null,"\n",r.createElement(l.p,null,r.createElement(l.code,null,".profile")," 과 ",r.createElement(l.code,null,".bash_profile"),"이 두 가지가 존재하는 이유는 ",r.createElement(l.code,null,"sh"),"와 ",r.createElement(l.code,null,"bash"),"를 구분하기 위해서이다. bash가 사용될 경우, ",r.createElement(l.code,null,".bash_profile"),"이 존재하면 ",r.createElement(l.code,null,".profile"),"은 실행되지 않는다."),"\n"),"\n",r.createElement(l.h3,{id:"non-login-shell",style:{position:"relative"}},r.createElement(l.a,{href:"#non-login-shell","aria-label":"non login shell permalink",className:"header-links before"},r.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Non-login Shell"),"\n",r.createElement(l.p,null,r.createElement(l.em,null,"터미널 프로그램을 실행시켜 사용하는 shell"),"을 Interactive Non-Login Shell 환경 이라고 한다. prompt가 보이고 유저가 커맨드를 입력해 shell과 상호작용할 수 있지만 shell을 열 때 로그인 과정이 필요하지는 않다."),"\n",r.createElement(l.p,null,"Non-login shell이 시작될 때, shell은 다음의 startup 파일을 순서대로 찾아서 실행한다:"),"\n",r.createElement(l.ol,null,"\n",r.createElement(l.li,null,r.createElement(l.code,null,"/etc/bash.bashrc")),"\n",r.createElement(l.li,null,r.createElement(l.code,null,"~/.bashrc")),"\n"),"\n",r.createElement(l.h2,{id:"각-shell-환경의-조합",style:{position:"relative"}},r.createElement(l.a,{href:"#%EA%B0%81-shell-%ED%99%98%EA%B2%BD%EC%9D%98-%EC%A1%B0%ED%95%A9","aria-label":"각 shell 환경의 조합 permalink",className:"header-links before"},r.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"각 Shell 환경의 조합"),"\n",r.createElement(l.ul,null,"\n",r.createElement(l.li,null,r.createElement(l.strong,null,"Interactive Login Sell"),": ssh나 telnet을 이용해 remote host에 접근하는 상황"),"\n",r.createElement(l.li,null,r.createElement(l.strong,null,"Interactive Non-Login Shell"),": 새 터미널을 열었을 때"),"\n",r.createElement(l.li,null,r.createElement(l.strong,null,"Non-Interactive Login Shell"),": non-interactive하게 login 과정을 거칠일은 자연스러운 상황에서는 드물다… ",r.createElement(l.code,null,"echo command |ssh server")," 이런 식으로"),"\n",r.createElement(l.li,null,r.createElement(l.strong,null,"Non-Interactive Non-Login Shell"),": 거의 모든 non-interactive shell은 non-login shell이다. script가 실행되거나 자동화된 프로세스가 실행되는 shell 환경."),"\n"),"\n",r.createElement(l.h2,{id:"references",style:{position:"relative"}},r.createElement(l.a,{href:"#references","aria-label":"references permalink",className:"header-links before"},r.createElement(l.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"References"),"\n",r.createElement(l.ul,null,"\n",r.createElement(l.li,null,"\n",r.createElement(l.p,null,r.createElement(l.a,{href:"https://www.baeldung.com/linux/bashrc-vs-bash-profile-vs-profile",target:"_self",rel:"nofollow"},"Baeldung: Difference between .bashrc, .bash_profile, and .profile")),"\n"),"\n",r.createElement(l.li,null,"\n",r.createElement(l.p,null,r.createElement(l.a,{href:"https://www.geeksforgeeks.org/shell-scripting-interactive-and-non-interactive-shell/",target:"_self",rel:"nofollow"},"Geeks for geeks: Shell Scripting - Interactive and Non-Interactive Shell")),"\n"),"\n",r.createElement(l.li,null,"\n",r.createElement(l.p,null,r.createElement(l.a,{href:"https://askubuntu.com/questions/879364/differentiate-interactive-login-and-non-interactive-non-login-shell",target:"_self",rel:"nofollow"},"ask Ubuntu: Differentiate Interactive login and non-interactive non-login shell")),"\n"),"\n",r.createElement(l.li,null,"\n",r.createElement(l.p,null,r.createElement(l.a,{href:"https://mug896.github.io/bash-shell/login_non-login.html",target:"_self",rel:"nofollow"},"BASH shell script: Login vs Non-Login Shell")),"\n"),"\n"))}var c=function(e={}){const{wrapper:l}=Object.assign({},(0,t.ah)(),e.components);return l?r.createElement(l,e,r.createElement(a,e)):a(e)},i=n(5670),s=n(1326),h=n(4517),o=n(698),m=n(8627),u=n(662),E=n(1873);const v=({data:e,children:l,serverData:n})=>{const{prevPost:t,nextPost:a}=e,c={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return r.createElement(o.Z,{data:e},r.createElement(i.Z,null,r.createElement(h.Z,c),r.createElement(s.Z,null,l),r.createElement(u.Z,{prev:t,next:a}),r.createElement(m.Z)))};function d(e){return r.createElement(v,e,r.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-home-runner-work-leobang-17-github-io-leobang-17-github-io-documents-linux-shell의-종류와-startup-파일-md-fbbf6868ac351b5f2679.js.map