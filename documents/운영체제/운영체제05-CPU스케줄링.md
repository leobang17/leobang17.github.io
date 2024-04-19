---
title: "공룡책 운영체제05 - CPU 스케줄링"
createdAt: 2022-10-10
---

# 5. CPU 스케줄링

OS는 실질적으로 process가 아니라 kernel 수준의 thread를 스케줄링한다. 그러나 "프로세스 스케줄링"과 "쓰레드 스케줄링"의 용어는 상호 교환적으로 사용된다. 

####  5.1.1 CPU Burst - I/O Burst

process의 실행은 CPU 실행과 I/O waiting의 사이클로 구성된다. process들은 이 두 상태를 교대로 왔다갔다한다. 

##### CPU Burst Time

CPU를 소모하는 시간. process가 running 상태인 시간. process가 cpu를 점유하는 시간.

##### I/O Burst Time

I/O 작업을 위해 waiting queue에서 대기하는 시간. I/O 작업을 위해 소모하는 시간.



CPU 버스트와 I/O 버스트를 빈도 곡선으로 그려보니 CPU 버스트가 I/O 버스트 보다는 일반적으로 적더라. waiting 하는데 더 많은 시간을 쏟는다는 이야기 >> 적절히 scheduling을 통해 interleaved 시켜줘야 CPU를 효율적으로 쓸 수 있다. 



#### 5.1.2 CPU 스케줄러

CPU를 점유하는 running process가 그 자원을 반납할 때마다 OS는 ready queue에 있는 프로세스 중 하나를 선택해 실행해야한다. Ready Queue는 FIFO Queue, Priority Queue, Tree 혹은 단순한 연결리스트로도 용도에 맞게 구현할 수 있다. **큐에 있는 레코드들은 일반적으로 프로세스들의 PCB이다.**



#### 5.1.3 Preemptive 및 Non-preemptive 스케줄링

CPU 스케줄링의 decision making은 다음의 네가지 상황에서 발생할 수 있다.

1. running >> waiting

   - CPU를 선점해서 running 하다가 I/O 요청이 오거나 자식 프로세스의 종료를 기다리기 위해 `wait()`을 호출할 때

2. running >> ready 

   - Interrupt가 발생하거나 아 잠깐 쉬어야 겠다하고 ready로 갈 때

3. waiting >> ready

   - I/O 작업이 다 끝나고 ready로 가는 경우

4. running >> terminate

   - 프로세스가 종료할 때

   

##### Non-preemptive 스케줄링 (= 비선점 스케줄링 = cooperative 스케줄링)

어떤 process가 CPU를 점유하고 있다면 그 process가 본인의 작업을 다해서 자발적으로 CPU를 반납할 때까지 쓰도록 내버려두는 방식.

##### Preemptive 스케줄링 (= 선점 스케줄링)

어떤 process가 CPU를 점유하고 있더라도 스케줄러의 판단하에 (time slice가 만료되었거나 우선순위가 더 높은 프로세스가 등장) 그 process를 Ready queue로 쫓아내고 다른 process를 running 상태로 강제 전환할 수 있는 방식. 현대적인 OS는 모두 Preemptive 스케줄링을 선택한다.



#### 5.1.4 디스패처 (Dispatcher)

스케줄러와 디스패처는 역할이 다르다. *스케줄러는 다음에 어떤 프로세스를 실행할지 '선택'하는 역할이고 디스패처는 실제로 선택한 프로세스로 ''전환' 시켜주는 역할이다.* 크게보면 CPU 스케줄링에 포함된 요소가 dispatch긴 하다.

디스패처가 해야할 일은 다음과 같다.

- 한 process에서 다른 process로 context switching
- user mode로 전환해주는 일
- 프로그램을 다시 시작하기 위해 user program의 적절한 위치로 jump하는 일.

