---
title: "JWT 표준에 대해 - RFC7519"
createdAt: 2022-10-29
---

## 1. Introduction

JSON Web Token (JWT)란 HTTP Authorization 헤더나 URI 쿼리 파라미터와 같이 공간 제약적인 환경에 compact하게 실어나를 수 있는 token을 말한다.


##### JSON Web Token (JWT)

- JWS나 JWS로 인코딩된 claim들을 JSON 객체로 표현한 문자열이다. 

- claim들은 전자적으로 서명되거나 MACed 되거나 암호화될 수 있다.

##### Nested JWT

- 

Token의 주요 장점

- 토큰을 이용하면 request할 때마다 credential을 공유할 필요가 없다.
  - 매번 credentials를 노출한다는 뜻이므로 바람직하지 않다. 누군가가 가로챌 기회도 많아진다는 것.
- 토큰은 수명을 짧게 지정할 수 있다.
  - 악의적인 사용자가 토큰을 훔치더라도 영원히 사용할 수 없다. 
  - 토큰을 무효로 할 수도 있고 토큰이 노출된 것을 발견하면 토큰을 거부할 수 있다.
- credential을 무효로 하지 않고 토큰을 무효로 할 수 있다.
- 클라이언트가 request를 보내야하는 사용자 권한과 같은 세부 정보들을 토큰에 저장할 수 있다
  - 유저의 권한과 역할 같은 세부 정보를 저장할 수 있다. 
  - 이렇게 하면 서버 쪽 세션을 클라이언트쪽 세션으로 대체하여 수평 확장을 위한 높은 유연성을 달성할 수 있다.
- 토큰을 이용하면 인증 책임을 시스템의 다른 구성요소에 위임할 수 있다. 



## 3. JWT Overview

JWT는 JWT 및 JWE 구조로 인코딩된 JSON 객체로서 claim들의 집합을 나타낸다. 이 JSON 객체는 JWT claim의 집합이다. 

JSON 객체는 0개 이상의 name-value 쌍 (= 멤버)으로 구성되어있다. 이 때 name은 string이며 value는 임의의 JSON 값이다. 

JSON 객체는 공백이나 줄바꿈등을 포함할 수 있다. 

JWT claim 집합의 멤버 이름은 claim name이라고 한다. 이에 상응하는 value는 claim value라 부른다.

JOSE 헤더의 내용은 JWT claim의 집합에 적용된 암호화 작업을 설명한다. 만약 JOSE 헤더가 JWS를 위한 것이라면, JWT는 JWS로 표현되고  claim들은 전자서명 또는 MAC으로 처리되며, JWT claim set은 JWS payload가 된다. JOSE 헤더가 JWE를 위한 것이라면, JWT는 JWE로 표현되고 claim은 암호화된다. JWT는 다른 JWE 또는 JWS 구조로 둘러싸여 중첩된 JWT를 만들수 있으며, 중첩된 서명 및 암호화를 수행할 수 있다. 

JWT는 `.`으로 구분된 URL-safe한 part들의 연속으로 표현된다. 각 part는 base64 url-encoded 된 값을 가지고 있다. JWT에 part가 몇개가 될지는 JWS냐 JWE냐에 따라 달라진다.

### 3.1 Example JWT

예제의 JOSE Header는 인코딩된 객체가 JWT임을 나타내며,그 JWT가 `HMAC SHA-256`을 이용해 MAC된 JWS 라는 것을 알려준다.

