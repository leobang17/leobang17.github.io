---
title: "테이블을 나누는 방법: 파티셔닝과 샤딩"
createdAt: 2023-10-21
---

## Partitioning이란

database table을 더 작은 크기의 테이블로 나누는 것을 말한다. 

##### Vertical Partitioning이란?

<u>Column을 기준으로 table을 나누는</u> 방식이다. 따라서 테이블의 스키마가 바뀌며, 새로운 테이블이 한 개 이상 생기게 된다.

> 정규화 역시 vertical partitioning의 한 방식이다. 

![image-20231026120943090](/Users/leobang/Library/Application Support/typora-user-images/image-20231026120943090.png)

Select문을 실행하면, 아무리 select에 원하는 column만을 지정해두어도 일단 query가 동작하는 방식은 해당 테이블의 row를 모두 가져온 후에 원하는 column만 반환하게 된다. 예를들어:

```sql
SELECT id, title, ... ,commend_cnt FROM article WHERE ...;
```

- 이 SQL문을 실행하더라도 실제 schema에 content라는 attribute가 있다면 그 것까지 모두 HDD 혹은 SSD에서 읽어들인다는 뜻이다.

그런데 만약 읽기가 자주 일어나는 query에 불필요한 attribute의 크기가 굉장히 큰 경우라면? 불필요하게 I/O에 영향을 주게 된다. (물론 index를 잘 걸어두었거나 했다면 괜찮지만 full-scan을 했을 때는 체감이 될 수도 있다.)

이 때 ARTICLE 테이블에서 content 속성을 빼고, 새로운 ARTICLE_CONTENT 테이블에 해당 속성을 추가하여 따로 색인할 수 있도록 분리하는 것을 vertical partitioning 이라고 한다.

##### Horizontal Partitioning이란? 

Row를 기준으로 table을 나누는 방식이다. 따라서 테이블의 스키마는 변함이 없다.

만약 인덱스를 걸어두었을 경우, 테이블의 크기가 커질수록 인덱스의 크기도 커지게 된다. 즉, 테이블에 읽기/쓰기가 있을 때마다 index에서 처리되는 시간도 조금씩 늘어난다는 뜻이다.

이렇게 하나의 테이블이 너무너무 row가 많아졌을 때 수평으로 뎅강해서 테이블을 나누는 것을 horizontal partitioning이라고 한다.



##### Horizontal Partitioning을 구현하는 방법: Hash-Based

Hash function을 하나 마련한다. 특정 key를 넣어주면 해당 key의 row가 저장되어 있는/저장될 테이블을 가리키는 값을 반환해준다.

- 이 때 Hash function에 입력되는 key를 <u>Partition Key</u>라고 부른다.

Partitoin Key를 올바르게 설계하는 것은 매우 중요하다. 다음의 예시를 생각해보자:

- partition key를 user_id로 지정했지만, 어떠한 query의 경우 member_name을 기준으로 SELECT를 하고 싶다면? 
- 이 때는 모든 수평분할된 테이블을 조회해주어야 한다. member_name을 기준으로 나눈게 아니기 때문이다.

- 따라서, <u>가장 많이 사용될 패턴에 따라 partition key를 정해주는 것</u>이 굉장히 중요하다.

또한, 데이터가 균등하게 분배될 수 있도록 hash function을 잘 정의하는 것도 중요하다.

Horizontal Partitioning의 단점은 <u>한번 partiton이 나눠져서 사용되고 있다면 이후에 partiton을 추가하기 까다롭다</u>는 점이다.

- 파티션을 {0 , 1}로 나누어 파티셔닝을 운용하고 있다가 나중에 파티션을 {0, 1, 2, 3}으로 늘리고 싶다고 생각해보자.
- 이는 가능하긴 하지만 {0, 1}의 데이터를 다시 {0, 1, 2, 3}으로 나눌 hash funciton을 재정의하고 해당 hash에 따라 데이터를 모두 옮겨주어야 하므로 부하가 큰 작업이 될 수 있다. 초반에 설계를 잘 하자.



## Sharding이란? 

Horizontal Partitoning처럼 동작한다. 개념 자체는 동일하다! 하지만 Horizontal Partitioning과 다른 점은 <u>각각의 파티션이 서로 다른 DB 서버에 저장 되어있다</u>는 점이다.

> Horizontal Partitioning의 경우 각 파티션이 동일한 DB 서버에서 동작한다.

부하를 분산시킬 수 있으므로 트래픽이 큰 서비스의 경우 샤딩을 잘 이용하면 좋다.

샤딩의 경우 partiton key를 shard key라고 부르고, 각 partition을 shard라고 부른다.



## Replication이란? 

Master/Primary/Leader 노드가 있고, 이를 바라보고 있는 복사본인 Slave/Secondary/Replica 노드라고 한다. 

마스터 노드의 변경사항이 생기면 (write) 이를 전파하는데, 그 방식은 동기적일 수도 있고 비동기적으로 구성될 수도 있다. 그리고 read 요청이 올 경우 read replica에게 부하를 분산해줄 수 있다.

Fail over에도 능하다. master가 죽었을 경우 다른 replica를 승격시키면 되므로. 이를 통해 <u>HA (고가용성)</u>을 획득할 수 있다.