디스패처는 매 context switching 마다 호출되므로 으으음청 빨라야한다. 디스패처가 context switching을 위해 기존의 P0을 saving하고 다음 P1의 context를 restoring하는 이 시간을 **Dispatch Latency**라고 한다. 

![](/Users/leobang/Documents/pics/dispatch-latency.png)


## 5.2 스케줄링 기준 Scheduling Criteria

scheduling을 할 때 어떤 목표를 달성하고자 하느냐에 따라 기준 삼을 수 있는 지표가 달라진다. 사용되는 기준은 다음과 같다.

##### CPU Utilization 

가능한 CPU를 바쁘게 유지하기를 원한다. CPU를 가장 많이 사용할 수 있도록 기준을 둔 스케줄링이다.

##### Throughput (처리량)

단위 시간 당 완료된 프로세스의 개수를 뜻한다. 긴 프로세스인 경우에 이 비율은 몇 초동안 한 프로세스가 될 수도 있고, 짧은 트랜잭션인 경우 throughput은 초당 수십 개의 프로세스가 될 수도 있다.

##### Turnaround time (총 처리 시간)

process의 시작시간 - 완료 시간의 간격을 turnaround time이라고 한다. 

= ready queue에서 대기한 시간 + CPU에서 실행한 시간 + I/O 시간

##### Waiting Time

어떤 process가 ready queue에서 대기하는 시간을 최소화하는 것이 목적이다. waiting time을 최소화하면 다른 지표들은 알아서 최적화되므로 이를 중점으로 다룬다.

##### Response Time (응답 시간)

하나의 request를 제출한 후 첫번째 응답이 나올 때까지의 시간. UI 같은 것에 필요하다.



## 5.3 스케줄링 알고리즘

CPU 스케줄링은 ready queue에 있는 어느 process에 CPU 코어를 할당할 것인지를 결정하는 문제를 다룬다. 대부분의 최신 CPU 아키텍처에는 여러 개의 core가 있지만 이 절에서는 처리 core가 하나 뿐이라고 가정하고 설명한다.

#### 5.3.1 FCFS (First-Come, First Served) 스케줄링

가장 간단한 CPU 스케줄링 알고리듬. CPU를 먼저 요청하는 process가 CPU를 먼저 할당받는다. FCFS 스케줄링의 구현은 FIFO 큐로 쉽게 관리할 수 있다. FCFS 스케줄링은 경우에 따라 대단히 긴 waiting time을 가질 수 있다. 

또한 FCFS 스케줄링 알고리즘은 Non-preemptive하다. 일단 CPU가 한 프로세스에 할당되면, 그 프로세스가 종료하든지 I/O request가 호출되든지 자발적으로 CPU를 방출할 때까지 CPU를 점유한다. 특히 대화형 시스템에서 문제가 되는데, 그 이유은 *대화형 시스템에서는 각 프로세스가 규칙적인 간격으로 CPU를 점유하는게 매우 중요하기 때문이다*. (time sllicing 필요)

##### convoy effect 

큐의 앞에 한참 오래걸리는 놈 때문에 일찍 끝날 수 있는 뒤에 작업도 밀려서 총 대기시간이 음청나게 길어지는 효과



#### 5.3.2 SJF (Shortest-Job-First) 스케줄링

CPU가 이용가능해지면 가장 작은 다음 CPU 버스트를 가진 프로세스에 할당하는 알고리즘. heap을 이용한 pq로 구현한 큐가 되겠다. 두 프로세스가 동일한 CPU 버스트 타임을 가진다면 둘 사이에서는 FCFS를 적용한다.

Gantt 차트로 계산을 해보자면 waiting time을 기준으로 두었을 때 SFJ 스케줄링이 optimal함을 증명할 수 있다. *하지만 문제는 시작하지 않은 프로세스의 CPU 버스트 길이를 알 방법이 없다는 것이다*. 정확한 값을 알 수 없으니 과거 데이터를 통해 CPU 버스트를 예측하는데, 이 때 일반적으로 **지수 평균 (exponential average)**을 이용한다.

