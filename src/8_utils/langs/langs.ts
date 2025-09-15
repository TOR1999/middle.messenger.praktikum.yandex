export const langs = {
  developmentPage: "Страница в разработке...",
  common: {
    login: "Логин",
    password: "Пароль",
    buttons: {
      altBack: "Кнопка назад.",
      save: "Сохранить",
      cancel: "Отмена",
      add: "Добавить",
      delete: "Удалить",
      find: "Найти",
    },
    you: "Вы",
  },
  authorizationModal: {
    tittle: "Вход",
    buttonsText: {
      auth: "Авторизоваться",
      registration: "Нет аккаунта?",
    },
  },
  registrationModal: {
    tittle: "Регистрация",
    buttonsText: {
      registration: "Зарегистрироваться",
      auth: "Войти",
    },
  },
  profilePage: {
    email: "Почта",
    name: "Имя",
    nickName: "Имя в чате",
    secondName: "Фамилия",
    phone: "Телефон",
    repeatPassword: "Пароль (ещё раз)",
    changeData: "Изменить данные",
    changePassword: "Изменить пароль",
    changeImageProfile: "Изменить фотографию",
    logOut: "Выйти",
    altImageProfile: "Изображение пользователя.",
    editPassword: {
      old: "Старый пароль",
      new: "Новый пароль",
      repeatNew: "Повторите новый пароль",
    },
  },
  ErrorPage: {
    notFound: {
      textCode: "404",
      textMessage: "Не туда попали",
      textLink: "Назад к чатам",
    },
    serverError: {
      textCode: "500",
      textMessage: "Мы уже фиксим",
      textLink: "Назад к чатам",
    },
  },
  validateText: {
    password:
      "Пароль должен содержать от 8 до 40 символов, одна заглавная буква и цифра",
    name: "Первая буква даолжна быть заглавной, используйте только латиницу или кириллицу",
    login: "Логин должен содержать от 3 до 20 символов, без спецсимволов",
    email: "Некорректный email",
    phone: "Некорректный номер телефона",
    repeatPassword: "Пароли не совпадают",
    oldPassword: "Старый пароль неверный",
    emtyFields: "Все поля должны быть заполнены",
  },
  chatsPage: {
    unSelectChat: "Выберите чат чтобы отправить сообщение",
    listChats: {
      linkProfile: "Профиль",
      search: "Поиск",
      createChat: "Создать чат",
    },
    listMessages: {
      unselectedChat: "Выберите чат чтобы отправить сообщение",
      placeHolderMessage: "Сообщение",
    },
    createChatModal: {
      title: "Создать новый чат",
      label: "Название",
    },
    actionChatModal: {
      title: "Создать новый чат",
      addUserButton: "Добавить пользователя",
      deleteUserButton: "Удалить пользователя",
      deleteChatButton: "Удалить чат",
    },
    addUserModal: {
      title: "Добавить пользователя",
      label: "Логин",
    },
    deleteUserModal: {
      title: "Удалить пользователя",
      label: "Логин",
    },
  },
  ChooseAvatarModal: {
    title: "Загрузите файл",
    textInput: "Выбрать файл на компьютере",
    buttonText: "Поменять",
    cancelButtonText: "Вернуться назад",
  },
  errorRequest: {
    badRequest: "Что-то пошло не так... Попробуте попытку снова",
  },
  notificationInfo: {
    successfulAddUserToChat: "Пользователь успешно добавлен в чат",
    successfulDeleteUserToChat: "Пользователь успешно удалён из чата",
  },
};
