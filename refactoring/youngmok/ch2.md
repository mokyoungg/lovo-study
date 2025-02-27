# 리팩터링 2장. 리팩터링 원칙

## 2-1. 리팩터링 정의

> 리팩터링[명사]
> 소프트웨어의 겉보기 동작은 그대로 유지한 채, 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법

> 리팩터링(하다)[동사]
> 소프트웨어의 겉보기 동작은 그대로 유지한 채, 여러 가지 리팩터링 기법을 적용해서 소프트웨어기법을 적용해서
> 소프트웨어를 재구성하다.

- 코드를 정리하는 작업을 모조리 '리팩터링'이라고 표현하고 있는데, 특정한 방식에 따라 정리하는 것만이 리팩터링이다.
- 리팩터링은 결국 동작을 보존하는 작은 단계들을 거쳐 코드를 수정하고, 이러한 단계들을 순차적으로 연결하여 큰 변화를 만들어내는 일이다.
- 리팩터링하는 동안에는 코드가 항상 정상 작동하기 때문에 전체 작업이 끝나지 않았더라도 언제든 멈출 수 있다.
- 코드베이스를 정리하거나 구조를 바꾸는 모든 작업을 '재구성(restructuring)'이라는 포괄적인 용어로 표현하고, 리팩터링은 재구성 중 특수한 한 형태도 본다.
- 한편, 리팩터링 과정에서 발견된 버그는 리팩터링 후에도 그대로 남아있어야 한다.
  (단, 아무도 발견하지 못한 숨은 버그는 수정해도 괜찮다.)
- 리팩터링의 목적은 코드를 이해하고 수정하기 쉽게 만드는 것이다.
- 프로그램 성능은 좋아질 수도, 나빠질 수도 있다.

## 2-2. 두 개의 모자

> 소프트웨어를 개발할 때 목적이 '기능 추가'냐, 아니면 '리팩터링' 이냐를 명확히 구분해 작업한다.

## 2-3. 리팩터링 하는 이유

### 리팩터링하면 소프트웨어 설계가 좋아진다.

- 리팩터링을 하지 않으면 소프트웨어의 내부 설계(아키텍쳐)가 썩기 쉽다.
- 아키텍처를 충분히 이해하지 못한 채 단기 목표만을 위해 코드를 수정하다 보면 기반 구조가 무너지기 쉽다. 그러면 코드만 봐서는 설계를 파악하기 어려워 진다.
- 코드구조가 무너지기 시작하면 악효과가 누적된다.
- 코드만으로 설계를 파악하기 어려워질수록 설계를 유지하기 어려워지고, 설계가 부패되는 속도는 더욱 빨라진다.
- 반면 규칙적인 리팩터링은 코드의 구조를 지탱해 줄 것이다.
- 코드량이 길어질수록 실수 없이 수정하기 어려워진다. 이해해야 할 코드량도 늘어난다.
- 비슷한 일을 하는 코드가 산재해있다면 한 부분만 살짝 바꿔서는 시스템이 예상대로 작동하지 않을 수 있다.
- 반면, 중복 코드를 제거하면 **모든 코드가 언제나 고유한 일을 수행함을 보장할 수 있으며**, 이는 바람직한 설계의 핵심이다.

### 리팩터링하면 소프트웨어를 이해하기 쉬워진다.

- 컴퓨터에게 시키려는 일과 이를 표현한 코드의 차이를 최대한 줄여야 한다.
- 프로그래밍은 결국 내가 원하는 바를 정확히 표현하는 일이다.
- 문제는 **프로그램을 동작시키는 데만 신경 쓰다 보면 나중에 그 코드를 다룰 개발자를 배려하지 못한다는데 있다.**
- 리팩터링을 통해, 다시 말해 내 의도를 더 명확하게 전달하도록 개선할 수 있다.

### 리팩터링하면 버그를 쉽게 찾을 수 있다.

- 코드를 이해하기 쉽다는 말은 버그를 찾기 쉽다는 말이기도 하다.
- 리팩터링하면 코드가 하는 일을 깊이 파악하게 되면서 새로 깨달은 것을 곧바로 코드에 반영하게 된다.
- 프로그램의 구조를 명확하게 다듬으면 그냥 '이럴 것이다' 가정하던 점들이 분명히 드러나는데 버그를 지나치려야 지나칠 수 없을 정도까지 명확해진다.