``` json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

위의 JSON 객체를 더 명확하게 하기 위해 실제 UTF-8 octet sequence를 보여주던데, 난 이거는 관심 없음. 암튼 이 JOSE Header를 `Base64url`으로 인코딩한 결과는 다음과 같다.

`eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9`

밑은 JWT claims set의 예시이다. 

``` json
{
  "iss": "Joe",
  "exp": 1300819380,
  "http://example.com/is_root": true
}
```

이 JWS payload를 `Base64url` 인코딩하면 `eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ`이 나온다.

`HMAC SHA-256` 알고리즘으로 인코딩된 JOSE Header와 인코딩된 JWS payload를 MAC을 계산한 후 그 MAC 값을 또다시 `Base64url`으로 인코딩하면... 다음과 같다. 

`dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk`



이 인코딩된 세 part를 순서대로 `.` 을 사이에 두고 합치면 JWT 완성 ~ ! 



## 4. JWT Claims

JWT Claims Set은 JWT에 의해 운반되어지는 JSON 객체 값을 나타낸다. **claim 이름은 unique 해야한다**. JWT parser는 중복된 claim name을 발견할 경우 그 즉시 요청을 중단해야한다. 

JWT Claim name에는 다음과 같이 3가지 종류가 있다.

- Registered Claim Names
- Public Claim Names
- Private Claim Names

### 4.1 Registered Claim Names

IANA "JSON Web Token Claims"에 등록된 claim 이름을 말한다. 여기에 나온 모든 이름을 구현해야할 필요는 없다. 토큰 제공자가 취사선택해서 어떤 registered name을 선택할지, 그 name-value 쌍이 optional일지 required일지를 명세하기만 하면 된다. registered names 는 상호운용성을 위해 제시하는 claim 이름일 뿐이다. 제시하지 않고 기본 설정을 따를 경우, 모든 claim은 *OPTIONAL* 하다

##### 4.1.1 "iss" (Issuer) Claim

JWT를 발행한 issuer를 담는다. case-sensitive한 String 이며 `StingOrURI`를 담는다. 이 claim은 *OPTIONAL*하다.

##### 4.1.2 "sub" (Subject) Claim

JWT의 대상이 되는 principal을 담는다. sub에 대한 value는 unique할 것을 권장한다. 

##### 4.1.3 "aud" (Audience) Claim

JWT를 수신하는 수신자(audience)를 식별한다. JWT를 수신하여 처리하는 역할을 가진 principal은 반드시 audience claim을 통해 자기 자신을 위해 JWT가 발행되었음을 확인해야 한다. claim을 처리하는 principal이 "aud" claim과 일치하지 않는다면 JWT는 반드시 거부되어야 한다. 

##### 4.1.4 "exp" (Expiration Time) Claim

JWT의 만료시점을 담는다. `NumericDate` 값을 가지는 숫자로 표현해야한다.

##### 4.1.5 "nbf" (Not Before) Claim

JWT가 유효해지는 시점을 담는다. 이 시점 전에 JWT를 처리할 경우 반드시 reject해야한다. `NumericDate` 값을 가지는 숫자로 표현해야한다.

##### 4.1.6 "iat" (Issued At) Claim

JWT가 발행된 시점을 담는다. JWT의 나이를 계산하기 위해 이용되기도 한다. 

##### 4.1.7 "jti" (JWT ID) Claim

JWT를 위한 고유한 식별자를 담는다. 다수의 발행자가 JWT를 발행하는 경우, 각 발행자 끼리 발행한 JWT가 충돌하는 것을 방지해야한다. 이를 위해 JWT를 식별하는 "jti" claim을 정의한다.

#### 예시

```json
{
  "iss": "www.miweb.com", // 토큰의 발행자 
  "iat": 144212321321,  // 토큰의 발행시점
 	"exp": 123123123123,  // 토큰의 만료일 
  "nbf": 12312313124,  // 토큰이 유효해지는 시점 
  "jti": "31d6cfe0d16ae931b73c59d7e0c089c0",  // 토큰의 unique id
  "sub": "",  
  "aud": "",
  "data": { /* attached data */}
}
```

> **sub와 aud, 둘의 차이는 무엇이며 언제 이용해야할까?** 
>
> 'sub' claim은 application의 인증된 user를 나타낸다. 주로 client credentials flow에서의 user이다. 
>
> 'aud' claim의 경우 token이 누구를 위해 발행되었는지를 명시한다. 
>
> 예를들어, OAuth2.0의 상황을 가정하자. `user X`가 존재하고, Authorization Server로는 `service X`, Resource Server로는 `service A` 가 존재한다고 하자. 나의 client는 `service A`에서 서빙하는 `user X`에 대한 정보에 `user X`를 대리하여 접근하기 위해 그의 동의를 받았다는 '권한'을 부여받아야 한다. 이 권한은 access token으로 주로 JWT로 구현되고 Authorization Server에서 발급한다.
>
> 이러한 상황에서 JWT를 발행하는 `service X`가 issuer가 된다. 그럼 JWT를 수신하는 audience는 누구일까? `service A`이다. JWT를 통해 인증된 user, 즉 subject는 바로 `user X`이다. registered claims를 JSON 형태로 표현하면 다음과 같다.
>
> ``` json
> {
> 	"iss": "service X", // JWT를 발행한 Authorization Server
>  "sub": "user X 혹은 나의 client App", // JWT의 발행 대상이 되는 principal. 주로 User를 나타낸다.
>  "aud": "service A" // JWT를 수신할 대상. JWT를 검증하는 주체. Resource Server
> }
> ```
>
> 
>
> 그렇다면 audience를 명시해야하는 이유가 무엇일까? 만약 나의 서버가 microservice를 운영하고, 거기에는 `권한부여 서버`과 `Catalog 서버`와 `Messaging 서버`가 있다고 하자. 만약 `권한부여 서버`에서 client를 위해 JWT를 발행할 때, `Catalog 서버`에만 접근을 허용하고, `Messaging 서버`에는 접근할 수 없도록 하고자 할 수도 있다. 이 때 JWT를 수신하는 audience를 지정해 어떠한 Resource Server에 접근할 수 있는지 정의할 수 있다. 
>
> **그럼 OAuth2에서의 client는 어디다가 정의하나?**
>
> 어딘가에 정의할 수 있겠지만 JWT의 registered claim에는 등록되어있지 않은듯 하다.



### 4.2 Public Claim Names

claim 이름은 JWT를 서빙하는 유저가 원하는 대로 정의할 수 있지만, 충돌을 방지하기 위해 위의 registered claim 외의 이름은 IANA "JSON Web Token Claims" 레지스트리에 등록하거나 충돌방지를 포함하는 이름으로 등록할 수 있다. 

### 4.3 Private Claim Names

registered name이나 public name이 아니어도 JWT의 발행자나 이용자가 합의해서 쓰고싶은 claim name이 있을 수 있다. 그런걸 private claim name이라고 한다. private name은 충돌에 취약하기 때문에 주의해서 사용해주어야 한다.



## 7. Creating and Validating JWTs

### 7.1 Creating a JWT

JWT를 생성하기 위해서 다음과 같은 절차들이 필요하다. 절차 간 input과 output에 의존성이 존재하지 않는다면, 절차를 생략해도 좋다.

1. JWT Claims Set을 생성한다. 공백이 허용되며 인코딩 전에 canonicalization을 수행할 필요는 없다.
2. 메시지를 JWT Claims set의 UTF-8 표현의 octet으로 설정한다.
3. JOSE Header를 생성한다. JWT는 반드시 JWT 혹은 JWE 둘 중 하나의 명세를 준수해야한다. 1과 동일하게 공백이 허용되며 인코딩 전에 canonicalization을 수행하지 않아도 된다.
4. JWT가 JWS인지, JWE인지에 따라 두 가지 장식으로 나뉜다.
   - JWS라면, message를 JWS payload로 이용하여 JWS를 생성한다. 
   - JWE라면, message를 JWE를 위한 plaintext로 이용해 JWE를 생성한다.
5. 만약 중첩된 서명이나 암호화가 필요하다면 Message가 JWE인지 JWS인지 확인하고, step 3로 돌아간 후 이에 필요한 JOSE 헤더의  "cty" (content type)의 값을 "JWT"로 두어 생성한다.
6. 별 다른 일이 없다면,  JWT가 JWS이거나 JWE가 되어있을 것이다



### 7.2 Validating a JWT

JWT 검증에는 다음과 같은 절차를 따른다. 어디까지나 명세이기 때문에 각 절차는 필수가 아니다. 만약 아래의 어떠한 절차라도 실패한다면, JWT는 그 즉시 거부당해야한다. 

1. JWT가 적어도 1개 이상의 `.`을 포함하는지 확인한다.
2. 인코딩된 JOSE Header가 첫번째 `.` 앞부분에 존재하는지 확인한다.
3. Base64url을 이용해, 인코딩되었던 JOSE Header를 디코딩하고 다음과 같은 제약사항을 준수하는지 확인한다.
   - 줄바꿈 없음 
   - 공백 없음
   - URL-safe하지 않은 character가 이용되지 않았음.
4. JOSE Header가 유효한 JSON 객체임을 검증한다. 결과 값의 octet sequence가 유효한 JSON 객체의 UTF-8-encoded 표현인지 확인하여 검증할 수 있다. 
5. JOSE Header의 결과 값에 약속된 parameter-value가 존재하는지 확인한다.
6. JWT가 JWS인지 JWE인지 판단한다. 이에 따라 다음 절차를 밟는다
   - JWS인 경우. JWS를 validate하는 절차를 밟는다. 메시지가 JWS Payload를 디코딩한 base64url의 결과인지 확인한다.
   - JWE인 경우. JWE를 validate 하는 절차를 밟는다. 메시지가 plaintext의 결과인지 확인한다.
7. 만약 JOSE Header가 "cty" (content type)에 "JWT"를 가지고 있다면, JWT가 중첩되어 암호화 되었거나 서명되었다는 의미다. 이 경우 step 1로 돌아가 Message 자체를 JWT로 이용한다.
8. 그렇지 않다면 Message를 base64url 방식으로 decode하고, 다음과 닽은 제약사항을 준수하는지 확인한다.
   - 줄바꿈 없음
   - 공백 없음
   - URL-safe하지 않은 character가 이용되지 않음.
9. 결과값인 octet sequence가 유효한 JSON 객체의 UTF-8인코딩된 표현인지 검증한다. JWT Claims Set이 JSON Object인지 확인한다.



> **JWT가 Base64url 인코딩을 이용하는 이유**
>
> Base64 인코딩의 경우 “+”, “/”, “=”이 포함되지만 JWT는 URI에서 파라미터로 사용할 수 있도록 URL-Safe 한 Base64url 인코딩을 사용합니다.





## JWT (JSON Web Token)란?

JWT는 토큰의 한 구현이다.

**JSON** (데이터의 형식으로 JSON을 이용한다.) **Web** (웹 request를 위해 설계되었다.) **Token** (토큰 구현이다.)

인증 중에 데이터를 쉽게 전송하고 무결성을 검증하기 위해 데이터에 서명할 수 있다는 이점이 있다. JWT는 세 부분으로 구성되고 각 부분은 마침표 (.)로 구분된다. 다음은 JWT의 예시이다. 

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

처음 두 부분은 Header와 Payload이다. Header와 Payload는 JSON으로 형식이 지정되고 Base64로 인코딩된다. 토큰의 Header와 Payload는 세부 정보를 저장한다. 다음 코드는 Base64로 인코딩 하기 전의 Header와 Payload의 예를 보여준다.

``` json
// Base64로 인코딩된 Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Base64로 인코딩된 Payload
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}

