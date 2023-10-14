---
title: "@Value 를 스프링 Slice Test에서 이용하는 방법"
createdAt: 2022-10-18
---

# What

``` 
io.jsonwebtoken.security.WeakKeyException: The specified key byte array is 136 bits which is not secure enough for any JWT HMAC-SHA algorithm.  The JWT JWA Specification (RFC 7518, Section 3.2) states that keys used with HMAC-SHA algorithms MUST have a size >= 256 bits (the key size must be greater than or equal to the hash output size).  Consider using the io.jsonwebtoken.security.Keys#secretKeyFor(SignatureAlgorithm) method to create a key guaranteed to be secure enough for your preferred HMAC-SHA algorithm.  See https://tools.ietf.org/html/rfc7518#section-3.2 for more information.
```

<br />
<br />

# When 

`jjwt`로 JWT를 생성하는게 잘 되는지 확인하는 테스트 중이었다. 

jwt의 claims에 들어갈 프로퍼티들은 git으로 관리하지 않도록 무시한 yaml 파일에 저장해두고, `@Value` 어노테이션을 이용해 값을 불러오고 있었다. 

``` yaml
// application-jwt.yml
jwt:
  claims:
    issuer: "example.com"
  secret-key: "example-example-example-example-example-example-example-example-example"
```

``` java
// JwtSecretsService.java
@Service
public class JwtSecretsService extends JwtPropertyService {
	private static final long TOKEN_VALID_TIME = 10 * 60 * 60 * 1000L;

	public Date getIssuedAt() {
		return new Date();
	}

	public Date getExpiredAt() {
		return new Date(getIssuedAt().getTime() + TOKEN_VALID_TIME);
	}

	public Key getSecretKey() throws DecodingException {
		return Keys.hmacShaKeyFor(super.secret.getBytes(StandardCharsets.UTF_8));
	}
}
```

``` java
// JwtPropertyService.java
public class JwtPropertyService {
	@Getter
	@Value("${jwt.claims.issuer}")
	protected String issuer;

	@Value("${jwt.secret-key}")
	protected String secret;
}
```

에러는 `JwtSecretsService` 클래스의 `getSecretKey()` 메서드에서 호출하는 `Decoders.BASE64URL.decode()`메서드 속에서 발생했다.

<br />
<br />

# Why 

에러 메시지를 읽어보면 내가 설정한 secret key가 너무 작아 생긴 문제다. `jjwt` 라이브러리는 취약한 secret key 이용을 방지하기 위해, 유저가 이용하는 서명 알고리즘마다 최소로 요구하는 key의 크기가 존재한다. 내가 이용한 `JWT HMAC-SHA` 알고리즘의 경우 256bit 이상의 크기를 요구하는데, 내가 선언한 이용하려는 secret key는 136bit 밖에 안된다는 것이다. 

> *This means that JJWT - a specification-compliant library - will also enforce that you use sufficiently strong keys for the algorithms you choose. If you provide a weak key for a given algorithm, JJWT will reject it and throw an exception.*
>
> ...
>
> - `HS256` is HMAC-SHA-256, and that produces digests that are 256 bits (32 bytes) long, so `HS256` *requires*that you use a secret key that is at least 32 bytes long.
>
> 

https://github.com/jwtk/jjwt#jws-create

<br />

이런 사항들은 충분히 인지하고 코드를 짰고, 따라서 secret key도 충분한 크기로 정의해두었는데 whyrano.

혹시나 해서 `JwtPropertyService` 가 가져오는 secret key를 터미널에 찍어보니 그 이유가 나왔다.

```
secretKey = jwt.secret-key
```

`JwtPropertyService` 가 프로퍼티 값을 제대로 찾아오는지 확인하는 테스트도 선행했었는데 이 때는 스프링의 모든 bean을 로드하는 `@SpringBootTest`를 이용했었다. 이번에는 sliced test를 진행했는데 이와 같은 환경에서는 `@Value` 어노테이션이 부착된 필드에 값을 주입해주는 역할을 하는 bean이 로드되지 않아 생기는 문제 "같았다". `@Value` 어노테이션의 작동 방식은 공식문서를 통해 확인했지만 어떤 Bean이 값을 주입해주는지는 찾지 못했다. 

사실 더 원인에 대해 더 딮하게 파봐야 하는게 맞지만 요즘 작업 진척이 늦어 나중으로 미뤘다. 요즘 작업 진척이 너무 느려서 , , 맘이 급했다.

<br />
<br />

# How

두가지 방법이 있다. Reflection을 이용하는 방법과 `@TestPropertySource` 어노테이션을 이용하는 방식이다. 

### ReflectionTestUtils를 이용한 방식 

`ReflectionTestUtils`의 `setField()` 메서드를 이용해 값을 직접 정의해주는 방식이 있다

<br />

### @TestPropertySource를 이용한 방식

통합 테스트 (sliced test 역시 통합 테스트이다.)를 위해 로드되는 `ApplicationContext`의`PropertySource`를 인라인으로 추가하도록 도와준다. 다음과 같이 이용할 수 있다.

``` java
@ContextConfiguration
@TestPropertySource("/test.properties") 
class MyIntegrationTests {
    // class body...
}
```

그런데 이렇게 해도 안된다. 애초에 properties 파일의 값을 읽어서 `@Value` 어노테이션이 부착된 필드에 주입시켜주는 bean은 `@SpringBoot`에만 로드되는 것 같다. 직접 property를 선언해주면 해결된다.

``` java
@ContextConfiguration
@TestPropertySource(properties = {"timezone = GMT", "port: 4242"}) 
class MyIntegrationTests {
    // class body...
}
```

<br />

내 앱에는 다음과 같이 적용해 해결했다.

``` java
@TestPropertySource(
	properties = {
		"jwt.secret-key=secret_key_value_of_this_app_upper_than256_bits",
		"jwt.claims.issuer=issuer"}
)
public class JwtCreationTest {
// ...
```

<br />

property 값도 다음과 같이 잘 찍힌다! 

```
secret = secret_key_value_of_this_app_upper_than256_bits
```

<br />
<br />

# References

- https://github.com/jwtk/jjwt#jws-create

- https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-value-annotations

- https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html#spring-testing-annotation-testpropertysource

- https://stackoverflow.com/questions/17353327/populating-spring-value-during-unit-test
