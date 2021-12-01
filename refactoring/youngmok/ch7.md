# ch7. 캡슐화

- 모듈을 분리하는 가장 중요한 기준은 시스템에서 각 모듈이 자신을 제외한 다른 부분에 드러내지 않아야 할 비밀을 얼마나 잘 숨기느냐에 있다.
- 클래스는 본래 정보를 숨기는 용도로 설계되었다.
- 가장 큰 캡슐화 단위는 클래스와 모듈이지만 함수도 구현을 캡슐화한다.

## 7-1. 레코드 캡슐화하기

> 레코드란 데이터베이스에서 하나의 단위로 취급되는 자료의 집합을 말한다.
> 레코드는 DB Table에서 가로 방향으로 한 줄로 나타낸다.

```
organization = {name: 'kim', country: 'GB}

class Organization {
  constructor(data){
    this._name = data.name;
    this._country = data.country
  }

  get name() {return this._name}
  set name(arg) { this._name = arg}
  get country() {return this._country}
  set country(arg) {this._country = arg}
}

```

### 배경

- 대부분의 프로그래밍 언어는 데이터 레코드를 표현하는 구조를 제공한다.
- 레코드는 연관된 여러 데이터를 직관적인 방식으로 묶을 수 있어서 각각을 따로 취급할 때보다 훨씬 의미있는 단위로 전달할 수 있게 된다.
- 사용자는 무엇이 저장된 값이고 무엇이 계산된 값인지 알 필요가 없다.
- 캡슐화하면 이름을 바꿀 때도 좋다.

## 7-2. 컬렉션 캡슐화하기

```
class Person {
  get courses() {return this._courses}
  set courses(aList){this._course = aList}
}

class Person {
  get courses() {return this._courses.slice()};
  addCourse(aCourse){...}
  removeCourse(aCourse){...}
}
```

### 배경

- 가변데이터를 캡슐화하면 데이터 구조가 언제 어떻게 수정되는지 파악하기 쉬워서 필요한 시점에 데이터 구조를 변경하기도 쉬워진다.
- 컬렉션 게터를 제공하되 내부 컬렉션의 복제본을 반환하는 것.
- 자바스크립트에서는 배열을 정렬할 때 원본을 수정한다. 컬렉션 관리를 책임지는 클래스라면 항상 복제본을 제공해야한다.

## 7-3. 기본형을 객체로 바꾸기

```
orders.filter(o => 'high' === o.priority || 'rush' === o.priority)

orders.filter(o => o.priority.higherThan(new Priority('normal')))
```

- 단순한 출력 이상의 기능이 필요해지는 순간 그 데이터를 표현하는 전용 클래스를 정의하자

### 7-4. 임시 변수를 질의 함수로 바꾸기

> 질의 함수
> 연산을 통해 값을 계산하여 반환하는 함수.

```
const basePrice = this._quantity * this._itemPrice;
if(basePrice > 1000)
 return basePrice * 0.95;
else
 return basePrice * 0.98;


get basePrice(){this._quantity * this._itemPrice}
...
if(this.basePrce > 1000)
  return this.basePrice * 0.95;
else
  return this.basePrice * 0.98

```

- 함수 안에서 어떤 코드의 결괏값을 뒤에서 다시 참조할 목적으로 임시 변수를 쓰기도 한다.
- 임시 변수를 사용하면 값을 계산하는 코드가 반복되는 걸 줄이고 값의 의미를 설명할 수도 있어서 유용하다.
- 더 나아가 함수로 만들어 사용하는 편이 나을 때가 많다
- 변수는 값을 한 번만 계산하고, 그 뒤로는 읽기만 해야 한다.

```
class Order{
  constructor(quantity, item){
    this._quantity = quantity;
    this._item = item;
  }

  get price () {
    var basePrice = this._quantity * this._item.price;
    var discountFactor = 0.98;

    if(basePrice > 1000) discountFactor -= 0.03;
    return basePrice * discountFactor
  }
}

class Order{
  constructor(quantity, item){
    this._quantity = quantity;
    this._item = item;
  }

  get price () {
   return this.basePrice * this.discountFactor
  }

  get basePrice(){
    return this._quantity * this._item.price;
  }

  get discountFactor(){
    var discountFactor = 0.98;
    if(this.basePrice > 1000) discountFactor -=0.03;
    return discountFactor
  }
}
```

## 7-5. 클래스 추출하기

