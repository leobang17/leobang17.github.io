---
title: "Go - Project를 구성하는 방법"
createdAt: 2024-04-19
---

## Golang project에 Must는 없다. 하지만...

Golang은 package와 module design에 상당한 자유를 부여하기 때문에 한 가지 best practice를 정의내리기 어렵다. 꼭 따를 필요는 없지만, [project-layout](https://github.com/golang-standards/project-layout) 방식을 참고해보자.

- **/cmd**: main source filed이 위치한다. i.e) `foo` app의 `main.go`의 위치는 `/cmd/foo/main.go`이다.
- **/internal**: 다른 application이나 library에서 import하지 못하는 private code들을 여기에 둔다.
- **/pkg**: 외부에 드러내고 싶은 public code들을 배치한다.
- **/test**: 외부 test code나 test data를 두는 곳이다. Golang에서 unit test는 source file과 같은 package이 둔다. 하지만 공용 API나 e2e test 등은 `/test` 하위에 둔다.
- **/configs**: config file
- **/docs**: 디자인 및 사용자 문서 
- **/examples**:
- **/api**: API constract file (Swagger 혹은 Protocol Buffer등)을 둔다.
- **/web**: Web App에 특화된 asset (static files)들을 둔다.
- **/build**: package config 및 CI에 대한 file들
- **/scripts**: 분석 및 설치 등에 대한 script file들.
- **/vendor**: app dependency 관련 file들 (Go module dependency)

다른 언어들과 달리 `/src` dir는 없다. 너무 범용적이기 때문이다. 대신 `/cmd`나 `/internal`, `/pkg`를 선호한다.



## Go package structure

Golang에는 **sub-package라는 개념이 없다.** 대신 package 안에 sub-directory를 만들 수는 있다. 하지만 이는 상속이나 포함의 개념이 아니라는 것을 알아두어야 한다. golang standard lib인 `net`의 디렉토리를 확인해보자.

``` 
/net
	/http
		client.go
		...
  /smtp
  	auth.go
  	...
  addrselect.go
```

`net`은 package이기도 하고, 다른 package를 담은 directory이기도 하다. 하지만 알아두어야 할 점은 `/net/http`는 `/net`을 상속하지 않는다. **`net/http` 내부에서는 `net` 의 요소 중에서도 export된 것만** 볼 수 있다.

> 하위 directory의 package는 상위 directory의 package의 private 요소들에 접근할 수 없다. export된 요소들만 import 해서 이용할 수 있다.

sub-directory의 주된 장점은 package를 한 곳에 두어 package 내 코드의 cohesion을 높일 수 있다는 점이다. 다른 언어처럼 상속 관계를 나타내진 않는다.



#### Package Best Practice

package의 경우 따를만한 best practice들이 몇가지 있다.

1) 섣불리 package를 만들지 않는다.

   처음에는 간결하게 구성하는 것이 좋다. 이해도가 높아짐에 따라 서서히 진화하는 방식을 따르자.

2. Granuality도 반드시 고려하자.

   file 한 두개만 담긴 nano package 수십 개로 구성하는 방식은 바람직하지 않다. 반대로 package가 너무 비대해져서도 안된다. 

3. 제공하는 기능을 기준으로, "좋은 이름"을 지어라.

   package 이름은 그 안에 담긴 내용물이 아닌, 그 *package가 제공하는 기능*에 맞게 지어야 이해하기 쉽다.

4. package 이름은 *lowercase로 된 한 단어*로 표현하자.



#### package rule에도 MUST는 없다: nano packages가 유용할 때

하지만 Golang에는 MUST인 ground rule은 없다는 것을 다시 한 번 상기하며, 2번의 nano package에 대해서 이야기해보자. 과연 nano package는 항상 나쁠까? nano package 자체가 나쁜 것은 아니다. 특별히 속하는 곳이 없으면서 cohesion이 높은 코드들은 package로 묶어도 아무런 문제가 없다.

많은 경우 개발자들은 `util`, `base` 혹은 `common` package에 어울리지 않은 공용 메서드들을 구현하는 실수를 범한다. 다음의 예시를 보자:

```go 
package util

func NewStringSet(... string) map[string]struct{} { /** */ }
func SortStringSet(map[string]struct{}) []string { /** */ }
```

client는 이 package를 다음과 같이 이용할 수 있다.

``` go 
set := util.NewStringSet("c", "a", "b")
fmt.Println(util.SortStringSet(set))
```

문제는 `util`이라는 이름이 전혀 어울리지 않는다. `util`이라는 이름은 그냥 공용으로 쓸 수 있는 코드라는 점을 명시하는 것 외에는 아무런 의미도 담고있지 않기 때문에, 두 메서드는 의미를 전달하기 위해 *StringSet*이라는 접미사를 붙이고 있다.

이를 utility package 대신 `stringset`과 같은 보다 구체적인 이름으로 정해보자:

```go 
func New(...string) map[string]struct{} { /** */ }
func Sort(map[string]struct{}) { /** */ }
```

nano package지만 cohesion이 높은 코드끼리 모아두었으며, 이를 잘 나타내는 `stringset`이라는 이름도 붙여주었기에 쓸데없는 접미사를 붙이지 않아도 된다. client가 이용할 때도 훨씬 가독성이 좋다.

``` go
set := stringset.New("c", "a", "b")
fmt.Println(stringset.Sort(set))
```



## export한 요소는 모두 문서화하라

export한 대상이 `struct`든, `interface`나 `func`든 아니면 그 밖의 다른 요소라도 일단 `export`했다면 무조건 문서화한다. (지킬 수 있을까? gpt가 있으니 다행이다.) annotation을 작성하는 나름의 convention은 다음과 같다:

1. 각 annotation은 `.`로 끝나는 완전한 문장으로 작성한다.

2. function이나 method를 문서화할 때는 내부로직이 아니라, <u>목적과 기능</u>을 중심으로 표현한다.

3. deprecate된 요소에는 다음과 같이 `// Deprecated:` 형식의 annotation을 추가한다.

   ``` go
   // ComputePath()는 두 점 사이의 가장 빠른 경로를 return한다.
   // Deprecated: 해당 함수 대신 ComputeFastestPath()를 사용하시오.
   func ComputePath() {}
   ```

   대부분의 IDE는 이러한 *deprecated* 주석에 적절히 warning을 날려주는 기능을 가지고 있다.

4. 변수나 상수를 문서화할 때는 <u>목적과 내용</u>에 신경쓰자.

5. package 단위로 문서화를 작성하자.

   ``` go 
   // Package math는 기본적인 상수와 수학 함수를 제공한다.
   //
   // 해당 package의 실행 결과는 CPU architecture에 따라 bit 단위의 값이 다를 수 있다.
   package math
   ```

   일반적으로 package docs의 경우 해당 package의 이름과 동일한 file에 작성하거나, `doc.go`와 같이 특정한 파일에 한다.



## Ref

- 100 Go Mistakes

