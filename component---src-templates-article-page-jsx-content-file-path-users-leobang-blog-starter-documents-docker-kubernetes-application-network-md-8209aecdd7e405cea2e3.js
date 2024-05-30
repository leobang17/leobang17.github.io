"use strict";(self.webpackChunkgatsby_theme_simplex=self.webpackChunkgatsby_theme_simplex||[]).push([[2439],{3799:function(e,t,n){n.r(t),n.d(t,{Head:function(){return p.py},default:function(){return h}});var l=n(1151),r=n(7294);function a(e){const t=Object.assign({h2:"h2",a:"a",div:"div",p:"p",strong:"strong",pre:"pre",code:"code",ul:"ul",li:"li",blockquote:"blockquote",h4:"h4"},(0,l.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(t.h2,{id:"pod-내부의-컨테이너끼리-통신-loopback-ip를-이용한다",style:{position:"relative"}},r.createElement(t.a,{href:"#pod-%EB%82%B4%EB%B6%80%EC%9D%98-%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88%EB%81%BC%EB%A6%AC-%ED%86%B5%EC%8B%A0-loopback-ip%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C%EB%8B%A4","aria-label":"pod 내부의 컨테이너끼리 통신 loopback ip를 이용한다 permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Pod 내부의 컨테이너끼리 통신: Loopback IP를 이용한다."),"\n",r.createElement(t.p,null,"Pod는 다수의 container를 가질 수 있다. 다만 하나의 Pod에 container를 여러 개 포함하는 것은 특별한 목적이 없다면 추천하는 구성은 아니다. 동일한 Pod에 포함된 container는 모든 라이프사이클과 replication을 공유하기 때문이다."),"\n",r.createElement(t.p,null,"띠라서 하나의 Pod에 여러 container를 구성하는 경우에는 그 Pod의 목적에 맞는 main container와 sub container로 구분지어 구성하는 것이 좋다. 이와 같은 구성을 ",r.createElement(t.strong,null,"Sidecar 패턴"),"이라고 한다. 예를들면, 애플리케이션 container와 해당 application이 출력하는 로그를 수집하기 위한 수집기 container를 동일한 Pod에서 실행하도록 구성할 수 있다."),"\n",r.createElement(t.p,null,"이 때에는 Pod의 Liveness Probe를 main container 쪽으로 지정해서 Pod의 라이프사이클을 이 쪽에 고정시킨다."),"\n",r.createElement(t.p,null,"Pod는 kubernetes에서 다루는 가장 작은 단위의 오브젝트이기 때문에 쪼개지지 않는다. 하나의 Pod에서 여러 개의 container를 실행할 경우 모든 container는 저장공관과 네트워크 인터페이스를 공유한다. (= 로컬 환경에서 여러 개의 애플리케이션을 실행할 때와 동일한 환경이다.)"),"\n",r.createElement(t.p,null,"Pod 내부에서는 loopback IP를 이용해서 서로 통신할 수 있다. (loopback ip의 기본 도메인인 localhost를 입력해도 된다.)"),"\n",r.createElement(t.h2,{id:"pod-간-통신-service-오브젝트를-이용한다",style:{position:"relative"}},r.createElement(t.a,{href:"#pod-%EA%B0%84-%ED%86%B5%EC%8B%A0-service-%EC%98%A4%EB%B8%8C%EC%A0%9D%ED%8A%B8%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C%EB%8B%A4","aria-label":"pod 간 통신 service 오브젝트를 이용한다 permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Pod 간 통신: Service 오브젝트를 이용한다"),"\n",r.createElement(t.p,null,"Pod가 어떤 노드에 배치될지는 실행될 때 결정되기 때문에 Pod의 IP 주소를 미리 알기는 어렵다. 포트 번호 역시 Pod가 실행될 때 노드가 임의로 배정해주기 때문에 특정하기 어렵다. 또한 Pod는 여러가지 이유로 삭제와 생성을 반복하며, 다수의 복제본을 가질 수도 있기 때문에  Pod 간 통신에서 상대 Pod를 직접적으로 가리켜 통신하는 경우는 많지 않다."),"\n",r.createElement(t.p,null,"이를 위해서 동일한 ReplicaSet 내의 ",r.createElement(t.strong,null,"Pod에 대한 단일 진입점 및 로드밸런싱 역할을 하는 Service 오브젝트"),"를 사용한다. Pod가 다른 Pod를 호출할 때는 Pod에 연결된 Service 오브젝트를 호출하는 방식을 사용한다."),"\n",r.createElement(t.p,null,"Service 오브젝트의 manifest 명세는 다음과 같다:"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata:\n\tname: my-service\nspec:\n\tselector:\n\t\ttype: backend\n  ports:\n  - protocol: TCP\n  \tport: 3000\n  \ttargetPort: 8080\n")),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"cluster 내 배치된 Pod 중 selector가 ",r.createElement(t.code,null,"type: backend"),"인 Pod를 서비스의 대상으로"),"\n",r.createElement(t.li,null,"해당 Service는 3000번 port로 cluster에 노출한다."),"\n",r.createElement(t.li,null,"해당 Service에 대한 요청을 대상 Pod의 8080 port로 포워딩한다."),"\n"),"\n",r.createElement(t.blockquote,null,"\n",r.createElement(t.p,null,"Selector란 kubernetes cluster 내에서 원하는 오브젝트를 식별하기 위해 부여하는 임의의 식별자이다."),"\n"),"\n",r.createElement(t.p,null,"애플리케이션에서 다른 Pod를 호출하려면 어떻게 해야할까? cluster 내부의 ",r.createElement(t.strong,null,"Service 오브젝트의 이름"),"을 도메인으로 호출하면된다."),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-java"},'WebClient client = WebClient.create("http://my-service:3000");\nclient.get().uri("/healthchech/ping").retrieve();\n')),"\n",r.createElement(t.p,null,"Service는 기본적으로 후방의 Pod에게 트래픽을 균등하게 나누어주려고 노력한다. Round Robin 방식으로 트래픽을 분배하지만, Pod의 상태, session affinity 설정 등 다양한 상황에 영향을 받아 트래픽을 분산시킨다."),"\n",r.createElement(t.p,null,"여러 Replica로 구성된 Pod를 운용한다면 Replica 중 어떠한 Pod에 요청이 도달하더라도 작업의 일관성에 문제가 없도록 개발하는 것을 권장한다. 즉, ",r.createElement(t.strong,null,"stateless"),"한 애플리케이션을 설계해아한다는 것이다."),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"상태를 Pod 내부 볼륨이나 메모리에 의존하지 말고,"),"\n",r.createElement(t.li,null,"외부의 source에 의존해야한다."),"\n"),"\n",r.createElement(t.h2,{id:"cluster-외부에서-pod를-호출하는-방법",style:{position:"relative"}},r.createElement(t.a,{href:"#cluster-%EC%99%B8%EB%B6%80%EC%97%90%EC%84%9C-pod%EB%A5%BC-%ED%98%B8%EC%B6%9C%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95","aria-label":"cluster 외부에서 pod를 호출하는 방법 permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Cluster 외부에서 Pod를 호출하는 방법"),"\n",r.createElement(t.p,null,"기본적으로 cluster에 생성한 Pod와 Service는 외부에 노출되지 않는다. (Service 오브젝트의 default type은 ",r.createElement(t.code,null,"ClusterIP"),"로, cluster 내부의 private IP 주소를 할당받는다. 외부에는 노출되지 않는다) cluster 외부에서 Pod를 호출하기 위해서는:"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"Service를 외부에서 호출 가능한 타입으로 생성 (",r.createElement(t.code,null,"NodePort")," 혹은 ",r.createElement(t.code,null,"LoadBalancer"),")"),"\n",r.createElement(t.li,null,"Ingress 오브젝트"),"\n"),"\n",r.createElement(t.p,null,"의 방식을 채택할 수 있다."),"\n",r.createElement(t.h4,{id:"nodeport를-이용해-서비스를-노출해보자",style:{position:"relative"}},r.createElement(t.a,{href:"#nodeport%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%84%9C%EB%B9%84%EC%8A%A4%EB%A5%BC-%EB%85%B8%EC%B6%9C%ED%95%B4%EB%B3%B4%EC%9E%90","aria-label":"nodeport를 이용해 서비스를 노출해보자 permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),r.createElement(t.code,null,"NodePort"),"를 이용해 서비스를 노출해보자."),"\n",r.createElement(t.p,null,r.createElement(t.code,null,"NodePort"),"는 ",r.createElement(t.strong,null,"클러스터 내의 모든 노드에 대해서 특정 Port를 개방"),"하여 해당 포트를 통해 접근할 수 있게 하는 Service 타입이다. 따라서 ",r.createElement(t.code,null,"30007")," port를 설정한다면, 해당 cluster에 대해 ",r.createElement(t.code,null,"30007"),"번 포트로 요청을 보낸다면 어떤 노드에 대해서건 Service 오브젝트는 해당 포트로 요청을 수신한다."),"\n",r.createElement(t.p,null,"NodePort는 kubernetes가 지정한 범위 (30000 ~ 32767) 내에서 할당할 수 있다. 직접 지정하지 않을 경우 kubernetes가 범위 내 비어있는 port를 알아서 할당한다."),"\n",r.createElement(t.p,null,"다음과 같이 NodePort 타입의 Service를 정의할 수 있다:"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata:\n\tname: my-nodeport-service\nspec:\n\ttype: NodePort # 설정하지 않으면 default는 ClusterIP\n\tselector: \n\t\tapp: MyApp\n  ports:\n  \t- port: 80\t\t\t\t\t# service의 port\n  \t\ttargetPort: 9376\t# Pod가 노출하고 있는 port \n  \t\tnodePort: 30007\t\t# 노드의 Port\n")),"\n",r.createElement(t.p,null,"NodePort의 경우엔 개방 가능한 port의 범위가 2767개로 제한되어있다. 또한, kubernetes가 port를 자동으로 할당하도록 설정했다면 매번 호출 주소를 변경해주어야 하며 직접 port를 정의했다면 해당 port가 중복 이용되지 않도록 별도로 관리해야하기 때문에 실제 운영환경에서는 이용하기 부적합하다."),"\n",r.createElement(t.p,null,"작은 규모의 cluster에서 빠르게 외부로 노출해보고자 하는 테스트 환경일 때 이용을 권장한다."),"\n",r.createElement(t.p,null,"여기서 궁금한 점이 생길 수 있다. 이미 NodePort를 이용해서 호출할 수 있는 실제 Port를 열어두었는데, service port는 왜 필요한건지?"),"\n",r.createElement(t.p,null,"NodePort와 service port는 그 용도와 동작원리에 차이점이 존재한다. 먼저, NodePort는 외부 네트워크 요청을 위해 개방한 port로, ",r.createElement(t.strong,null,"실제로 해당 노드에서 port를 개방"),"하게 된다. 그리고 외부에서의 요청은 NodePort의 port를 통해 인입된다."),"\n",r.createElement(t.p,null,"반면, Service의 port는 cluster 내부의 Pod간 통신을 위해 정의된 port로, Service 자체가 노드의 특정 port를 개방하지는 않는다. Service 오브젝트는 cluster 내부에서 service discovery와 load balancing을 관리하는 논리적인 엔티티이므로, ",r.createElement(t.strong,null,"실제 노드의 port를 사용하지 않는다"),". 그렇기 때문에 Service의 port는 동일한 cluster 내에서도 중복될 수 있다."),"\n",r.createElement(t.p,null,"예를들어, service1 과 service2 모두 80번 port를 사용하더라도, 각각 ",r.createElement(t.code,null,"service1:80"),", ",r.createElement(t.code,null,"service2:80"),"으로 service discovery가 가능하므로 문제가 없다."),"\n",r.createElement(t.p,null,"반면 NodePort는 실제 노드의 특정 port를 개방하기 때문에, NodePort 서비스간의 NodePort는 서로 유일해야한다."),"\n",r.createElement(t.h4,{id:"loadbalancer-타입의-service를-이용해-서비스를-노출해보자",style:{position:"relative"}},r.createElement(t.a,{href:"#loadbalancer-%ED%83%80%EC%9E%85%EC%9D%98-service%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%84%9C%EB%B9%84%EC%8A%A4%EB%A5%BC-%EB%85%B8%EC%B6%9C%ED%95%B4%EB%B3%B4%EC%9E%90","aria-label":"loadbalancer 타입의 service를 이용해 서비스를 노출해보자 permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"LoadBalancer 타입의 Service를 이용해 서비스를 노출해보자"),"\n",r.createElement(t.p,null,"Service 오브젝트의 타입을 LoadBalancer로 지정하면 Service 오브젝트를 클라우드 서비스에서 제공하는 로드밸런서와 연결할 수 있다.  다음과 같이 정의할 수 있다:"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata: \n\tname: my-service\nspec:\n\ttype: LoadBalancer\n\tselector: \n\t\tapp: this-is-my-app\n  ports:\n  \t- protocol: TCP\n\t  \tport: 3000\n  \t\ttargetPort: 8080\n")),"\n",r.createElement(t.p,null,"이렇게 지정한 서비스를 apply하면, CSP가 자동으로 로드밸런서를 생성해서 할당 + 매핑해준다. 외부에서 CSP의 로드밸런서 ip + service의 port 조합으로 해당 Service에 접근할 수 있다."),"\n",r.createElement(t.h4,{id:"ingress-오브젝트를-이용해-서비스를-노출해보자",style:{position:"relative"}},r.createElement(t.a,{href:"#ingress-%EC%98%A4%EB%B8%8C%EC%A0%9D%ED%8A%B8%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%84%9C%EB%B9%84%EC%8A%A4%EB%A5%BC-%EB%85%B8%EC%B6%9C%ED%95%B4%EB%B3%B4%EC%9E%90","aria-label":"ingress 오브젝트를 이용해 서비스를 노출해보자 permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Ingress 오브젝트를 이용해 서비스를 노출해보자"),"\n",r.createElement(t.p,null,"Ingress 오브젝트는 서비스에 포함되지 않는 독립적인 오브젝트이지만 cluster 외부에서 오는 트래픽을 규칙에 따라 분류하여 service에 전달해주는 역할을 한다. Ingress는 여러 서비스 접근에 대한 단일 진입점으로서"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"domain 기반 라우팅"),"\n",r.createElement(t.li,null,"path 기반 라우팅"),"\n"),"\n",r.createElement(t.p,null,"으로 후방의 Service에게 요청을 포워딩해줄 수 있다. NginX나 Apache Httpd와 같은 고전적인 controller 역할을 생각하면 딱 알맞다."),"\n",r.createElement(t.p,null,"이 외에도 SSL/TLS termination과 같은 기능을 제공하기도 한다."),"\n",r.createElement(t.p,null,"Ingress Objcet는 다음과 같이 정의할 수 있다:"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-yaml"},'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata: \n\tname: my-ingress\nspec:\n\tingressClassName: nginx\n\trules:\n\t- host: "myapp.mydomain.com"\n\t\thttp:\n\t\t\tpaths:\n\t\t\t\t- path: /\n\t\t\t\t\tpathType: Prefix\n\t\t\t\t\tbackend:\n\t\t\t\t\t\tservice:\n\t\t\t\t\t\t\tname: my-service\n\t\t\t\t\t\t\tport:\n\t\t\t\t\t\t\t\tnumber: 3000\n\t- host: "*.mydomain.com"\n\t\thttp:\n\t\t\tpaths:\n\t\t\t\t- path: / \n\t\t\t\t\tbackend: \n\t\t\t\t\t\tservice:\n\t\t\t\t\t\t\tname: my-service-2\n\t\t\t\t\t\t\tport:\n\t\t\t\t\t\t\t\tnumber: 8080\n  \t\t\t- path: /users\n  \t\t\t\tbackend:\n  \t\t\t\t\tservice:\n  \t\t\t\t\t\tname: user-service\n  \t\t\t\t\t\tport:\n  \t\t\t\t\t\t\tnumber: 3000\n\t\t\t\t\t\t\t\t\t\n')),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"Ingress Controller로 nginx를 사용한다."),"\n",r.createElement(t.li,null,r.createElement(t.code,null,"myapp.mydomain.com"),"의 요청을 my-service:3000에 포워딩한다."),"\n",r.createElement(t.li,null,r.createElement(t.code,null,"*.mydomain.com"),"의 요청을 my-service-2:8080에 포워딩한다."),"\n",r.createElement(t.li,null,r.createElement(t.code,null,"*.mydomain.com/users"),"의 요청을 user-service:3000에 포워딩한다."),"\n"),"\n",r.createElement(t.blockquote,null,"\n",r.createElement(t.p,null,r.createElement(t.strong,null,"와일드카드를 이용한 도메인 구분시 주의사항")),"\n",r.createElement(t.p,null,"Ingress에서 ",r.createElement(t.code,null,"*.mydomain.com"),"으로 와일드카드를 지정하면 ",r.createElement(t.code,null,"api.mydomain.com"),"의 도메인은 대상이 되지만, ",r.createElement(t.code,null,"test.api.mydomain.com"),"의 도메인은 대상이 되지 않는다. 또한 서브 도메인이 존재하지 않는 apex 도메인인 경우에도 (",r.createElement(t.code,null,"mydomain.com"),") 라우팅의 대상에서 제외된다."),"\n"),"\n",r.createElement(t.p,null,"여기에서, Ingress Controller는 라우팅을 실제로 처리하는 컴포넌트이다. Ingress Controller는 cluster에 설치하는데, 설치되어있지 않은 경우 Ingress 오브젝트를 정의해도 라우팅은 정상 동작하지 않는다. Ingress Controller는 AWS, GCP 등 CSP에서 제공해주는 로드 밸런서와 연계되어 동작할 수도 있으며, nginx, HAProxy 등의 SW를 통해 구성할 수도 있다. 보통은 nginx 기반의 controller를 많이 사용한다."),"\n",r.createElement(t.p,null,"상황에 맞게 외부 네트워크와의 통신 옵션을 고려해야겠지만, 많은 경우 Ingress가 적합하다. 도메인, 경로 기반 라우팅을 이용해 HTTP 요청을 제어할 수 있으며 여러 서비스에 대한 단일 진입점을 제공하기 때문이다. kubernetes에 대부분의 자원이 포함되어있고, 대부분의 요청이 HTTP로 이루어진다면 네트워크 영역의 추상화 수준을 높이기 위해 Ingress를 사용하는 선택이 적절할 수 있다."),"\n",r.createElement(t.h2,{id:"reference",style:{position:"relative"}},r.createElement(t.a,{href:"#reference","aria-label":"reference permalink",className:"header-links before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Reference"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"클라우드 네이티브 프로그래밍을 위한 쿠버네티스 개발 전략"),"\n"))}var c=function(e={}){const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?r.createElement(t,e,r.createElement(a,e)):a(e)},o=n(5670),i=n(1326),s=n(4517),m=n(698),E=n(8627),d=n(662),p=n(1873);const u=({data:e,children:t,serverData:n})=>{const{prevPost:l,nextPost:a}=e,c={...e.mdx.frontmatter,timeToRead:e.mdx.fields.timeToRead};return r.createElement(m.Z,{data:e},r.createElement(o.Z,null,r.createElement(s.Z,c),r.createElement(i.Z,null,t),r.createElement(d.Z,{prev:l,next:a}),r.createElement(E.Z)))};function h(e){return r.createElement(u,e,r.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-article-page-jsx-content-file-path-users-leobang-blog-starter-documents-docker-kubernetes-application-network-md-8209aecdd7e405cea2e3.js.map