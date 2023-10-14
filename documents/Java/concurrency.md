---
title: "Java로 이해하는 Concurrency"
createdAt: 2022-12-26
---

> [Oracle의 Concurrency Docs](https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html)를 기반으로 Java 플랫폼의 기본적인 concurrency 지원과 `java.util.concurrent` 패키지의 고수준 API를 알아봅니당.

# 1. Process와 Thread

모든 concurrency 프로그래밍의 기본적인 실행 단위는 *process*와 *thread*이다. Java에서의 concurrency는 주로 thread와 연관이 되어있지만, process 역시 중요하다. 

일반적으로 컴퓨터 시스템은 여러 개의 활성화된 process와 thread를 지닌다. 이는 한번에 한 thread만 실행할 수 있는 single-core 컴퓨터도 마찬가지이다. single-core는 OS의 *slicing* 기능을 통해 process간, 그리고 thread간 processing-time을 시분할하여 나눠가진다.

현대 컴퓨터 시스템은 다수의 processor, 혹은 하나의 processor에도 여러 개의 execution-core를 가지게 되었다. 이와 같은 기술의 발전을 통해 시스템의 concurrency 능력이 극대화 된 것은 사실이지만, concurrency는 단순한 single-core로도 실행이 가능함을 기억하자.

### Processes

프로세스는 독자적인 실행 환경을 가지고 있다. 프로세스는 각자 자신의 메모리 공간을 지니고 있으며, 일반적으로 private set of basic run-time resource를 가지고 있다. 

종종  `프로세스 = 프로그램`, 혹은 `프로세스 = 하나의 Application`과 같은 착각을 하곤한다. 히지만 Application은 다수의 협력하는 프로세스로 구성되어있을 확률이 크다. process간 통신을 원활하기 위해 대부분의 운영체제는 *socket*과 *pipe*와 같은 IPC 기법을 제공한다. IPC는 같은 시스템 내의 process간 뿐 아니라 다른 시스템의 process간 소통을 위해서도 이용된다.

JVM 구현의 대부분은 하나의 process로 실행된다. Java app은 `ProcessBuilder` 객체를 이용해 추가적인 process를 생성할 수는 있지만, multi-process app은 이 장의 주제를 벗어나므로 다루지 않는다.

### Threads

Thread는 light-weight process라고 부르기도 한다. process와 마찬가지로 독자적인 실행환경을 가지고있지만, 새로운 프로세스를 생성하는 것보다 새로운 thread를 생성하는게 더 적은 resource를 사용하기 때문이다.

Thread는 process안에 존재한다. 모든 process는 1개 이상의 thread를 가지고 있다. 동일한 process안의 thread는 메모리, 열린 파일과 같은 process의 resource를 공유한다. 이는 communication을 효율적으로 만들기도 하지만 종종 문제를 일으키기도 한다..! 

Multi-Thread execution은 Java 플랫폼이 제공하는 가장 핵심적인 기능이다. 모든 App은 적어도 1개 이상의 thread를 가지고 있다. 하지만 응용 프로그래머의 시점에서 보았을 때, 우리는 단 하나의 thread로 시작한다. *`main` 쓰레드* 말이다. 다음 장부터 이 thread를 이용해 추가적인 thread를 생성하는 방법을 배워보자.



# 2. `java.lang.Thread`

각 thread는 `java.lang.Thread` 클래스의 인스턴스이다. Concurrency를 적용한 App을 위해 `Thread` 객체를 이용하는 방법은 다음과 같다.

1. Thread의 생성과 조작을 **직접 관리**한다.
   - App이 비동기적인 작업을 수행해야할 때마다 `Thread` 인스턴스를 직접 생성하는 방식이다. 

2. Thread를 **추상적으로 관리**한다.
   - App의 task를 `executor`에게 던져주면, `executor`가 thread를 관리해준다.

해당 `2.*` section은 `Thread` 객체를 직접 다루는 1번 방식을 설명한다. 후자인 *Executor*에 대해서는 `7.*`장에서 설명하는  High Level Concurrency 항목을 참조하길 바란다.

본 장에서는 `Thread` 객체를 이용해 thread를 직접 생성하는 방법과 `Thread` 객체의 대표적인 메서드를 통해 thread를 조작하는 방법을 학습한다.



## 2.1 Thread 생성하고 구현하기 

