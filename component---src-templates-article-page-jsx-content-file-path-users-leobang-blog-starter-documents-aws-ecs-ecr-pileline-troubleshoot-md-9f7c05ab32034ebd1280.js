"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[8592],{1937:function(e,n,t){t.r(n),t.d(n,{Head:function(){return p.py},default:function(){return h}});var l=t(1151),a=t(7294);function i(e){const n=Object.assign({p:"p",ol:"ol",li:"li",ul:"ul",code:"code",h2:"h2",a:"a",div:"div",pre:"pre",h4:"h4",blockquote:"blockquote"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"slack bot을 원래는 그냥 bare한 EC2 instance에 배포할 생각이었다. 빠르게 echo bot을 위한 환경을 구성하고, 업데이트하는 automation을 정의하는게 목적이었으니까. 원래 생각해뒀던 pipeline은"),"\n",a.createElement(n.ol,null,"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"git repo에 push"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"git actions server에서 docker image build 후 ECR에 push"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"ECR Push event를 발생하도록 등록"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"해당 event에 trigger되는 Lambda 정의"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"기존의 docker compose 환경 종료"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"EC2 instance에서 latest version의 image를 pull 받고, 새 image를 기반으로 docker compose 실행"),"\n"),"\n"),"\n"),"\n"),"\n",a.createElement(n.p,null,"였다."),"\n",a.createElement(n.p,null,"어느정도 pipeline 정의를 내린 와중에, 별안간 ECS 환경으로 발걸음을 돌렸다. 이유는 이 쪽이 더 환경 구성 및 코드 통합/배포 과정이 단순하겠다 싶어서였다. 처음 정의했던 ECR 환경의 cicd pipeline은 다음과 같다."),"\n",a.createElement(n.ol,null,"\n",a.createElement(n.li,null,"git repo에 push"),"\n",a.createElement(n.li,null,"git actions server에서 docker image build 후 ECR에 push"),"\n",a.createElement(n.li,null,"AWS CodePipeline 실행","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"Source: ECR repository"),"\n",a.createElement(n.li,null,"Deploy: ECS service"),"\n"),"\n"),"\n"),"\n",a.createElement(n.p,null,"ECR로부터 source해서 ECS 환경으로 deploy를 손쉽게 지원하는 CodePipeline을 지원하기에 금방 세팅할 수 있겠다 싶었는데··· 이 과정에서 생각보다 오래 삽질을 했다."),"\n",a.createElement(n.p,null,"사실 내가 겪은 애로사항들은 일반적인 상황은 아니다. free tier의 범위 안에서 app을 돌리기 위해 리소스 이용을 최소화한 경우기 때문에 대부분의 enterprise 환경에서는 이를 다음과 같은 trouble shooting을 겪을 일이 없지 않을까."),"\n",a.createElement(n.p,null,"ECS의 구성은 다음과 같다."),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"Capacity Provider는 EC2 instance로 이루어진 ASG이다.","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"max, desired capacity 모두 1로 정의한 single instance ASG"),"\n"),"\n"),"\n",a.createElement(n.li,null,"EC2 instance의 type은 free tier를 지원하는 ",a.createElement(n.code,null,"t2.micro"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"1vCPU와 1GB RAM의 시스템 리소스를 가지고 있다."),"\n"),"\n"),"\n",a.createElement(n.li,null,"ECS Service에서 시작하는 task의 수는 1개이다."),"\n"),"\n",a.createElement(n.h2,{id:"did-not-find-the-image-definition-file",style:{position:"relative"}},a.createElement(n.a,{href:"#did-not-find-the-image-definition-file","aria-label":"did not find the image definition file permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Did not find the image definition file"),"\n",a.createElement(n.p,null,"이름 그대로 ",a.createElement(n.code,null,"imagedefinition.json"),"을 정의해주지 않았기 때문에 발생하는 에러. CodePipeline의 Deploy stage에서, deploy의 target이 ECS service일 경우엔 ",a.createElement(n.code,null,"imagedefinitions.json"),"을 참고해서 service에 새로운 task definition의 revision을 배포하게 된다."),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"container name과 image uri가 담긴 json file이다."),"\n",a.createElement(n.li,null,"image definition에 대한 정보는 ",a.createElement(n.a,{href:"https://docs.aws.amazon.com/ko_kr/codepipeline/latest/userguide/file-reference.html",target:"_self",rel:"nofollow"},"Codepipeline: Image definition reference"),"을 참고하자."),"\n"),"\n",a.createElement(n.p,null,"나의 경우엔 CodePipeline에 ECR에서 변경사항을 Source하고, 중간에 ",a.createElement(n.code,null,"imagedefinition.json"),"을 생성해주는 단계 없이 바로 deploy stage로 전달했기 때문에 발생했다."),"\n",a.createElement(n.p,null,"해결방법은 어찌되었건 deploy stage에서 ",a.createElement(n.code,null,"imagedefinition.json"),"을 색인할 위치에 해당 파일을 생성해두는 과정을 pipeline 안에 병합하는 것인데, 2가지 방법이 있다."),"\n",a.createElement(n.ol,null,"\n",a.createElement(n.li,null,"S3 bucket에 직접 업로드"),"\n",a.createElement(n.li,null,"code build stage에서 artifact로 해당 파일을 출력해낸다."),"\n"),"\n",a.createElement(n.p,null,"두번째 방식이 더 쉽다. 해당 pipeline에 CodeBuild stage를 추가해서 deploy stage가 시작되기 전에 ",a.createElement(n.code,null,"imagedefinition.json"),"를 생성해주는 script를 작성했다. build와는 관련이 없기에, 정의한 stage는 post_build부터 시작한다."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-yaml"},'version: 0.2\n\nphases:\n  post_build:\n    commands:\n      printf \'[{"name":"{{container-name}}","imageUri":"{{image-uri}}"}]\' > imagedefinitions.json\nartifacts:\n  files:\n    - imagedefinitions.json\n')),"\n",a.createElement(n.p,null,"이제 잘 찾는다! deploy stage로 진입하는 과정까지는 문제없이 수행된다. 하지만 또 문제는 ···"),"\n",a.createElement(n.h2,{id:"minimum--maximumhealthypercent",style:{position:"relative"}},a.createElement(n.a,{href:"#minimum--maximumhealthypercent","aria-label":"minimum  maximumhealthypercent permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"minimum & maximumHealthyPercent"),"\n",a.createElement(n.p,null,"ECS에서 service를 정의할 때 ",a.createElement(n.code,null,"minimumHealthyPercent"),"와 ",a.createElement(n.code,null,"maximumHealthyPercent"),"는 service의 deploy 및 update 동안 유지되어야 하는 최소 및 최대 실행 task의 비율을 정의한다."),"\n",a.createElement(n.p,null,"minimumHealthyPercent"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"service update 중에 실행 상태를 유지해야하는 task의 최소 비율."),"\n",a.createElement(n.li,null,"전체 task 수의 일정 비율이 service update 중에도 계속 실행되어야 함을 의미한다."),"\n",a.createElement(n.li,null,"rolling 배포 도중의 최소한의 가용성을 정의하는데 쓰인다."),"\n"),"\n",a.createElement(n.p,null,"maximumHealthyPercent"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"service update 중에 실행될 수 있는 task의 최대 비율."),"\n",a.createElement(n.li,null,"전체 task 수의 최대 허용량을 나타낸다."),"\n",a.createElement(n.li,null,"만약 task의 수를 10개로 설정해두고 해당 task를 실행하는 service의 maxPercent를 200%로 정의했다면, 해당 service는 update 도중 최대 20개의 task (기존 10개 + 새 task 10개)까지 동시에 실행할 수 있다."),"\n"),"\n",a.createElement(n.p,null,"두 지표에 대해서 잘 알지 못한 채 default setting을 따랐던 것 때문에 삽질을 좀 했다··· 문서를 잘 읽자."),"\n",a.createElement(n.h4,{id:"insufficient-cpu-units-available",style:{position:"relative"}},a.createElement(n.a,{href:"#insufficient-cpu-units-available","aria-label":"insufficient cpu units available permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Insufficient CPU Units Available"),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"service (",a.createElement(n.code,null,"service-name"),") was unable to place a task because no container instance met all of its requirements. The closest matching container-instance ",a.createElement(n.code,null,"container-instance-id")," has insufficient CPU units available. - ",a.createElement(n.a,{href:"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-event-messages-list.html#service-event-messages-2",target:"_self",rel:"nofollow"},"ECS Service event messages")),"\n"),"\n",a.createElement(n.p,null,"task 배치에 이용되는 container instance CPU unit이 task definition에서 요구하는 것에 미치지 못하기 때문에 발생하는 에러."),"\n",a.createElement(n.p,null,"분명 실행할 task를 1개로 제한해두었고 CPU unit 할당도 여유롭게 해두었는데 발생한 에러라 의아했다.  게다가 배포 전략을 rolling으로 설정해두었으니 그냥 manual 하게 task 종료 후 revision된 task 실행하는 것과 동일하다고 생각했었다."),"\n",a.createElement(n.p,null,"문제는 service를 정의할 때 ",a.createElement(n.code,null,"minimumHealthyPercent"),"와 ",a.createElement(n.code,null,"maximumHealthyPercent")," 값이 default로 각각 100%, 200%로 설정된다는 점이다. 따라서 정의했던 task는 1개지만, 해당 service를 update하는 과정에서 기존의 task를 1개 유지한 채, 새로운 revision된 task를 하나 더 실행함으로써 2개의 task가 동시에 실행된다."),"\n",a.createElement(n.p,null,"이 탓에 CPU unit 부족 에러가 발생했다."),"\n",a.createElement(n.h4,{id:"unable-to-stop-or-start-tasks",style:{position:"relative"}},a.createElement(n.a,{href:"#unable-to-stop-or-start-tasks","aria-label":"unable to stop or start tasks permalink",className:"header-links before"},a.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"unable to stop or start tasks"),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"service (",a.createElement(n.code,null,"service-name"),") was unable to stop or start tasks during a deployment because of the service deployment configuration. Update the minimumHealthyPercent or maximumPercent value and try again. - ",a.createElement(n.a,{href:"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-event-messages-list.html#service-event-messages-7",target:"_self",rel:"nofollow"},"ECS Service event messages")),"\n"),"\n",a.createElement(n.p,null,"위와 같은 이유로 일단은 ",a.createElement(n.code,null,"maximumHealthyPercent"),"를 100%로 낮췄다. 문제는 ",a.createElement(n.code,null,"minimumHealthyPercent"),"를 0%로 지정했어야 했는데, 임의로 50%로 지정했었다. task의 수의 percentage를 말하는지 모르고 단순하게 생각해서 발생한 문제··· 문서를 잘 읽자."),"\n",a.createElement(n.p,null,"정의된 task는 1개인데 당연히 이를 50%로 drop down 할 수는 없다. 0%로 정의해야지 기존의 task를 중지하고 새 task를 실행할 수 있게 된다."),"\n",a.createElement(n.p,null,"max - 100, min - 0 으로 설정해주니 pipeline이 ECS service 전달까지 문제없이 실행되었다."))}var r=function(e={}){const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(i,e)):i(e)},c=t(5670),m=t(1326),s=t(4517),o=t(698),u=t(8627),d=t(662),p=t(1873);const E=({data:e,children:n,serverData:t})=>{const{prevPost:l,nextPost:i}=e,r={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return a.createElement(o.Z,{data:e},a.createElement(c.Z,null,a.createElement(s.Z,r),a.createElement(m.Z,null,n),a.createElement(d.Z,{prev:l,next:i}),a.createElement(u.Z)))};function h(e){return a.createElement(E,e,a.createElement(r,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-aws-ecs-ecr-pileline-troubleshoot-md-9f7c05ab32034ebd1280.js.map