### 리팩터링하면 프로그래밍 속도를 높일 수 있다.

- 내부 설계가 잘 된 소프트웨어는 새로운 기능을 추가할 지점과 어떻게 고칠지를 쉽게 찾을 수 있다.
- 모듈화가 잘 되어 있으면 전체 코드베이스 중 작은 일부만 이해하면 된다.

## 2-4. 언제 리팩터링을 해야 할까?

> 3의 법칙

1. 처음에는 그냥 한다.
2. 비슷한 일을 두 번쨰로 하게 되면 일단 계속 진행한다.
3. 비슷한 일을 세 번째 하게 되면 리팩터링한다.

### 준비를 위한 리팩터링 : 기능을 쉽게 추가하게 만들기

- 리팩터링하기 가장 좋은 시점은 코드베이스에 기능을 새로 추가하기 직전이다.
- 구조를 살짝 바꾸면 다른 작업을 하기가 훨씬 쉬워질 만한 부분을 찾는다.
- 함수를 복제하여, 중복 코드가 생기면. 나중에 이 부분을 변경할 일이 생길때 원래 코드와 복제한 코드를 모두 수정해야 하며, 심한 경우는 복제한 코드가 어디있는지까지 일일이 찾아내야한다.

### 이해를 위한 리팩터링: 코드를 쉽게 만들기

- 코드를 수정하려면 먼저 그 코드가 하는 일을 파악해야 한다.
- 코드의 의도가 더 명확하게 드러나도록 리팩터링할 여지는 없는지 찾아본다.
- **조건부 로직의 구조가 이상하지 않은지 살펴보기도 하고, 함수 이름을 잘못 정해서 실제로 하는 일을 파악하는데 시간이 오래 걸리지는 않는지도 살펴본다.**
- **자잘한 세부 코드에 이해를 위한 리팩터링을 한다.**
- **어떤 역할을 하는지 이해된 변수는 적절한 이름으로 바꿔주고, 긴 함수를 잘게 나누기도 한다.**
- 코드가 깔끔하게 정리되어 전에는 보이지 않던 설계가 눈에 들어오기 시작한다.
- 코드를 분석할 때 리팩터링을 해보면, 그렇지 않았더라면 도달하지 못 했을 더 깊은 수준까지 이해하게 된다.

### 쓰레기 줍기 리팩터링

- 코드를 파악하던 중에 일을 비효율적으로 처리하는 모습을 발견할 때가 있다.
- 리팩터링의 멋진 점은 각각의 작은 단계가 코드를 깨뜨리지 않는다는 사실이다.
- 그래서 작업을 잘게 나누면 몇 달에 걸쳐 진행하더라도 그 사이 한 순간도 코드가 깨지지 않기도 한다.

### 계획된 리팩터링과 수시로 하는 리팩터링

- 리팩터링은 프로그래밍과 구분되는 별개의 활동이 아니다.
- 리팩터링 시간은 따로 잡아두지 않고, 대부분의 리팩터링을 다른 일을 하는 중에 처리한다.
- 뛰어난 개발자는 새 기능을 추가하기 쉽도록 크드를 '수정'하는 것이 그 기능을 가장 빠르게 추가하는 길일 수 있음을 안다.
- 리팩터링은 기능 추가와 밀접하게 엮인 경우가 너무나 많기 때문에 굳이 나누는 것은 시간 낭비일 수 있다.

### 오래 걸리는 리팩터링

- 주어진 문제를 몇 주에 걸쳐 조금씩 해결해가는 편이 효과적일 때가 많다.
- 리팩터링해야 할 코드와 관련한 작업을 하게 될 때마다 원하는 방향으로 조금씩 개선하는 식이다.

### 코드리뷰에 리팩터링 활용하기

- 리팩터링은 코드 리뷰의 결과를 더 구체적으로 도출하는 데에도 도움이 된다.

### 리팩터링하지 말아야 할 때

- 내부 동작을 이해해야할 시점에 리팩터링해야 효과를 제대로 볼 수 있다.

## 2-5. 리팩터링시 고려할 문제

