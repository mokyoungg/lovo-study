# ch - 8. 기능이동

- 지금까지는 프로그램 요소를 생성 혹은 제거하거나 이름을 변경하는 리팩터링을 다뤘다.
- 여기에 더해 요소를 다른 컨텍스트로 옮기는 일 역시 리팩터링의 중요한 축이다.

## 8-1. 함수 옮기기

```
class Account{
  get overdraftCharge()
}

class AccountType {
  get overdraftCharge()
}
```

### 배경

- 좋은 소프트웨어 설계의 핵심은 모듈화가 얼마나 잘 되어 있느냐를 뜻하는 모듈성이다.
- 모듈성이란 프로그램의 어딘가를 수정하려 할 때 해당 기능과 깊이 관련된 작은 일부만 이해해도 가능하게 해주는 능력이다.
- 모듈성을 높이려면 서로 연관된 요소들을 함께 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 해야 한다.
- 모든 함수는 어떤 컨텍스트 안에 존재한다. 전역 함수도 있지만 대부분은 특정 모듈에 속한다.
- 어떤 함수가 자신이 속한 모듈 A의 요소들보다 다른 모듈 B의 요소들을 더 많이 참조한다면 모듈 B로 옮겨줘야 마땅하다.

## 8-2. 필드 옮기기

```
class Customer {
  get plan() {return this._plan}
  get discountRate(){return this._discountRate}
}

class Customer {
  get plan() {return this._plan};
  get discountRate(){return this.plan.discountRate}
}
```

- 프로그램의 상당 부분이 동작을 구현하는 코드로 이뤄지지만 프로그램의 진짜 힘은 데이ㅓ 구조에서 나온다.
- 주어진 문제에 적합한 데이터 구조를 활용하면 동작 코드는 자연스럽게 단순하고 직관적으로 짜여진다.
- 함수에 항상 함께 건제니는 데이터 조각들은 상호 관계가 명확하게 드러나도록 한 레코드에 담는게 가장 좋다.
- 한 레코드를 변경하려 할 때 다른 레코드의 필드까지 변경해야만 한다면 필드의 위치가 잘못되었다는 신호다.

## 8-3. 문장을 함수로 옮기기

```
result.push(`<p>제목: ${person.photo.title}</p>`);
result.concat(photoData(person.photo));

function photoData(aPhoto){
  return {
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>날짜: ${aPhoto.data.toDateString()}</p>`
  }
}

//

result.concat(photoData(person.photo));

function photoData(aPhoto){
  return {

    `<p>제목: ${aPhoto.title}</p>`,
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>날짜: ${aPhoto.data.toDateString()}</p>`
  }
}
```

### 배경

- 중복 제거는 코드를 건강하게 관리하는 가장 효과적인 방법 중 하나다.
- 예컨대 특정 함수를 호출하는 코드가 나올 때마다 그 앞이나 뒤에서 똑같은 코드가 추가로 실행되는 모습을 보면 그 반복되는 부분을 피호출 함수로 합치는 방법을 궁리한다.

## 8-4. 문장을 호출한 곳으로 옮기기

```
emitPhotoData(outStream, person.photo);

function emitPhotoData(outStream, photo){
  outStream.write(`<p>제목 : ${photo.title}</p>\n`)
  outStream.write(`<p>위치 : ${photo.location}</p>\n`)
}

//

emitPhotoData(outStream, person.photo);
ousStream.write(`<p>위치 : ${photo.location}</p>\n`);

function emitPhotoData(outStream, photo){
  outStream.write(`<p>제목 : ${photo.title}</p>\n`)
}
```

### 배경

- 함수는 프로그래머가 쌓아 올리는 추상화의 기본 빌딩 블록이다.
- 그런데 추상화라는 것이 그 경계를 항상 올바르게 긋기가 만만치 않다.
- 초기에는 응집도 높고 한 가지 일만 수행하던 함수가 어느새 둘 이상의 다른 일을 수행하게 바뀔 수도 있다.

## 8-5. 인라인 코드를 함수 호출로 바꾸기

```
let appliesToMass = false;
for(const s of states){
  if(s==='MA') appliesToMass =true;
}
//
appliesToMass = state.includes('MA')
```

### 배경

- 함수는 여러 동작을 하나로 묶어준다. 그리고 함수의 이름이 코드의 동작 방식보다는 목적을 말해주기 때문에 함수를 활용하면 코드를 이해하기가 쉬워진다.
- 함수는 중복을 없애는 데도 효과적이다. 똑같은 코드를 반복하는 대신 함수를 호출하면 된다.
- 동작 변경시, 일일이 찾아 수정하는 대신 함수 하나만 수정하면 된다.

## 8-6. 문장 슬라이드하기

```
const pricingPlan = retrievePricingPlan();
const order = retreiveOrder();
let charge;
const chargePerUnit = pricingPlan.unit;

//
const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retreiveOrder();
let charge;

```

### 배경

- 관련된 코드들이 가까이 모여 있다면 이해하기가 쉽다.

## 8-7. 반복문 쪼개기

```
let averageAge = 0;
let totalSalary = 0;
for (cont p of people){
  averageAge += p.age;
  totalSalary += p.salary;
}
averageAge = averageAge / people.length;

//

let totalSalary = 0;
for (cont p of people){
  totalSalary += p.salary;
}

let averageAge = 0;
for (cont p of people){
   averageAge += p.age;
}
averageAge = averageAge / people.length;
```

### 배경

- 반복문 하나에서 두 가지 일을 수행하는 모습을 보게 된다.
- 그저 두 일을 한꺼번에 처리할 수 있다는 이유에서 말이다.
- 이렇게 하면 반복문을 수정해야 할 때마다 두 가지 일 모두를 잘 이해하고 진행해야한다.
- 반복문을 분리하면 사용하기도 쉬워진다.

## 8-8. 반복문을 파이프라인으로 바꾸기

```
const names = [];
for (const i of input){
  if(i.job === 'programmer'){
    names.push(i.name)
  }
}

///

const names = input
  .filter(i => i.job === 'programmer')
  .map(i => i.name)
```

### 배경

- 컬렉션 파이프라인을 이용하면 처리 과정을 일련의 연산으로 표현할 수 있다.
- 이때 각 연산은 컬렉션을 입력받아 다른 컬렉션을 내뱉는다.
- 논리를 파이프라인으로 표현하면 이해하기가 훨씬 쉬워진다. 객체가 파이프라인을 따라 흐르며 어떻게 처리되는지를 읽을 수 있기 때문이다.

## 8-9. 죽은 코드 제거하기

## 배경

- 코드가 더이상 사용되지 않게 됐다면 지워야한다.
- 혹시 다시 필요해질 날이 오지 않을까 걱정할 필요없다. 버전관리 시스템이 있으니까
