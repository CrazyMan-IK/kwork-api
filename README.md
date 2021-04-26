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
Реализация была переписана с python библиотеки [pykwork](https://github.com/kesha1225/pykwork)

Получая ошибку "Подтвердите что вы не робот" просто ставьте прокси.

Kwork может банить по ip, но в основном kwork-api предотвращает это, даже если вас забанили, не пугайтесь, аккаунты они не банят, просто перезайдите с vpn/tor/proxy. Если вас каким то чудом забанили, но вам нужно продолжить использовать бота - воспользуйтесь прокси (socks5/socks4):

```js
const kwork = require('kwork-api');

let kw = new kwork('login', 'password', '0000', 'socks5://localhost:9050');

(async function () {
  let me = await kw.getMe();
  console.log(me);
})();
```

Если вдруг какие - то методы перестанут работать или работают неправильно, либо вам нужна дополнительная функциональность -
пишите отчёты в issue или мне в [ВК](https://vk.com/crazy_man_ik)