### 새 기능 개발 속도 저하

- 리팩터링의 궁극적인 목적은 개발 속도를 높이는데 있다.
- 새 기능을 구현해넣기 편해지겠다 싶은 리팩터링이라면 주저하지 않고 리팩터링부터 한다.
- 코드베이스가 건강하면 기존 코드를 새로운 방식으로 조합하기 쉬워서 복잡한 새 기능을 더 빨리 추가할 수 있다.
- 리팩터링의 본질은 오로지 경제적인 이유로 하는 것이다.
- 리팩터링은 개발 기간을 단축하고자 하는 것이다. 기능 추가 시간을 줄이고, 버그 수정 시간을 줄여준다.

### 코드 소유권

### 브랜치

- 독립 브랜치로 작업하는 기간이 길어질수록 작업 결과를 마스터로 통합하기가 어려워진다.
- 머지와 통합을 명확히 구분한다.
- 마스터를 브랜치로 머지하는 작업은 단방향이다. 브랜치만 바뀌고 마스터는 그대로다.
- 반면, 통합은 마스터를 개인 브랜치로 가져와서 작업한 결과를 다시 마스터에 올리는 양방향 처리를 뜻한다.
- 머지가 복잡해지는 문제는 기능별 브랜치들이 독립적으로 개발되는 기간이 길어질 수록 기하급수적으로 늘어난다. **브랜치를 짧게 관리해야한다**
- 이 방식을 지속적 통합(CI) 또는 트렁크 기반 개발이라 한다.
- 마스터를 건강하게 유지하고, 거대한 기능을 잘게 쪼개는 법을 배우고, 각 기능을 끌 수 있는 토글을 적용하여 완료되지 않은 기능이 시스템 전체를 망치지 않도록 해야한다.
- CI를 완벽히 적용하지는 못하더라도 통합 주기만큼은 최대한 짧게 잡아야한다.

### 테스팅

- 핵심은 오류를 재빨리 잡는데 있다.
- 코드의 다양한 측면을 검사하는 테스트 스위트가 필요하다.
- 리팩터링하기 위해서는 자가 테스트 코드를 마련해야 한다는 뜻이다.

### 레거시 코드

- 프로그램에서 테스트를 추가할 틈새를 찾아서 시스템을 테스트해야 한다.
- 이러한 틈새를 만들 때 리팩터링이 활용된다.
- 레거시 시스템의 규모가 크다면 자주 보는 부분을 더 많이 리팩터링한다.
- 코드를 훑게 되는 횟수가 많다는 말은 그 부분을 이해하기 쉽게 개선했을 때 얻은 효과도 그만큼 크다는 뜻이 당연히 이렇게 해야한다.

### 데이터 베이스

- 전체 변경 과정을 작고 독립된 단계들로 쪼개는 것이 핵심이다.
- 단계를 잘게 나누면 코드도 쉽게 작성할 수 있다.
- 여러 단계를 순차적으로 연결해서 데이터베이스의 구조와 그 안에 담긴 데이터를 큰 폭으로 변경할 수도 있다.

## 2-6. 리팩터링, 아키텍처, 애그니(YAGNI)

