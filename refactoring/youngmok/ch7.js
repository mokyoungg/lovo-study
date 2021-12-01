const organization = {name:'kim', country: 'GB'}

result += `<h1>${organization.name}</h1>` // 읽기 예
organization.name = newName // 쓰기 예


// 먼저 상수를 캡슐화(변수를 캡슐화하기)
function getRawDataOfOrganization(){
  return organization
}

// 읽기 예
result += `<h1>${getRawDataOfOrganization().name}</h1>`

// 쓰기 예
getRawDataOfOrganization().name = newName;

/*
레코드를 캡슐화하는 목적은 변수 자체는 물론 그 내용을 조작하는 방식도 통제하기 위해서다.
*/

class Organization {
  constructor(data){
    this._data = data;
  }

  set name(aString) {this._data.name =aString};
  get name() {return this._data.name;}
}

const organization = new Organization({name:'lee', country:'GB'});
function getRawDataOfOrganization() {return organization._data};
function getOrganization(){return organization}

getOrganization().name = newName;
result += `<h1>${getOrganization().name}</h1>`

// 쓰기 예
customerData[customerID].usages[year][month] = amount;

// 읽기 예
function compareUsage(customerID, lastYear, month){
  const later = customerData[customerID].usages[lastYear][month];
  const earlier = customerData[customerID].usages[lastYear -1][month];
  return {laterAmount: later, change: later - earlier}
}

// 변수 캡슐화 하기
function getRawDataOfCustomers(){return customerData}
function setRawDataOfCustomers(arg) {customerData = arg};

// 쓰기 예
getRawDataOfCustomers()[customerID].usages[year][month] = amount;

//읽깅 예
function compareUsage(customerID, laterYear, month){
  const later = getRawDataOfCustomers()[customerID].usages[laterYear][month]
  const earlier = getRawDataOfCustomers()[customerID].usages[laterYear -1][month]
  
  return {laterAmount: later, change: later - earlier}
}

// 전체 데이터 구조를 표현하는 클래스 정의 및 반환하는 함수를 새로 작성
class CustomerData {
  constructor(data){
    this._data = data;
  }
}

function getCustomerData(){return customerData};
function getRawDataOfCustomers(){return customerData._data}
function setRawDataOfCustomers(arg){customerData = new CustomerData(arg)}

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
    const basePrice = this.basePrice
    var discountFactor = 0.98;

    if(basePrice > 1000) discountFactor -= 0.03;
    return basePrice * discountFactor
  }

  get basePrice(){
    return this._quantity * this._item.price;
  }
}

class Order{
  constructor(quantity, item){
    this._quantity = quantity;
    this._item = item;
  }

  get price () {

    var discountFactor = 0.98;

    if(this.basePrice > 1000) discountFactor -= 0.03;
    return basePrice * discountFactor
  }

  get basePrice(){
    return this._quantity * this._item.price;
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
  constructor(){

  }
  get officeAreaCode() {return this._officeAreaCode}
  set officeAreaCode(arg) {this._officeAreaCode = arg}
}

class Person {
  constructor(){
    this._telephoneNumber = new TelephoneNumber()
  }

  get officeAreaCode() { return this._telephoneNumber.officeAreaCode}
  set officeAreaCode(arg) {this._telephoneNumber = arg}
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