`Thread`의 인스턴스를 생성했다면 *반드시 해당 thread 인스턴스의 실행을 구현*해야한다. 그 방법은 다음 2가지와 같다.

### 2.1.1 Runnable 인터페이스 구현을 통해 생성

``` java
public class HelloRunnable implements Runnable {
  public void run() {
    System.out.println("Thread 안녕!");
  }
  public static void main(String args[]) {
    (new Thread(new HelloRunnable())).start();
  }
}
```

`Runnable` 인터페이스는 `run`이라는 단 하나의 메서드를 가진다. `run` 메서드는 `Thread`에서 실행하고자 하는 내용을 구현하는 메서드이다. `Runnable`을 구현하는 클래스를 만든 후, `Thread` 생성자의 인자로 건네주면 `Thread`의 실행을 구현할 수 있다.



### 2.1.2 Thread 클래스 상속하여 생성

``` java
public class HelloThread extends Thread {
  public void run() {
    System.out.println("Thread 안녕!");
  }
  public static void main(String args[]) {
    (new HelloThread()).start();
  }
}
```

`Thread`는 그 자신이 `Runnable`을 구현하고 있다. 물론, 기본 구현되어있는 `run()` 메서드는 아무일도 하지 않는다. 따라서 `run()` 메서드를 직접 override하여 구현해주어야 한다.



### 2.1.3 둘 중 어떤 방식을 채택해야할까? 

두 방식 모두 `Thread`를 실행하기 위해서는 `Thread.start()` 메서드를 호출해야한다.

그럼 어떤 방식을 채택해야할까? **`Runnable` interface를 구현하는 방식이 보다 일반적이다.** `Runnable`은 interface이므로 이를 구현하는 방식이 보다 자유로운 선택지를 가지기 때문이다. `Thread`를 상속하는 방식을 채택할 경우 오로지 `Thread`만 부모클래스로 삼을 수 있는 반면, `Runnable`을 구현할 경우 다른 부모 클래스를 상속할 수도 있다.



## 2.2 Sleep

`Thread.sleep`은 **현재 실행중인 thread를 주어진 시간동안 중지**시킨다. 

thread 스케줄러는 해당 thread를 waiting queue로 이동시킨다. 주어진 시간이 모두 지나가면 해당 thread의 상태는 ready (= runnable)로 변경되고, ready queue에서 CPU에 배정되기를 기다린다. 

> ##### sleep time의 정확성이 보장되지 않는 이유
>
> `Thread.sleep()`은 OS의 thread 스케줄러의 영향을 받는다. running 상태에서 waiting queue로 context를 저장하는 시간, ready queue에서 다시 CPU로 context를 load하는데에는 시간이 소요되기 때문에 정확한 시간이 보장되지 않는다. 이를 dispatch latency라고 한다. 실행해야하는 thread가 많을수록 sleep time이 길어질 수 있다. 

**sleep 도중 다른 thread가 `interrupt`를 건다면 `InterruptedException`이 던져진다.** sleep time이 보장되지 않는 또 하나의 이유이기도 하다. 이를 try ~ catch로 잡아주어야 올바르게 interrupt에 대응할 수 있다.

**`Thread.sleep()`은 waiting queue에 가더라도 본인이 획득한 monitor나 lock은 잃어버리지 않는다.** 따라서 임계영역에 접근하려는 다른 thread가 예상치 못하게 대기할 수도 있음을 유의하여 프로그래밍하자.

다음 `SleepMessages` 예시는 4초 간격으로 메시지를 출력하도록 한다.

``` java
public class SleepMessages {
  public static void main(String args[]) throws InterruptException {
    String importantInfo[] = {
      "저는요", "개발이", "재미있어요", "진짜에요"
    };
    
    for (int i = 0; i < importantInfo.length; i++) {
      // 4초간 실행을 중지한다.
      Thread.sleep(4_000);
      // 메시지 출력
      System.out.println(importantInfo[i]);
    }
  }
}
```



## 2.3 Interrupts

` interrupt`은 thread가 현재 하고 있는 일을 중단하고 다른 일을 하라는 일종의 신호이다. 해당 메서드를 호출하면, **호출한 thread를 interrupt**한다. 