- 리팩터링이 아키텍처에 미치는 실질적인 효과는 요구사항 변화에 자연스럽게 대응하도록 코드베이스를 잘 설계해준다는 데 있다.
- 우리는 소프트웨어를 실제로 사용해보고 업무에 미치는 영향을 직접 확인하고 나서야 정말로 원하는 바를 알게 되는 경우가 허다하다.
- 함수 정의시, 범용적으로 사용이 가능할 때 다양한 예상 시나리오에 대응하기 위한 매개변수들을 추가한다.
- 이런 매개변수가 바로 유연성 메커니즘이다. 물론 메커니즘이 대개 그렇듯 치러야 할 비용이 있다.
- 매개변수를 생각나는 대로 추가하다 보면 당장의 쓰임에 비해 함수가 너무 복잡해진다.
- 현재까지 파악한 요구사항만을 해결하는 소프트웨어를 구축한다.
- 사용자의 요구사항을 더 잘 이해하게 되면 아키텍처도 그에 맞게 리팩터링해서 바꾼다.
- 복잡도를 높일 수 있는 유연성 메커니즘은 반드시 검증르 거친 후에 추가한다.
- 호출하는 측에서 항상 같은 값을 넘기는 매개변수는 목록에 넣지 않는다.
- 리팩터링을 미루면 훨씬 힘들어진다는 확신이 들 때만 유연성 메커니즘을 미리 추가한다.
- 이런 식으로 설계하는 방식을 간결한 설계, 점진적 설계, YAGNI(you aren't going to need it) 등으로 부른다.

## 2-7. 리팩터링과 소프트웨어 개발 프로세스

- 리팩터링이 퍼지기 시작한 것도 **익스트림 프로그래밍(XP)** 에 도입됐기 때문이다.
- XP의 두드러진 특징은 지속적 통합, 자가 테스트 코드, 리팩터링 등의 개성이 강하면서 상호 의존하는 기법들을 하나로 묶은 프로세스라는 점이다.
- 자가 테스트 코드, 지속적 통합, 리팩터링이라는 세 기법은 서로 강력한 상승효과를 발휘한다.

## 2-8. 리팩터링과 성능

- 리팩터링하면 소프트웨어가 느려질 수도 있는건 사실이다.
- 하지만 그와 동시에 성능을 튜닝하기는 더 쉬워진다.
- **소프트웨어를 빠르게 만드는 비결은, 먼저 튜닝하기 쉽게 만들고 나서 원하는 속도가 나게끔 튜닝하는 것이다.**
- 대부분의 프로그램은 전체 코드 중 극히 일부에서 대부분의 시간을 소비한다는 것이다.
- 코드 전체를 고르게 최적화한다면 그중 90%는 효과가 거의 없기 때문에 시간 낭비인 셈이다.
- 즉, 의도적으로 성능 최적화에 돌입하기 전까지는 성능에 신경 쓰지 않고 코드를 다루기 쉽게 만드는데 집중한다.
- 프로그램을 잘 리팩터링해두면 최적화에 두 가지 면에서 도움이 된다.
- 성능 튜닝에 투입할 시간을 벌 수 있다.
- 리팩터링이 잘 되어 있는 프로그램은 성능을 더 세밀하게 분석할 수 있다.

### 2-9. 리팩터링의 유래

### 2-10. 리팩터링 자동화

- 자동 리팩터링을 제대로 구현하려면 코드를 텍스트 상태가 아닌, 구문트리로 해석해서 다뤄야한다.
- 구문트리를 조작하는 방식이 코드의 원래 의미를 보존하는데 훨씬 유리하기 때문이다.

---

# 알게 된 점.

- 리팩터링은 특정 방식에 따라 정리하는 것이다. 이는 단순한 코드 정리나 재구성과는 다르다.
- 리팩터링의 목적은 읽기 쉽고 이해하기 쉬운 코드를 만들기 위해 사용한다.
- 리팩터링은 수정하기 쉽게(튜닝) 사용한다.

# 느낀 점.

리팩터링의 개념에 대해 자세하게 알게 되었다.
지금까지 생각했던 리팩터링은 재구성의 개념과 가까웠던 것 같다.
그리고 2장에서, 가장 기억에 남는 부분은 '리팩터링의 목적' 부분이다.
코드 리뷰 등을 통해 계속 가지고 있던 고민과 밀접했던 것 같다.

리팩터링의 목적이 미래 지향적이라고는 크게 생각해보지 않은 것 같다.
새로운 기능 추가, 성능 향상이라는 측면에서 코드를
왜 깔끔하게 작성해야하는지, 왜 코드를 잘게 나누어 코드가 (하나의) 고유한 일(만)을 수행할 수 있도록
노력해야하는지에 대해 확실히 알게 되었다.

코드가 고유한 일만을 수행할 수 있게 작성하는 것은,
컴퓨터와 동료 개발자 양쪽에게 내가 작성한 코드를 명확하게 전달헐 수 있는 방법이며
이를 위해 기능을 더 잘게 쪼개는 연습과 변수/함수의 정확한 이름을 짓는 노력이 필요하다.

더 간결하고 깔끔하게, 내가 의도한 코드를 명확하게 전달해야한다는 생각을 의식적으로 해야한다.
