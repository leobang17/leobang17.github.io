---
title: "Database - Index"
createdAt: 2023-10-19
---

인덱스란 DB의 **테이블에 대한 검색 속도를 향상시켜주는 자료구조**이다.

예를들어, `SELECT * FROM customer WHERE first_name = 'Minsoo';` 라는 쿼리가 있다고 해보자. 단순 비교를 통해 색인하는 것이므로 `first_name` column에 index가 걸려있지 않은 경우 DB 엔진은 모든 row를 linear하게 탐색하며 비교할 것이다. 

> 이를 Full Scan 혹은 Table Scan이라고 한다. Full Scan의 시간복잡도는 O(N)이다.

B-Tree index 기반이라면 탐색을 O(logN)으로 처리할 수 있다. 데이터들은 index에 의해 <u>정렬된 형태</u>를 갖는다. 

Index를 사용하는 이유는 다음과 같다. 

- 특정 조건을 만족하는 Tuple(들)을 빠르게 조회하기 위해서
- 빠르게 정렬(order by)하거나 그루핑 (group by)하기 위해서

데이터들은 기본적으로 파일이므로 HDD 혹은 SSD와 같은 디스크 스토리지에 들어가있지만 <u>인덱스는 보통 메인 메모리에 올라가 있는다</u>. 이게 index가 빠른 또 하나의 이유이기도 하다.



##### Index를 만들어보자

index에 대한 column은 중복을 허용할 수도 있다. 이름 같은 경우는 중복될 수도 있잖아. 그러면 mysql같은 경우 다음과 같이 쿼리를 작성하면 된다.

``` sql
CREATE INDEX player_name_idx ON player(name);
```

- player 테이블의 name attribute에 대해 index를 건다.
- 이후부터는 name을 조건 탐색하는 경우 index가 걸려서 색인하게 된다.

```sql
CREATE UNIQUE INDEX team_id_backnumber_idx ON player(team_id, backnumber);
```

- 해당 attribute가 row를 특정할 수 있다면 UNIQUE 인덱스를 생성해줄 수 있다.
- 이렇게 두 개 이상의 attribute로 이루어진 index를 multicolumn index, composite index라고 한다.

이렇게 table이 생성된 이후에 쿼리를 통해 인덱스를 만들어도 되지만 table을 정의할 때부터 index를 정의할 수도 있다. 

<u>Primary Key의 경우 index가 자동으로 생성</u>된다. 



##### B Tree 기반 Index가 어떻게 동작하는지

인덱스를 걸어준 attribute의 column을 복사해서 정렬해놓는다. 그리고 ptr 데이터를 가지고 있음. 이 ptr이 원래 table의 어떤 tuple을 가리키고 있는지에 대한 정보를 저장한다.

만약 `SELECT * FROM members WHERE a = 7 AND b = 95;`의 쿼리를 실행하는데 `a` attribute에만 인덱스가 걸려있다면?

- a의 조건에 맞는 tuple을 찾는데는 logN의 시간복잡도가 필요하지만, a 조건에 부합하는 tuple 안에서는 또다시 full scan을 해주어야 한다.
- 따라서 a, b가 같이 묶여서 많이 조회된다면 composite index를 만드는 것을 고려해보아도 좋다.
  - composite index의 경우 `CREATE INDEX(a, b)` 쿼리의 왼쪽부터 정렬해준다. 
  - a부터 정렬하고 a의 값이 같다면 그 안에서 b를 기준으로 정렬해주는 것.
  - index의 attribute 순서가 다르다! 

만약 a와 b를 섞어 composite index를 걸었는데, b를 조건으로만 색인을 한다면?

- 성능이 안나온다. 먼저 a가 정렬되어있기 때문. 사실상 정렬되어있지 않는 상태다.
- 대부분 Full Scan하게 된다.



**정리하자면, 많이 사용되는 query에 맞추어 적절하게 index를 걸어주면 query의 속도를 개선할 수 있다.** 

player table이 다음과 같다고 하자.

| id   | name | team_id | backnumber |
| ---- | ---- | ------- | ---------- |
| ···  | ···  | ···     | ···        |

index가 걸려있는 항목은 다음과 같다.

- id: pk이므로 기본으로 걸려있음
- name
- (team_id, backnumber)
- backnumber

만약 이 상황에서 `SELECT * FROM player WHERE backnumber = 7;` 쿼리를 실행하면 어떻게 될까? `backnumber` attribute를 이용하는 index는 2개니까! 이 때는 sql optimizer가 적합한 index를 사용해 처리한다. 

근데 가끔씩은 이 optimizer도 빠가가 되어 인덱스를 잘못 선택하는 경우가 있다. 이 때는 직접 이용할 index를 골라 쿼리를 실행할 수도 있다.

