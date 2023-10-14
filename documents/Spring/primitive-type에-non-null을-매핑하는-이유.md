---
title: "@Basic 어노테이션. 그리고 primitive type에 대해 not null 제약조건을 매핑하는 이유"
createdAt: 2022-10-06
---

## What

``` 
Caused by: org.h2.jdbc.JdbcSQLIntegrityConstraintViolationException: NULL not allowed for column "ARTICLE_CURSOR"; SQL statement:
```


<br />

## When

테스트를 위해 빈 생성자로 `Nie`를 생성하고 persist하는 과정에서 에러가 발생했다.

<br />

값타입인 `NieContext`와 값타입을 가지고 있는 `Nie`의 엔티티 정의는 다음과 같았다.

``` java
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class NieContext {
	@Enumerated(EnumType.STRING)
	private NieProcessType lastProcess;
	private long articleCursor;
}
```

<br />

``` java
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Nie extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "nie_id")
	private Long id;
  // ...
	@Embedded
	@Column(updatable = false)
	private NieContext context;

  // ...
}
```

<br />

hibernate가 매핑한 ddl을 확인해보니 다음과 같았다.

``` 
Hibernate: 
    
    create table nie (
       nie_id bigint not null,
        created_at timestamp,
        updated_at timestamp,
        article_id bigint not null,
        article_cursor bigint not null,  // <--- 
        last_process varchar(255),
        status varchar(255),
        group_user_id bigint,
        primary key (nie_id)
    )
```

`article_cursor` 가 not null로 매핑되고 있었다.... 왜지? 

심지어 제약조건이 필요한 column도 아니어서 수정이 필요한 상태였다. 

<br />
<br />


## Why

https://docs.jboss.org/hibernate/orm/6.1/userguide/html_single/Hibernate_User_Guide.html#basic-basic-annotation

hibernate 문서의 `@Basic` 어노테이션 설명을 보면 그 이유가 설명되어 있다. 

`@Basic` 어노테이션은 basic type (Java type과 database column을 매핑하는 타입)을 선언하기 위한 어노테이션으로,  `jakarta.persistence.Basic` 에서 제공한다. 

> A basic type is a mapping between a Java type and a single database column.

`@Basic` 어노테이션은 기본적으로 적용되기 때문에 매번 부착해줄 필요가 없다. 우리가 지금껏  `@Entity` 를 정의할 때는 사실 각 필드에 `@Basic`  어노테이션이 붙은 것과 마찬가지였다.

``` java
@Entity
public class Product {
  @Id @Basic
  private Integer id;
  
  @Basic
  private String sku;
}
```

는 다음과 동일하다.

``` java
@Entity
public class Product {
  @Id 
  private Integer id;
  
  private String sku;
}
```

<br />

`@Basic` 어노테이션은 2가지 attribute을 정의하는데, 이 중 optional 속성이 이번 trouble shooting과 관련이 있다.

``` java
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Basic {
    FetchType fetch() default FetchType.EAGER;
    boolean optional() default true;
}
```

`optional` 속성은 해당 attribute가 null을 허용하는지를 정의한다. 기본값으로 `true`가 설정되어있지만, Jakarta Persistence는 primitive type에 대해서는 해당 속성을 무효화한다. 

> ... Jakarta Persistence also says that it will be ignored if the type is primitive. As long as the type is not primitive, Hibernate will honor this value.

이에 따라 hibernate는 primitive type에 대해 DDL 매핑시 not null 제약조건을 삽입하는것 같다. 

<br />

## How

#### wrapper 타입 채택

hibernate가 primitive type에 대해 not null 제약조건을 삽입하니, wrapper 타입을 이용하면 null을 허용하게 된다.

``` java
public class NieContext {
	@Enumerated(EnumType.STRING)
	private NieProcessType lastProcess;
	private Integer articleCursor;
}
```

<br />

DDL에 not null 제약조건이 사라졌다. 덕분에 빈 생성자를 이용한 테스트 역시 무사히 통과했다.

``` 
Hibernate: 
    
    create table nie (
       nie_id bigint not null,
        created_at timestamp,
        updated_at timestamp,
        article_id bigint not null,
        article_cursor integer,       // <---
        last_process varchar(255),
        status varchar(255),
        group_user_id bigint,
        primary key (nie_id)
    )
```
<br />
<br />

## Reference
- https://docs.jboss.org/hibernate/orm/6.1/userguide/html_single/Hibernate_User_Guide.html#basic-basic-annotation
