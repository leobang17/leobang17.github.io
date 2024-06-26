---
title: "AWS Cloud Best Practice"
createdAt: 2023-08-27
---

# AWS Well-Architected Framework

### 운영 우수성 (Operational Excellence)

- 코드를 통한 운영
- 애자일한 배포 (실패할 경우 되돌릴 수 있는 작은 증분으로 변경 내용을 적용한다)
- 실패 예측
- 실패로부터 학습

### 보안 (Security)

- 전송 및 보관시 데이터 보호할 것 (암호화, 토큰화 및 access control을 이용해서)

- IAM으로 강력한 자격증명 기반 구현
- VPC로 인프라 보호하기
- CloudWatch로 감시 제어하기 - 로그 및 메트릭 수집을 시스템과 통합해 자동으로 조사하고 조치를 취할 것
- 모든 layer에 보안을 적용할 것

### 안정성 (Reliability)

- 자동화된 장애 복구
  - workload의 KPI를 모니터링하면 threshold를 넘어설 때 자동화된 로직을 수행하도록 trigger할 수 있다.
- 복구 절차 테스트
- 수평적 확장으로 workload 전체 가용성 증대
- 자동화된 scaling 관리

### 성능 효율성 (Performance Efficiency)

- 고급 기술을 직접 구현하지 말고 클라우드 서비스 우리꺼 쓰셈 ㅋ 다 해놨어 쓰기만 해
- 서버리스 아키텍처 사용 
  - 서버리스 스토리지 서비스를 정적 웹사이트로 사용하고 이벤트 서비스를 통해 코드를 호스팅할 수 있다. 이 경우 물리적 서버 관리로 인한 운영 부담이 없어진다.

### 비용 최적화 

- AutoScaling을 활용해 필요한 자원만 이용하기



### 지속 가능성



https://d1.awsstatic.com/whitepapers/AWS_Cloud_Best_Practices.pdf

# Scalability (확장성)

### Scaling Vertically (수직적 확장)

머신의 성능 자체를 높이는 방향

### Scaling Horizontally (수평적 확장)

필요에 따라 머신의 개수를 수평적으로 늘리는 방향이다. 수평적 확장에는 여러 시나리오가 있다. 

#### Stateless Application의 경우 

대부분의 appliation은 session 정보를 활용하는 경우가 많다. session이란 application 이용시 request 간의 상태를 유지하는 저장공간이다. **session을 활용하지 않는 application을 stateless application이라고 한다.** stateless application는 수평적 확장에 있어 머신이 서로 신경쓸 일이 없다. workload를 어떻게 분산하는지만 신경쓰면 된다.

#### 여러 노드간 부하를 분산하는 방법

workload를 여러 노드로 분산하는 메커니즘에는 2가지가 있다. push와 pull이다.

*push 모델*에서는 로드밸런싱을 활용한다. Elastic Load Balancing (ELB) 기술 중 NLB (Network Load Balancer)를 이용하거나, ALB (Application Load Balancer)를 이용하면 된다. NLB는 Layer 4에서 로드밸런싱을 수행하고, ALB는 Layer 7에서 로드밸런싱을 수행한다. ALB는 따라서 콘텐츠 기반 라우팅이 가능하다.

혹은 Route 53을 이용해 DNS 로드밸런싱을 이용할 수도 있다. DNS query가 요청될 때, 동일한 host에 대해 연결된 머신의 IP를 round-robin으로 응답해주는 방식이다. 하지만 DNS 레코드는 TTL이나 DNS 캐시 등 AWS가 컨트롤할 수 없는 부분이 늘어나므로 권장하는 방법은 아니다.

*pull 모델*은 비동기적, 이벤트 기반으로 부하를 분산한다. pull 모델에서는 처리되어야 할 작업들이 SQS의 메시지큐나 Kinesis의 스트리밍에 저장되어, 다수의 머신이 해당 작업들을 분산하여 consume하는 방식이다.

#### Stateless Components 만들기

