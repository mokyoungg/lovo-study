### Ch 7. 캡슐화

1. 레코드 캡슐화하기

- 가변 데이터를 다룰 땐 레코드보다 객체를 선호한다. 어떻게 저장했는지 숨기고, 레코드 내 값을 메서드로 제공할 수 있기 때문이다.

- 캡슐화에서는 값을 수정하는 부분을 명확하게 드러내고 한 곳에 모아두는 일이 중요하다. 모든 쓰기는 함수 안에서 처리한다. 캡슐화의 핵심 원칙을 지키기 위해, 읽기전용 프록시를 제공하거나 복제본을 동결시켜서 데이터를 수정하려 할 때 에러를 던질 수 있다.

2. 컬렉션 캡슐화하기

- 컬렉션을 다룰 때는 복제본을 만드는 습관을 들인다.

3. 기본형을 객체로 바꾸기

```
// before
class Order {
  constructor(data) {
    this._priority = data.priority;
  }

  get priority() { return this._priority; }
  set priority(aString) { this._priority = aString; }
}
```

```
class Priority {
  constructor(value) { this._value = value; }

  toString() { return this._value; }
}
```

```
// after
class Order {
  constructor(data) {
    this._priority = data.priority;
  }

  get priorityString() { return this._priority.toString(); }
  set priority(aString) { this._priority = new Priority(aString); }
}
```

4. 임시 변수 (Temp)를 질의 함수 (Query)로 바꾸기

- 공유 컨텍스트를 제공하는 클래스 안에서 임시 변수를 함수로 만들어 사용할 수 있다.

5. 클래스 추출하기

- 클래스가 비대해지기 전에 적절히 분리하는 것이 좋다. 서로 의존하는 데이터와 메서드를 따로 묶을 수 있는지 찾아본다.

6. 클래스 인라인하기

- 역할이 거의 없는 클래스는 해당 클래스를 가장 많이 사용하는 클래스로 흡수시킨다.
- 코드를 재구성하기 위해 인라인 리팩터링으로 하나로 합친 후 다른 방식으로 분리할 수 있다.

7. 위임 숨기기

- 위임 메서드를 만들어 모듈 간 의존성을 줄인다.
- 디미터의 법칙 ("Law of Demeter")
  > "Demeter라는 프로젝트를 진행하던 개발자들은 어떤 객체가 다른 객체에 대해 지나치게 많이 알다보니, 결합도가 높아지고 좋지 못한 설계를 야기한다는 것을 발견하였다. 그래서 이를 개선하고자 객체에게 자료를 숨기는 대신 함수를 공개하도록 하였는데, 이것이 바로 디미터의 법칙이다 즉, 디미터의 법칙은 다른 객체가 어떠한 자료를 갖고 있는지 속사정을 몰라야 한다는 것을 의미하며, 이러한 이유로 Don’t Talk to Strangers(낯선 이에게 말하지 마라) 또는 Principle of least knowledge(최소 지식 원칙) 으로도 알려져 있다. 또는 직관적으로 이해하기 위해 여러 개의 .(도트)을 사용하지 말라는 법칙으로도 많이 알려져 있으며, 디미터의 법칙을 준수함으로써 캡슐화를 높혀 객체의 자율성과 응집도를 높일 수 있다."

8. 중개자 제거하기

- 디미터의 법칙을 과하게 적용하다 보면 어떤 클래스는 메시지를 단순히 전달만 하는 중개자로 전락할 수 있으므로, 적당히 사용한다.

9. 알고리즘 교체하기

- 좀 더 간소한 알고리즘이 있다면 그것으로 대체한다.