// Base64로 인코딩된 Verify Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  설정한 secret key 값 
)
```

#### Header

토큰과 관련된 메타데이터를 저장한다. 주로 이용한 알고리즘과 토큰 타입을 기입한다. 예를들면 헤더에 서명을 생성하는데 이용한 알고리즘 이름 (HS256)이라던가...  

HS256 외에도 HS512, RS256(RSASSA SHA-256), ES256(ECDSA P-256 curve SHA-256) 등의 알고리즘을 사용할 수 있다.

#### Payload

나중에 권한 부여에 필요한 세부 정보를 저장할 수 있다. 사용자 이름 등을 저장할 수 있다. 토큰은 가급적 짧게 유지하고 본문에 너무 많은 데이터를 추가하지 않는 것이 좋다.

- 토큰이 너무 길면 request 속도가 느려진다
- 토큰에 서명하는 경우 토큰이 길수록 암호화 알고리즘이 서명하는 시간이 길어진다. 

#### Verify Signature

디지털 서명 부분은 생략할 수 있다. 보통은 Header와 Payload에 서명하는 것을 선호하기 때문에 나중에 서명을 이용해 내용이 변경되지 않았는지 확인할 수 있다. 

Header와 Payload를 Base64로 인코딩한 결과 + secret key를 Base64로 인코딩한 결과 => 이 전체를 특정한 알고리즘으로 해시하여 값을 만든다.



## JWS와 JWE

### JWS (JSON Web Signature)

JWT와 관련된 표준. JWS는 JSON 데이터 구조를 준수하는 '**서명**' 표준으로 RFC7515 표준이다. 

간단히 말해서 "JSON으로 전자서명을 하여 URL-safe한 문자열로 표현하는 것"이다. 서명은 서명할 때 사용한 key가 존재하며, JSON이 조작되었는지를 확인할 수 있다. 

그래서 서명된 JWT를 JWS라고도 부르는 것이다. JWS 표준을 따르는 JWT이므로. **보통 JWS 표준을 많이 구현**한다.

그래서 jjwt에서 이용하는 메서드인 `parseClaimsJws()`가 서명된 JWT인 JWS를 parse하는데 쓰인다.



### JWE (JSON Web Encryption)

역시 JWT와 관련된 표준. JWE는 JSON 데이터 구조를 준수하는 '**암호화**' 표준으로 RFC7515 표준이다.

간단히 말해서 JWE는 "JSON을 암호화하여 URL-safe 문자열로 표현한 것"이다.



# JJWT

> #### **JJWT의 디펜던시들에 대해...** 
>
> jdk, gradle 프로젝트에 대해 JJWT 라이브러리는 다음과 같은 의존성을 요구한다.
>
> ``` java
> dependencies {
>  compile 'io.jsonwebtoken:jjwt-api:0.11.5'
>  runtime 'io.jsonwebtoken:jjwt-impl:0.11.5',
>  // Uncomment the next line if you want to use RSASSA-PSS (PS256, PS384, PS512) algorithms:
>  //'org.bouncycastle:bcprov-jdk15on:1.70',
>  'io.jsonwebtoken:jjwt-jackson:0.11.5' // or 'io.jsonwebtoken:jjwt-gson:0.11.5' for gson
> }
> ```
>
> 해당 의존성들은 하나만 compile-time이고, 나머지는 모두 runtime 의존성으로 선언되어있다. 이는 JJWT가 app에서 사용하도록 명시적으로 설계된 api에만 의존하도록 설계되었기 때문이다. 다른 모든 구현의 세부 정보들은 runtime에만 종속된다. 
>
> JJWT는 `jjwt-impl.jar`를 제외한 모든 artifact들에 대해 sematic한 버전 호환성을 보장한다. `jjwt-impl.jar`에는 이러한 보장이 없으므로 해당 `.jar` 파일의 내부 구현은 언제든지 변경될 수 있다. 따라서 `jjwt-impl.jar`를 compile-scope으로 추가해선 안된다. 항상 runtime scope으로 선언할 것.



> **Exception Handling...**
>
> jjwt의 mother exception인 `JwtException`을 이용하자.



## Signature Algorithm

JWT 명세는 12개의 표준 서명 알고리즘을 정의한다. - 3개는 비밀키 알고리즘이고, 9개는 비대칭 키 알고리즘이다. 알고리즘의 목록은 다음과 같다.

- `HS256`: HMAC using SHA-256
- `HS384`: HMAC using SHA-384
- `HS512`: HMAC using SHA-512
- `ES256`: ECDSA using P-256 and SHA-256
- `ES384`: ECDSA using P-384 and SHA-384
- `ES512`: ECDSA using P-521 and SHA-512
- `RS256`: RSASSA-PKCS-v1_5 using SHA-256
- `RS384`: RSASSA-PKCS-v1_5 using SHA-384
- `RS512`: RSASSA-PKCS-v1_5 using SHA-512
- `PS256`: RSASSA-PSS using SHA-256 and MGF1 with SHA-256
- `PS384`: RSASSA-PSS using SHA-384 and MGF1 with SHA-384
- `PS512`: RSASSA-PSS using SHA-512 and MGF1 with SHA-512

이들은 모두 `io.jsonwebtoken.SignatureAlgorithm` enum에 표현되어있다. 

정말 중요한 것은 JWT 표준 (RFC7518)에서는 이러한 알고리즘을 사용할 때 **충분히 강력한 key를 이용**해야한다는 것이다. 이는 JJWT 라이브러리 역시 개발자가 선택한 알고리즘에 대해 충분히 강력한 key를 이용할 것을 강제한다. 만약 취약한 key로 알고리즘을 이용하려 할 경우 JJWT는 reject하고 exception을 날릴 것이다. 각 알고리즘 별로 JJWT가 강제하는 최소 key 길이는 다음과 같다.

##### HMAC-SHA

JWT HMAC-SHA 서명 알고리즘인 `HS256`, `HS384`, `HS512` 알고리즘은 알고리즘의 서명 길이 만큼의 secret key를 요구한다. 

- `HS256` = HMAC-SHA-256는 256bit (32byte) 길이의 digest를 생성하므로, 32 byte 이상의 secret key를 요구한다.
- `HS384` = HMAC-SHA-384는 384bit (48byte) 길이의 digest를 생성하므로, 48 byte 이상의 secret key를 요구한다.
- `HS512` = HMAC-SHA-512는 512bit (64byte) 길이의 digest를 생성하므로, 64 byte 이상의 secret key를 요구한다.

##### RSA

JWT RSA 서명 알고리즘인 `RS256`, `RS384`, `RS512`, `PS256`, `PS384` 그리고 `PS512` 알고리즘은 모두 최소 `2048` byte 이상의 key length를 요구한다. 이보다 작은 key를 제시할 경우 `InvalidKeyException`을 던진다.

JJWT는 각 알고리즘 별로 2048 byte 이상의 key length를 '권장'하긴 하지만 2048 byte만 넘기면 강제하진 않는다.

##### Elliptic Curve

JWT Elliptic Curve 서명 알고리즘인 `ES256`, `ES384`, 그리고 `ES512`는 모두 뒤에 붙은 숫자만큼의 key length를 요구한다. (aka Elliptic Curve order bit length)

- `ES256`은 private key로 최소 256 bit (32byte) 이상을 요구한다.
- `ES384`은 private key로 최소 384 bit (48byte) 이상을 요구한다.
- `ES512`은 private key로 최소 521 bit (65 혹은 66byte) 이상을 요구한다.



## Creating a JWS 

1. `Jwts.builder()` 메서드를 이용해 `JwtBuilder` 인스턴스를 생성한다.
2. `JwtBuilder` 메서드를 호출하여 JOSE Header와 Claim들을 등록한다.
3. `SecretKey`나 비대칭 `PrivateKey`를 명세하여 JWT에 서명한다.
4. 마지막으로, `compact()` 메서드를 호출하여 압축 - 서명 - jws를 생산한다. 

``` java
String jws = Jwts.builder()		// (1)
  .setSubject("Bob")					// (2)				
  .signWith(key)							// (3)
  .compact();									// (4)
