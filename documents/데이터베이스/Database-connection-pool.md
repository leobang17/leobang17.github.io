---
title: "Database Connection Pool"
createdAt: 2023-11-07
---

데이터베이스 서버와의 통신은 대부분 TCP 기반으로 동작한다. 

TCP는 연결지향적으로 동작하기 때문에 데이터를 주고 받기 전 connection을 생성하고, connection을 닫는다. 

- 이 connection을 맺거나 푸는데 은근히 시간이 많이 잡아먹힌다.
- 3way, 4way로 동작하기 때문에 

백엔드 관점에서 생각해보면 매번 connection을 열고 닫는 시간적인 비용이 낭비된다. 처리하는 request가 실시간으로 매우 많기 때문이다. 

서비스의 성능에 안좋은 영향을 끼치게 된다. 

이걸 어떻게 해결할까 고민해서 나오게된 해결책이 DBCP이다.

---

Application 서버를 띄울 때, 즉, 본격적으로 request를 받기 전에 DB connection을 미리 맺어놓는다. (Open Connection)

- TCP 기반이므로 미리 3way handshake로 
- 연결된 connection을 마치 pool 처럼 관리한다.
- DB 서버로의 네트워크 I/O가 필요한 경우에는 DB Connection Pool에서 connection을 빌려와서 그 connection을 바탕으로 데이터를 주고 받는다.
- 통신이 모두 끝난 뒤에는 다시 DBCP로 connection을 반환한다.
  - close connection

DBCP는 백엔드 개발하면 항상 쓰인다! 어떻게 동작하는지, 어떤 장점이 있는지는 알아두는 것이 좋다.



DB Connection은 BE 서버와 DB 서버 사이의 connection을 의미하므로 둘 각각에서의 configuration 방법을 잘 알고 있어야 한다.





## DB 서버 Configuration 

max_connections

- client와 맺을 수 있는 최대 connection의 수를 말한다.
- 만약 max_connections = 4로 설정했는데, 어느 BE application의 DBCP의 connection 수가 4라면?
- 이미 모두 가능한 connection을 맺어버린 상태
  - 만약 요청이 ㅈㄴ 많이 들어와서 로드밸런싱을 하자고 결정해 새 instance를 띄웠다고 생각하자.
  - max_connection에 임계인 connection이 맺혀있으므로 해당 instance의 애플리케이션은 connection을 새로 맺지 못한다···
- 이런 의미에서 max_connection의 파라미터가 굉장히 중요하다.


wait_timeout

- DB 서버에서 connection이 inactive할 때 (놀고 있을 때) 다시 요청이 오기까지 얼마의 시간을 기다린 뒤에 close할 것인지를 결정 
- 비정상적인 connection 종료나 connection을 다 쓰고 반환이 안된 경우. 혹은 네트워크 문제로 둘의 통신에 문제가 될 수도.
  - 해당 connection은 누군가가 점유는 하고있지만 더이상 쓰고 있지 않은 이상한 상태가 된다.
  - DB 서버 입장에서는 어찌되었든 정상적으로 열려있는 connection이라고 생각할 수 밖에 없다.
- 60초로 설정햇다고 하면, 마지막 request를 기준으로 60초를 기다리고 그 뒤에도 요청이 오지 않는다면 해당 connection을 끊어버린다.



## DBCP Configuration (BE Application 측)

minumumIdle 

- pool에서 유지하는 최소한의 idle connection 수
- 아무런 일을 하지 않고 놀고 있는 유휴 connection을 최소한으로 몇개를 잡을 것인가 
- idle connection 수가 `minimumIdle`보다 작고, 전체 connection 수도 `maximumPoolSize`보다 작다면 신속하게 추가로 connection을 맺어 pool에 대기시킨다.
- 만약 idle connection 수가 `minimumIdel` 보다 크다면 minumum에 맞게 connection을 없앤다.
  - 만약 minumumIdle=2, maximumPoolsize=4 라면?
- 기본 값은 maxPoolSize와 동일하다. 
  - 그대로 쓰는 것을 권장한다. 둘이 같을 수 있도록 권장함 
  - 그말인 즉, pool의 size가 항상 고정이라는 것이다.
  - 둘의 사이즈가 다르면 connection을 맺고 풀면서 pool의 사이즈를 조정하는 과정이 중간에 유동적으로 생기는데, 애초에 dbcp를 만든 이유가 connection 비용을 줄이기 위한 것. -> request가 몰려오는 상황에서 성능을 악화시킬 수 있으므로 그냥 pool size를 고정해두고 이용하는 것을 권장한다.
- 실무에서도 pool size를 넉넉하게 잡아놓고 고정으로 이용하는 경우가 많다.

maximumPoolSize

- pool이 가질 수 있는 최대 connection의 수 
  - idle과 active (in-use: 실제로 요청을 수행하고 있는) connection을 합친 수 

maxLifeTime

- pool에서 connection의 최대 수명 
- maxLifetime을 넘기면 idle일 경우 pool에서 바로 제거한다.
- active인 경우 pool로 반환된 후 제거
  - 이말인 즉, pool로 반환이 안되면 maxLifetime은 동작하지 않는 다는 것이다.\
  - 다 쓴 connection은 pool로 반환을 시켜주는 것이 매우 중요하다···
  - mysql에서 wait timeout에 걸려서 connection 
- 제거되면 pool size가 변하잖아? 아님. pool size를 고정해놓은 경우 그 숫자만큼으로 다시 증설한다.