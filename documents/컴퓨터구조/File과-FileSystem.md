---
title: "File과 File System, 그리고 App Process 입장에서의 File"
createdAt: 2024-04-13
---


File이란 데이터의 저장 및 관리를 위해 디지털 형식으로 조직된 data의 단위이다. text, image, video, SW program 등 다양한 형태의 data를 포함할 수 있다.

각 File은 고유한 이름과 file extension을 가지며, 이 extension을 이용해 파일의 유형을 구분한다. 

**File은 File System이라는 OS의 핵심 SW에 의해 논리적으로 추상화된 데이터 단위**일 뿐이고, 이를 물리적인 레벨로 내려본다면 사실은 HDD나 SDD와 같은 disk에 기록되어있는 binary의 연속일 뿐이다. 

Disk, 특히 HDD로 예로 들어보자. HDD를 HW 요소로만 생각한다면 그저 밋밋한 binary를 기록할 수 있는 판일 뿐이다. 이를 data를 적절하게 *관리할 수 있는 공간*으로 만들어야 이를 비로소 사용할 수 있다. 

## Format

*관리할 수 있는 공간*으로 만드는 행위가 바로 *Format*이다. Format은 보통 Low-level Format과 High-level Format으로 나뉜다. 

1. Low-level Format은 디스크의 표면을 Sector로 나누고 Track을 만들어 기본적인 데이터 저장 구조를 형성하는 과정이다. 요즘의 디스크는 보통 출하전에 low-level format을 마치고 판매된다.

2. High-level Format은 File System을 생성하고, 데이터를 저장하고 관리할 구조를 설정하는 과정이다. 일반적으로 유저가 실행하는 Format이 바로 이 High-level Format이다.

Format을 통해서 HDD는 binary를 기록하는 밋밋한 판인 HW에서, 논리적으로 관리 가능한 상태가 된다. 따라서 **Format을 한다는 것은 새로운 관리체계를 세우는 것**과 같다. 그렇기 때문에 Format을 하면 기존의 정보가 모두 날아가는 것이다. 



## File System이란? 

File System은 데이터를 효율적으로 *저장, 관리, 검색*하기 위해 사용되는 OS의 시스템이다. File System은 <u>OS의 중요한 부분</u>으로, data를 file 및 directory로 조작하고, disk에 어떻게 저장될지 결정하게 된다.

*File Allocation Table (FAT)*이 대표적인 File System이다. **이름 그대로 File이 어디에 할당되었는지 등에 대한 metadata를 저장한 table**이다. FAT는 File System 중 하나이지만, 사실 어떤 File system이 되었건 file의 메타데이터를 관리하는 것은 동일하다. 대신 각 file system마다 이름의 길이는 어떻고 등등,, 최적화하는 방식과 검색 등의 동작 메커니즘이 다르겠다.

OS 별 대표적인 file system은 다음과 같다:

- Windows
  - NTFS 
  - FAT32: 과거 window에 널리 이용되었다.
  - exFAT: FAT32의 확장
- macOS
  - HFS+ 
  - APFS
- Linux
  - ext4: 리눅스의 주요 파일시스템 
  - XFS

#### 파일을 삭제하면 + 휴지통에서조차 지우면 파일이 사라질까?

그렇지 않다. File System은 Table을 관리할 때 기본적으로 에 soft delete 처리를 해놓기 때문에 보이지만 않을 뿐 디스크에는 남아있다.

언제 사라지냐면 해당 위치에 다른 data가 overwrite될 때까지는 살아있게 된다. 그래서 overwrite되지 않은 부분의 경우 FAT의 deleted 필드를 트래킹해서 복원해낼 수 있다. 



#### Fragmentation과 Defragmentation

File이 연속적인 Sector, 즉 하나의 track 단위로 저장되어있지 않을 수 있다. 이 것을 fragmentation이라고 한다. HDD의 경우 레코드를 linear하게 돌면서 파일을 읽기 때문에 fragmentation이 심할수록 File input/output에 걸리는 시간이 늘어나게 된다. 

이러한 fragmentation들을 연속적으로 배치시켜서, fragment의 단위를 큼직하게 모아놓은다면 File I/O 속도가 더 빨라질 수 있겠지? 이 작업이 바로 조각모음 (defragmentation)이다.





## 특정 OS의 File System에 의해 Format된 Disk를 다른 OS에서 접근한다면? 

File System은 OS의 핵심적인 부분으로, File을 관리하는 내장된 SW 시스템이다. 그리고 File System은 위에서 보았듯이 OS에 따라 다양하다. 