세션 정보를 DB에 저장하는 건 어때? DynamoDB를 이용해보라. 대부분의 플랫폼은 native session을 Dyanmo에 저장하는 라이브러리가 구현되어있다.

큰 스토리지가 필요한 시나리오에는? 이 파일들을 S3나 Elastic File System (EFS)와 같은 공유 스토리지 레이어에 저장해둔다면 stateful component 문제를 해결할 수 있을 것.

각 execution에 대한 상태를 확인해야하는 복잡한 다단계 workflow가 필요한 시나리오에는? Step Functions를 이용해 execution 히스토리를 저장하고 이러한 동작들을 stateless하게 유지할 수 있을 것이다. 

#### Stateful Components은 어떻게 수평적으로 확장할까

stateless로 전환할 수 없는 아키텍처 레이어도 존재한다. DB 레이어가 그러하다. DB는 항상 stateful하다.

혹은, realtime 연결성이 요구되는 애플리케이션의 경우도 stateful을 선택해야하는 경우가 있다. 게임 서버 같은 것이 그러하다. 레이턴시가 중요하기 때문에 같은 서버로만 연결하는 것이 효율적이다. session affinity를 설정한다면 이와 같은 stateful component도 수평적으로 확장할 수 있다. 물론 단점도 존재한다. 증설된 노드가 필요없어져 terminate되었을때, 기존의 노드에 session이 연결되어있던 클라이언트는 정보를 잃게 된다.

> ##### Session Affinity (= Sticky Session)
>
> 분산된 노드가 요청을 수행할 때, 동일한 클라이언트로부터의 요청에 대해서는 로드밸런서가 항상 동일한 노드로 라우팅시키는 것을 뜻한다. 지속적인 connection을 요구하는 stateful component에 필수적인 기능이다. (분산 노드가 있을 경우) 대부분 cookie-base로 구현할 수 있고, cookie는 보안에 취약하기에 http-only를 설정하는 것을 권장한다.

#### Session Affinity 적용하기

ALB에 sticky session을 적용하면 된다. session이 유지되는 동안 ALB는 동일한 서버에 요청을 라우팅할 것이다. 

로드밸런서가 지원하지 않은 통신 프로토콜을 이용할 경우. 혹은 서비스 제공자가 client -> server 간의 통신 시나리오를 완벽히 통제해야하는 경우 (게임 서버와 같이 실시간의 경우 중요할 수 있다.) 클라이언트 쪽에서 로드밸런싱을 수행할 수 있다. 

client가 요청을 보낼 때 어느 서버에 보낼지 결정해야한다. 단순하게 DNS를 이용할 수도 있고 valid한 서버를 찾는 API를 개발해 직접 query를 수행해도 된다. 대신 이 경우 로드밸런서가 대신 해줄 health-check 같은 작업들도 client-side가 수행해야한다.

#### Distributed Processing을 이용해 수평적 확장하기

하나의 compute 리소스만으로 처리할 수 없는 크기의 데이터를 핸들링해야한다면, distributed processing을 고려해보아도 좋다. 큰 task를 작은 청크로 나누고 이를 여러 compute resource에 병렬적으로 처리한다.

AWS Batch, AWS Glue, Apache Hadoop과 같은 분산처리 데이터 처리 엔진을 이용해 오프라인 배치 job을 수평적으로 확장해 처리할 수 있다. 아마존 EMR을 이용해 EC2 인스턴스 위에 Hadoop 작업을 실행할 수 있다. 실시간 스트리밍 데이터 처리를 위해서는 Kinesis 파티션 데이터를 만들어 Lambda와 EC2가 consume 하도록 할 수 있다.



# Disposable Resources Instead of Fixed Servers

클라우드 compute resource는 원하는 시점에 원하는 만큼만 리소스를 dispose할 수 있다. 이 instantiating 과정을 자동화하고 싶어할텐데 . . . .

#### Bootstrapping 스크립트 

EC2나 RDS DB 인스턴스 같은 리소스를 띄우면 일단 기본 설정으로 시작한다. 배포 스크립트를 작성해 부트 스트랩 시점에 필요한 디펜던시들을 설치하거나 머신 설정을 변경할 수 있다.

