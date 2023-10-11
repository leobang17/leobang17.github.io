---
title: "Linux/Unix의 환경변수"
createdAt: 2023-10-04
---


# Environment variable (환경변수)

모든 리눅스 프로세스들은 환경변수 set을 가지고 있다. 이 환경 변수들은 해당 프로세스 혹은 타 프로세스와의 interaction 시 영향을 미친다. 



## 환경 변수의 scope

Linux의 환경 변수는 **global** 혹은 **local** scope를 가질 수 있다.

#### Global scope (전역 환경 변수)

globally scoped Env는 터미널의 어디에서든 이용할 수 있도록 정의된 환경 변수이다. 터미널에 존재하는 특정 환경의 어느 곳에서나 엑세스할 수 있다. 즉, 해당 터미널로 바인딩된 환경에서 실행되는 모든 종류의 script, 프로그램 혹은 프로세스에서 사용될 수 있다.

#### Local scope (지역 환경 변수)

locally scoped Env는 정의된 터미널 자체에서만 엑세스할 수 있는 환경 변수를 말한다. 터미널에서 실행중인 어떤 프로그램이나 프로세스에서도 locally scoped Env에 엑세스할 수 없다.



## shell script를 이용해 환경 변수 다루기

Linux의 경우 shell을 이용해 환경 변수를 설정하고 수정하거나, 환경 변수를 확인할 수 있다. 

>  Linux 배포판의 대부분이 default shell로 Bash shell를 이용하므로, bash를 이용해 접근한다는 것도 틀린 말이 아니다.



### 환경 변수에 접근하기

local 혹은 global 환경 변수 모두 터미널에서 다음과 같이 변수명 앞에 `$`를 붙여 접근할 수 있다:

``` shell
$NAME
```

터미널 화면에 print하고 싶다면 환경변수 앞에 `echo` 커맨드를 붙이면 된다.



### 환경변수 설정/수정하기 

##### global scope의 경우

`export` 혹은 `set` 커맨드를 앞에 붙여 전역 환경 변수를 설정한다.

```shell
$ export NAME=leo
or
$ set NAME=leo
```

확인

``` shell
$ echo $NAME
leo
```

##### local scope의 경우

별다른 커맨드 없이 지역 환경 변수를 설정한다.

``` shell
$ NAME=leo
```

확인

``` shell
$ echo $NAME
leo
```



### 환경변수 삭제하기

`unset` 커맨드를 이용하거나 해당 환경변수에 빈 값 `""`을 설정함으로서 삭제할 수 있다.

``` shell
$ unset NAME
or 
$ NAME=''
```



## 설정 파일을 이용해 환경 변수 저장하기

단순히 shell script로 설정한 환경 변수는 **shell이 꺼지거나 재부팅되는 경우 초기화** 되어버린다. 당연히 다른 shell 환경에서도 접근할 수 없다. 

따라서 환경 변수를 모든 shell 환경에 대해서 지속되도록 (=permanent 하도록) 설정하고 싶다면 shell 설정 파일 (i.e. `~/.bashrc`)에 환경 변수를 저장해두어야 한다. 

> shell 설정 파일은 특정 조건 하에 (i.e. shell이 시작되거나, login-shell이 시작되거나 등) 자동으로 실행되는 스크립트가 담긴 파일이다.



대부분의 리눅스 배포판에 default shell로 이용되는 bash의 경우, 다섯 개의 공통된 설정 파일을 가지고 있다.

- /etc/profile
- /etc/bashrc
- ~/.bash_profile
- ~/.bashrc
- ~/.bash_logout

전역에 적용되는 설정 파일은 `/etc` 디렉토리에 위치한다. 따라서 `/etc` 하위의 bash 관련 설정 파일은 모든 사용자에게 영향을 미치는 환경 설정 파일이다.

반면 `~` 홈 디렉토리 하위의 bash 관련 설정 파일들은 오직 해당 사용자에게만 한정된다. 그 외의 다른 사용자에게는 영향을 미치지 않는다.



### user wide 환경 변수 설정하기

사용자의 home 디렉토리 (`~`)에 있는 설정 파일을 이용해 특정 유저에 한해서 접근할 수 있는 환경 변수를 설정할 수 있다. 

`.bashrc`는 사용자가 새 shell을 열 때마다 실행되는 shell 스크립트를 모아둔 shell 설정 파일이다. 대부분 해당 shell 환경에서 필요한 환경 변수나 축약어들을 설정하는데 이용된다.

1. vi 혹은 원하는 텍스트 에디터를 이용해 `.bashrc`를 open

   ``` shell
   $ sudo vi ~/.bashrc
   ```

2. 환경 변수 설정 스크립트를 추가한다.

   ``` shell
   export NAME=leo
   ```

3. `.bashrc` 설정 파일을 실행한다. 

   `.bashrc` 파일은 새 shell이 열릴 때 마다 자동으로 실행되므로 해당 shell을 닫고 새로운 shell을 열어도 되고, 혹은 `.bashrc`를 shell 커맨드를 이용해 실행해도 된다.

   ``` shell
   $ source ~/.bashrc
   ```



> **.bashrc와 .bash_profile의 차이점**
>
> `.bash_profile`의 경우 bash가 login shell로 쓰일 때 (= 처음 shell에 로그인할 때) 실행되는 스크립트이고, `.bashrc`는 새 shell을 열 때마다 실행되는 스크립트들이다.
>
> zsh의 설정파일인 `.zshrc` 경우 login 이던 non-login이건 구분되지 않고 항상 실행된다. 따라서 `.zshrc`를 bash 환경처럼 `.bashrc` 와 `.bash_profile`로 구별해서 쓸 필요는 없다. 
>
> 물론 zsh에도 login shell에서만 동작하는 `zprofile`이 있긴 하다.



#### system wide 환경 변수 설정하기

system 전체에 적용되는 환경 변수는 `/etc/environment`, `/etc/profile`, `/etc/profile.d`, `/etc/bash.bashrc` 파일들에 스크립트로 저장되어있다.

이렇게 지정된 환경 변수들은 모든 유저가 접근할 수 있고 shell을 종료한 후에도 유지된다. 

1. vi 혹은 원하는 텍스트 에디터를 이용해 `/etc/environment`를 open

   ``` shell
   $ sudo -H vi /etc/environment
   ```

2. 환경 변수 설정 스크립트를 추가한다.

   ``` shell
   NAME=leo
   ```

3. shell을 새로 시작한다.



## 자주 이용되는 Linux 환경 변수

| 환경변수 | 설명                                                    |
| -------- | ------------------------------------------------------- |
| $USER    | 현재 user 이름                                          |
| $PATH    | 커맨드를 위한 search path를 제공한다                    |
| $HOME    | home 디렉토리에 대한 path                               |
| $PWD     | 현재의 working directory에 대한 path를 알려준다.        |
| $HOST    | host 이름                                               |
| $LANG    | default 시스템 설정 언어                                |
| $SHELL   | 현재 유저가 이용 중인 shell 프로그램의 위치를 알려준다. |





## References

- [Geeks for geeks: Environment Variables in Linux/Unix](https://www.geeksforgeeks.org/environment-variables-in-linux-unix/)
- [webisfree: .bashrc, .bash_profile, .zshrc 환경 변수 설정 및 사용하는 방법](https://webisfree.com/2022-10-07/bashrc-bash-profile-zshrc-환경-변수-설정-및-사용하는-방법)
- [dohk.log: 쉘의 개념, bashrc의 개념](https://dohk.tistory.com/191)