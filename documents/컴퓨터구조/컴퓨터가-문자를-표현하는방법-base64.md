---
title: "컴퓨터가 문자를 표현하는 방법 - Base64 Encoding"
createdAt: 2024-01-05
---

binary 데이터를 텍스트 형식(ASCII)으로 변환하는 인코딩 방법 중 하나이다. 간단하게 설명하자면, binary 데이터를 **6bit 씩 끊어서** Base64 인코딩 테이블에 맞게 문자열로 매핑하는 방식. 

2^6^ = 64가지의 경우의 수를 표현할 수 있는 Base64테이블에는 다음과 같은 문자가 매핑되어있다.

- 소문자 a ~ z : 26개 
- 대문자 A ~ Z: 26개 
- 숫자 0 ~ 9: 10개
- \+ 기호
- / 기호 

구성을 보면 알 수 있듯이 Base64 인코딩을 이용하면 어떠한 binary 비트 스트림도 **영문자 + 숫자 + 2개의 기호의 조합**으로 <u>output을 고정</u>시킬 수 있다.

##### Base64의 장점은 뭘까? 

모든 것을 텍스트 (정확히는 영문자 + 숫자) 형식으로 안전하게 전송할 수 있다. 

- 이메일, HTTP과 같은 <u>텍스트 전용 프로토콜</u>에서 binary 데이터를 안전하게 text 형식으로 변환하여 전송할 수 있도록 도와준다. 
- Email 첨부 파일 및 이미지 인코딩: 이메일은 주로 텍스트로 구성되어있어서 binary 파일 (이미지, 첨부 파일 등)을 text로 인코딩해야한다. Base64는 binary의 나열을 text로 변환할 수 있어 email 첨부 파일을 안전하게 전송할 수 있게 한다.
- URL Safe: Base64는 주로 url에서 안전하게 사용할 수 있는 문자로 이루어져 있다. 완전 url-safe한 Base64-url 인코딩도 있다.
- HTML 문서 속에 이미지 혹은 기타 바이트 스트림을 인라인으로 삽입해서 보낼 수 있다. 추후에 외부 파일 로딩 대신 HTML 문서 속에 텍스트 형식으로 집어넣은 셈. 

> ##### 텍스트 전용 프로토콜이란? + base64가 텍스트 전용 프로토콜에 용이한 이유 
>
> "텍스트 전용 프로토콜"이라는 표현은 주로 <u>데이터가 텍스트 형태로 구조화되어 있는 프로토콜</u>을 가리킨다. 이러한 프로토콜은 텍스트를 주로 다루며, 특히 ASCII 문자나 유니코드 문자와 같은 문자열로 구성되어 있는 경우가 많다.
>
> 텍스트 전용 프로토콜은 텍스트를 기반으로 하는 통신 규약을 가지고 있어, 데이터를 인간이 읽을 수 있는 형태로 표현하는 것이 주 목적이다. HTTP (Hypertext Transfer Protocol)와 SMTP (Simple Mail Transfer Protocol)가 대표적인 텍스트 전용 프로토콜의 예이다.
>
> 하지만 오해하지 말아야 할 것이 텍스트 프로토콜이라 하더라도, 결국 binary 데이터로 변환되어 통신한다는 점이다. 다만 <u>프로토콜이 텍스트를 주로 사용하는 경우 데이터를 텍스트로 인코딩하여 전송함으로써 특정 목적에 더 적합하게 사용</u>할 수 있는 것이다.

##### Base64의 단점은?

6bit의 chunk를 ASCII로 표현가능한 영문+숫자로 변환한다고 했다. ASCII는 기본적으로 8bit 단위로 표현된다. <u>6bit의 chunk마다 8bit로 늘어났</u>으니, 인코딩을 거친 후엔 데이터의 크기가 원본에 비해 <u>4/3배 증가</u>한 셈이다.

##### Base64의 패딩 값

binary 스트림이 6bit 씩 딱 맞게 나누어떨어지지 않을 수도 있다. 이 경우에는 강제로 마지막 chunk를 6bit로 늘린 후, 늘린 공간에 패딩 값 (`=`)을 채워넣는다. 

반대로 디코딩할 때는 패딩 값인 `=`을 버려주고 디코딩하면 된다.

##### Base64 URL 

Base64 인코딩의 변형 중 하나로, URL에서 사용할 수 있도록 약간의 변형을 가한 버전이다. <u>URL safe하지 않은 문자들을 다른 문자로 대체</u>한다.

- `+` 대신 `-`를 사용한다.
- `/` 대신 `_`를 사용한다.
- 패딩값 (`=`)은 사용되지 않거나 URL에서 문제를 일으키므로 생략한다.

인코딩된 문자열을 URL에 안전하게 삽입하고 전송할 수 있다. 또 다른 용례로는 <u>JWT 표준이 Base64 URL 인코딩을 사용</u>한다.