#### Golden Image 이용하기

OS 영역을 포함해 필수 디펜던시나 보안 설정이 적용된 머신 image이다. 특정 AWS 리소스 타입의 생성 시에 적용할 수 있는데, 부트스트랩 과정이 매우 빨라진다는 장점이 있다. auto-scaled 환경같이 빠르게 안정적으로 머신을 띄워야하는 경우에 이용하기 좋다. 

이미 있는 EC2의 설정을 AMI로 바꾸거나, VM 환경을 AMI로 export할 수도 있다. Image는 설정이 바뀔때마다 다시 구워야하므로 팀이 이용하는 환경이라면 컨벤션을 가지고 Image 히스토리를 관리해야한다.

#### Container 이용하기 (Docker)

#### Hybrid로 둘 다 이용하기

잘 변하지 않는 디펜던시나 설치 소프트웨어들은 image로 구워놓고, 자주 변하는 설정들은 script로 관리할 수도 있다. Elastic Beanstalk이 이러한 예시이다. 미리 구성된 런타임 환경이 image로 실행되고, bootstrap action들도 `.ebextensions` 설정 파일로 정의할 수 있다. 

#### 

# Loose Coupling... 그리고 MSA

### Service Discovery

MSA와 같은 분산환경은 서비스 간의 원격 호출로 구성이 된다. 물론 이 때 client 역할의 서비스에 요청을 보낼 IP 주소를 하드코딩해도 되지만, coupling이 높아진다. 또한 클라우드 환경이 되면서 서비스가 auto-scailing 등에 의해 동적으로 확장되거나, 혹은 서비스의 IP가 동적으로 변경되는 일이 잦아졌다. 이 때 하드코딩한 IP로는 이 확장성을 견디기 힘들어진다.

client가 network topology detail을 모르더라도, cloud 인스턴스 설정이 달라지더라도 호출할 수 있도록 구성해야한다 이를 위해 client 서비스가 다른 서비스를 호출할 때 IP와 port를 알아낼 수 있는 기술을 Service Discovery라고 한다.

##### Client-side discovery vs Server-side discovery

사실 service discovery는 로드 밸런싱과 유사하다. 서비스 인스턴스들의 IP와 port를 저장하고 있는 service registry가 존재하고, client는 이 registry에 요청을 보내야할 주소를 쿼리한다. 

Client 서비스가 직접 service registry에 쿼리하는 방식을 client-side discovery라고 하고, ELB를 이용해 client 서비스는 밸런서를 호출하고, 밸런서가 service registry에 쿼리해 응답해주는 방식을 server-side discovery라고 한다.

service regisrty는 가장 쉽게는 DNS 레코드에 하나의 호스트명에 여러 개의 IP를 등록하는 방식으로 구현이 가능하다. 그런데 DNS는 레코드 업데이트시 반영되기 까지 시간이 필요하기 때문에 그다지 적절한 구현 방식은 아니다. service registry를 전문적으로 제공하는 솔루션을 이용하는 것이 좋다. Netflix의 Eureka나 Hashcorp의 Consul 같은 서비스가 있다.

### 실패 관리 

https://jungseob86.tistory.com/12

결합도 (coupling)을 줄이는 또 하나의 방법은 모듈 간의 실패를 올바르게 관리하는 것이다. MSA와 같은 분산 환경에서는 각 모듈은 네트워크 API 콜로 연결된다. 네트워크 호출은 언제 어떻게 실패할지 예측하기 어렵기 때문에 이를 올바르게 관리하는 것은 중요하다.

#### Retry 전략

분산 시스템에서 서비스 간 API 호출 실패에 대한 retry 전략은 매우 중요하다. 단 1번의 호출 실패로 모든 비즈니스 로직을 실패처리하거나 fallback하는 것은 큰 리소스 낭비로 이어질 수 있다. 비즈니스 로직의 실패 응답이 아닌 네트워크 장애로 인한 Read Timeout 응답을 받는 경우, 보통은 최대 3회의 호출 재시도를 실행한다. 