만약 thread가 `Object` 클래스의 `wait()`, 혹은 `Thread` 클래스의 `join()`이나`sleep()`에 의해 실행이 보류된 상태라면, interrupt status가 clear되면서 해당 thread에 `InterruptedException`이 던져지게 된다.

그 외 상황 interrupt status만 설정하고 예외는 던지지 않는다. 죽어있는 thread에 `interrupt`를 호출한다면 아무일도 일어나지 않는다.

### 2.3.1 Interrupt에 대응하기

올바른 interrupt 메커니즘을 수행하기 위해서는 interrupt이 걸린 thread 역시 interrupt에 대한 대응을 구현해야한다.

#### 2.3.1.1 `try ~ catch`를 통해 예외처리하기

thread가 `InterruptedException`을 던지는 메서드를 호출하고 있다면, 해당 예외를 잡아낼 `try ~ catch`을 통해 interrupt에 대응한다. 

아까의 `SimpleMessages` 예시의 for loop 부분이 `Runnable`을 구현하는 `run`메서드 안에 있다고 가정해보자. 

``` java
for (int i = 0; i < importantInfo.length; i ++) {
  // 4초간 중지
  try {
    Thread.sleep(4_000);
  } catch (InterruptedException e) {
    // interrupt 당함. 실행은 여기서 끝
    return;
  }
  // 메시지 출력
	System.out.println(importantInfo[i]);
}
```



#### 2.3.1.2 `Thread.interrupted()` 이용하기

`Thread.interrtupted()`는 **현재 실행중인 thread가 interrupt 당했는지를 확인**하는 메서드이다. 

`wait()`, `join()`, `sleep()` 메서드로 실행을 보류하고 있는 thread가 아니라면 interrupt되어도 예외를 던지지 않고 interrupt status만 수정해놓는다 .이 경우 thread는 주기적으로 `Thread.interrupted()`를 호출해 interrupt를 받았는지 확인해주어야 한다. 

``` java
for (int i = 0; i < inputs.length; i ++) {
  heavyCrunch(inputs[i]);
  if (Thread.interrupted()) {
    // interrupt 당했다. return하자
    return;
  }
}
```

보다 문맥상 적합한 예시는 `InterruptedException`을 다시 던지는 것이다. 이를 통해 `try ~ catch`로 예외상황을 핸들링할 수 있게 되었다.

``` java
if (Thread.interrupted()) {
  throw new InterruptedException();
}
```



## 2.4 Joins

`Thread.join()` 메서드는 **현재 실행중인 thread를 호출한 thread가 죽을 때까지 대기시킨다.** millisecond를 인자로 받을 수도 있는데, 이 경우 thread가 죽기까지 최대 millisecond까지 기다린다.

``` java
t.join();
```

t의 thread가 죽을 때까지 현재 실행 중인 thread의 실행을 멈추게 된다.

`join()` 역시 `sleep()`과 동일하게 정확한 시간을 보장받지 못하며, interrupt가 발생했을 때 `InterruptedException`이 던져진다.



## 2.5 SimpleThreads 예시

해당 예시는 `2.*`  챕터의 컨셉을 충실하게 담고 있다. `SimpleThreads` app은 두 개의 thread로 이루어져 있다. 하나는 모든 Java app이 가지고 있는 main thread이다. 그리고 main thread 위에서 `Runnable` 구현 (`MessageLoop`)을 통해 새로운 thread를 생성하고, 그 thread가 끝나길 기다린다. 만약 `MessageLoop`이 실행하는데 너무 오래걸린다면 main thread는 interrupt를 건다. 

`MessageLoop` thread는 일련의 메시지를 출력한다. 만약 모든 메시지가 출력되기 전에 interrupt 당한다면, `MessageLoop`은 특정 메시지를 출력하고 퇴장한다.

