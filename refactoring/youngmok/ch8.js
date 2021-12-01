const trackSummary = (points) => {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;
  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace
  }

  function calculateDistance () {
    let result = 0;
    for(let i =1; i< points.length; i++){
      result += distance(points[i-1], points[1])
    }
    return result;
  }

  function distance(p1, p2){}
  function radians(degress){}
  function calculateTime(){}
  //...
}

// 최상위 함수는 가시성이 가장 높으니 적당한 이름을 신중이 지어주는게 좋다.
// distance()와 radians()를 totlaDistance()안에 그대로 두어 가시성을 줄이는 쪽을 선호하는 이도 있다.
// 중첩함수를 사용하다보면 숨겨진 데이터끼리 상호 의존하기가 아주 쉬우니 중첩 함수는 되도록 만들지 말자.

function trackSummary(points){
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(potins);
  return {
    titme: totalTime,
    distance: totalDistance(points),
    pace: pace
  }
}

function calculateDistance(points) {
  let result = 0;
  for(let i=1; i<points.length; i++){
    result += distance(points[i-1], points[i])
  }
  return result;

  function distacne(p1,p2)
  function radians(degrees)
}

class Customer {
  constructor(name, discountRate){
    this._name = name;
    this._discountRate = discountRate;
    this._contract = new CustmoerContract(dateToday())
  }

  get discountRate(){return this._discountRate};
  becomePreferred() {
    this._discountRate += 0.03;
    //...
  }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._discountRate))
  }
}

class CustmoerContract {
  constructor(startDate){
    this._startDate = startDate;
  }
}

// refactoring

class CustmoerContract{
  constructor(startDate, discountRate){
    this._startDate = startDate;
    this._discountRate = discountRate;
  }

  get discountRate(){return this._discountRate}
  set discountRate(arg){this._discountRate = arg}
}

class Customer {
  constructor(name, discountRate){
    this._name = name;
    this._contract = new CustmoerContract(dateToday());
    this._setDiscountRate(discountRate)
  }

  get discountRate(){return this._contract.discountRate};
  _setDiscountRate(aNumber) {this._contract.discountRate = aNumber}
}