```
class Person {
  get officeArearCode() {return this._officeAreaCode}
  get officeNumber(){return this._officeNumber}
}

class Person {
  get officeAreaCode(){return this._telephoneNumber.areaCode}
  get officeNumber() {return this._telephoneNumber.numer}
}

class TelephoneNumber {
  get areaCode() {return this._areaCode}
  get number() {return this._number}
}
```

## 배경

- 메서드와 데이터가 너무 많은 클래스는 이해하기가 쉽지 않으니 잘 살펴보고 적절히 분리하는 것이 좋다.
- 특히 일부 데이터와 메서드를 따로 묶을 수 있다면 어서 분리하라는 신호이다.

```
class Person {
  constructor(){

  }

  get name() {return this._name}
  set name(arg) {this._name = arg}
  get telephoneNumber() {return `(${this.officeAreaCode}) ${this.officeNumber}`}
  get officeAreaCode() {return this._officeAreaCode}
  set officeAreaCode(arg) {this._officeAreaCode = arg}
  get officeNumber() {return this._officeNumber}
  set officeNumber(arg) {this._offieNumber = arg}
}

class TelephoneNumber {
  get areaCode() {return this._areaCode}
  set areaCode(arg) {this._areaCode = arg}
  get number() {return this._number}
  set number(arg){this._number = arg}
}

class Person {
  constructor(){
    this._telephoneNumber = new TelephoneNumber()
  }

  get officeAreaCode() {return this._telephoneNumber.areaCode}
  set officeAreaCode(arg) {this._telephoneNumber.areaCode = arg}
  get officeNumber() {return this._telephoneNumber.number}
  set officeNumber(arg) {this._telephoneNumber.number = arg}
}
```

## 7-6. 클래스 인라인하기

- 클래스 인라인하기는 클래스 추출하기를 거꾸로 돌리는 리팩터링이다.
- 더이상 제 역할ㅇ르 못 해서 그대로 두면 안되는 클래스는 인라인해버린다.

## 7-7. 위임 숨기기

```
manager = aPerson.department.manager;

manager = aPerson.manager;

class Person {
  get manager() {return this.department.manage}
}
```

- 모듈화 설계를 제대로 하는 핵심은 캡슐화다.
- 캡슐화는 모듈들이 시스템의 다른 부분에 대해 알아야 할 내용을 줄여준다.
- 캡슐화가 잘 되어 있다면 무언가를 변경해야 할 때 함꼐 고려해야 할 모듈 수가 적여져서 코드를 변경하기가 쉬워진다.
- 예컨대 서버 객체의 필드가 가리키는 객체(위임객체)의 메서드를 호출하려면 클라이언트는 이 위임 객체를 알아야 한다.
- 위임 객체의 인터페이스가 바뀌면 이 ㅣㅇㄴ터페이스를 사용하는 모든 클라이언트가 코드를 수정해야 한다.
- 이러한 의존성을 없애려면 서버 자체에 위임 메서드를 만들어서 위임 객체의 존재를 숨기면 된다.
- 위임 객체가 수정되더라도 서버 코드만 고치면 되며, 클라이언트는 아무런 영향을 받지 않는다.

## 7-8. 중개자 제거하기

- 클라이언트가 위임 객체의 또 다른 기능을 사용하고 싶을 때마다 서버에 위임 메서드를 추가해야하는데,
  이렇게 추가하다보면 단순히 전달만 하는 위임 메서드들이 점점 성가셔진다. 그러면 서버 클래스는 그저 중개자 역할로 전략하여
  차라리 클라이언트가 위임 객체를 직접 호출하는 게 나을 숭 ㅣㅆ다.

---

> 객체의 필드, 메소드를 하나로 묶고, 실제 구현 내용을 감추는 것(정보은닉)을 의미한다. 외부 객체는 객체 내부의 구조를 알지 못하며 객체가 노출해서 제공하는 필드와 메소드만 이용할 수 있다. 필드와 메소드를 캡슐화하여 보호하는 이유는 외부의 잘못된 사용으로 인해 객체가 손상되지 않도록 하는데 있다.

> 객체의 속성(data fields)과 행위(메서드, methods)를 하나로 묶고, 실제 구현 내용 일부를 외부에 감추어 은닉한다.

느낀점

- 캡슐화는 객체지향과 밀접한 관련이 있는것 같다.
- 객체지향 부분에 지식이 부족하여 이번 챕터는 이해하기가 힘들었다.

React에서 캡슐화란 무엇인가? 커스텀훅의 사용만을 말하는건 아닌것같다.
