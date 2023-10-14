---
title: "UUID 타입에 대한 에러... 저장은 하지만 조회를 못한다. (feat. PostgreSQL)"
createdAt: 2022-10-06
---

## What

```
java.lang.AssertionError: 
Expecting actual not to be null
```

<br />

## When

```java
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "users")
public class User extends BaseEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   @Column(name = "user_id")
   private UUID id;
```

에 대해 잘 생성되는지 테스트 하고있었다. 

insert 쿼리도 날아가고, JPA persistence context에도 관리가 되는 상태였다. `user.getId()`를 호출하면 올바른 uuid가 나왔었다.

하지만 해당 id로 `EntityManager.find` 메서드를 호출하면 null 값이 반환된다...

<br />
<br />

## Why

#### Postgres가 매핑을 못하나? Postgres가 uuid를 매핑하는 방법을 알아보자.

https://docs.jboss.org/hibernate/orm/5.4/userguide/html_single/Hibernate_User_Guide.html#basic-provided

Hibernate는 JDBC 명세에서 권장하는 natural 매핑을 준수하는 몇가지 built-in basic type을 제공한다. 내부적으로 Hibernate는 특정 `org.hibernate.type.Type`을 resolve하기 위해 basic type의 registry를 이용한다.

Hibernate에서 제공하는 BasicType중 PostgreSQL의 UUID 타입은 다음과 같다. 

| Hibernate Type  (org.hibernate.type package) | JDBC type | Java Type | BasicTypeRegistry Keys (s)
| -- | -- | -- | --
PostgresUUIDType | PostgreSQL UUID -> PosgreSQL JDBC 드라이버 definition으로 컴파일됨 | java.util.UUID | pg-uuid

그런데 type을 `PostgreSQLUUIDType`으로 주면 datasource와 dialect가 PostgreSQL로 설정되어 있는 main 앱은 ddl이 잘 실행이 되지만, postgresql을 호환하는 h2로 되어 있는 test path에서는 dialect 때문에 에러가 생긴다. 해당 타입은 H2에서 지원을 안하는 듯 ...</span></p>

<br />



https://docs.jboss.org/hibernate/orm/5.4/userguide/html_single/Hibernate_User_Guide.html#_uuid_as_binary

PostgreSQL Dialect를 사용하는 경우, PostgreSQL-specific UUID Hibernate type (`PostgresUUIDType`)타입이 디폴트로 UUID에 매핑된다.  **PostgreSQL JDBC driver**가 `OTHER` 코드를 선택해 UUID 타입을 매핑한다. 사실 애초에 `PostgresUUIDType`을 명시할 필요가 없었다! 알아서 JDBC 드라이버가 매핑해주니.

실제로, PostgreSQL이 main의 ddl에서는 user_id 컬럼에 대해서 자료형을 알아서 uuid로 매핑하게 된다.

```
Hibernate: 
    create table word (
       word_id bigint not null,
        created_at timestamp,
        updated_at timestamp,
        word varchar(255),
        user_id uuid,
        primary key (word_id)
    )
```

그런데, test path에서는 UUID를 binary(255)로 매핑한다. 

``` 
Hibernate: 
    create table word (
       word_id bigint not null,
        created_at timestamp,
        updated_at timestamp,
        word varchar(255),
        user_id varchar(255),
        primary key (word_id)
    )
```

<br />


#### PostgreSQL JDBC 드라이버가 매핑을 해주니 테스트 path에 driver 설정을 해줘야 하나?

test의 application.yml에 `spring.datasource.driver-class-name`을 org.postgresql.Driver으로 설정해주었다.

안된다. 똑같이 binary(255)로 매핑한다.

근데 생각해보니 h2에서 PostgresUUIDType을 지원안하니 당연한 걸지도...

<br />

#### H2 데이터베이스의 타입을 uuid를 저장할 수 있는 타입으로 지정하자.

사실 테스트에만 필요한 코드를 prod에 반영하고 싶지는 않았지만, 레퍼런스도 너무 부족했기에 이 방법도 찾아봤다.

https://www.h2database.com/html/datatypes.html#uuid_type

uuid로 저장된 값은 `java.util.UUID`를 반환한다는데, 어떻게 DDL을 uuid 타입으로 지정하는지는 안나와 있다..

그래서 JPA의 column 매핑을 설정할 수 있는 `@Column` 의 속성을 이용하기로 해보았다. `columnDefinition`을 이용하면 DDL 시 생성할 column의 정보를 직접 설정할 수 있다. 

위 H2 문서를 보면 UUID 타입의 이름은 UUID이다. h2는 기본적으로 case-sensitive하지 않기 때문에 uuid로 주어보기로 한다.

<br />
<br />

## How 

#### columnDefition으로 uuid임을 명시 

다음과 같이 `@Column` 어노테이션의 `columnDefinition` 속성을 'uuid'로 주었다. (h2는 기본적으로 case-sensitive하지 않으므로)

```java
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
@Column(name = "user_id", columnDefinition = "uuid")
private UUID id;
```

test path에서는 DDL이 잘 생성된다! H2도 이제 uuid 타입으로 생성하란 말을 드디어 알아먹은 것 같다.

``` 
Hibernate: 
    create table word (
       word_id bigint not null,
        created_at timestamp,
        updated_at timestamp,
        word varchar(255),
        user_id uuid,
        primary key (word_id)
    )
```

`EntityManager.find()` 메서드 역시 정상적으로 수행된다.

<br />

근데 이럼 main의 PostgreSQL은 어떡하지? 다행히 PostgreSQL 역시 UUID 타입을 `uuid`라는 이름의 데이터 타입으로 지원한다.

https://www.postgresql.org/docs/current/datatype-uuid.html

> PortgreSQL은 UUID (RFC 4122) 타입과 그와 관련된 표준을 저장하는 데이터 타입인 `uuid`를 제공한다. 해당 identifier는 128-bit의 용량을 요구한다. 총 32개의 digit이 128-bit을 구성한다. (8 - 4 - 4 - 4 - 12)
>
> ```
> a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11  
> ```

<br />

Test 만을 위한 코드가 prod에 반영되는 격이라 굉장히 찜찜하지만 지금 진행상황이 밀려있어 이 문제는 이쯤하고 해결로 하기로 했다... 다음에 다시 찾아봐야지.

<br />
<br />

## Reference 

https://docs.jboss.org/hibernate/orm/5.4/userguide/html_single/Hibernate_User_Guide.html#_uuid_as_binary

https://www.postgresql.org/docs/current/datatype-uuid.html

https://helloworld.kurly.com/blog/jpa-uuid-sapjil/#문제를-일단-해결한-방법-binary16
