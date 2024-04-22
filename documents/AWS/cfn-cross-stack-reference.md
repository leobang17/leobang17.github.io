---
title: "Cloudformation으로 Cross Stack Reference 달성하기"
createdAt: 2024-04-22
---

친구들과 간단한 slack bot을 만들기로 했다. 아이디어는 딱 정해지진 않았는데 그냥 가벼운 존댓말 탐지기 같은걸 만들기로 했다. 개발에 들어가기 전에 일단은 로컬에서 간단한 echo server만 만들어서 slack api를 맛보기 하려고 [bolt-js get started](https://api.slack.com/start/building/bolt-js)를 잘 따라하고 있었는데,,,

slack event를 수신하려면 일단 server를 public하게 deploy해야한다는 걸 깜빡했다. 전에 telegram bot을 만들었을 때는 ngrok으로 내 local pc에 트래픽을 포워딩 해주는 방식으로 설정해서 로컬 환경에서도 돌릴 수 있었는데, 이번에는 어차피 배포까지 할테니까 미리 환경설정할 겸 배포 템플릿을 만들기로 했다.

Lambda 관련된 자원을 관리하느라 SAM template을 이용해보긴 했지만 CloudTemplate을 직접 만져보는건 이번이 처음이다. 사실 SAM을 build하면 결국 cloudtemplate stack이 생성되는, superset의 개념이라 기본적인 문법은 대부분 동일해서 처음 이용하는데에도 그다지 어렵진 않았다. 

cloudformation template도 그냥 대충 만들어서 일단 띄우는걸 목적으로 시작했는데··· 하다보니 깔끔하게 잘 나눠서 관리하고 싶은 욕심이 생긴다. 그래서 여러 template로 분할해서 stack을 관리하는 방식을 찾아보게 되었다.



## Cross-Stack Reference

cloudformation의 **stack간 resource를 공유**하기 위해서 cross-stack reference를 사용할 수 있다. 하나의 template에 모든 stack을 관리하기보다는, stack간 dependency를 적절하게 적용해서 layered된 환경을 분리해서 관리할 수 있다.

사용방법은 단순한데, *의존을 제공하는 stack에서 export한 값을 의존하는 다른 stack에서 import 해오는 방식*이다. export할 값은 `Output` section에 `Export`를 정의하고, import의 경우는 `Fn::ImportValue` 함수를 이용해 가져온다. `Output` section에 정의하고 `Export`하지 않을 경우 그냥 stack description에서만 확인가능하고, 다른 stack에서 해당 값을 참조할 수는 없다. 원하는 값 만을 외부로 노출함으로서 encapsulation의 컨셉을 가져가는 셈.



#### cross-stack reference의 contraints

cross-stack reference를 사용할 때에는 다음과 같은 제약사항을 준수해야한다.

- 각 AWS account + Region의 조합마다 `Export`의 name은 유일해야한다.
- Region에 걸쳐서 cross-stack reference를 사용할 수는 없다. `Fn::ImportValue`는 오로지 동일 region 내에서만 가능하다.
- `Export` 프로퍼티의 `Name` 값은 다른 resource에 의존할 수 없다. 즉, `Ref`나 `GetAtt` function을 이용 f할 수 없다. 하지만 `Sub` function을 이용해서 string을 조합하는 것은 할 수 있다.
- 마찬가지로, `ImportValue` function은 다른 resource의 값에 의존하는 `Ref`나 `GetAtt` function을 이용할 수 없다. 
- 만약 해당 stack의 output에 dependant한 stack이 존재한다면, 해당 stack을 삭제할 수 없다. (foreign key 제약조건과 같이)
- <u>다른 stack에 의해서 참조되고 있는 output value를 수정하거나 삭제할 수 없다.</u>



## Outputs section을 이용해 Export하기

template의 `Outputs` 섹션을 정의해서 해당 stack의 값을 export할 수 있다. 마치 변수를 export, import하듯 다른 stack에서 해당 값을 쉽게 참조할 수 있다. 예를들어, 해당 stack의 template이 배포되어있는 S3 Bucket의 이름을 만든다거나··· 등등

하나의 template에 총 200개의 unique한 output을 정의할 수 있다 .



#### **Outputs을 이용할 때 주의할 점**

Cloudformation은 Output value들에 대해서 <u>암호화 작업을 진행하지 않는다</u>. 따라서 credential이나 secret과 같은 *민감한 정보는 outputs을 이용해 노출하지 않는 것을 권장*한다.

또한, **Outputs value는 해당 template에 대한 stack operation이 완료되고나서 이용 가능**하다. 만약, stack progression이 `IN_PROGRESS`일 경우엔 해당 stack이 export하는 값을 이용할 수 없다. 따라서 output value는 항상 이용가능한 상태가 아닐 수 있기 때문에, output value를 이용해서 stack간 dependency를 설계할 때에는 큰 주의가 필요하다.



#### Syntax 

``` yaml
Outputs:
	[Logical ID]:
		Description: : Information about the value
		Value: Value to return 
		Export: 
			Name: Name of resource to export 
```

Logical ID

- 해당 output에 대한 논리적인 identifier. 다른 identifier와 마찬가지로 alphanumeric constraint가 적용된다.

Description (optional)

- 해당 output에 대한 설명. parameter나 cfn function은 이용할 수 없다.

Value (REQUIRED)

- output에 해당하는 값을 정의한다. 

Export (optional)

- cross-stack reference에 이용되는 resource name을 지정한다.
- 해당 field를 정의하지 않을 경우 외부 stack에서 output 값을 참조할 수 없다.

특정 조건 하에 output을 출력하고 싶다면 `Conditions`를 정의할 수 있다.



#### Cross-Stack output의 예시

VPC id를 외부로 export해보자.

``` yaml
Outputs:
	StackVPC:
		Description: The ID of the VPC
		Value: !Ref MyVPC
		Export:
			Name: !Sub "${AWS::StackName}-VPCID"
```



`Sub` function을 이용해 [pseudo parameter](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/pseudo-parameter-reference.html#cfn-pseudo-param-stackname)와 string을 조합해서 unique한 Export name을 만들어보자. 

``` yaml
Outputs:
  PublicSubnet:
    Description: The subnet ID to use for public web servers
    Value:
      Ref: PublicSubnet
    Export:
      Name:
        'Fn::Sub': '${AWS::StackName}-SubnetID'
  WebServerSecurityGroup:
    Description: The security group ID to use for public web servers
    Value:
      'Fn::GetAtt':
        - WebServerSecurityGroup
        - GroupId
    Export:
      Name:
        'Fn::Sub': '${AWS::StackName}-SecurityGroupID'
```



## 외부 stack reference Import하기

`Fn::ImportValue` function을 이용해서 export된 output value를 참조할 수 있다.

``` yaml
Resources:
  WebServerInstance:
    Type: 'AWS::EC2::Instance'
    Properties:
      InstanceType: t2.micro
      ImageId: ami-a1b23456
      NetworkInterfaces:
        - GroupSet:
            - Fn::ImportValue: 
              'Fn::Sub': '${NetworkStackNameParameter}-SecurityGroupID'
          AssociatePublicIpAddress: 'true'
          DeviceIndex: '0'
          DeleteOnTermination: 'true'
          SubnetId: Fn::ImportValue: 
            'Fn::Sub': '${NetworkStackNameParameter}-SubnetID'
```

#### Fn::ImportValue의 shortform

`Fn::ImportValue`도 `!`를 붙여 shortform을 이용할 수 있는데, 다음과 같이 축약할 수 있다.

``` yaml
# Full function expression
Fn::ImportValue: sharedValueToImport

# Short form
!ImportValue sharedValueToImport
```

대신 shortform을 이용할 때 주의해야할 점은, **`!Sub` shortform과 함께 이용할 수 없다**는 점이다. 

예를들어, 다음과 같이 중첩된 short form 함수 호출 형태는 이용할 수 없다.

``` yaml
!ImportValue !Sub '${NetworkStack}-SubnetID'
```

대신, 다음과 같이 full function expression을 사용해야한다.

``` yaml
Fn::ImportValue: 
	!Sub '${NetworkStack}-SubnetID'
```



## Parameters를 이용해서 더 가독성 있게 만들어보자

`Parameters` section에 parameter를 정의해서 stack을 생성/수정할 때마다 특정 값을 주입할 수 있다. process arguments 같은 느낌으로 이해하면 된다. 

하지만 내 경우엔 시작할 때 input parameter를 주입하기 위해서 사용하진 않았고, template의 가독성을 위해 내부적으로 이용할 변수를 정의하기 위해서 사용했다.

Docs에 나와있는 예시를 통해 `Paremeters` section을 정의하는 방법을 알아보자.

``` yaml
Parameters:
  InstanceTypeParameter:
    Type: String
    Default: t2.micro
    AllowedValues:
      - t2.micro
      - m1.small
      - m1.large
    Description: Enter t2.micro, m1.small, or m1.large. Default is t2.micro.
```

- Instance Type에 대한 input parameter를 정의한다.
- input이 없을 경우 `t2.micro`가 default 값이고, 해당 input으로 허용하는 값은 `t2.micro`, `m1.small`, `m1.large`가 있다. 그 외의 값을 주입할 경우 error



`Ref` funciton을 이용해서 정의한 parameter를 template 내에서 이용할 수 있다. `Resources` section이나 `Outputs` section에서 parameter를 reference할 수 있다.

``` yaml
Ec2Instance:
  Type: AWS::EC2::Instance
  Properties:
    InstanceType:
      Ref: InstanceTypeParameter
    ImageId: ami-0ff8a91507f77f867
```

혹은 다음과 같이 short form도 가능하다.

``` yaml
# ...
InstanceType: !Ref InstanceTypeParameter
```



#### Parameter Section 정의 시 제약사항

Parameter section을 정의할 때는 따라야할 제약사항이 존재한다.

- 하나의 template에 200개의 parameter를 지정할 수 있다.
- 각 parameter는 동알한 template 내에서 unique한 logical name을 가져야 한다.
- 각 parameter는 AWS Cloudformation에서 support하는 <u>parameter type</u>을 가져야 한다



#### Cloudformation이 지원하는 Parameter Type

Parameter Type은 `Type` field로 지정할 수 있다. AWS Cloudformation에서 지원하는 Type은 다음과 같다.

- `String`: string literal
- `Number`: integer of float. template 내에서 `Ref`를 이용해 불러올 때에는 string으로 평가된다.
- `List<Number>`: `,`로 구분된 integer 혹은 float의 나열.
  - `"80, 20"`으로 나열하면 `Ref`로 불러와서 `["80", "20"]` 처럼 쓰이게 된다.
- `CommaDelimitedList`: `,`로 구분된 string literal들. `List<Number>` 와 용례는 동일하다.
- AWS-Specific Parameter types: EC2 Key pair 혹은 resource id와 같이 aws 측에서 제공하는 data type들.
  - 다음 link를 참고하자: [Supported AWS-Specific parameter types](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#aws-specific-parameter-types)
- SSM Parameter Type: Systems Manager Parameter Store에 들고 있는 parameter들. 
  - 역시 다음 link를 참고하자: [Supported SSM parameter types](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html#aws-ssm-parameter-types)



## Ref 

- [AWS Cloudformation Docs - Outputs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html)
- [AWS Cloudformation Docs - WalkThrough: Cross-Stack Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/walkthrough-crossstackref.html)
- [AWS Cloudformation Docs - Fn::ImportValue](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-importvalue.html)
- [AWS Cloudformation Docs - Parameters](