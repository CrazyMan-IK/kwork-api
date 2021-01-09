# kwork-api

Простая асинхронная обёртка над закрытым API для фриланс биржи kwork.ru

## Установка

Стабильная версия:
```
npm install kwork-api
```

Последняя версия:
```
npm install git+https://github.com/CrazyMan-IK/kwork-api.git
```

## Обзор

Список доступных методов можно посмотреть [здесь](./examples/api_example.js)

Пример простого api запроса:

```js
const kwork = require('kwork-api');

let kw = new kwork('login', 'password', '0000');

(async function () {
  let me = await kw.getMe();
  console.log(me);
})();
```

## Примечание
Если вдруг какие - то методы перестанут работать или работают неправильно, либо вам нужна дополнительная функциональность -
пишите отчёты в issue или мне в [ВК](https://vk.com/crazy_man_ik)