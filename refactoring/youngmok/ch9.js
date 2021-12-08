// 9-2
const organization = {name: 'kim', country: 'GB'};

// name을 title로 바꾸고 싶을 때, 이 객체는 코드베이스 곳곳에서 사용되며, 그중이 이 제목을 변경하는 곳도 있다.
// 그래서 우선 organization 레코드를 클래스로 캡슐화 한다.
class Organization {
  constructor(data){
    this._name = data.name;
    this._country = data.country;
  }

  get name() {return this._name};
  set name(aString) {this._name = aString}
  get country() {return this._country};
  set country(aCountryCode) {this._country = aCountryCode}
}

// 레코드를 클래스로 캡슐화하여,
// 모든 변경을 한 번에 수행하는 대신 작은 단계들로 나눠 독립적으로 수행할 수 있게 되었다.

class Organization {
  constructor(data){
    // name > title
    this._title = data.name;
    this._country = data.country;
  }

  // name > title
  get name() {return this._title};
  set name(aString) {this._title = aString}
  get country() {return this._country};
  set country(aCountryCode) {this._country = aCountryCode}
}

// bame과 title을 동시에 사용가능(title 우선)

class Organization {
  constructor(data){
    // name > title
    this._title = (data.title !== undefined) ? data.title : data.name;
    this._country = data.country;
  }

  // name > title
  get name() {return this._title};
  set name(aString) {this._title = aString}
  get country() {return this._country};
  set country(aCountryCode) {this._country = aCountryCode}
}

// name 코드 제거, 접근자 이름 수정

class Organization {
  constructor(data){
    // name > title
    this._title = data.title
    this._country = data.country;
  }

  // name > title
  get title() {return this._title};
  set title(aString) {this._title = aString}
  get country() {return this._country};
  set country(aCountryCode) {this._country = aCountryCode}
}


// 9-3
// 데이터 중복 코드이다, 이 코드는 조정 값 adjustment를 적용하는 과정에서 직접 관련이 없는 누적 값 production까지 갱신했다.
class ProductionPlan {
  get production() {return this._production}
  applyAdjustment(anAdjstment){
    this._adjustments.push(anAdjustment);
    this._production += anAdjstment.amount;
  }
}

// 어서션 추가
class ProductionPlan {
  get produnction() {
    assert(this._production === this.calculatedProduction);
    return this._production
  }

  get calculatedProduction() {
    return this._adjustments 
      .reduce((sum, a) => sum + a.amount, 0)
  }
}

// 테스트 통과시 필드를 반환하던 코드를 수정하여 계산 결과를 직접 반환하도록 한다.
// 그리고 calculatedProduction() 메서드를 인라인 한다.
class ProductionPlan {
  get produnction() {
    // assert(this._production === this.calculatedProduction);
    return this._production
      .reduce((sum, a) => sum + a.amount, 0)
  }

  applyAdjustment(anAdjstment){
    this._adjustments.push(anAdjstment)
  }

  // get calculatedProduction() {
  //   return this._adjustments 
  //     .reduce((sum, a) => sum + a.amount, 0)
  // }
}

// 9-4
class Person {
  constructor(){
    this._telephoneNumber = new TelephoneNumber();
  }

  get officeAreaCode() {return this._telephoneNumber.areaCode;}
  set officeAreaCode(arg) { this._telephoneNumber.areaCode = arg}
  get officeNumber() {return this._telephoneNumber.number};
  set officeNumber(arg) {return this._telephoneNumber.number = arg}
}

class TelephoneNumber {
  get areaCode(){return this._areaCode}
  set areaCode(arg) {this._areaCode = arg}
  get number(){return this._number}
  set number(arg){this._number = arg}
}

// 클래스 추출하여 새로 만들어진 객체(TelephoneNumber)를 갱신하는 메서드들은 여전히
// 추출 전 클래스(Person)에 존재한다. 새 클래스를 가리키는 참조가 하나뿐이므로 참조를 값으로 바꾼다.
// 전화번호를 분변으로 만든다. 세터들을 저게헌다.

class TelephoneNumber {
  constructor(areaCode, number){
    this._areaCode = areaCode;
    this._number = number;
  }

  get areaCode(){return this._areaCode}
  get number(){return this._number}
}

// 세터 호출 쪽을 살펴서 전화번호를 매번 다시 대입하도록 바꾼다.
class Person {
  constructor(){
    this._telephoneNumber = new TelephoneNumber();
  }

  get officeAreaCode() {return this._telephoneNumber.areaCode;}
  set officeAreaCode(arg) { 
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber)
  }

  get officeNumber() {return this._telephoneNumber.number};
  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg)
  }
}

// 9-5.
class Order {
  constructor(data){
    this._number= data.number;
    this._customer = new Customer(data.customer)
    //
  }

  get customer() {return this._customer}
}

class Customer {
  constructor(id){
    this._id = id
  }

  get id() {return this._id}
}

// 고객 id 가 123인 주문을 다섯개 생성한다면 독립된 고객 객체가 다섯개 만들어진다.
// 이 중 하나를 수정하더라도 나머지 네 개에는 반영되지 않는다.
// 추가 데이터를 고객 객체를 추가시, 다섯 객체 모두를 같은 값으로 갱신해야 한다.

// 항상 물리적으로 똑같은 고객 객체를 사용하고 싶다면 먼저 이 유일한 객체를 저장해둘 곳이 있어야한다.
// 저장소 객체 사용(repository object)

let _repositoryData;

export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map()
}

export function registerCustomer(id){
  if(!_repositoryData.customers.has(id))
    _repositoryData.customers.set(id, new Customer(id));
  return findCustomer(id)
}

export function findCustomer(id){
  return _repositoryData.customers.get(id)
}

class Order {
  constructor(data){
    this._number = data.number;
    this._customer = registerCustomer(data.customer)
    //
  }

  get customer() { return this._customer}
}