``` java
public class SimpleThreads {
  static void threadMessage(String message) {
    String threadName = Thread.currentThread().getName();
    System.out.println("%s: %s%n", threadName, message);
  }
  
  private static class MessageLoop implements Runnable {
    public void run() {
      String importantInfo[] = {
        "1번 메시지",
        "2번 메시지",
        "3번 메시지",
        "4번 메시지"
      };
      try {
        for (int i = 0; i < importantInfo.length; i ++) {
          // 4초간 실행을 중지한다.
          Thread.sleep(4_000);
          // 메시지 출력
          threadMesage(importantInfo[i]);
        }
      } catch (InterruptedException e) {
        threadMessage("아직 안끝났는데...");
      }
    }
  }
  
  public static void main(String args[]) throws InterruptedException {
    long patience = 1000 * 60 * 60; 
    
    if (args.length > 0) {
      try {
        patience = Long.parseLong(args[0]) * 1000;
      } catch (NumberFormatException e) {
        System.err.println("인자는 정수여야 합니다");
        System.exit();
      }
    }
    
    threadMessage("MessageLoop 쓰레드를 시작합니다");
    long startTime = System.currentTimeMillis();
    Thread t = new Thread(new MessageLoop());
    t.start();
    
    threadMessage("MessageLoop 쓰레드가 끝내길 기다리고 있음...");
    while (t.isAlive()) {
      threadMessage("여전히 기다리는 중...");
      // 최대 1초 기다린다.
      t.join(1_000);
      if ((System.currentTimeMillis() - startTime) > patience && t.isAlive()) {
       	threadMessage("이제 못기다리겠어!");
        t.interrupt();
        t.join();
      }
    }
    threadMessage("드디어!");
  }
}
```



# 3. Synchronization

Thread는 공유된 필드, 혹은 공유된 참조객체에 접근하여 서로 소통한다. 이는 매우 효율적이지만 두가지 잠재적 문제점을 야기한다: *thread interference*와 *memory inconsistency* 문제이다. 이 두 가지 문제점을 해결하는 도구가 바로 *synchronization* (동기화)이다. 

한편, synchronization은 thread의 경쟁상태 역시 유발한다. 두 개 이상의 thread가 하나의 resource에 동시에 접근하고자 하면, Java 런타임은 어떤 thread를 매우 느리게 처리하거나 아예 실행을 중지시키기도 한다. Starvation과 live lock이 이 thread 경쟁상태의 한 형태이다. 

본 챕터에서는 다음과 같은 주제를 다룬다.

- Thread Interference: 다수의 thread가 shared data에 동시에 접근할 때 어떻게 error가 발생하는지 설명한다.
- Memory Inconsistency: shared memory의 메모리 불일치 에러를 설명한다.
- Synchronized Methods: thread interference와 memory inconsistency 문제를 방지할 수 있는 간단한 사용법을 알아본다.
- Implicit Lock과 Synchronization: 더 일반적인 synchronization 사용법을 알아보고, synchronization이 implicit lock에서 어떻게 파생되었는지 알아본다.
- Atomic Access: 다른 쓰레드에 의해 방해될 수 없는 operation에 대한 일반적인 idea들을 알아본다.

## 3.1 Thread Interference

`Counter`라는 단순한 클래스를 가정해보자.

``` java
class Counter {
  private int c = 0;
  public void increment() {
    c++;
  }
  public int value() {
    return c;
  }
}
```

한 `Counter`인스턴스가 여러 개의 thread에서 다뤄지고, 각 thread가 `increment` 메서드를 반복적으로 호출할 경우, `value()`의 값은 예측할 수 없게된다. 

`++` 연산이 우리가 볼 수 있는 것처럼 atomic한 연산이 아니기 때문이다. 기계어 레벨로 변환되면 해당 instruction은 3단계로 나뉜다. 따라서 나뉘어진 instruction 사이에 context switch가 일어난다면 일관된 결과를 보장할 수 없게 된다. 

이러한 interference는 발견하기 어렵다.

## 3.2 Memory Inconcistency 에러

