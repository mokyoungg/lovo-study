# ch9. 데이터 조직화

- 데이터 구조는 프로그램에서 중요한 역할을 수행한다.
- 하나의 값이 여러 목적으로 사용된다면 혼란과 버그를 낳는다.

## 9-1. 변수 쪼개기

```
let temp = 2 * (height * width);
console.log(temp)
temp = height * width;
console.log(temp)

////

const permieter = 2 * (height * width);
console.log(permieter)
const area = height * width;
console.log(area)
```

### 배경

- 변수는 다양한 용도로 쓰인다.
- 그중 변수에 값을 여러 번 대입할 수밖에 없는 경우도 있다.
- 수집변수는 메서드가 동작하는 중간중간 값을 저장한다.
- 변수는 긴 코드의 결과를 저장했다가 나중에 쉽게 참조하려는 목적으로 흔히 쓰인다.
- 이런 변수에는 값을 단 한 번만 대입해야한다.
- 대입이 두 번 이상 이뤄진다면 여러 가지 역할을 수행한다는 신호다.
  역할이 둘 이상인 변수가 있다면 쪼개야 한다.
- 역할 하나당 변수 하나다. 여러 용도로 쓰인 변수는 코드를 읽는 이에게 커다란 혼란을 준다.

## 9-2. 필드 이름 바꾸기

```
class Organization {
  get name() {...}
}

///

class Organization {
  get title() {...}
}
```

### 배경

- 프로그램 곳곳에 쓰이는 레코드 구조체의 필드 이름들은 매우 중요하다.
- ㅓ데이터 구조는 프로그램을 이해하는 데 큰 역할을 한다.

> "데이터 테이블 없이 흐름도만 보여줘서는 나는 여전히 혼란스러울 것이다. 하지만 데이터 테이블을 보여준다면 흐름도는 웬만해선 필요조차 없을 것이다. 테이블만으로 명확하기 때문이다."
>
> - 프레드 브룩스

## 9-3. 파생 변수를 질의 함수로 바꾸기

```
get discountedTotal() {return this._discountedTotal};
set discount(aNumber){
  cconst old = this._discount;
  this._discount = aNumber;
  this._discountedTotal += old - aNumber;
}

///

get discountedTotal() {return this._baseTotal - this._discount};
set discount(aNumber) {this._discount = aNumber}
```

### 배경

- 가변 데이터는 소프트웨어에 문제를 일으키는 가장 큰 골칫거리에 속한다.
- 가변 데이터는 서로 다른 두 코드를 이상한 방식으로 결합하기도 하는데, 예컨대 한 쪽 코드에서 수정한 값이 연쇄 효과를 일으켜 다른 쪽 코드에 원인을 찾기 어려운 문제를 야기하기도 한다.
- 효과가 좋은 방법으로, 값을 쉽게 계산할 수 있는 변수들을 모두 제거한다.(계싼 과정을 보여주는 코드 자체가 데이터의 의미를 분명하게 할 수도 있다.)
- 피연산자 데이터가 불변이라면 계산 결과도 일정하므로 역시 불변으로 만들 수 있다.
- 새로운 데이터 구조를 생성하는 변형 연산이라면 계산 코드로 대체할 수 있더라도 그대로 두는 것도 좋다.

#### 변형연산(새로운 데이터 구조를 생성)

- 데이터 구조를 감싸며 그 데이터에 기초하여 계산한 결과를 속성으로 제공하는 객체
- 데이터 구조를 받아 다른 데이터 구조로 변환해 반환하는 함수

## 9-4. 참조를 값으로 바꾸기

```
class Produc {
  applayDiscount(arg) {this._price.amount -= arg;}
}

///

class Product {
  applyDiscount(arg){
    this._price = new Money(this._pricemamout - arg, this._price.currency)
  }
}
```

### 배경

- 객체(데이터 구조)를 다른 객체(데이터 구조)에 중첩하면 내부 객체를 참조 혹은 값으로 취급할 수 있다.
- 참조냐 값이냐의 차이는 내부 객체의 속성을 갱신하는 방식에서 가장 극명하게 드러난다.
- 참조로 다루는 경우네는 내부 객체는 그대로 둔 채 그 객체의 속성만 갱신하며,
- 값으로 다루는 경우에는 새로운 속성을 담은 객체로 기존 내부 객체를 통째로 대체한다.
- 필드를 값으로 다룬다면 내부 객체의 클래스를 수정하여 값 객체로 만들 수 있다.
- 값 객체는 대체로 자유롭게 활용하기 좋은데, 특히 불변이기 때문이다.

## 9-5. 값을 참조로 바꾸기

```
let customer = new Customer(customerData);
///
let customer = customerRepository.get(cutomerData.id)
```

### 배경

- 하나의 데이터 구조 안에 논리적으로 똑같은 제 3의 데이터 구조를 참조하는 레코드가 여러개 있을 때가 있다.
- 이럴 때 값으로 다룬다면 각 데이터가 복사되고, 참조로 다룬다면 하나의 데이터 구조를 참조하게 된다.
- 논리적으로 같은 데이터를 물리적으로 복제해 사용할 때 가장 크게 문제되는 상황은 그 데이터를 갱신해야 할 때다.
- 모든 복제본을 찾아서 빠짐없이 갱신해야 하며, 하나라도 놓치면 데이터 일관성이 깨져버린다.
- 이런 상황이라면 복제된 데이터들을 모두 참조로 바꿔주는 게 좋다.
- 값을 참조로 바꾸면 엔티티(entity) 하나당 객체도 단 하나만 존재하게 되는데, 그러면 보통 이런 객체들을 한데 모아놓고 클라이언트들의 접근을 관리해주는 일종의 저장소가 필요해진다.
- 각 엔티티를 표현하는 개체를 한 번만 만들고, 객체가 필요한 곳에서는 모두 이 저장소로부터 얻어쓰는 방식이 된다.

## 9-6. 매직 리터럴 만들기

```
function potentialEnergy(mass, height){
  return mass * 9.81 * height;
}

///

cosnt STANDARD_GRAVITY = 9.81;
function potentialEnergy(mass, height){
  return mass * STANDARD_GRAVITY * height;
}

```

### 배경

- 매직 리터럴이란 소스 코드에(보통은 여러 곳에) 등장하는 일반적인 리터럴 값을 말한다.