```

#### JOSE Header

JWT 헤더 (= JOSE Header)는 content, format 그리고 JWT의 claim에 대한 암호화 기법을 담은 메타 정보를 제공한다. 앞과 마찬가지로 `JwtBuilder`의 `setHeaderParam()` 메서드를 호출해 JOSE 헤더를 등록할 수 있다.

``` java
String jws = Jwts.builder()
  .setHeaderParam("kid", "myKeyId")
  // ...
```

해당 메서드의 매 호출마다 key-value 쌍을 JOSE header에 추가한다. 만약 동일한 key에 대해 호출할 경우 덮어씌운다. **`alg`나 `zip` 헤더 같은 경우는 굳이 설정해줄 필요 없다**. JJWT가 이용된 서명 알고리즘 / compression 알고리즘에 따라 알아서 집어넣어준다.

`Jwts.header()` 메서드로 헤더 인스턴스만 생성할 수 있다.

``` java
Header header = Jwts.header();
populate(header); //implement me
String jws = Jwts.builder()
  .setHeader(header)
	// ...
```

`setHeader`를 호출하는 것은 기존의 header key-value를 모두 덮어씌우게 되므로 주의해서 사용하자. 이 경우에도 `zip`이나 `alg`는 알아서 처리해주니 걱정말고.

혹은 한번에 헤더를 넣어주고 싶다면, `JwtBuilder`의 `setHeader(Map)` 메서드를 이용할 수도 있다.

``` java
Map<String, Object> header = getMyHeaderMap(); // 알아서 구현
String jws = Jwts.builder()
  .setHeader(header)
  // ...