> ##### Thread Interference와 Memory Inconsistency의 차이
>
> 메모리 불일치 문제는 고수준 언어의 문맥에서는 이해하기 어렵다. 멀티-CPU 시스템에서의 shared memory를 다루는 방식은 아키텍처마다 크게 다르며, 특히 현대 프로그래머들이 이용하고 있는 x86은 멀티프로세서 모델이 처음 등장했을 때 제시된 아키텍처 (POWER나 SPARC와 같은)에 비해서는 차원이 다를 정도로 유저친화적이기 때문에 우리는 memory inconsistency 와 같은 문제를 명확하기 이해하기 어렵다. 
>
> 가장 일반적인 예를 들어보자. `x`의 값이 3으로 초기화되었다고 가정하자. 
>
> ``` assembly
> STORE	4 -> x    // x 는 메모리 주소이다.
> STORE 5 -> x
> ```
>
> 그리고 다른 CPU가 다음의 instruction을 실행한다.
>
> ``` assembly
> LOAD x
> LOAD x
> ```
>
> 두 LOAD 연산의 결과로 `3,3`, `3,4`, `4,4` , `4,5` 혹은 `5,5`를 얻을 수 있다. 동일한 메모리 주소에 대한  write 연산의 순서는 CPU가 보장해주지만, 해당 메모리 주소를 언제 read하는지 그 시점은 알 수 없다. 따라서 첫번째 LOAD한 x값이 두번째 LOAD한 x값보다 같거나 작은 것은 보장되지만, 그 결과를 정확하게는 예측할 수 없는 것이다. 
>
> 
>
> Thread interference는 보다 단순한 문제이다. Java와 같은 고수준 언어의 경우 단일 statement가 atomic한 실행을 보장하지 않을 수 있기 때문에 생기는 문제이다. 예를들어, 값을 증가시키는 `++` 연산을 생각해보자. 해당 연산을 machine level로 변환하면 다음 세가지 연산으로 나누어진다.
>
> - 값을 읽는다. (`LOAD`)
> - 값을 증가시킨다. (`INCREMENT`)
> - 값을 저장한다. (`STORE`)
>
> Java 코드가 더 작은 atomic 연산들로 분해되므로 해당 구문을 명시적으로 동기화하지 않는다면 나누어진 연산 도중 interleave가 일어날 수 있다. 따라서 결과를 예측할 수 없게 되는 문제가 바로 thread interference이다. 
>
> thread interference 문제는 다음과 같이 코드를 thread-safe하게 만들어 해결할 수 있다.
>
> - `synchronized` 키워드 사용
> - 동일한 객체에 다수 쓰레드가 동시에 접근하는 것을 막는다. (Mutex)
> - 변수를 final로 선언한다.
> - 변수를 volatile로 선언한다.
> - 불변객체를 생성한다.

thread interference는 서로 다른 thread들이 각자의 statement를 overwite하는 문제이다. 

반면 memory inconsistency는 visibility의 문제이다. Thread A가 `counter`를 증가시켰지만, thread B는 해당 변화를 감지하지 못해 이전의 값을 읽어들이는 문제이다. 메모리 불일치 문제는 happens-before relationship을 생성함으로서 해결할 수 있다.

어떤 statement을 실행해 write한 메모리의 상태는 다른 특정한 statement에게도 전파되어, 관측가능한 상태가 된다는 것이다. 



memory consistency 문제와 happens-before 관계에 대해 깊이 이해할 필요는 없다. happens-before 관계를 생성해 memory consistency 문제를 해결하는 방법만 알면 된다. Java에서 happens-before 관계를 생성하는 대표적인 방법은 `synchronized` 키워드를 이용하는 것이다. 

---

멀티 쓰레딩 환경에서는 한 thread의 쓰기 작업의 결과가 다른 thread에게 관측되지 않아, 두 thread가 동일한 shared data에 대해 inconsistent view를 가질 수 있다. 이를 Memory Consistency 에러라고 한다. 

Memory consistency는 Java 기반이라기보다는 아키텍처 기반 개념에 가깝다. 

Memory consistency 문제는 happens-before relationship을 설정하여 방지할 수 있다. happens-before는 shared data에 대한 어떤 thread의 쓰기 작업의 결과가 다른 thread에게도 전파되어 visible함을 보장해준다.

다음을 통해 happens-before relationship을 설정할 수 있다.

- `Thread.start()` - 이 statement는 
- `Thread.join()` join을 수행한 thread에 해당 thread의 행위가 visible하게 한다.





## 3.3 Synchronized 메서드

Java의 `synchronized` 구문을 통해 동기화를 구현할 수 있다. `synchronized`를 이용하는 방법은 2가지이다. 

- synchronized 메서드
- synchronized statement

해당 section은 synchronized 메서드를 다룬다.

메서드를 동기화하려면, 함수의 선언부에 `synchronized` 키워드를 부착하면 된다.

``` java
public class SynchronizedCounter {
  private int c = 0;
  public synchronized void increment() {
    c++;
  }
  public synchronized int value() {
    return c;
  }
}
```

이를 통해 다음 두 효과를 기대할 수 있다.

