---
title: "macOS Host가 Linux Conatiner를 실행하는 방법"
createdAt: 2023-12-13
---

## Container는 Host의 운영체제를 공유한다. 그렇다면 어떻게 macOS Host에서 linuxOS Container를 띄울 수 있는걸까?

Docker를 비롯한 container runtime을 공부하다보니 궁금한 점이 생겼다. 컨테이너 환경은 Host 머신의 운영체제를 공유하기 때문에 경량화된 실행환경을 제공할 수 있다. 

VM을 활용해서 밀집과 격리를 달성한다면 각 VM runtime은 독자적인 운영체제를 가지고 실행되기 때문에 container runtime이 리소스 측면 활용 측면에서 효율적이라고 할 수 있다. 

그렇다면 **어떻게 macOS Host에서 linux container를 실행**시킬 수 있는 걸까? 분명 linux와 macOS는 호환되지 않는 kernel을 사용하고 있다. linux container 역시 linux kernel이 필요하다. 

> linux의 경우 linux kernel을 이용하고 macOS의 경우 XNU kernel을 이용한다.



## 가상화: HyperKit

이 문제를 해결하기 위해 Docker와 같은 containerize 플랫폼은 <u>virtualization</u>을 활용한다. macOS 호스트에서 경량화된 linux VM이 생성되고 백그라운드에서 실행된다. 이 VM은 linux container가 격리된 리소스와 커널로 실행될 수 있는 <u>샌드박스</u> 환경을 제공한다.

Docker for mac은 예전에는 가상화를 위해 VirtualBox를 활용했고, 최근 버전은 가상화를 위해 **HyperKit**을 이용한다. 

> Hyperkit은 macOS 요세미티 10.10 이후에 제공되는 경량 macOS 가상화 솔루션이다. macOS에서 VM을 만들고 관리하는데 사용된다.

Hyperkit이 관리하는 linux VM이 제공하는 linux 환경에서 docker engine이 linux container를 실행하게 된다.



## 결론

결론적으로, linux container는 macOS Host에서 직접 실행되지 않는다. linux container는 필요한 kernel과 환경을 제공하는 linux VM 위에서 실행된다. 

물론 이 작업은 VM 추상화로 인해 약간의 오버헤드를 추가할 수 있다. 또한 일부 기능이 호환되지 않을 수도 있다..고 하지만 Docker의 경우 뛰어난 호환성/이식성을 제공하기 때문에 그럴 일은 없다고 한다. 


