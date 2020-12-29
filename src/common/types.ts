type Int = number & { __int__: void };

interface ProfileBadge {
  /**
   * Идентификатор
   */
  id?: number;
  /**
   * Название
   */
  name?: string;
  /**
   * Описание
   */
  description?: string;
  /**
   * Ссылка на изображение
   */
  image_url?: string;
  [k: string]: unknown;
}

interface Worker {
  /**
   * Идентификатор продавца
   */
  id?: number;
  /**
   * Имя пользователя
   */
  username?: string;
  /**
   * Полное имя пользователя
   */
  fullname?: string;
  /**
   * Путь к аватару
   */
  profilepicture?: string;
  /**
   * Рейтинг по пятибальной шкале
   */
  rating?: number;
  /**
   * Общее количество отзывов
   */
  reviews_count?: number;
  /**
   * Количество отзывов
   */
  rating_count?: number;
  /**
   * Онлайн ли пользователь
   */
  is_online?: boolean;
  [k: string]: unknown;
}

interface KworkBadge {
  /**
   * Текст бейджа
   */
  name?: string;
  /**
   * Цвет фона бейджа
   */
  backgroundColor?: string;
  /**
   * Цвет текста бейджа
   */
  textColor?: string;
  /**
   * Цвета частей текста бейджа
   */
  composite_text_colors?: {
    [k: string]: string;
  };
  [k: string]: unknown;
}

interface ProfileKwork {
  /**
   * Идентификатор
   */
  id?: number;
  /**
   * ID категории
   */
  category_id?: number;
  /**
   * Название категории
   */
  category_name?: string;
  /**
   * ID атрибута-значения классификации верхнего уровня
   */
  classification_id?: number;
  /**
   * Идентификатор статуса кворка
   */
  status_id?: number;
  /**
   * Название статуса
   */
  status_name?: string;
  /**
   * Название кворка
   */
  title?: string;
  /**
   * Относительный путь к обложке кворка
   */
  image_url?: string;
  /**
   * Стоимость кворка
   */
  price?: number;
  /**
   * Необходима ли подпись 'Цена ОТ'
   */
  is_price_from?: boolean;
  /**
   * Кворк имеет высший рейтинг
   */
  is_best?: boolean;
  /**
   * Кворк скрыт у активного юзера
   */
  is_hidden?: boolean;
  /**
   * Кворк в избранных у активного юзера
   */
  is_favorite?: boolean;
  /**
   * Просмотрен ли кворк
   */
  is_viewed?: boolean;
  /**
   * Кворк с подпиской?
   */
  isSubscription?: boolean;
  /**
   * Язык кворка, для привзяки валюты
   */
  lang?: string;
  /**
   * Порядок вывода в списке
   */
  order?: {
    [k: string]: unknown;
  };
  /**
   * Данные продавца
   */
  worker?: Worker;
  /**
   * Массив строк что нужно исправить в кворке, для текущего юзера
   */
  edits_list?: string[];
  /**
   * Активность для текущего юзера
   */
  activity?: {
    /**
     * Количество просмотров
     */
    views?: number;
    /**
     * Количество заказов
     */
    orders?: number;
    /**
     * Сколько заработано
     */
    earned?: number;
    [k: string]: unknown;
  };
  /**
   * Бейджи кворка
   */
  badges?: KworkBadge[];
  [k: string]: unknown;
}