$$
t_{n+1} = at_{n} + (1 - a)t_{n}
$$

> tn은 최근의 정보를 가지며 𝜏n은 과거의 역사를 저장한다. 매개변수 𝛼는 예측의 weight를 제어한다. (alpha가 클 수록 최근 값에 무게가 실린다.)

SJF 알고리즘은 Preemptive 하거나 Non-preemptive할 수 있다. 앞의 프로세스가 실행되는 도중 우선순위가 높은 새로운 프로세스가 ready queue에 도착할 경우가 갈림길이 되겠다. preemptive SJF의 경우 **SRTF (Shortest Remaining Time First) 스케줄링**이라 불린다.



#### 5.3.3 Round-Robin 스케줄링

preemptive한 FCFS 스케줄링이다. Time Quantum (= Time Slice)라는 작은 단위시간을 정의하고 이 단위로 분할하는 개념을 섞었다. time quantum은 일반적으로 10 ~ 100 밀리초이다. CPU 스케줄러는 time quantum이 지난 후 interrupt를 걸도록 타이머를 설정한 후, ready queue에서 process를 dispatch한다.

RR 알고리즘의 성능은 time quantum의 크기에 매우 많은 영향을 받는다. 만약 time quantum을 무한으로 끌어올리면 그건 그냥 FCFS 와 동일하고, 0에 근사하게 만든다면  dispatch latency를 다 보내기도 전에 time slice가 만료되어 다음 process로 context switch될 것이다. 



#### 5.3.4 Priority 스케줄링

우선순위 큐를 이용해 구현하는 스케줄링. SJF 스케줄링이 Priority 스케줄링의 일환이다. 우선순위 스케줄링은 preemptive하거나 non-preemptive할 수 있다. 우선순위는 내부적 혹은 외부적으로 정의될 수 있다. 

내부적 우선순위 

- process의 우선순위를 계산하기 위한 측정가능한 quantatatives
- 시간제한, 메모리 request, 열린 파일의 수, 평균 I/O 버스트와 평균 CPU 버스트의 비율 등

외부적 우선순위

- 프로세스의 중요성, 컴퓨터 사용을 위해 지불되는 비용의 유형과 양, 그 작업을 후원하는 부서, 정치적인 요인 등

##### Starvation 상태 / Indefinite Blocking 상태

우선순위 스케줄링을 사용할 경우 우선순위가 아주 낮은 프로세스들은 영영 CPU를 점유하지 못할 수도 있다. 계속 ready queue에 process들이 삽입될텐데, 그 때마다 우선순위가 낮다면 끝도 없이 밀려나기 때문이다. 이렇게 계속 대기만 하는 프로세스를 starvation (기아 상태)에 빠졌다고 한다.

##### Aging (노화)

기아 상태의 한 가지 해결방안이다. 오랫동안 ready queue에서 대기하는 process들의 우선순위를 점진적으로 증가시키는 방안이다. 



#### 5.3.5 MLQ (Multi-Level Queue) 스케줄링

우선순위마다 별도의 큐를 갖는 것이 더 쉬울 때도 있다. MLQ에서 우선순위 스케줄링은 우선순위가 가장 높은 큐에서 프로세스를 스케줄 한다.

프로세스 유형에 따라 분할해 MLQ 알고리즘을 사용할 수 있다. 예를들어, 흔히 **Foreground (대화형)** 프로세스와 **Background (배치)** 프로세스를 구분한다. Foreground가 더 반응에 민감해야하므로 우선순위가 높다.

![](Users/leobang/Documents/pics/multilevelqueue.jpeg)

각 큐마다 다른 알고리즘에 의해 스케줄링 될 수도 있다. 예를들어, Background 큐는 FCFS 알고리즘에 의해 스케줄 되는 반면, Foreground 큐는 RR 알고리즘에 의해 스케줄 될 수 있다.

