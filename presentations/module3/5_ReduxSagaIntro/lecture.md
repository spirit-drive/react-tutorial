---
title: Redux-Saga intro
description: Generators and Iterators
---

# OTUS

## ReactJS

<!--v-->

### Меня хорошо слышно и видно?

### Не забыл включить запись?

<!--v-->

### Что сегодня пройдём?

* Generators
* Iterators
* Async iterators
* The SAGA pattern

<!--v-->

### Вопросы?

<!--s-->

## Generators

<!--v-->

### Generators

* Функция, которая возвращает значения одно за другим
* Перебираемые объекты, потоки данных

<!--v-->

### Зачем вообще мне это знать?

* Концепт позволяет писать асинхронный код без async/await
* Очень легко покрывать тестами
* Redux-saga построена на генераторах

<!--v-->

### Синтаксис

```js
function* genFunc() {
 //···
}

const genFunc2 = function* () {
 //···
};
```

<!--v-->

### Синтаксис

```js
const obj = {
 *generatorMethod() {
   //···
 },
};

const genObj = obj.generatorMethod();
```

<!--v-->

### Синтаксис

```js
class MyClass {
 *generatorMethod() {
   //···
 }
}

const myInst = new MyClass();
const genObj2 = myInst.generatorMethod();
```

<!--v-->

### Первый генератор

```js
function* genFunc() {
 yield "a";
 yield "b";
}
```

<!--v-->

### Как получить данные

```js
for (const x of genFunc()) {
 console.log(x);
}
// Output:
// a
// b
```

<!--v-->

### Как получить данные

```js
const arr = [...genFunc()]; // ['a', 'b']
```

<!--v-->

### Боевой пример

```js
function* objectEntries(obj) {
 // In ES6, you can use strings or symbols as property keys,
 // Reflect.ownKeys() retrieves both
 const propKeys = Reflect.ownKeys(obj);

 for (const propKey of propKeys) {
   yield [propKey, obj[propKey]];
 }
}
```

<!--v-->

### Боевой пример

```js
const jane = { first: "Jane", last: "Doe" };
for (const [key, value] of objectEntries(jane)) {
 console.log(`${key}: ${value}`);
}

// first: Jane
// last: Doe
```

<!--v-->

### Как комбинировать генераторы

```js
function* foo() {
 yield "a";
 yield "b";
}

function* bar() {
 yield "x";
 foo(); // does nothing!
 yield "y";
}
```

<!--v-->

### Как комбинировать генераторы

```js
function* bar() {
 yield "x";
 yield* foo();
 yield "y";
}

// Collect all values yielded by bar() in an array
let arr = [...bar()];
// ['x', 'a', 'b', 'y']
```

<!--v-->

### Комбинация работает примерно так

```js
function* bar() {
 yield "x";
 for (const value of foo()) {
   yield value;
 }
 yield "y";
}
```

<!--v-->

### Даже вот так работает

```js
function* bla() {
 yield "sequence";
 yield* ["of", "yielded"]; // it can be any iterable
 yield "values";
}
```

<!--v-->

### А так не работает

```js
function* genFunc() {
 ["a", "b"].forEach((x) => yield x); // SyntaxError
}

function* genFunc() {
 for (const x of ["a", "b"]) {
   yield x; // OK
 }
}
```

<!--v-->

### Flow

```js
function* genFunc2() {
 try {
   console.log("Started");
   yield;
 } finally {
   yield "Not done, yet!";
 }
}

genObj2.next()
> Started
// { value: undefined, done: false }

genObj2.return('Result')
// { value: 'Not done, yet!', done: false }
genObj2.next()
// { value: 'Result', done: true }
```

<!--v-->

### throw

```js
function* genFunc1() {
 try {
   console.log("Started");
   yield; // (A)
 } catch (error) {
   console.log("Caught: " + error);
 }
}

const genObj1 = genFunc1();

genObj1.next();
// > Started
// { value: undefined, done: false }

genObj1.throw(new Error("Problem!"));
// Caught: Error: Problem!
// { value: undefined, done: true }
```

<!--v-->

## Практика

<!--v-->

## Вопросы

<!--s-->

## Iterators

<!--v-->

### Создание простого итератора

```js
export const createSimpleIterator = (from: number, to: number) => ({
 from,
 to,
 [Symbol.iterator]: () => ({
   next: () => {
     return from <= to ? { done: false, value: from++ } : { done: true };
   },
 }),
});
```

<!--v-->

### Как с этим работать

```js
const simpleIterator = createSimpleIterator(1, 5);
for (const value of simpleIterator) {
  // value of iterator ...
```

<!--v-->

### Зачем вообще мне это знать?

* Вы уже работаете с итераторами объекты string, arrays устроены так по умолчанию
* Можно создавать асинхронные итераторы

<!--v-->

## Практика

<!--s-->

## Redux-saga

<!--v-->

### The SAGA Pattern

* Один из наиболее известных шаблонов для распределенных транзакций называется Saga. Первая статья об этом была опубликована еще в 1987 году, и с тех пор это популярное решение.
* [Saga part1](https://blog.couchbase.com/saga-pattern-implement-business-transactions-using-microservices-part/)
* [Saga part2](https://blog.couchbase.com/saga-pattern-implement-business-transactions-using-microservices-part-2/)

<!--v-->

<img src="./images/SagaPattern1.png" style="height:75vh;">

<!--v-->

![SagaPattern2](images/SagaPattern2.png)

<!--v-->

### Что такое side-effect?

[side effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science)
)

> В информатике говорят, что операция, функция или выражение имеют побочный эффект, если они изменяют некоторые значения переменных состояния за пределами своей локальной среды...

<!--v-->

### Redux-Saga

> [redux-saga](https://redux-saga.js.org/) это библиотека, цель которой - упростить управление побочными эффектами приложения (т.е. асинхронными процессами, такими как выборка данных, и нечистыми процессами, такими как доступ к кэшу браузера), повысить эффективность выполнения, простоту тестирования и улучшить обработку сбоев.

[с чего начать](https://redux-saga.js.org/docs/ExternalResources.html)

<!--v-->

## Практика

<!--v-->

## Спасибо за внимание!