```



#### Claims

claim set은 JWT의 'body' 역할으로, JWT 발행자가 JWT 수신자에게 전달하고 싶은 정보를 담고 있다. 

JWT Claims의 표준인 **registered claim names**들은 `JwtBuilder` 클래스의 메서드로 제공한다. 각 registered claim name으로 setter 메서드가 설정되어있으니 IDE를 참고하며 registered claim들을 설정하자. 후술할 private claim name을 설정하는 방식으로 registered claim name을 설정해도 문제없지만, JJWT는 제공되는 setter 메서드를 이용할 것을 권장한다.

등록되어있지 않은 custom claim name, 즉 **private claim name**들은 setter 메서드를 제공하지 않으므로 `JwtBuilder` 클래스의 `claim`메서드를 호출하여 추가할 수 있다. 

``` java
String jws = Jwts.builder()
  .claim("hello", "world")
  //... 
```

매 회 호출할 때마다 추가하므로, 기존의 claim name과 중복된 값을 삽입하려 한다면 덮어씌우게 된다.

만약 claim들의 집합을 한번에 추가하고 싶다면 `Jwts.claims()` 메서드를 이용해 claim set을 만든 후 builder 클래스에 한번에 추가할 수 있다. 혹은 claim들의 Map을 생성해서 한번에 추가할 수도 있다. 

``` java
Claims claims = Jwts.claims();
Map<String, Object> claims
polulate(claims); // implement me! 
String jws = Jwts.builder()
  .setClaims(claims)
  // ...