interface Portfolio {
  /**
   * Идентификатор
   */
  id?: number;
  /**
   * Название работы
   */
  title?: string;
  /**
   * ID заказа
   */
  order_id?: number;
  /**
   * ID категории заказа
   */
  category_id?: number;
  /**
   * Название категории заказа
   */
  category_name?: string;
  /**
   * Тип, 'photo' или 'видео'
   */
  type?: string;
  /**
   * Относительный путь к фото
   */
  photo?: string;
  /**
   * Относительный путь к видео
   */
  video?: string;
  /**
   * Кол-во чистых лайков
   */
  likes?: number;
  /**
   * Кол-во грязных лайков
   */
  likes_dirty?: number;
  /**
   * Кол-во чистых просмотров
   */
  views?: number;
  /**
   * Кол-во грязных просмотров
   */
  views_dirty?: number;
  /**
   * Кол-во комментариев
   */
  comments_count?: number;
  /**
   * Стоит ли лайк пользователя
   */
  is_liked?: {
    [k: string]: unknown;
  };
  /**
   * Изображения, прикрепленные к портфолио
   */
  images?: {
    /**
     * Ссылка на изображение
     */
    link?: string;
    /**
     * Ссылка на миниатюру изображения
     */
    thumbnail?: string;
    /**
     * Позиция сортировки изображения
     */
    position?: number;
    [k: string]: unknown;
  }[];
  /**
   * Видеоролики, прикрепленные к портфолио
   */
  videos?: {
    /**
     * Ссылка на видеоролик
     */
    link?: string;
    /**
     * Позиция сортировки видеоролика
     */
    position?: number;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}

interface ReviewWriter {
  /**
   * Идентификатор продавца
   */
  id?: number;
  /**
   * Имя пользователя
   */
  username?: string;
  /**
   * Ссылка на изображения аватара пользователя
   */
  profilepicture?: string;
  [k: string]: unknown;
}

interface ReviewAnswer {
  /**
   * Идентификатор ответа
   */
  id?: number;
  /**
   * Текст ответа
   */
  text?: string;
  /**
   * Идентификатор пользователя - продавца
   */
  user_id?: number;
  /**
   * Дата ответа UNIXTIME
   */
  time_added?: number;
  /**
   * Имя пользователя
   */
  username?: string;
  /**
   * Ссылка на изображения аватара пользователя
   */
  profilepicture?: string;
  [k: string]: unknown;
}

interface Review {
  /**
   * Идентификатор отзыва. Может быть NULL если это портфолио
   */
  id?: number;
  /**
   * Дата добавления отзыва или портфолио UNIXTIME
   */
  time_added?: number;
  /**
   * Текст отзыва. Может быть NULL если это портфолио
   */
  text?: string;
  /**
   * Статус автоматического создания отзыва: inwork_time_over - Просрочено время взятия в работу, time_over - Просрочено время выполнения, incorrect_execute - Некорректное выполнение
   */
  auto_mode?: string;
  /**
   * Является ли отзыв положительным
   */
  good?: boolean;
  /**
   * Является ли отзыв отрицательным
   */
  bad?: boolean;
  /**
   * Объект кворка
   */
  kwork?: {
    /**
     * Идентификатор кворка
     */
    id?: number;
    /**
     * Название кворка
     */
    title?: string;
    /**
     * Статус активности кворка, 0 - на модерации, 1 - активный, 2 - заблокирован (за штрафные баллы), 3 - удален, 4 - отклонен модератором, 5 - на паузе (за большую очередь),
     */
    active?: 0 | 1 | 2 | 3 | 4 | 5;
    /**
     * Статус показа кворка
     */
    feat?: boolean;
    [k: string]: unknown;
  };
  /**
   * Краткие данные автора отзыва
   */
  writer?: ReviewWriter;
  /**
   * Ответ продавца на отзыв
   */
  answer?: ReviewAnswer;
  /**
   * Портфолио
   */
  portfolio?: Portfolio;
  [k: string]: unknown;
}

interface KworkUser {
  /**
   * Идентификатор пользователя
   */
  id?: number;
  /**
   * Имя пользователя
   */
  username?: string;
  /**
   * Статус
   */
  status?: string;
  /**
   * E-mail
   */
  email?: string;
  /**
   * Текущая роль пользователя worker|payer
   */
  type?: 'worker' | 'payer';
  /**
   * Подтвержден ли email
   */
  verified?: boolean;
  /**
   * Путь к изображению аватара
   */
  profilepicture?: string;
  /**
   * Текст о себе
   */
  description?: string;
  /**
   * Слоган - не заполнен
   */
  slogan?: string;
  /**
   * Настоящее имя
   */
  fullname?: string;
  /**
   * Название уровня продавца
   */
  level_description?: string;
  /**
   * Путь к баннеру пользователя
   */
  cover?: string;
  /**
   * Количество положительных отзывов
   */
  good_reviews?: number;
  /**
   * Количество отрицательныз отзывов
   */
  bad_reviews?: number;
  /**
   * Город или страна
   */
  location?: string;
  /**
   * Рейтинг по 5 бальной шкале с 1 десятичным знаком
   */
  rating?: string;
  /**
   * Количество отзывов
   */
  rating_count?: number;
  /**
   * Баланс общий
   */
  total_amount?: number;
  /**
   * Баланс заблокировано
   */
  hold_amount?: number;
  /**
   * Баланс свободный
   */
  free_amount?: number;
  /**
   * Количество диалогов в архиве
   */
  inbox_archive_count?: number;
  /**
   * Количество непрочитанных диалогов
   */
  unread_dialog_count?: number;
  /**
   * Количество непрочитанных уведомлений
   */
  notify_unread_count?: number;
  /**
   * Есть ли важные непрочитанные уведомления
   */
  red_notify?: boolean;
  /**
   * Количество важных непрочитанных диалогов
   */
  warning_inbox_count?: number;
  /**
   * Количество непрочитанных уведомлений, кроме [want, kworkActive, kworkRejected]
   */
  app_notify_count?: number;
  /**
   * Количество непрочитанных сообщений
   */
  unread_messages_count?: number;
  /**
   * Настоящее имя пользователя - по английски
   */
  fullnameEn?: string;
  /**
   * Информация о продавце по английски
   */
  descriptionEn?: string;
  /**
   * Идентификатор страны
   */
  country_id?: number;
  /**
   * Идентификатор города
   */
  city_id?: number;
  /**
   * Идентификатор часового пояса
   */
  timezone_id?: number;
  /**
   * Дата регистрации
   */
  addtime?: number;
  /**
   * Разрешена ли отправка пушей в мобильное приложение через FCM
   */
  allow_mobile_push?: boolean;
  /**
   * Пользователь больше покупатель, чем продавец
   */
  is_more_payer?: boolean;
  /**
   * Кол-во кворков актора
   */
  kworks_count?: number;
  /**
   * Кол-во избранных кворков
   */
  favourite_kworks_count?: number;
  /**
   * Кол-во скрытых кворков
   */
  hidden_kworks_count?: number;
  /**
   * Специальность пользователя
   */
  profession?: string;
  /**
   * Флаг, показывающий доступны ли кворки на выходных
   */
  kworks_available_at_weekends?: boolean;
  /**
   * Бейдж пользователя
   */
  achievments_list?: ProfileBadge;
  /**
   * Кол-во выполненных заказов
   */
  completed_orders_count?: number;
  /**
   * Кворки пользователя
   */
  kworks?: ProfileKwork[];
  /**
   * Портфолио пользователя
   */
  portfolio_list?: Portfolio[];
  /**
   * Массив отзывов
   */
  reviews?: Review[];
  /**
   * Статус продавца (null, free, busy)
   */
  worker_status?: 'null' | 'free' | 'busy';
  /**
   * Есть ли у пользователя активные предложения
   */
  has_offers?: boolean;
  /**
   * Количество запросов пользователя
   */
  wants_count?: number;
  /**
   * Количество предложений пользователя
   */
  offers_count?: number;
  /**
   * Количество архивных запросов пользователя
   */
  archived_wants_count?: number;
  [k: string]: unknown;
}

interface Category {
  /**
   * ID категории
   */
  id?: number;
  /**
   * Название категории
   */
  name?: string;
  [k: string]: unknown;
}

interface Achievement {
  /**
   * Идентификатор
   */
  id?: number;
  /**
   * Название
   */
  name?: string;
  /**
   * Описание
   */
  description?: string;
  /**
   * Ссылка на изображение
   */
  image_url?: string;
  [k: string]: unknown;
}

interface Project {
  /**
   * ID запроса(проекта)
   */
  id?: number;
  /**
   * ID пользователя
   */
  user_id?: number;
  /**
   * Логин пользователя
   */
  username?: string;
  /**
   * Изображение профиля
   */
  profile_picture?: string;
  /**
   * Бюджет проекта
   */
  price?: number;
  /**
   * Заголовок
   */
  title?: string;
  /**
   * Краткое описание проекта
   */
  description?: string;
  /**
   * Количество предложений
   */
  offers?: number;
  /**
   * Время, оставшееся до закрытия проекта UNIX
   */
  time_left?: number;
  /**
   * Идентификатор рубрики проекта
   */
  parent_category_id?: number;
  /**
   * Идентификатор подрубрики проекта
   */
  category_id?: number;
  /**
   * Дата первого подтверждения модератором (или переподтвержения при перезапуске из архива)
   */
  date_confirm?: number;
  /**
   * Базовая стоимость работ в категории запроса
   */
  category_base_price?: number;
  /**
   * Количество проектов на бирже покупателя
   */
  user_projects_count?: number;
  /**
   * Процент нанятых продавцов на бирже
   */
  user_hired_percent?: number;
  /**
   * Бейджи пользователя
   */
  achievements_list?: Achievement[];
  /**
   * Просмотрен ли текущим пользователем
   */
  is_viewed?: boolean;
  /**
   * Статус последнего заказа между пользователями
   */
  already_work?: 0 | 3 | 5;
  /**
   * Готов ли покупатель рассмотреть предложения с ценой выше
   */
  allow_higher_price?: boolean;
  /**
   * Лимит цены предложений с учетом готовности покупателя рассмотреть предложения с ценой выше
   */
  possible_price_limit?: number;
  [k: string]: unknown;
}

interface Response<T> {
  /**
   * Флаг успешности
   */
  success?: boolean;
  /**
   * Данные
   */
  response?: T;
  [k: string]: unknown;
}

interface Pagination {
  /**
   * Текущая страница
   */
  page?: number;
  /**
   * Общее количество элементов
   */
  total?: number;
  /**
   * Количество элементов на странице
   */
  limit?: number;
  /**
   * Количество страниц
   */
  pages?: number;
  [k: string]: unknown;
}

interface ResponseWithPagination<T> {
  /**
   * Флаг успешности
   */
  success?: boolean;
  /**
   * Данные
   */
  response?: T;
  /**
   * Данные пагинации с лимитом
   */
  paging?: Pagination;
  [k: string]: unknown;
}

export { Int, Response, Pagination, ResponseWithPagination, KworkUser, Category, Project };