- 동일한 객체에서 sync된 메서드의 2번의 호출이 interleave될 수 없다. 한 thread가 object의 sychronized 메서드를 실행하고 있다면, 해당 object의 sycnchronized 메서드를 실행하고자 하는 다른 모든 thread는 첫번째 thread가 object에 대한 작업을 모두 수행할 때까지 execution이 suspend된다.
- sycnchronized 메서드가 끝났을 경우 자동으로 다음 접근을 허용한다.

생성자는 synchronized될 수 없다. 붙일 경우 문법 에러를 띄운다. 왜냐하면 object가 생성되는 동안은 하나의 thread (생성하고 있는 thread)만 access 할 수 있는게 애초에 당연하기 때문이다. 

`synchronized`는 thread interference와 memory inconsistency에 대한 간단한 해결책을 제시한다. 물론, final 필드는 예외이다. 생성된 이후로는 불변 값/객체이므로 동기화 없이도 안전하게 읽기 작업을 수행할 수 있다. 이러한 전략은 효과적이지만, 추후에 설명할 liveness 문제를 야기하기도 한다.

## 3.4 Intrinsic Lock과 Synchronization

Java의 동기화 기법은 *intrinsic lock (본질적 락)*, 혹은 *monitor lock (모니터 락)*이라 불리는 내부 엔티티 위에 설계되었다. (명세에서는 종종 monitor라 줄이기도 한다.) Intrinsic lock은 동기화를 위한 두가지 핵심 기능을 수행한다.

- Race Condition이 일어난 객체에 대해 mutex를 보장한다. (상호 배제)
- visibility를 위해 필수적인 happens-before 관계를 정의한다. 

모든 Java 객체는 그 자신의 intrinsic lock을 지니고 있다. thread가 객체에 exclusive하고 consistent한 접근을 원한다면, 우선 해당 객체의 intrinsic lock을 획득해야한다. 반대로 작업이 끝났을 때는 획득한 intrinsic lock을 반납해야한다. thread는 획득과 반납 사이의 기간동안 intrinsic lock을 온전히 소유해야한다. 특정 thread가 intrinsic lock을 소유하고 있는 동안은 다른 어떤 thread도 동일한 intrinsic lock을 소유할 수 없다. lock을 획득하고자 시도할 때 block 당한다.

thread가 intrinsic lock을 반납하면, 해당 lock을 획득하고자 대기중이었던 thread들에 대한 happens-before 관계가 생성된다. 

### Synchronized 메서드의 intrinsic lock

thread가 `synchronized` 메서드를 호출하면, 자동적으로 해당 메서드의 instance에 대한 intrinsic lock을 획득한다. (혹은 획득하려고 시도한다.) 획득한 lock은 호출한 동기화 메서드를 빠져나갈 때 반납하게 된다. return 문에 도달하건, 처리하지 못한 exception에 의해 강제로 빠져나가던 해당 메서드가 콜스택에서 제거되는 순간 lock을 반납하게 된다.

그렇다면 static 메서드에 `synchronized` 키워드를 붙이면 어떻게 될까? static 메서드는 각 instance이 아닌 class 자체와 연관되어있다. 이 경우 동기화된 static 메서드를 호출한다면 해당 클래스 자체에 대한 intrinsic lock을 획득한다. 따라서 class의 static 필드가 lock의 통제 하에 들어오게 된다. 

### Synchronized 구문

구문 블록에 `synchronized` 키워드를 수식할 수도 있다. 이 경우에는 thread에 intrinsic lock을 제공할 객체를 인자로 건네주어야 한다.

``` java
public void addName(String name) {
  synchronized(this) {
    lastName = name;
    nameCount++;
  }
  nameList.add(name);
}
```

해당 예시에서 `addName` 메서드는 `lastName`, `nameCount`에 대한 동기화를 얻고자 한다. 동시에, 다른 객체의 메서드에 대한 동기화된 호출 역시 회피하고자 한다. (동기화된 블록에서 다른 객체의 메서드를 호출하는 것은 `4.*` 장에서 설명할 Liveness 문제를 일으킬 수 있다.)

위의 예시처럼 `synchronized` 구문을 이용할 수 없었다면 synchronized 메서드와 동기화되지 않은 메서드를 분리한 뒤, 이 둘을 따로따로 호출해야했을 것이다. 근데 함수가 하나의 일만 한다는 관점에서 보았을 때 분리하는게 더 나을지도..?

