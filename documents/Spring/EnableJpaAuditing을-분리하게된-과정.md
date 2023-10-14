---
title: "EnableJpaAuditing를 분리하게된 과정"
createdAt: 2022-10-06
---

## 에러 내용

```
Caused by: java.lang.IllegalArgumentException: JPA metamodel must not be empty!
	at org.springframework.util.Assert.notEmpty(Assert.java:464)
	at org.springframework.data.jpa.mapping.JpaMetamodelMappingContext.<init>(JpaMetamodelMappingContext.java:58)
	at org.springframework.data.jpa.repository.config.JpaMetamodelMappingContextFactoryBean.createInstance(JpaMetamodelMappingContextFactoryBean.java:80)
	at org.springframework.data.jpa.repository.config.JpaMetamodelMappingContextFactoryBean.createInstance(JpaMetamodelMappingContextFactoryBean.java:44)
	at org.springframework.beans.factory.config.AbstractFactoryBean.afterPropertiesSet(AbstractFactoryBean.java:142)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1830)
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1767)
	... 52 more
```

<br />


## When

 `@WebMvcTest`를 이용해 sliced test를 진행하고 있었다. ExceptionHandler가 올바르게 작동하는지에 대한 테스트 였음.

<br />

## Why

스프링 부트의 메인클래스, `@SpringBootApplication`어노테이션이 붙어있는 클래스는 자동으로 모든 테스트들의 기본 설정으로 적용된다. 

당시 메인클래스에는 `@EnableJpaAuditing` 어노테이션이 적용되어있었다.

``` java
@EnableJpaAuditing   // <--
@SpringBootApplication
public class YomojomoApplication {
  //...
}
```

따라서 테스트 코드는 실행될 때 `@SpringBootApplication`이 붙은 나의 `~~Application.java`를 로딩하는데, 테스트 코드에 붙은 `@WebMvcTest` 은 sliced test로 JPA 관련 bean 들을 로딩하지 않아 `@EnableJpaAuditing`과 설정이 맞지 않는 문제가 생긴 것. 

`@WebMvcTest` 역시 Spring 통합 테스트 이기에 스프링 앱을 실행시켜 Application context를 구성해야함. 그래서 `@SpringBootApplication`이 붙은 메인 클래스의 main 메서드를 실행시켜 앱을 실행시키는데, 이 때 메인 클래스에 붙은 `@EnableJpaAuditing`이 같이 적용됨. 근데 `@WebMvcTest`의 경우 `@EnableJpaAuditing`이 필요로 하는 JPA 관련 Bean들을 ApplicationContext에 로드하지 않으므로 bean을 찾지 못했다는 에러가 뜬 것.

<br />


## How

#### 1. configuration 파일 분리 (권장)

임의의 디렉토리에 해당 `@EnableJpaAuditing`을 위한 설정 파일을 만든다. `@SpringBootApplication`에 붙은 `@ComponentScan`에 의해 `@Configuration` 이 등록된 클래스를 빈으로 로드한다. 이 과정에서 `@Enable~` 역시 적용된다.

``` java
@EnableJpaAuditing
@Configuration
public class JpaAuditingConfig { }
```

> **테스트 해보니까 안되는데요?**
>
> 혹시 sliced test를 진행중인지 확인해보자. @Configuration 클래스를 스캔하지 않는 @WebMvcTest나 @DataJpaTest의 경우, 애초에 스캔을 안하므로 적용이 안된다. 
>
> 해당 기능을 확인하고 싶다면 @SpringBootTest를 이용해 완전한 integration test를 진행하자.

<br />

#### 2. 필요한 sliced test마다 @MockBean으로 적용.

모든 sliced 테스트 코드마다 적용해주어야 하는 단점이 있다. 또한, main 클래스에 붙은 `@Enable~` 기능이 필요 없는 테스트 마저 해당 기능을 불러오기 때문에 비효율적인 테스트가 될 수 있기 때문에 지양하자.

``` java
@WebMvcTest
@MockBean(JpaMetamodelMappingContext.class)
class UserApiControllerTest {  ...  }
```
