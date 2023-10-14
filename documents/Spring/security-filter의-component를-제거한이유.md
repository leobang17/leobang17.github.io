---
title: "Security Filter의 @Component를 제거한 이유"
createdAt: 2022-10-18
---

# 발단
원래는 Filter에 `@Component` 어노테이션을 부착했었다. 웹 시큐리티 설정 파일인 `WebSecurityConfig.java`는 다음과 같았다. 

``` java
@RequiredArgsConstructor
@Configuration
public class WebSecurityConfig {
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final YomojomoAuthenticationEntryPoint authenticationEntryPoint;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .addFilterAt(jwtAuthenticationFilter, BasicAuthenticationFilter.class)
      .antMatcher("/api/**")
      .authorizeRequests(c -> {
        c.anyRequest().authenticated();
      })
      .exceptionHandling()
      .authenticationEntryPoint(authenticationEntryPoint);
    return http.build();
  }
}
```

그런데 해당 필터를 테스트하던 중 지속적으로 이상한 점을 발견했고 이 문제를 방치할 순 없겠다 생각이 들어 기존에 정리한 마크다운 파일을 끄고 공식문서를 뒤지기 시작했다. 

<br />
<br />

# 필터가 이중으로 등록되고 있었다..!

### 서블릿 컨테이너, DelegatingFilterProxy, 그리고 FilterChainProxy

스프링 시큐리티 속의 모든 filter들은 서블릿 컨테이너의 입장에서는 단일 filter로 등록된다.  `DelegatingFilterProxy`가 서블릿 컨테이너 속에서 하나의 서블릿필터로 등록된다. 서블릿 컨테이너와 스프링 컨테이너는 실행되는 컨텍스트가 다르기에 서블릿 필터는 스프링 빈을 모른다. 따라서 서블릿 필터로 등록된 `DelegatingFilterProxy`가 스프링 빈으로 스프링 컨테이너에 등록된 `FilterChainProxy`에게 요청을 위임하고 `FilterChainProxy`는 해당 요청을 처리한 `SecurityFilterChain`을 찾아 적절한 보안 로직을 처리하게 된다. 

공식문서를 보면 이러한 `DelegatingFilterProxy`와 다른 기타 스프링 시큐리티 속에서 필터로 작용하는 `Filter`들의 관계를 알 수 있다. `DelegatingFilterProxy`는 서블릿 컨테이너와 스프링 컨텍스트의 가교 역할을 하는 것이다.