```

header를 한번에 추가하는 것과 마찬가지로 `setClaims` 메서드는 기존에 설정된 claim set들을 모두 덮어씌우니 주의해서 이용하자.



#### Signing Key

`JwtBuilder`의 `signWith` 메서드를 이용해 JWT 토큰을 서명할 수 있다. JJWT는 인자로 받은 key가 어떠한 서명 알고리즘에 적합한지 판단하고 임의로 알고리즘을 선택해 서명한다.

``` java
String jws = Jwts.builder()
  // ... etc
  .sighWith(key)
  .compact();
```

예를들어, `signWith` 메서드에 제공한 secret key가 256bits (32 byte)라고 해보자. 그렇다면 이 키는 `HS384`나 `HS512`에는 충분하지 않다. 따라서 JJWT가 임의로 `HS256` 알고리즘을 적용해 서명하게 된다.

`signWith` 메서드를 이용한다면 JJWT가 자동으로 JOSE Header의 `alg` 채워 넣게 된다. 

공개키로는 JWT를 서명할 수 없다. JJWT는 공개키로 서명을 시도할 경우 `InvalidKeyException`을 던진다.

JWS를 HMAC-SHA 알고리즘으로 서명하려고 하고, 비밀키를 String 혹은 encoded byte array로 가지고 있다면, 이를 이용하기 위해서 `SecretKey` 객체로 변환해야 `signWith` 메서드의 인자로 이용할 수 있다. 가지고 있는 secret key의 타입이 무엇인지에 따라 JJWT가 제공하는 `SecretKey` 객체로 바꾸는 작업이 달라진다.

- encoded byte array인 경우

  - ``` java
    SecretKey key = Keys.hmacShaKeyFor(encodedKeyBytes);
    ```

- Base64-encoded String 인 경우

  - ``` java
    SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretString));
    ```

- Base64URL-encoded String 인 경우

  - ``` java
    SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(secretString));
    ```

- 인코딩 되지 않은 raw String인 경우

  - ``` java
    SecretKey key = Keys.hmacShaKeyFor(secretString.getBytes(StandardCharsets.UTF_8));
    ```

  - `.getBytes()` 메서드를 charset을 제공하지 않고 호출해선 안된다.

##### 암호화 알고리즘 직접 지정하기 (Override)

JJWT가 주어진 key에 대해 자동으로 제공하는 알고리즘 대신 직접 선택하고 싶을 수도 있다. 그럴 때는 `signWith` 메서드의 두번째 인자로 이용하고 싶은 알고리즘을 건네주면 된다.

```  java
String jws = JwtBuilder.build()
  .signWith(privateKey, SignatureAlgorithm.RS512)
  .compact();