`synchronized` 구문은 섬세한 concurrency를 구현하기 위해 이용되기도 한다. 예를들어, `MsLunch`가 절~대 같이 이용되지 않는 두 인스턴스 필드 `c1`과 `c2`를 가지고 있다고 하자. 각 필드에 대한 update는 동기화되어야 하지만, `c1`을 업데이트하는 중에 `c2`를 업데이트한다고 해서 block될 이유는 없다고 한다. 이 경우에 method 레벨로 동기화 하는 것은 불필요한 block을 발생시켜 concurrency 효율을 낮추게된다. method 레벨 동기화나 `this`를 동기화하는 것 대신, 오직 lock만을 위한 두 객체를 생성해보자.

``` java
public class MsLunch {
  private long c1 = 0;
  private long c2 = 0;
  private Object lock1 = new Object();
  private Object lock2 = new Object();
	
  public void inc1() {
    synchronized(lock1) {
      c1++;
    }
  }
  
  public void inc2() {
    synchronized(lock2) {
      c2++;
    }
  }
}
```

이 경우 `inc1`을 호출할 때 다른 thread가 `lock1`에 접근하는 것 (= `inc1`을 통해 `c1`을 증가시키는 것)은 막지만, 다른 thread가 `lock2`를 획득해 `c2`에 접근하는 일은 막지않는다. 효율적이다! 

하지만 구문 동기화는 더 자유로운 만큼 꼼꼼히 이용해야한다는 점을 명심하자. 

### Reentrant Synchronization

intrinsic lock은 한 시점에 한 thread만 소유할 수 있다.  (Mutex) 그러나, thread는 그 자신이 이미 소유하고 있는 lock은 획득할 수 있다..!! 이처럼 동일한 lock을 1번 이상 획득할 수 있는 것은 *reentrant synchronization*을 가능케한다. synchronized된 코드가 직접 혹은 간접적으로 synchronized된 코드를 포함한 메서드를 호출하는 상황으로 설명할 수 있다. 그리고 그 두 코드가 동일한 lock을 이용할 경우이다.. reentrant synchronization이 없다면 동기화된 코드는 실행하고 있는 thread 그 자신을 block하지 않도록 매우 조심해서 짜야할 것이다.



## 3.5 Atomic 접근 

Atomic한 action이란 더이상 나눌 수 없는 최소단위의 행위를 뜻한다. atomic action은 도중에 멈출 수 없다: 모두 실행되거나, 아예 일어나지 않거나 둘 중 하나이다. 

Atomic action은 thread interference로부터는 자유롭지만, 여전히 Memory consistency는 잠재적인 문제로 남아있다. `volatile` 변수를 이용한다면 memory consistency 에러를 회피할 수 있다. `volatile` 변수는 동일한 변수에 대한 read에  happens-before 관계를 설정한다. 이는 `volatile` 변수의 변화는 항상 다른 thread에게 관측가능하다는 것이다. 

동기화된 코드를 작성하는 것보다 atomic variable을 이용하는게 더 편리하지만 그만큼 개발자가 memory consistency에 유의하여 코드를 작성해야한다. `synchronized` 블록은 자동으로 happens-before 관계를 설정하여 memory consistency 문제로부터도 자유롭다.



# 4. Liveness

*Liveness*란 concurrent 애플리케이션이 순차적으로 실행되는 상황을 뜻한다.

본 장에서는 liveness의 대표적인 문제상황인 **deadlock**, **starvation**, **livelock**을 알아본다.

## 4.1 Deadlock

*데드락*은 2개 이상의 쓰레드가 서로를 영원히 기다리는 상황을 말한다. 

Alphonse와 Gastone의 다음의 예시를 확인해보자. 둘은 인사를 하려고 하고, 인사를 받으면 인사를 돌려주는 것이 둘만의 rule이다.