Disk는 File System의 관리의 대상이 되는 HW 요소로, File System이 관리할 수 있는 형식으로 *Format*되어야 사용할 수 있다고 했다. 그 말은, 어떤 File System을 이용하느냐에 따라 Format의 형식이 달라지게 된다는 말이다. 그도File System은 저마다의 최적화된 File 관리 메커니즘을 가지기 때문에 *각자 다른 관리 체계*를 기준으로 Disk를 Format하기 때문이다.

그렇다면, 특정 OS에서 특정 File System으로 Format한 DIsk를 다른 OS의 다른 File System을 이용해 읽거나 쓰려고 하면 어떻게 될까? 

발생할 수 있는 문제는 크게 2가지이다. 

1. compatibility

   특정 OS가 특정 File System을 지원하지 않는 경우, 해당 Disk 작업이 올바르게 동작하지 않을 수 있다. 

2. data loss

   특정 OS가 특정 File System에 대한 접근을 어느정도 지원하더라도, 완벽한 compatibility를 보장하지 않는 경우 file이 손상되거나 data가 잘못 read될 위험이 있다. 

이러한 경우를 해결하기 위해서는 어떻게 할 수 있을까? 

1. File Driver 설치

   일부 OS에서는 타 OS의 file system을 지원하기 위해 추가적인 driver software를 설치할 수 있다. 예를들어, windows에서는 'Ext2Fsd'와 같은 드라이버를 설치하여 Linux의 `ext` file system으로 기록된 disk를 읽을 수 있다.

2. 범용 File System 사용

   FAT32나 exFAT과 같은 File System은 대부분의 OS에서 널리 지원되는 범용 FIle System이다. 따라서 다양한 OS에서 데이터를 교환할 때에도 사용하기 좋다.



## UserMode Process에게 File이란

File은 설명했다시피 OS의 File System에 의해 관리된다. 당연히 File System은 OS의 핵심 SW이므로 kernel mode에서 동작한다. 

따라서 User Mode Process의 입장에서의 File은 **OS가 File System에 접근할 수 있도록 제공하는 또 한번 추상화된 interface**인 것이다. (첫번째 추상화는 binary data를 의미있는 data 구조인 file로 만든 file system) 물론 이러한 API를 호출하는 것은 *system call을 호출하는 것*이기 때문에, 직접적인 file 작업은 kernel mode로 전환되어 OS에 의해 수행된다.

User Mode Process는 File interface를 통해 disk 상의 데이터에 안전하고 효율적으로 접근할 수 있다. 

C언어의 예시로 파일 열기 및 닫기를 생각해보자:

1. `fopen()` 함수를 호출 (user mode)

   내부적으로 system call을 실행하게 된다. 이후 kernel mode로 전환하여 kernel이 file open을 수행하게 된다. 

2. Permission 검증 (kernel mode)

   kernel은 요청받은 file에 대한 접근 권한을 확인한다. File이 존재하는지, user가 read 혹은 write 와 같은 연산에 대한 permission을 가지고 있는지 등을 확인한다.

3. File Handle 생성 및 File과 관련된 Resource 메모리 할당 (kernel mode)

   Permission이 확인되면 kernel은 File Handle을 생성하고 이를 user mode process에 반환한다. 이 handle은 application이 File에 접근할 수 있는 Key 역할을 수행한다.

   > **File Handle이란?** 
   >
   > OS가 FIle에 대한 접근을 제어하고 관리하기 위해 내부적으로 사용하는 identifier이다. Handle를 통해 리소스를 식별하고, 파일에 접근하여 조작한다.

   또한 File Metadata와 file descripter (unix/linux) 혹은 file handle (windows)과 같은 파일 식별 정보가 메모리에 저장된다. 

   파일 입출력을 위해 사용되는 Buffer의 크기, 위치, 상태 등의 정보 역시 Memory에 유지된다. 

   이러한 데이터들이 file open과 함께 메모리에 올라가기 때문에 file을 이용한 후에 꼭 닫아주어야 하는 것이다.

4. `fclose()`함수를 호출 (user mode)

   더 이상 파일을 이용하지 않는다면 해당 함수를 실행해 내부적으로 file을 닫는 system call을 호출한다. 이후 kernel mode로 전환된다.

5. resource 해제 (kernel mode)

   kernel과 관련한 리소스들을 메모리에서 해제한다. 열려있는 File Handle을 닫고, 관련 메모리를 정리하고 File System의 상태를 업데이트하거나 하는 작업을 수행한다.

6. File System의 state update (kernel mode)

   파일이 변경되었다면, 변경사항을 disk에 기록하고 metadata들을 업데이트한다. (last modified time 등)