```



#### JWS Compression (압축)

만약 JWT가 너무 많은 데이터를 담고 있다고 생각된다면 JWT를 압축해서 보낼 수 있다. 하지만 이는 JWT의 표준이 아니며 다른 JWT 라이브러리에서는 제공되지 않는 기능임을 알아야 한다.



## Reading a JWS

JWS는 다음과 같은 절차를 통해 parse (read)할 수 있다. 

1. `Jwts.parserBuilder()` 메서드를 이용해 `JwtParserBuilder`  인스턴스를 생성한다.
2. JWS 서명을 검증하기 위해 사용된 `SecretKey`나 대칭 `PublicKet`를 선택한다.
3. `build()` 메서드를 호출해 thread-safe한 `JwtParser`를 얻는다.
4. 마지막으로 `parseClaimsJws(String)` 메서드에 `jJws` 문자열 값을 넣어 원래의 JWS를 얻는다.
5. 모든 함수 호출은 parsing 혹은 서명 검증 시 터질 exception에 대비해 try/catch 블록에 감싸져야 한다.

이 과정에 대한 예시는 다음과 같다.

``` java
Jws<Claims> jws;
try {
  jws = Jwts.parserBuilder()			// (1)
    .setSigningKey(key)						// (2)
    .build()											// (3)
    .parseClaimJws(jwsString);		// (4)
  // 이제 JWT를 신뢰할 수 있다. 
} catch (JwtException ex) {  			// (5)
  // JWT parsring 및 검증 과정에서 exception이 던져졌으므로 이 JWT는 믿을 수 없다.
}
```

만약 JWS를 사용하고 있다면, 무조건 `JwtParser`의 `parseClaimsJws` 메서드만을 사용하자. (다른건 건드리지도 마셈) 서명된 JWT를 파싱하는데 적합한 security model을 보장할 것이다. 

#### Verification Key

JWS를 읽는데 가장 중요한 것은 JWS의 암호 서명을 검증하기 위한 키를 명시하는 것이다. 그렇다면 우리는 검증을 위해 어떠한 key를 이용해야할까?

- 만약 JWS가 `SecretKey`를 이용해 서명되었다면, 동일한 `SecretKey`가 `JwsParserBuilder`에 제공되어야 할 것이다. 예를들어) 

  - ```  java
    Jwts.parserBuilder()
      .setSigningKey(secretKey) // <---
      .build()
      .parseClaimsJws(jwsString);
    ```

- 만약 JWS가 `PrivateKey`를 이용해 서명되었다면, 해당 비밀키와 대응하는 `PublicKey`가 `JwsParserBuilder`에 제공되어야 한다. 

  - ``` java
    Jwts.parserBuilder()
      .setSigningKey(publicKey) // <---
      .build()
      .parseClaimsJws(jwsString);
    ```

근데 하나 이상의 `SecretKey`로 서명되었다면 어떡하지? 이럴 때는 `setSigningKeyResolver` 메서드를 이용해야한다.

``` java
SigningKeyResolver signingKeyResolver = getMySigningKeyResolver();
Jwts.parserBuilder()
  .setSigningKeyResolver(signingKeyResolver)
  .build()
  .parseClaimsJws(jwsString);
```

`SigningKeyResolverAdapter` 를 상속한 후, `resolveSigningKey(JwsHeader, Claims)` 메서드를 재정의함으로서 이 과정을 단순화할 수 있다. 

``` java
public class MySigningKeyResolver extends SigningKeyResolverAdapter {
  @Override 
  public Key resolveSigningKey(JwsHeader jwsHeader, Claims claims) {
    // implement me
  }
}
```

`JwsParser`는 JWS JSON을 파싱한 후, **jws 서명을 검증하기 전에**  `resolveSigningKey` 메서드를 호출할 한다. 이를 통해 `JwsHeader`와 `Claims` 항목들을 검사하여 특정 JWS를 확인하는데 사용할 키를 찾는데 도움이 되는 모든 정보들을 확인할 수 있다. 이는 다른 키를 사용할 수 있는 복잡한 보안 모델을 가진 app에 매우 유용하다.

그렇다면 어떠한 정보를 확인해야할까? 

JWT 명세는 이러한 일을 대비해 `kid` (Key ID) 헤더를 명세했다. 예를들어,

``` java
Key signingKey = getSigningKey();
String keyId = getKeyId(signingKey);
String jws = Jwts.builder()
  .setHeaderParam(JwtHEader.KEY_ID, keyId)
  .signWith(signingKey)
  .compact();
