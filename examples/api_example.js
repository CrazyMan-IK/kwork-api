const kwork = require('kwork-api');

(async function () {
  //Третьим параметром являются последние 4 цифры номера телефона аккаунта
  let kw = new kwork('login', 'password', '0000');

  let me = await kw.getMe(); //Получение своего профиля
  console.log(me);
  
  let notme = await kw.getUser(id); //Получение профиля пользователя по ID
  console.log(notme);
  
  let worders = await kw.getWorkerOrders(); //Получение списка заказов от лица продавца
  console.log(worders);
  
  let porders = await kw.getPayerOrders(); //Получение списка заказов от лица покупателя
  console.log(porders);
  
  let cats = await kw.getFavouriteCategories(); //Получение любимых рубрик
  console.log(cats);
  
  let projs = await kw.getProjects(); //Получение текущих заказов на бирже
  console.log(projs);

  //Подписка на оповещения о новых заказов на бирже
  kw.onNewProject.subscribe((x) => {
    console.log(x);
  });

  //Подписка на оповещения о новых сообщениях
  kw.onNewMessage.subscribe((x) => {
    console.log(x);
  });
})();
