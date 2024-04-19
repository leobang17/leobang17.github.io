---
title: "Git Actions"
createdAt: 2023-01-28
---

# 

깃허브는 workflow를 실행할 Linux, Windows, 그리고 macOS 가상머신을 제공한다. 혹은 직접 본인의 데이터센터나 클라우드 인프라에서 self-hosted runners를 호스팅할 수도 있다.

`workflow`란 하나 이상의 `job`을 실행하는 자동화된 process를 말한다. 


## workflow의 구성요소

workflow는 다음의 기본적인 요소들을 포함해야한다.

1. 해당 workflow를 실행할 하나 이상의 *event*
2. Runner 가상머신에서 실행할 하나 이상의 *job*. (각 job은 하나 이상의 *step*으로 구성된다.)
3. 각 *step*은 직접 정의한 script를 실행하거나, action을 실행할 수 있다. 



## workflow는 어떻게 trigger될까?

workflow를 trigger하는 event는 다음과 같다.

- workflow의 repository에서 발생하는 Event
- GitHub 바깥에서 발생하여 `repository_dispatch` Event를 발생시키는 Event
- 정해진 스케줄 
- 수동으로 trigger



workflow trigger는 `on`으로 정의된다.

다음 단계를 통해 workflow 실행이 trigger된다

1. Repository에서 이벤트가 발생한다. Event는 관련된 커밋 SHA나 깃 참조를 가지고 있다.

2. GitHub는 `.github/workflow` 디렉토리에서 Event와 연결된 커밋 SHA나 깃 참조에  workflow를 정의한 파일이 있는지 확인한다. 

3. `on:` 값이 이벤트와 일치하는 모든 workflow에 대해서 실행시킨다. 어떤 이벤트는 workflow 파일이 default branch에 존재하는지 확인하고 실행시키기도 한다.

   각 workflow는 이벤트와 연관된 커밋 SHA나 깃 참조에 존재하는 workflow 버전을 이용해 실행한다. workflow가 실행되면 GitHub는 `GITHUB_SHA` (커밋 해시)와 `GITHUB_REF`를 Runner의 환경변수로 설정한다.



## workflow 이벤트 정의하기

`on:` 키워드를 이용해 정의한다. 

``` yaml
# 단일 Event trigger를 정의할 경우 
on: push
# 여러 Event trigger를 정의할 경우 
on: [push, fork]
```