```

그리고 나서 parsing 할 때 너의 `SigningKeyResolver`가 `JwsHeader`를 검사해 `kid`를얻어내고 DB에서 그 `kid`와 일치하는지 확인할 수 있을 것이다. 예를들어, 

``` java
public class MySigningKeyResolver extends SigningKeyResolverAdapter {
  @Override
  public Key resolveSigningKey(JwsHeader jwsHeader, Claims claims) {
    // header나 claim을 확인하고 signing key를 반환한다.
    String keyId = jwsHeader.getKeyId(); // 혹은 다른 어떤 필드던 필요한 걸 꺼내쓴다.
    Key key = lookupVerificationKey(keyId); 
    return key;
  }
}
```

`jwsHeader.getKeyId()`로 `kid`를 확인해 대조하는 방식은 가장 일반적인 방식이지, 꼭 따라야 하는 방식은 아님을 알아두자. 얼마든지 header의 다른 key를 통해 검증할 수 있다. 

마지막으로, HMAC알고리즘에 대해서는 `SecretKey`를 반환해야하고, 비대칭 키 알고리즘의 경우에는 `PublicKey`를 반환해야함을 알아두자.



#### Claim Assertions

`JwtParserBuilder`가 제공하는 다양한 postfix를 가진 `require*` 메서드를 이용해 JWS의 claim이 지정한 값과 일치하는지 확인할 수 있다. 

```  java
try {
  Jwts.parserBuilder()
    .requireSubject('jsmith')
    .setSigningKey(key)
    .build()
    .parseClaimsJws(s);
} catch (InvalidClaimException ice) {
  // sub field가 claim에 없거나, 있어도 'jsmith'가 아닐 경우 이 exception이 던져진다.
}
```

근데 claim의 name이 존재하지 않는지, 혹은 존재해도 값이 틀린지는 구분해야할 정보일 수도 있다. 이를 위해 try - catch를 세분화할 수 있다. 

``` java
try {
  Jwts.parserBuilder()
    .requireSubject('jsmith')
    .setSigningKey(key)
    .build()
    .parseClaimsJws(s);
} catch (MissingClaimException mce) {
  // JWT의 claim이 sub 가 없음 
} catch (IncorrectClaimException ice) {
  // JWT의 claim에 sub가 있지만 값이 틀림.
}
```

혹은 custom claims name을 확인하기 위해 `require(fieldName, requiredFieldValue)` 메서드를 이용할 수도 있다.

```  java
try {
  Jwts.parserBuilder()
    .require("myField", "myRequiredValue")
    // ...
} catch (InvalidClaimException ice) {}
```

더 많은 `require*` 메서드를 확인하려면 `JwtParserBuilder` 클래스의 javadoc 명세를 확인하자.

> **jwt를 만든 machine의 시계와 parsing하는 machine의 시계가 안맞아서 생기는 문제는 ... ?**
>
> 먼저, 이는 timezone의 문제가 아님을 말한다. 정말 machine의 system time에 오차가 났을 경우를 상정한다. `JwtParserBuilder`의 `setAllowClockSkewSeconds`를 이용해 오차 범위를 설정하거나 아예 `Clock` 객체를 생성하여 더욱 정교한 설정을 할 수 있다. 



## JSON Support

`JwtBuilder`는 `Serializer<Map<String, ?>>` 인스턴스를 이용해 `Header`와 `Claims` Map들을 (포함한 모든 Java 객체들을) JSON으로 serialize한다. 역으로, `JwtParser`는 JSON을 `Header`와 `Claim`으로 deserialize한다.

만약 `JwtBuilder`의 `Serializer`나 `JwtParserBuilder`의 `Deserializer`를 명시적으로 설정하지 않는다면 JJWT는 runtime classpath에서 발견된 JSON 구현체들을 자동으로 땡겨와서 이용할 것이다. 

만약 claims의 value로 POJO를 이용하고 싶다면, `io.jsonwebtoken::jjwt-jackson`이나 `io.jsonwebtoken::jjwt-gson` 의존성을 이용하자. 혹은 직접 Serializer와 Deserializer를 구현해서 이용하던가. Jackson이 안드로이드 유저에게는 1MB의 사이즈 제한을 두고 있다는 것을 주의하자.

### Jackson JSON Processor

JSON processing을 위해 Jacson을 이용하고 싶다면 `io.jsonwebtoken:jjwt-jacson` 의존성을 runtime으로 구성하자. 이러면 Gradle이나 Maven이 Jackson 의존성에 필요한 의존성들을 모두 가져올 것이다. 

Jackson 의존성을 프로젝트에 구성했다면, JJWT는 자동으로 runtime classpath에서 Jackson 구현을 찾아 내부적으로 JSON 파싱할 때 이용할 것이다. 

만약 application-wide Jackson `ObjectMapper`를 가지고 있다면, JJWT를 너의 앱의 `ObjectMapper`를 이용하도록 할 수 있다. `io.jsonwebtoken:jjwt-jackson`을 compile scope으로 설정해놓으면 된다.

#### Parsing of Custom Claim Types

JJWT는 기본적인 claim type들: String, Date, Integer, Long, Short, Byte만을 기본적으로 지원한다. 만약 다른 타입을 deserialize하고 싶다면 다음과 같은 방식으로 설정할 수 있다.

``` java
new JacksonDeserializer(Maps.of("user", User.class).build())
```

이 설정을 통해 `user` claim을 `User` 커스텀 타입으로 deserialize할 수 있다. 

``` json
{
	"issuer": "https://example.com/user",
  "user": {
    "firstName": "Jiil",
   	"lastName": "Coder"
  }
}
```

`User` 객체는 `user` claim에서 얻을 수 있다. 

``` java
Jwts.parserBuilder()
  .deserializeJsonWith(new JacksonDeserializer(Maps.of("user", User.class).build()))
  .build()
  .parseClaimsJwt(aJwtString)
  .getBody()
  .get("user", User.class);
```





## Reference

- [JSON Web Token 소개 및 구조](https://velopert.com/2389)
- [JSON Web Token - RFC7519](