> ##### Connection Timeout vs Read Timeout
>
> Connection Timeout은 TCP connection을 시도하는 3way-handshack 과정의 패킷이 유실되어 응답이 지연될 때 돌아오는 실패응답이다.
>
> Read Timeout은 TCP connection은 맺어졌으나 그 뒤에 전달되는 데이터들의 패킷이 유실되어 응답이 지연될 때 돌아오는 실패 응답이다.

하지만 평범한 Retry 전략은 오히려 네트워크에 부담을 가중할 수 있다. 안 그래도 터진 네트워크에 모든 client가 3회씩이나 호출을 재시도하면... 

##### Exponential Backoff

retry 콜을 지수적으로 시간 간격을 늘려 시행하는 것. 예를 들어 첫번째 재시도를 위한 대기시간은 100ms, 두번째는 200ms, 세번째는 400ms 처럼. 하지만 exponential backoff 전략도 동일한 시간에 호출이 몰릴 수 있다.

##### Jitter

Jitter는 원래 데이터 통신 용어로 패킷 지연이 일정하지 않고 그 간격이 수시로 변하는 현상을 의미한다. 이처럼 retry 콜도 랜덤하게 보내서 트래픽이 특정 시간에 몰리는 것을 방지할 수 있다.

AWS에서도 모든 retry 콜에 대해 Exponential Backoff 알고리즘을 Jitter와 함께 사용한다.



# Database

### 관계형 DB 

#### Scalability (확장성)

수직적 확장을 위해서는 RDS의 DB 인스턴스의 사양을 높이거나, storage를 빠르게 할 수 있다. Amazon Aurora는 AWS가 지원하는 DB 엔진이니까 한번 써보소ㅋ

##### Read Replica

Read-heavy 애플리케이션을 위한 수평적 확장은 **Read Replica**를 통해 달성할 수 있다. Read Replica는 분산된 DB 인스턴스들로, Primary 노드에 반영된 write 변경사항들이 비동기적으로 다른 replica들에 전파된다. 

Replica들은 당연히 Lag나 정보 지연에 노출되어있다. 따라서 변경사항 반영이 꼭 필요한 핵심 쿼리들은 Primary 노드에 보내도록하고 비교적 실시간성이 불필요한 read 쿼리들을 Replica에 분산시켜야 한다. 당연히 Read Replica들에는 write 쿼리를 보내면 안된다.

##### Data Partitioning과 Sharding

Write-heavy 애플리케이션을 위한 수평적 확장은 **Data Partitioning** 혹은 **Sharding**을 통해 달성할 수 있다. Sharding은 데이터셋을 Shard라고 하는 작은 청크로 나누어 저장하는 기술을 뜻한다. 

AWS에서는 하나의 DB 인스턴스가 하나의 Shard인 듯 하다. 이런 경우에는 애플리케이션 레벨에서 샤딩을 구현할 수 있다. 애플리케이션 코드의 DB 엑세스 레이어가 요청 쿼리에 따라 어떤 Shard, 즉 DB 머신에 라우팅 시켜야하는지 Shard key를 lookup한 후 올바른 Shard에 요청을 보내도록 말이다. 

주로 Sharding은 애플리케이션 레벨에서 이루어지나, 일부 DB 엔진은 플랫폼 차원의 Sharding을 제공하기도 한다.

### NoSQL DB

NoSQL DB들은 일반적으로 Partitioning과 Replica를 통한 수평적 확장을 DB 단에서 지원한다. 따라서 RDB처럼 Data Access Layer에서 Sharding을 구현하지 않아도 된다.

join 연산이 많이 일어난다면 NoSQL을 선택하는게 안티패턴이다. RDB를 선택해 정규화를 잘 하고 join 쿼리를 잘짜는 방식으로 변경하자.

### Search