큐와 큐 사이의 스케줄링도 반드시 필요하다. **일반적으로 고정된 우선순위의 preemptive 스케줄링으로 구현된다.** 이 우선순위는 절대적이다. 만약 real-time 프로세스, system 프로세스가 모두 비어있지 않다면 interactive 프로세스는 실행될 수 없다. 스마트폰 같은 경우에는 전화 처리하는게 가장 우선순위가 높을 것 아냐.

혹은 각 큐마다 CPU를 선점할 수 있는 시간의 percentage를 줘서 나눠쓰는 방법도 있다. 예를들어, foreground 큐는 RR 스케줄링을 위해 CPU 시간의 80%가 주어지고, Background 큐는 CPU 시간의 20%를 받아 FCFS를 실행할 수 있다.



#### 5.3.6 MLFQ (Multi-Level Feedback Queue) 스케줄링 

MLQ 에서는 프로세스들이 어느 큐에 들어가는지 정해져 있고 변하지 않는다. Foreground 프로세스는 무조건 Foreground 큐에 들어가고, Backgroun 프로세스는 무조건 Background 큐에 들어간다. 

반면 MLFQ에서는 프로세스가 큐들 사이를 넘나들 수 있다. **프로세스가 분야별로  구분되는게 아니라 CPU 버스트 성격에 따라 구분하기 때문이다.** 어떤 프로세스가 CPU 시간을 너무 많이 사용하면, 낮은 우선순위의 큐로 이동된다. 이렇게되면 *I/O Bound (I/O 버스트가 큰) 프로세스와 대화형 프로세스들은 항상 높은 우선순위의 큐로 분류*된다. 이들은 통상적으로 짧은 CPU 버스트 타임을 가지기 때문이다.

큐가 0,1,2로 3개 있는 MLFQ를 생각해보자. 큐 0은 8ms의 time slice를 가지고, 큐 1은 16ms의 time slice를 가진다. 큐 2는 time slice가 무한인 FCFS이다. 만약 P0이 처음 실행되면 큐0에 들어간다. time sllice인 8ms동안 실행을 마치지 못한다면 interleaved되고, 이번엔 큐1로 들어간다. 큐0가 비어있다고 가정했을 때 큐1의 차례가 오면 또 16ms만큼 CPU를 점유하고, 이번에도 끝내지 못했을 경우 또다시 interleaved되어 FCFS 큐인 큐2에서 대기하게 된다.



## 5.4 쓰레드 스케줄링

프로세스 스케줄링에 대해 살펴보았지만, 현대적 OS에서 프로세스 스케줄링을 하진 않는다. 대부분 최신 OS에서 스케줄되는 대상은 **kernel thread**이다. user thread는 스레드 라이브러리에 의해 관리될 뿐 kernel thread는 user thread의 존재를 알지 못한다. CPU 상에 실행되기 위해 LWP를 통한 간접적인 방식으로 user thread와 매핑되어 서비스할 뿐이다. 

#### 5.4.1 경쟁 범위 (Contention Scope)

user thread와 kernel thread의 차이는 어떻게 스케줄 되느냐에 있다. 

##### User Thread (PCS)

다대다와 다대일 모델을 구현하는 시스템에서의 스레드 라이브러리는 user thread를 LWP 상에서 스케줄한다. 이러한 기법은 동일한 프로세스에 속한 thread들 끼리 CPU를 경쟁하므로 *PCS* (Process-contention scope; 프로세스 경쟁범위)라고 한다.

*user thread가 쓰레드 라이브러리의 LWP 상에서 스케줄한다고 말하지만, 실제로 쓰레드가 CPU 상에서 실행 중이진 않다.* 실제로 CPU 상에서 실행되기 위해서는 OS가 LWP의 kernel thread를 물리적인 CPU 코어로 스케줄해야 한다.