>  Spring provides a `Filter` implementation named [`[DelegatingFilterProxy](https://docs.spring.io/spring-framework/docs/5.3.23/javadoc-api/org/springframework/web/filter/DelegatingFilterProxy.html)`](https://docs.spring.io/spring-framework/docs/5.3.23/javadoc-api/org/springframework/web/filter/DelegatingFilterProxy.html) that allows bridging between the Servlet container’s lifecycle and Spring’s `ApplicationContext`. The Servlet container allows registering `Filter`s using its own standards, but it is not aware of Spring defined Beans.`DelegatingFilterProxy` can be registered via standard Servlet container mechanisms, but delegate all the work to a Spring Bean that implements `Filter`.
>
>  https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-delegatingfilterproxy

<br />

### 문제의 원인 

당연히 스프링 시큐리티 속에서 작용할 필터는 Bean으로 등록해야한다고 생각했고, 그래서 jwt를 처리하는 `Filter`에 `@Component`를 붙였었다. 근데 그 뒤에 큼지막하게 강조했던 Note는 기억이 안났었나보다... 

> The fact that all filters internal to Spring Security are unknown to the container is important, especially in a Spring Boot application, where, by default, all `@Beans` of type `Filter` are registered automatically with the container. So if you want to add a custom filter to the security chain, you need to either not make it be a `@Bean` or wrap it in a `FilterRegistrationBean` that explicitly disables the container registration.
>
> https://spring.io/guides/topicals/spring-security-architecture/

`Filter` 타입의 모든 `@Beans`은 자동으로 서블릿 컨테이너에 등록된다. 따라서 필터를 시큐리티 체인에 등록하고자 한다면 @Bean으로 등록하지 않거나, `FilterRegistrationBean`을 이용해 명시적으로 서블릿 컨테이너에서 제외해주어야 한다. 기본적으로 Spring Boot는 모든 application context에 등록된 `Filter`들 중 **`FilterRegistrationBean`이 존재하지 않는 필터들에 대해서** 자동으로 `FilterRegistrationBean`을 생성한다. `Filter`에 대한 `FilterRegistrationBean`을 직접 선언한다면 자동으로 등록되는 것을 막을 수 있다. 

따라서 @Bean으로 스프링 컨텍스트에 로드했지만 `FilterRegistrationBean`으로 서블릿 컨테이너에서 제거해주지 않았다면,**시큐리티 필터에만 등록하고자 했던 필터가 서블릿 필터로도 등록되어 2중으로 등록된다.**

>As [[described earlier](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#howto.webserver.add-servlet-filter-listener.spring-bean)](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#howto.webserver.add-servlet-filter-listener.spring-bean), any `Servlet` or `Filter` beans are registered with the servlet container automatically. To disable registration of a particular `Filter` or `Servlet` bean, create a registration bean for it and mark it as disabled, as shown in the following example:
>
>https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#howto.webserver.add-servlet-filter-listener.spring-bean.disable

<br />


### 사실 원래 불편했다
사실 필터 테스트를 본격적으로 시작하면서 찾은 문제점이었지만 이전에도 Web Layer의 slice 테스트 시 이유모를 불편함을 느꼈었다. 분명 security 설정을 모두 제외했었는데 해당 필터가 빈에 로드되고, 심지어 mock 요청이 해당 필터를 거쳤었다. 그러다보니 slice test의 context에 bean으로 불러오지 못한 클래스들이 호출되다보니 장애가 발생했던 것이다. 당시에는 궁여지책으로 다음과 같은 방법으로 직접 해당 필터를 컨텍스트에서 제외했었다.

``` java
// GlobalExceptionHandlerTest.java
@WebMvcTest(
	controllers = ExceptionTestController.class,
	excludeFilters = {
		@ComponentScan.Filter(
			type = FilterType.ASSIGNABLE_TYPE,
			classes = {JwtAuthenticationFilter.class}
		)
	}
)
class GlobalExceptionHandlerTest { ... } 
```

돌아보니 서블릿 필터체인에도 2중으로 등록이 되어있어 생긴 문제였다. 어쩐지 제외해도 제외해도 필터를 계속 거치더라...

<br />
<br />

# POJO 해결법

그래서 이제 시도할 수 있는 해결방안은 스프링 Bean으로 등록하지 않거나, Bean으로 등록하고 해당 필터에 대해 `FilterRegistrationBean`을 명시적으로 등록해 서블릿 컨테이너에서 제외하거나 2가지였다. 

처음에는 `FilterRegistrationBean`을 등록해 해결하려 했었다. 그런데 sliced test 구성 시 계속해서 security filter 부분이 걸리적거렸다. 내가 테스트 환경 configuration에 앎이 부족해서 그런 거겠지만. 

또, 그동안 스프링의 편리함에 너무 취해있었다는 생각이 또 한번 들었다. 스프링의 힘이 필요없는 부분은 POJO로 구현해보고자 하는 욕구가 생겼고, 지금 당장 테스트 환경 구성에 힘을 쏟을 시간은 없기에 일단은 후자의 방법을 택하고 공부를 더한 후에 전자로 리팩토링하기로 했다. 

바뀐 `WebSecurityConfig.java`의 코드는 다음과 같다.

``` java
@EnableWebSecurity
public class WebSecurityConfig {
	@Autowired
	private JwtUtilsService jwtUtilsService;

	private JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter(authenticationConverter(), jwtUtilsService);
	}

	private BearerAuthenticationConverter authenticationConverter() {
		return new BearerAuthenticationConverter();
	}

	private AuthenticationEntryPoint authenticationEntryPoint() {
		return new YomojomoAuthenticationEntryPoint();
	}

	@Bean
	public SecurityFilterChain apiSecurityFilterChain(HttpSecurity http) throws Exception {
		http
			.addFilterAt(jwtAuthenticationFilter(), BasicAuthenticationFilter.class)
			.antMatcher("/api/**")
			.authorizeRequests(c -> {
				c.anyRequest().authenticated();
			})
			.exceptionHandling()
			.authenticationEntryPoint(authenticationEntryPoint());
		return http.build();
	}
}
```

<br />

덕분에 코드는 엄청 늘어나서 보기에는 안좋지만, 문제의 근본적인 원인을 해결해서 맘이 편하다. 더불어 slice test 부분은 다음과 같이 간소화 되었다. 

``` java
@WebMvcTest(controllers = ExceptionTestController.class)
class GlobalExceptionHandlerTest { ... } 
```

<br />
<br />

# References

- https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-delegatingfilterproxy
- https://spring.io/guides/topicals/spring-security-architecture/
- https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#howto.webserver.add-servlet-filter-listener.spring-bean.disable