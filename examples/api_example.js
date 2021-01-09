const kwork = require('kwork-api');

let kw = new kwork('login', 'password', '0000');

(async function () {
  let me = await kw.getMe(); //Получение своего профиля
  console.log(me);
  let cats = await kw.getFavouriteCategories(); //Получение любимых рубрик
  console.log(cats);
  let projs = await kw.getProjects(); //Получение текущих заказов на бирже
  console.log(projs);
})();
