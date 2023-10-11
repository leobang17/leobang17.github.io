---
title: "Shell의 종류와 startup 파일"
createdAt: 2023-10-05
---

# Shell

shell은 유저 input 커맨드를 받아들여 kernel이 이해할 수 있는 형태로 전달하는 역할을 한다. 즉, **유저와 OS의 kernel 사이의 통역사 역할**이 shell 프로그램의 본질이다.

**Shell의 종류와 Startup 파일의 역할**

Shell이 실행되는 환경은 *interactivity와 login 여부*에 따라서 그 종류를 나눌 수 있다. 

Shell이 시작될 때, 해당 shell을 이용하기 위한 환경을 구성해주는 작업이 필요하다. startup 파일은 shell이 시작될 때 실행할 수 있는 커맨드를 포함하는 파일이다. Shell이 시작될 때 shell은 이 startup 파일들을 읽어들여 shell 환경을 구성하게 된다.

shell의 종류마다 읽어들이는 startup 파일이 다르며, 이 글을 통해 shell의 종류와 각 상황에서 읽어들이는 startup 파일에 대해 알아보겠당.

> **startup 파일**
>
> 대부분 Linux 배포판에 default로 제공하는 bash shell의 경우 다음과 같은 startup 파일들이 있다.
>
> - `/etc/profile` 
> - `/etc/bash.bashrc`
>
> - `~/.bash_profile` 
>
> - `~/.bash_login` 
>
> - `~/.profile` 
> - `~/.bashrc`



## Interactive Shell vs Non-Interactive Shell

Shell이 실행되는 환경을 user와의 상호작용(Interaction)이 필요한지 여부에 따라 두 가지로 나누어 볼 수 있다. 

Interactive Shell인지 아닌지는 다음 커맨드를 통해서 확인할 수 있다. Interactive Shell의 경우 직접 커맨드를 입력하면 되고, Non-Interactive Shell의 경우 스크립트에 다음 커맨드를 추가하면 된다.

``` shell
$ [[ $- == *i* ]] && echo ‘Interactive’ || echo ‘not-interactive’
```

### Interactive Shell

user input과 같이 user와 상호작용(interact)이 필요한 shell 환경을 interactive shell이라고 한다. prompt에 커맨드를 입력하는 shell은 모두 Interactive Shell. 

Interactive Shell의 경우 **shell이 실제로 사용되기 전에 shell environment를 설정하기 위한 startup 파일이 필요**하다. 

이 startup 파일들은 후술할 login shell인지, non-login shell인지에 따라 로드되는 대상이 달라진다. 후술할 항목 참조.



### Non-Interactive Shell

shell **script 파일**을 실행하는 경우는 항상 non-interactive shell이다. 예를들어, `.sh` 스크립트를 실행하기 위해 child shell을 fork하는 경우, fork 된 child shell은 non-interactive shell이다. 

**non-interactive shell은 startup 파일을 실행(source)하지 않으며**, 부모 shell의 설정 값을 상속받게 된다. 그리고 `BASH_ENV`의 환경 변수 값을 이용하게 된다.





## Login Shell vs Non-login Shell 

shell을 시작할 때 로그인 과정이 필요한지 여부에 따라서 두 가지로 분류할 수 있다. 

### Login Shell

remote host에 *로그인 과정을 거쳐 사용하게 되는 shell* 환경을 Login Shell이라고 한다. 

Login Shell의 좋은 예시는 [ssh](https://linux.die.net/man/1/ssh)이다. ssh client를 이용해서 remote host에 로그인하면 Login Shell이 시작된다.

>**SSH란**
>
>ssh은 Secure Shell의 약어로, **remote machine에 안전하게 접속하기 위해 사용되는 보안 프로토콜**이다. local machine과 remote machine간에 오고가는 패킷의 내용을 ssh key를 이용해 암/복호화하는 기술이 ssh 프로토콜의 핵심이다.



interactive login shell이 시작될 때, shell은 다음의 startup 파일들을 순서대로 찾아서 실행한다:

1. `/etc/profile` 
2. `~/.bash_profile` 
3. `~/.bash_login` 
4. `~/.profile` 

2, 3, 4의 경우 그 순서대로 가장 먼저 발견되는 startup 파일만 source하고, 나머지는 무시한다.

> `.profile` 과 `.bash_profile`이 두 가지가 존재하는 이유는 `sh`와 `bash`를 구분하기 위해서이다. bash가 사용될 경우, `.bash_profile`이 존재하면 `.profile`은 실행되지 않는다.



### Non-login Shell

*터미널 프로그램을 실행시켜 사용하는 shell*을 Interactive Non-Login Shell 환경 이라고 한다. prompt가 보이고 유저가 커맨드를 입력해 shell과 상호작용할 수 있지만 shell을 열 때 로그인 과정이 필요하지는 않다.

Non-login shell이 시작될 때, shell은 다음의 startup 파일을 순서대로 찾아서 실행한다: 

1. `/etc/bash.bashrc` 
2. `~/.bashrc`



## 각 Shell 환경의 조합

- **Interactive Login Sell**: ssh나 telnet을 이용해 remote host에 접근하는 상황
- **Interactive Non-Login Shell**: 새 터미널을 열었을 때 
- **Non-Interactive Login Shell**: non-interactive하게 login 과정을 거칠일은 자연스러운 상황에서는 드물다... `echo command |ssh server` 이런 식으로 
- **Non-Interactive Non-Login Shell**: 거의 모든 non-interactive shell은 non-login shell이다. script가 실행되거나 자동화된 프로세스가 실행되는 shell 환경.



## References

- [Baeldung: Difference between .bashrc, .bash_profile, and .profile](https://www.baeldung.com/linux/bashrc-vs-bash-profile-vs-profile)

- [Geeks for geeks: Shell Scripting - Interactive and Non-Interactive Shell](https://www.geeksforgeeks.org/shell-scripting-interactive-and-non-interactive-shell/)

- [ask Ubuntu: Differentiate Interactive login and non-interactive non-login shell](https://askubuntu.com/questions/879364/differentiate-interactive-login-and-non-interactive-non-login-shell)
- [BASH shell script: Login vs Non-Login Shell](https://mug896.github.io/bash-shell/login_non-login.html)