workflow를 trigger하는 이벤트 목록은 [여기](https://docs.github.com/ko/actions/using-workflows/events-that-trigger-workflows)에서 확인하자.



### 이벤트 type 세분화하기

`on.<event_name>.types`를 이용해 workflow를 실행할 이벤트 type을 세세하게 정의할 수 있다. 

``` yaml
on:
	label:
		types:
			- created
```

이벤트 type을 세분화할 때는 **workflow가 중복해서 실행되지 않도록** 주의해야한다. 다음의 예시는 Issue가 등록될 때, Issue 라벨이 등록될 때 실행되는 workflow를 정의한다.

``` yaml
on:
	issues:
		types:
			- opened
			- labeled
```

- 위의 경우 Label이 2개가 지정된 이슈가 등록되면, workflow *3개가* trigger된다.

- `opened`에 1개, `labeled`에 2개



### Branch 필터링 

`branches` 및 `branches-ignore` 키워드는 GLOB 패턴을 허용한다. branch 이름에 GLOB 패턴에 해당되는 문자가 포함되어있을 경우 각 문자를 `\`를 이용해 escape해주어야 한다. GLOB 패턴에 대해서는 ["Filter 패턴 치트시트"](https://docs.github.com/ko/actions/using-workflows/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet) 를 참고하자.

#### 특정 branch에서만 실행 

패턴과 일치할 경우에만 실행한다.

``` yaml
on:
	pull_request:
		branches:
			- main
			- 'mona/octocat'
			- 'release/**'
```

- `main`이름을 가진 branch (`refs/heads/main`)
- `mona/octocat`이름을 가진 branch (`refs/heads/mona/octocat`)
- `release/10`과 같이 이름이 `release/`로 시작하는 branch (`refs/heads/release/10`)

#### 특정 branch를 제외하고 실행

패턴과 일치할 경우 실행되지 않는다.

``` yaml
on:
	pull-requests:
		branches-ignore:
			- 'mona/octocat'
			- 'release/**-alpha'
```

- `mona/octocat`의 이름을 가진 branch는 제외 (`refs/heads/mona/octocat`)
- `releases/beta/3-alpha`와 같이 이름이 `release/**-alpha`와 일치하는 branch는 제외

#### 특정 branch에서 실행 + 특정 branch는 제외하고 실행

`!`을 이용해 제외할 브랜치를 지정한다.

``` yaml
on:
  pull_request:
    branches:    
      - 'releases/**'
      - '!releases/**-alpha'
```





# Jobs

workflow는 하나 이상의 `job`으로 구성된다.

각 `job`은 `runs-on`으로 정의된 Runner 환경에서 실행된다. 하나의 `job` 단위는 모두 동일한 Runner 위에서 실행된다.

## Job ID 설정 

`jobs.<job_id>`를 이용해 job의 이름 혹은 식별자를 정의한다. `job_id`는 문자열 혹은 `_`로 시작해서 영숫자, `-` 또는 `_` 만을 포함하는 문자열이다.

``` yaml
jobs:
	my_first_job:
		name: My First Job
	my_secont_job:
		name: My Second Job
```



## Job 의존성 정의 

한 workflow 내에 정의된 `job`들은 **서로 독립적**이다. 띠라서 별다른 설정을 하지 않을 경우 각자 병렬적(parallel)으로 실행된다. 

`jobs.<job_id>.needs`를 이용해 `job`들 간의 의존성을 정의할 수 있다. `needs`는 문자열 또는 문자열의 Array일 수 있다.

의존하고 있는 job은 피의존 job이 완료될 때까지 모든 작업을 대기한다.

##### 의존하고 있는 Job이 모두 성공적이어야 하는 경우 

``` yaml
jobs:
	job1:
	job2:
		needs: job1
  job3:
  	needs: [job1, job2]
```

- 위의 `job`들은 다음의 순서로 실행된다.
  - `job1` >> `job2` >> `job3`

##### 의존하고 있는 Job이 성공적이지 않아도 되는 경우

``` yaml
jobs:
	job1:
	job2:
		needs: job1
  job3:
  	if: ${{ always() }}
  	needs: [job1, job2]
```

- `always()` 조건식 때문에 성공 여부와 관계 없이 `job1` 및 `job2`가 완료된 후에 항상 실행되도록 한다.



## Job이 실행될 Runner 선택

`jobs.<job_id>.runs-on`을 사용해 job을 실행할 Runner를 정의한다.

- 문자열로 제공할 수도 있고, 문자열 Array로 제공할 수도 있다.
- 문자열 Array를 정의할 경우 `runs-on` 모든 값과 일치하는 Runner에서 workflow가 실행된다.
- 여러 머신에서 workflow를 실행하려면 `jobs.<job_id>.strategy` 를 사용한다.

``` yaml
# GitHub에서 제공하는 안정적인 최신 Ubuntu 이미지를 Runner로 채택
runs-on: ubuntu-latest

# 
runs-on: [self-hosted, linux]
```



## Job에 조건문 사용

> **건너뛴 Job은 해당 상태를 Success로 보고한다.**  

`jobs.<job_id>.if` 조건문을 사용해 분기처리를 할 수 있다.

```  yaml
name: example-workflow
on: [push]
jobs:
	production-deploy:
		if: github.repository == 'octo-org/octo-repo-prod'
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v3
			- uses: actions/setup-node@v3
				with:
					node-version: '14'
			- run: npm install -g bats
```

- 특정 repository에 대해서만 작업을 실행한다.











### Jobs

Job이란 `workflow`에 정의된 일련의 *step*을 말한다. `job` 단위는 동일한 runner에서 실행된다.

각 `step`은 실행 가능한 쉘 스크립트이거나 *action*이다. 

`step`은 순차적으로 실행되며, 순서에 따라 서로에게 종속적이다. 하나의 `job`속의 `step`들은 동일한 runner에서 실행되므로, 서로 data를 공유할 수도 있다. 

반면, `job`은 기본적으로 서로 독립적이다. `job`은 별다른 설정이 없다면 각자 병렬적(parallel)으로 실행된다. 하지만 `job`들 사이에 의존성을 부여할 수 있는데, 이 때 의존 `job`은 피의존 `job`이 종료될 때까지 기다린다. 



### Actions

남들이 만들어놓은 Github Action에서 이용할 수 있는 라이브러리라고 생각하면된다. `action`을 적절히 이용하면 복잡하고 재사용성이 높은 script를 효율적으로 수행할 수 있다. 직접 action을 작성할 수도 있고, Github MarketPlace에서 다른 유저가 제공하는 action을 이용할 수도 있다.



### Runners

`event`가 trigger되었을 때 `workflow`를 실행하는 서버이다. 각 Runner는 한 시점에 하나의 `job`만을 실행한다. 

깃허브는 Ubuntu Linux, Windows, macOS `runner`를 제공한다; 새로운 백지상태의 가상머신으로

더 큰 규모의 `runner`를 이용할 수도 있고, 특정한 설정이 필요하다면 직접 `runner`를 호스팅하여 `workflow`를 실행시킬 수도 있다.





## yaml 파일 문법

| 이름     | 필수 여부  | 설명                                                 |
| -------- | ---------- | ---------------------------------------------------- |
| name     | *Optional* | 깃헙 repo의 "Actions" 탭에 나타날 이름.              |
| run-name | *Optional* |                                                      |
| on       |            | 해당 workflow가 어떤 event에 trigger되는지 명세한다. |
| job      |            | 하나의 `job` 단위를 정의한다.                        |



##### steps

`check-bats-version` job안에서 실행될 모든 `step`을 그루핑한다. 이 밑에 작성되는것 들은 분리된 action이나 shell script이다.

##### uses

해당 step이 어떤 action을 이용할 것인지 명세한다.

`actions/checkout@v3`

- Runner에 Repository를 checkout하는 작업. workflow가 repository code에 대해 실행될 때마다 checkout action을 사용해야한다.

`actions/setup-node@v3` 

- 특정 버전의 Node.js를 설치하는 action.  `with.node-version`을 통해 버전을 명시할 수 있다.
- `node`와 `npm` 커맨드를 `PATH`에 저장한다.



# Github Action의 기본적인 기능들

https://docs.github.com/en/actions/learn-github-actions/essential-features-of-github-actions#overview

## workflow에서 변수 이용하기

Github Actions은 `workflow` 실행환경에서 이용할 수 있는 default 환경변수를 제공한다. 만약 custom 환경변수를 이용하고 싶다면 `workflow` yaml 파일에 정의할 수 있다. 

``` yaml:title=example.js
jobs:
	example-job:
		steps:
			- name: Connect to PostgreSQL
				run: node client.js
        env:
        	POSTGRES_HOST: postgres
        	POSTGRES_PORT: 5432
```

`POSTGRES_HOST`와 `POSTGRES_POST`의 이름을 가진 custom 환경변수를 생성했다. 해당 환경변수는 `node client.js` 스크립트에서 이용할 수 있다.





## workflow에 스크립트 추가하기

actions를 이용해 script와 shell 커맨드를 실행할 수 있다. `run` 키워드를 이용해 runner에서  `npm install -g bats`를 실행하는 예제이다.

``` yaml
jobs:
	example-job:
		steps:
			- run: npm install -g bats
```

예를들어, script를 action으로 실행하고 싶다면, repository에 sciprt를 저장한 후 path와 shell 타입으로 불러올 수 있다.

``` yaml
jobs:
	example-job:
		steps:
			- name: Run build script
				run: ./.github/scripts/build.sh
				shell: bash
```



## Job끼리 데이터 공유하기

Job A가 파일을 생성하고 이를 동일한 `workflow` 내의 다른 `job` 들과 공유하고 싶거나 해당 파일을 추후에 참조하고 싶다면, 이를 GitHub에 *artifact*로 저장할 수 있다. Articact란 코드를 실행하고 빌드할 때 생성되는 파일을 말한다. Artifact는 생성된 `workflow` run과 연결되며, 다른 `job`에서 사용할 수 있다.

하나의 run 내에서 호출되는 모든 actions과 workflow는 해당 run의 artifact에 대한 쓰기 권한을 가진다.

예를들어, 파일을 생성하고 *Artifact*로 업로드할 수 있다.

``` yaml
jobs:
	example-job:
		name: Save output
		steps:
			- shell: bash 
				run: |
					expr 1 + 1 > output.log
      - name: Upload output file
      	uses: actions/upload-artifact@v3
      	with: 
      		name: output-log-file
      		path: output.log
```

다른 `workflow` run에서 해당 artifact를 다운로드 받기 위해 `actions/download-artifact` action을 이용할 수 있다. 다음을 통해 `output-log-file`이라는 artifact를 다운로드 받을 수 있다.

``` yaml
jobs:
	example-job:
		steps:
			- name: Download a single artifact
				uses: actions/download-artifact@v3
				with:
					name: output-log-file
```



# Context

context를 이용해 `workflow` run, Runner 환경, `job`, 그리고 `step`에 대한 정보에 접근할 수 있다. 

각 컨텍스트는 property를 가지고 있는 객체이다. 물론 중첩가능하다.

Context, object, property는 `workflow` 실행 조건에 따라 달라진다. 

Expression syntax를 이용해 context에 접근할 수 있다

``` shell
${{ <context> }}
```

| Context    | 타입     | 설명                                                         |
| ---------- | -------- | ------------------------------------------------------------ |
| `github`   | `object` | workflow run에 대한 정보를 담고 있는 컨텍스트.               |
| `env`      | `object` | worflow, job, step에 설정된 환경 변수를 포함하는 컨텍스트.   |
| `job`      | `object` | 현재 실행중인 job에 대한 정보를 담고 있는 컨텍스트           |
| `jobs`     | `object` | 재사용되는 workflow에만 이용된다. 재사용 가능한 workflow의 job을 통해 생성된 결과를 포함한다. |
| `steps`    | `object` | 현재 실행되는 job에서 처리된 step에 대한 정보를 담고 있다.   |
| `runner`   | `object` | 현재 job을 실행 중인 Runner에 대한 정보를 담고 있다.         |
| `secrets`  | `object` | workflow run에서 이용 가능한 key-value 쌍의 값을 담고 있다.  |
| `strategy` | `object` | 현재 job을 위한 matrix execution 전략에 대한 정보를 담고 있다. |
| `matrix`   | `object` | workflow에 정의된 matrix property들을 포함한다.              |
| `needs`    | `object` | 현재 job의 의존성으로 정의된 job의 output에 대한 정보를 담고 있다. |
| `inputs`   | `object` | reusable, 혹은 수동으로 실행된 workflow의 input에 대한 정보를 담고 있다. |

#### context 문법 

context information에 접근하는 문법은 다음 둘과 같다.

1. Index 문법
   - `github['sha']`
2. Property 참조 문법
   - `github.sha`

존재하지 않는 property에 접근할 경우 빈 문자열을 반환한다.

> ### Context와 Default Environment Variables
>
> GitHub Actions에는 Context와 Environment Variable 두가지 유사한 변수 컬렉션을 제공한다.
>
> **Environment Variable**
>
> - workflow를 실행하는 Runner에서만 존재한다.
>
> **Context**
>
> - workflow의 모든 지점에서 사용할 수 있다. 
> - 예를들어, job이 실행을 위해 Runner로 라우팅되기 전에 context를 사용하여 조건부 처리를 지정할 수 있다. (`if` 를 이용해서.)
>
> https://docs.github.com/en/actions/learn-github-actions/contexts#determining-when-to-use-contexts



# Environment Variables

custom 환경변수를 설정하기 위해서는 workflow 파일을 정의해야한다. custom 환경변수의 scope는 다음 3가지와 같다.

- **전역**: workflow 최상단에 `env`를 정의한다. 
- **job**: `jobs.<job_id>.env`에 정의한다. 같은 job안에서 공유한다.
- **step**: `jobs.<job_id>.steps[*].env` 에 정의한다. 같은 step 안에서 공유한다.

각 scope에 대한 예시는 다음과 같다.

```  yaml
name: Environment Variables Example 
on: 
	workflow_dispatch
env:
	DAY_OF_WEEK: Monda
jobs:
	greeting_job:
		runs-on: ubuntu-latest
		env:
			Greeting: Hello
    steps:
    	- name: "Say Hello Mona it's Monday"
    		run: echo "$Greeting #First_Name. Today is $DAY_OF_WEEK!"
    		env:
    			First_Name: Mona
```

> #### 환경변수 호출문법은 Runner 환경에 따라 다르다.
>
> 환경변수 삽입은 workflow job이 Runner에게 전달된 후에 진행된다. 따라서 환경변수를 호출하는 문법은 각 Runner의 OS에 따라, 실행되는 shell에 따라 다르다. 
>
> 본 예시에서는 `ubuntu-latest`에 기본 shell인 bash를 이용했으므로 환경변수를 호출할 때 `$NAME`의 문법을 이용했다.
>
> 만약 Windows를 이용했다면 PowerShell을 위한 문법인 `$env:NAME`을 이용해 호출해야할 것이다.

### context를 이용해 환경변수 접근하기

환경변수와 비슷한 역할을 하는 것이 Context이다. 

환경변수는 "항상" 가상머신 Runner에 삽입된다. 그러나 workflow의 일부는 Github Action에서 처리되고 끝나며, Runner로 전송되지 않을 수도 있다. 

이와 같이 Github Action에서만 처리되는 workflow 파트에서는 환경변수를 이용할 수 없다. 이 때 Context를 이용해 환경변수에 접근할 수 있다. 

``` yaml
env:
	DAY_OF_WEEK: Monday

jobs:
	greeting_job:
		runs-on: ubuntu-latest
		env:
			Greeting: Hello
		steps:
			- name: "Say Hello Mona it's Monday"
				if: ${{ env.DAY_OF_WEEK == 'Monday' }}
				run: echo "$Greeting $First_Name. Today is $DAY_OF_WEEK!"
				env:
					First_Name: Mona
```

`if` 문을 보면 `{{ env.DAY_OF_WEEK}}`의 expression을 이용해 context로 변수에 접근하는 것을 볼 수 있다. 

이렇게 Runner에 보내지지 않은 workflow를 실행하는 경우 `env ` Context에 workflow에 정의된 환경변수를 담아 놓는다. `env` 컨텍스트에 expression을 이용해 접근할 수 있다.



# References

- https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions