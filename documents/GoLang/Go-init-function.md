---
title: "Go - init fucntion"
createdAt: 2024-04-11
---

Go언어에서 `init` 함수는 특별한 용도를 가진 함수이다. 이름 그대로 package에 대한 초기화 작업을 수행할 때 주로 이용된다.  `init`  함수의 특징은 다음과 같다.

- `init` 함수는 package에 대한 initializer로, 모든 일반 함수에 앞서 수행된다.
- `init` 함수는 package 단위로 실행되며, 그 순서는 package의 dependency tree에 의해 결정된다.
- 각 package에는 여러 개의 `init`함수가 중복해서 선언될 수 있다. 
- `init` 함수는 argument도 return 값도 가지지 않는다.
- `init` 함수는 *개발자가 직접 호출할 수 없다*. 오직 Go 런타임 시스템에 의해서만 호출된다.



#### init 함수의 실행 순서

`init` 함수는 package 별로, 그리고 동일한 namespace를 가진 package 내에서도 중복해서 선언할 수 있다. 그렇기에 `init` 함수의 실행 순서를 알아두는 것은 중요하다.

**1. 서로 다른 패키지의 경우, 패키지 의존성에 따라 실행 순서가 결정된다.**

`init` 함수는 package 단위로 실행된다. 한 package가 다른 package에 의존하고있다면, 의존되는 package의 `init` 함수가 먼저 실행된다. 

정확히 말하면 *package dependency tree*에 의해 결정되지만, 패키지간 의존성이 복잡하지 않은 단순한 프로젝트에서는 `import` 하고 있는 package의 `init`을 먼저 실행한다고 생각하는 편이 이해하기 쉽다. 

예를들어, main package가 redis package를 의존하고 있다고 가정하자: 

``` go
// main.go
import "redis"

func init() {
  // 
}

func main() {
  err := redis.Store("leo", "bang") 
}
```

``` go 
// redis.go 
func init() {
  //
}

func Store(key, value string) error { /** */ }
```

프로그램의 entry point인 `main` package에서 `redis`를 *import*하고 있다. 따라서 실행 순서는 다음과 같다:

1. `redis` package의 `init` 함수 
2. `main` package의 `init` 함수 
3. `main` 함수 호출 
4. `redis.Store` 호출

단순하게 생각하면 `main`의 `init`을 먼저 수행하고, `main`이 `redis.Store`를 호출한 시점에서 `redis` package를 초기화하는 것 아닌가? 라고 생각할 수 있지만 아니다.  <u>`init` 함수는 어떠한 일반 함수보다 먼저 실행</u>된다. package의 의존성 순서에 따라, package의 초기화 작업을 완료한 후 일반 함수를 실행하게 되므로 위와 같은 lazy init의 케이스는 직접 구현하지 않는 이상 발생하지 않는다.



**2. 동일한 패키지 and 동일한 파일의 경우 선언된 순서대로 실행된다.**

``` go 
func init() {
  fmt.Println("init 1")
}

func init() {
  fmt.Println("init 2")
}

func main() { /** */ }
// init 1 > init 2 순서대로 실행
```



**3. 동일한 패키지 but 파일이 다를 경우 파일의 알파벳 순서대로 실행된다.**
예를들어, 어떤 패키지가 `a.go` 파일과 `b.go` 파일로 구성되어있고 둘 다 `init` 함수가 정의되어 있을 경우 `a.go` 파일에 있는 `init` 함수(들)가 먼저 실행된다.



#### init 함수의 한계 (= init 함수를 사용할 때 주의해야할 점)

먼저, 잘못된 예시를 확인하고 이를 통해 배워보자.

``` go 
var db *sql.DB

func init() {
	dataSourceName := os.Getenv("MYSQL_DATA_SOURCE_NAME")
	d, err := sql.Open("mysql", dataSourceName)
	if err != nil {
		log.Panic(err)
	}
	if err = d.Ping; err != nil {
		log.Panic(err)	
	}
	db = d
}
```

위 코드를 통해 init 함수의 3가지 단점을 확인할 수 있다.

1. `init` 함수는 에러 핸들링이 힘들다.
   `init` 함수는 어느 누구에게도 return 하지 않기 때문에 error를 상위에 전달하는 방법은 `panic` 뿐이고, 그 `panic`을 restore할 주체도 존재하지 않기 때문에 사실상 <u>error 발생을 알리는 유일한 방법은 panic으로 프로세스가 비정상 종료</u> 되는 것 뿐이다. 
   위 코드와 같이 핵심적인 부분이라면 `panic` 상태로 종료되어도 괜찮을 수 있지만, minor한 모듈 하나의 `init`과정에서 실패했다고 application 전체가 중단되는 것은 바람직하지 않다.



2. 전체 package를 테스트 하기 힘들어진다. 

   참고로, `init` 함수는 개발자가 호출할 수 없기 때문에 `init`에 대한 단위 테스트는 할 수 없다. 또한, 해당 package에 대한 test는 `init` 함수가 호출된 후에야 test case들이 실행된다. 

   만약 DB 연결을 생성할 필요가 없는 util 함수에 대한 단위테스트를 추가한다고해도, `init` 과정이 실패한다면 해당 test case 역시 실패할 것이다 .

   `init`은 import하는 순간 dependency tree에 의해 결정된 순서대로 실행되므로, 어떠한 side effect가 발생할지도 예상하기 어렵다. 즉, 분리된 환경이라고 생각했지만 아닐 수도 있다는 것.



3. `init` 으로 인한 state의 변경사항을 *global variable*에 저장해야한다.

   global variable은 package 내의 함수라면 누구나 그 값에 접근하여 변경할 수 있다. 또한 global variable에 의존하는 함수를 격리할 수 없기 때문에 unit test를 작성하기 힘들다.

   따라서 global variable을 이용하기보다는 encapsulation을 진행하는게 바람직한다.



위의 repository 초기화 부분의 코드를 일반 함수로 빼내어 변경하면 다음과 같다.

``` go 
func createClient(dsn string) (*sql.DB, error) {
  db, err := sql.Open("mysql", dsn)
  if err != nil {
    return nil, err
  }
  if err = db.Ping(); err != nil {
    return nil, err
  }
  return db, nil
}
```

- error 처리를 상위 호출자에게 전달함으로서 app 전체가 crash하지 않을 수 있다.
- 해당 초기화 함수가 올바르게 동작하는지 확인하는 통합 테스트를 작성할 수 있다.
- connection pool이 global variable로 노출되어있지 않고, 함수 안에 encapsulated 되어있다.



#### init을 사용해도 좋은 경우 

`init`은 남용해서는 안되지만 handy한 경우도 있다. `init`함수가 유용한 경우는 `init`의 단점을 역으로 생각해보면 된다.

- *global variable*의 상태를 변경할 일이 없거나, 
- `init` 과정에서 에러가 발생할 일이 (거의) 없는 초기화 작업의 경우.

공식 [Go blog](https://cs.opensource.google/go/x/website/+/e0d934b4:blog/blog.go;l=32)를 보면 static http 설정을 `init` 함수를 이용해 처리한다.

```go
func init() {
	// Redirect "/blog/" to "/", because the menu bar link is to "/blog/"
	// but we're serving from the root.
	redirect := func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/", http.StatusFound)
	}
	http.HandleFunc("/blog", redirect)
	http.HandleFunc("/blog/", redirect)

	// Keep these static file handlers in sync with app.yaml.
	static := http.FileServer(http.Dir("static"))
	http.Handle("/favicon.ico", static)
	http.Handle("/fonts.css", static)
	http.Handle("/fonts/", static)

	http.Handle("/lib/godoc/", http.StripPrefix("/lib/godoc/", http.HandlerFunc(staticHandler)))
}
```

에러가 발생할 일이 없고, global variable에 접근하지 않는다. 따라서 unit test에도 영향을 주지 않는다.

이렇게 handy하게 이용할 수 있는 경우도 있지만, **대부분의 경우 initialize 작업은 별도의 함수로 만들어 처리**하는 것이 좋다.





## Ref

- 100 Go mistakes and How to Avoid Them