```sql
SELECT * FROM player USE INDEX (backnumber_idx) WHERE backnumber = 7;
혹은
SELECT * FROM player FORCE INDEX (backnumber_idx) WHERE backnumber = 7;
```

- `USE INDEX` 키워드의 경우 권장 사항의 느낌. 'optimizer에게 가급적 이 index를 이용해달라' 부탁하는 느낌 
- 무조건 이용하도록 하는 키워드는 `FORCE INDEX` 



##### Index는 막 만들어도 괜찮을까? 성능 향상에 좋은 것 같은데.

Index에는 여러 단점도 존재한다. 

1. index를 위한 추가적인 저장공간이 필요하다.
2. index를 관리하기 위해 추가 작업이 필요하다. 

Index를 생성해줄 때마다 Index를 위한 부가적인 자료구조가 담긴 테이블도 생성된다. 그 것도 모든 column의 값을 복사해서! 그리고 Index 자료구조는 <u>메인 메모리에 상주할 가능성이 높기 때문에 불필요한 메모리 점유를 초래</u>할 수도 있다. 

또한 index는 항상 정렬된 상태로 유지해야하기 때문에 index가 적용된 column에 INSERT, UPDATE, DELETE를 수행하면 정렬을 맞추기 위한 추가 작업이 필요하다. 

- index가 걸린 table이 커질수록 write 작업에 대한 overhead도 늘어나게 된다.
- 또한 데이터의 index를 <u>제거하는 것이 아니라 '사용하지 않음'으로 처리하고 남겨</u>두기 때문에 UPDATE 작업이 많은 경우 실제 데이터 크기에 비해 index가 과도하게 커지는 문제점이 나타날 수 있다.

따라서 불필요한 index는 만들지 않는 것이 중요하다.



##### Index가 오히려 독이 되는 경우 = Full Scan이 더 나은 경우 

table에 데이터가 조금만 있을 경우에는 성능 차이가 거의 없다. 

혹은 조회하려는 데이터가 테이블의 상당 부분을 차지할 때도 오히려 성능 저하를 초래한다.

- 만약 `SELECT * FROM customer WHERE mobile_carrier = 'SK';` 라는 쿼리를 실행해야하는데, SK를 이용하는 이용자가 90% 이상일 경우 full scan하는 것이 더 낫다.
- 물론 full scan할지는 optimizer가 판단한다.
- 성별, 나이와 같이 range가 적은 column의 경우에도 index를 읽고 나서 다시 많은 데이터를 조회해야하므로 비효율적이다.



##### Covering Index 스킬!

만약 `SELECT team_id, backnumber FROM player WHERE team_id = 5;` 라는 쿼리를 실행하는데, 해당 `player` 테이블에 `team_id`와 `backnumber`를 모은 composite index가 걸려있다고 해보자.

이미 index 테이블에 team_id와 backnumber 값은 정렬된 채로 저장되어있는 상태이다. 굳이 B Tree를 색인한 후에 ptr이 가리키는 tuple로 돌아와서 값을 줄 필요 없이, index 테이블에서 바로 꺼내올 수 있는 상태! 

- 조회하려는 attribute들을 index가 모두 cover하고 있는 경우, covering index를 이용하면 조회 속도가 더 빨라진다.



##### Index의 구현 방식 

위에서는 B Tree를 말했지만 Hash를 이용해 구현한 Hash Index도 존재한다.

- 조회 시간복잡도가 O(1)

하지만 단점도 있다.

- rehashing에 대한 부담
- equality 비교만 가능하다. range 비교는 불가능
- multicolumn index의 경우 전체 attributes에 대한 조회만 가능하다.
  - (a, b)로 composite했다면, 조회 조건에 a와 b가 모두 들어가는 경우에만 이용할 수 있다.
  - b tree의 경우 (a, b) composite여도 a로만 검색할 수도 있었음.

hash table 자료구조의 경우 array로 되어있는데, array가 늘어날 경우 어느 지점에서는 이 data size를 늘려주어야 하는데, 이를 rehashing 이라고 한다.

- 트래픽이 막 몰려오는데 rehashing 하는데에 대한 부담



##### order by나 group by에도 index가 사용될 수 있다

##### foreign key에는 index가 자동으로 생성되지 않을 수 있다

join 관련해서 성능 문제가 나타날 수 있기 때문

##### 이미 Data가 몇 백만 건 이상 있는 테이블에 index를 생성하는 경우 시간이 몇 분 이상 소요될 수 있고, DB 성능에 안좋은 영향을 줄 수 있다.

그 시간동안 DB 성능에 안좋은 영향을 줄 수 있겠지? 그냥 read 쿼리면 괜찮은데 index를 생성하는 도중에 write 쿼리가 많이 날아오는 상황이라면··· 더 느려질 것.

트래픽이 적은 시간에 하길 추천.