``` java
public class Deadlock {
    static class Friend {
        private final String name;
        public Friend(String name) {
            this.name = name;
        }
        public String getName() {
            return this.name;
        }
        public synchronized void bow(Friend bower) {
            System.out.format("%s: %s"
                + "  가 나에게 인사했군!%n", 
                this.name, bower.getName());
            bower.bowBack(this);
        }
        public synchronized void bowBack(Friend bower) {
            System.out.format("%s: %s"
                + " 가 나에게 인사를 돌려줬어!%n",
                this.name, bower.getName());
        }
    }

    public static void main(String[] args) {
        final Friend alphonse =
            new Friend("Alphonse");
        final Friend gaston =
            new Friend("Gaston");
        new Thread(new Runnable() {
            public void run() { alphonse.bow(gaston); }
        }).start();
        new Thread(new Runnable() {
            public void run() { gaston.bow(alphonse); }
        }).start();
    }
}
```

높은 확률로 해당 코드는 deadlock에 걸린다.

- Thread1이 `alphonse.bow` 코드에 진입하면서 Thread1은 Alphonse 인스턴스에 대한 락을 획득한다.
- 동시에, Thread2가 `gaston.bow` 코드에 진입하면서 Thread2는 Gastone 인스턴스에 대한 락을 획득한다.
- `alphonse.bow` 함수 안의 `bower.bowBack(this)`를 실행하려고 한다. 하지만 이미 `alphonse.bow` 함수에 건네진 `bower`, 즉 Gastone 인스턴스에 대한 락은 Thread2이 가지고 있는 중이다.
  - 따라서 Thread1은 Thread2가 Gastone인스턴스의 락을 반환하길 기다린다.
- 동시에, `gastone.bow` 함수 안의 `bower.bowBack(this)`를 실행하려고 한다. 하지만 이미 `gastone.bow` 함수에 건네진 `bower`, 즉 Alphonse 인스턴스에 대한 락은 Thread1이 가지고 있는 중이다.
  - 따라서 Thread2는 Thread1이 Alphonse 인스턴스의 락을 반환하길 기다린다.
- 둘은 서로가 락을 반환하길 기다리지만, 둘 중 하나가 `synchronized` 구문을 탈출해야하므로 둘은 서로를 영원히 기다리는 **데드락** 상태에 빠진다.



## 4.2 Starvation

*Starvation*은 데드락 보다는 덜 생기는 문제다.

CPU Scheduler는 thread의 우선순위를 고려하여 CPU 코어에 올릴 다음 쓰레드를 결정한다. 이 때 우선순위가 낮은 thread가 영원히 실행되지 않는 상태를 말한다.



## 4.3 Livelock

*Livelock* 역시 데드락 보다는 덜 생기는 문제다. 

두개 이상의 thread가 락의 해제와 획득을 무한 반복하는 상태이다. 라이브 락은 데드락을 피하려는 의도에서 수정된 코드가 불완전할 때 발생하곤 한다.



# 5. Guarded Blocks

Producer - Consumer 모델이 임계영역을 두고 서로 소통하는 사례



# 6. Immutable Objects

*immutable* 한 객체란 한번 생성된 이후 그 상태가 변하기 않는 객체를 말한다. immutable한 객체를 많이 사용할 수록 단순하면서도 믿을만한 코드라고 할 수 있다.(?)

개발자들은 종종 immutable 객체를 사용하는 것을 꺼린다. 이미 생성된 객체를 변경하는 것과 새로운 객체를 만드는 것 중 후자에 대한 비용을 걱정하기 때문이다. **하지만 객체 생성의 영향을 종종 과대평가된다.** 이는 불변객체와 관련된 효율성의 일부로 상쇄될 수 있다.

- Garbage collection으로 인한 오버헤드 감소
- mutable 객체를 손상으로부터 보호하는데 필요한 코드 제거



>**Overhead (오버헤드)**
>
>어떤 처리를 하기 위해 들어가는 간접적인 처리시간 및 메모리를 말한다.
>
>e.g) A라는 처리를 단순히 실행하면 5초가 걸리는데 안전성을 고려하고 부가적인 B라는 처리를 추가한 결과 처리시간이 총 10초라면, 오버헤드는 5초이다.



# Reference

- https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html

- https://www.geeksforgeeks.org/interrupting-a-thread-in-java/

- https://www.digitalocean.com/community/tutorials/thread-sleep-java

- https://www.baeldung.com/java-synchronized

- https://stackoverflow.com/questions/3632299/memory-consistency-errors-vs-thread-interference

- https://www.geeksforgeeks.org/thread-interference-and-memory-consistency-errors-in-java/