Search는 query와 헷갈리기 쉬운데, 이 둘은 서로 다른 개념이다. query는 우선 정형화된 데이터 셋을 정형화된 방법으로 read 혹은 write 하는 행위이다. search는 구조가 없는 데이터 셋을 색인하는 작업이다. search는 별개의 기능이므로 이를 위해 나온 솔루션을 이용하는 것을 권장한다.

Amazon의 제품은 CloudSearch와 ElasticSearch가 있다. 



# 큰 볼륨의 데이터 관리하기 

Data Lake라는 아키텍처를 고민해보자. Data Lake란 엄청난 양의 데이터를 schema 없이 중앙화된 저장소 한 곳에 쏟아붓는 것이다. 미리 정의된 스키마에 맞게 구조를 변형시킬 필요가 없고 그냥 원형 그대로 (As-Is) 저장하면 된다. 그리고 필요한 곳에 맞게 그룹화해 처리하면 된다.



# Single Point of Failure (단일 실패지점) 관리하기

### 상태 모니터링 하기

ELB나 Route53을 이용해 Health check를 주기적으로 수행해 죽은 노드에 호출을 보내지 않도록 관리할 수 있다. 또한 죽어버린 노드를 자동으로 대체해주는 AWS의 서비스도 이용할 수 있다. Auto Scaling이나 EC2 Auto-recovery 기능이나 Beanstalk을 이용하면 된다.

3 티어 아키텍처에서는 일반적으로 로드밸런서가 health check를 수행한다. 단순한 TCP health check 만으로는 unhealthy한 노드를 발견하기 힘들 수도 있다. 인스턴스 자체는 문제가 없더라도 웹 서버 프로세스가 터져있을 수도 있기 때문이다. 그 대신 웹 서버에 단순한 요청을 보내보아서 200 응답이 오는지 체크하는 것도 좋은 방법.

때로는 deep health check로 그 밑의 layer까지 검사할 수도 있다. 인스턴스 뒤의 DB 레이어까지 검사해서 DB와의 연결이 unhealthy하다면 인스턴스 역시 unhealthy하다고 평가하는 것.

### 데이터베이스 Replication

##### Synchronous Replication

write query에 대해서 primary 노드 뿐 아니라 replica들까지 반영되었을 때 transaction이 인식된다. data integrity (통합성)이 중요한 경우에 채택할 수 있다. 모든 replica 노드들도 최신의 정보들을 가지고 있다. 대신 퍼포먼스나 가용성은 조금 타협해야겠지. 내구성과는 별개로 버저닝이 안되니 백업이 불가능하다. 당장 S3만 보아도 파일 수정 히스토리가 모두 보이니 롤백이 가능하다. 

##### Asynchronous Replication

write query의 transaction을 비동기적으로 primary 노드로부터 replica들에게 전파함으로서 primary 노드와 replica의 coupling을 줄인다. lag에 신경쓰지 않아도 되는 쿼리들을 replica에 날린다. 다양한 AWS Region에 recovery 솔루션으로 asynchronous replica들을 배치할 수 있다.



# 비용 최적화

### EC2 구매 옵션을 잘 살펴보아요

##### Reserved Instance 

1년 혹은 3년 단위로 이용하기로 예약 (reservation)을 걸어놓고 그 약정만큼 저렴한 이용료로 이용하는 것. 환불은 어렵다고 한다...

##### Spot Instance

AWS에 남아있는 서버 여유 공간을 빌려 사용하는 방식이다. 그 가격은 수시로 바뀌며, 입찰하듯이 특정 가격에 인스턴스를 이용할 수 있다. 물론 디폴트인 on-demand보다는 훨씬 싸다. 인스턴스 시세가 입찰가 이상으로 올라가면 2분의 유예기간을 주고 인스턴스 제공을 중단한다. 중단된 인스턴스는 기본적으로 종료되지만 설정을 통해 중지 혹은 최대 절전 모드로 들어가게 할 수 있다. 

할당된 리소스를 회수하면 서버가 죽어버리므로 실패 관리가 매우 중요하겠다... 일반적인 웹 서버나 DB 머신에는 적합하지 않은 구매 옵션이다.