PCS는 우선순위에 따라 실행된다. 스케줄러는 가장 높은 우선순위를 가진 실행 가능한 프로세스를 선택한다. 

##### Kernel Thread (SCS)

CPU 상의 어떤 kernel thread를 스케줄할 것인지 결정하기 위해서 kernel은 SCS (System-Contention Score; 시스템 경쟁 범위)를 사용한다. SCS 스케줄링에서는 시스템 상의 *모든 쓰레드*가 CPU에 대해 경쟁한다.

Windows와 Linux 같은 일대일 모델을 이용하는 경우 시스템은 오직 SCS만을 사용해 스케줄한다.



## 5.5 멀티 프로세서 스케줄링

지금까지는 단일 CPU를 스케줄링하는 것에 주안점을 두었다. 만일 CPU가 여러 대 있다면 여러 개의 쓰레드가 parallel (병렬적)하게 실행될 수 있으므로 부하 공유 (load sharing)이 가능해진다. 그만큼 복잡해지긴 하지만 ... 

멀티 프로세서는 다음 시스템 아키텍처들에 사용될 수 있다.

- 멀티 코어 CPU
- 멀티 쓰레드 코어
- NUMA 시스템
- 이기종 멀티프로세싱

앞의 3가지 예시는 여러 대의 프로세서의 성능이 모두 동일하다고 가정한다. 이기종 멀티프로세싱은 프로세서의 성능이 서로 다를 경우의 시스템을 살펴본다.

#### 5.5.1 멀티프로세서 스케줄링에 대한 접근방법

두 가지 접근 방법이 있다.

##### AMP (Asymmetric MultiProcessing) - 비대칭 멀티프로세싱

하나의 프로세서가 Master Server 역할을 하여 모든 스케줄링 결정과 I/O 처리, 그리고 다른 시스템들의 활동을 제어한다. 다른 프로세서들은 오로지 계산만 한다. 하나의 코어만 시스템 자료구조에 접근하기 때문에 자료 공유를 하지 않아도 되어 간단하다. 하지만 Master Server가 전체 시스템 성능을 저하시키는 병목이 된다는 것이 단점이다. 

##### SMP (Symmetric MultiProcessing) - 대칭 멀티프로세싱

보통 이 접근방식을 이용한다. 각 프로세서는 스스로 스케줄링할 수 있다. 스스로 ready queue를 체크하고 실행할 쓰레드를 선택해 스케줄링을 진행한다. 이 경우 가능한 전략이 2가지 있다.

- 모든 thread가 공통된 ready queue에 담겨있다.
- 각 프로세서는 자신만의 ready queue를 가질 수 있다.

![](Users/leobang/Documents/pics/smp-readyqueue.jpeg)

첫번째 전략은 동일한 thread를 스케줄 하지 않도록 하기 위해 locking 기법이 필요한데, 이게 좀 보갑하다. 따라서 두번째 옵션을 주로 이용한다 (per-core ready queues).



#### 5.5.2 멀티코어 프로세서 (Multicore Processors)

현대 컴퓨터의 하드웨어는 동일한 물리적인 칩 안에 여러 개의 처리 코어를 장착하여 **멀티 코어 프로세서**가 되었다. *각 코어는 구조적인 상태를 유지하고 있어 OS 입장에서는 개별적인 논리적 CPU처럼 보인다.* 



#### 5.5.3 로드 밸런싱 (Load Balancing)

각 프로세서가 비교적 균등한 양의 일을 할 수 있도록 load balancing이 필요하다.

##### push migration 

특정 태스크가 주기적으로 각 프로세서의 부하를 검사하고 만일 불균형 상태일 경우 노는 프로세서로 thread를 push 시킴으로서 load balancing 하는 방식

##### pull migration

쉬고있는 프로세서가 바쁜 프로세서의 ready queue에서 쓰레드를 pull 해오는 방식.



#### 5.5.4 프로세서 선호도 (Processor Affinity)

