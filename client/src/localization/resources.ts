// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: {
    translation: {
      errors: {
        unexpected_error: 'Неожиданная ошибка. Мы автоматически регистрируем ошибки и скоро все исправим',
        'Failed to fetch': 'Ошибка соединения. Проверьте подключение',
        is_required: 'Обязательное поле',
        invalid_email_address: 'Некорректный email адрес',
        too_short_password: 'Слишком короткий пароль',
        not_same_password: 'Пароли не совпадают',
        ERR_INCORRECT_EMAIL_OR_PASSWORD: 'Некорректный пароль или email',
        ERR_NOT_FOUND: 'Сущность с таким id не найдена',
        ERR_USER_NOT_REGISTER: 'Зарегистрируйтесь, чтобы получить доступ к этой функции',
        ERR_INCORRECT_PASSWORD: 'Некорректный пароль',
        ERR_ACCOUNT_ALREADY_EXIST: 'Аккаунт с таким email уже существует',
        ERR_INVALID_PASSWORD: 'Пароль должен содержать от 8 символов',
        ERR_TOKEN_REQUIRED_ERROR:
          'Серверная ошибка токена. Мы автоматически регистрируем все ошибки и скоро все исправим',
        ERR_JWT_ERROR: 'Вы не авторизованы, войдите в учетную запись и повторите попытку',
        ERR_DATA_BASE_ERROR:
          'Серверная ошибка базы данный. Мы автоматически регистрируем все ошибки и скоро все исправим',
        INTERNAL_SERVER_ERROR: 'Серверная ошибка. Мы автоматически регистрируем все ошибки и скоро все исправим',
        ERR_INVALID_NICKNAME:
          'Псевдоним должен быть от 7 символов и может содержать только числа, буквы и символ нижнего подчеркивания',
      },
      screens: {
        auth: {
          title: 'Аутентификация',
          signIn: {
            title: 'Войти',
            submit: 'Войти',
          },
          signUp: {
            title: 'Зарегистрироваться',
            submit: 'Зарегистрироваться',
          },
        },
      },
      forms: {
        AuthForm: {
          email: {
            title: 'Email',
            placeholder: 'Укажите email',
          },
          password: {
            title: 'Пароль',
            placeholder: 'Укажите пароль',
          },
        },
        ChangePasswordForm: {
          password: {
            title: 'Пароль',
            placeholder: 'Укажите пароль',
          },
          newPassword: {
            title: 'Новый пароль',
            placeholder: 'Укажите новый пароль',
          },
          repeatPassword: {
            title: 'Повторите пароль',
            placeholder: 'Повторите пароль',
          },
        },
        EmailForm: {
          email: {
            title: 'Email',
            placeholder: 'Укажите email',
          },
        },
        ProfileForm: {
          name: {
            title: 'Псевдоним',
            placeholder: 'Придумайте себе псевдоним',
          },
        },
        RepeatPasswordForm: {
          password: {
            title: 'Пароль',
            placeholder: 'Укажите пароль',
          },
          repeatPassword: {
            title: 'Повторите пароль',
            placeholder: 'Повторите пароль',
          },
        },
      },
      components: {
        login: {
          enter: 'Login',
          leave: 'Logout',
        },
        header: {
          nav: 'Navigation',
          root: 'Home',
          secret: 'Secret screen',
          'home-works': 'Home works',
          examples: 'Examples',
          teachers: 'Teachers',
        },
      },
    },
  },
  ru: {
    translation: {
      errors: {
        unexpected_error: 'Неожиданная ошибка. Мы автоматически регистрируем ошибки и скоро все исправим',
        'Failed to fetch': 'Ошибка соединения. Проверьте подключение',
        is_required: 'Обязательное поле',
        invalid_email_address: 'Некорректный email адрес',
        too_short_password: 'Слишком короткий пароль',
        not_same_password: 'Пароли не совпадают',
        ERR_INCORRECT_EMAIL_OR_PASSWORD: 'Некорректный пароль или email',
        ERR_NOT_FOUND: 'Сущность с таким id не найдена',
        ERR_USER_NOT_REGISTER: 'Зарегистрируйтесь, чтобы получить доступ к этой функции',
        ERR_INCORRECT_PASSWORD: 'Некорректный пароль',
        ERR_ACCOUNT_ALREADY_EXIST: 'Аккаунт с таким email уже существует',
        ERR_INVALID_PASSWORD: 'Пароль должен содержать от 8 символов',
        ERR_TOKEN_REQUIRED_ERROR:
          'Серверная ошибка токена. Мы автоматически регистрируем все ошибки и скоро все исправим',
        ERR_JWT_ERROR: 'Вы не авторизованы, войдите в учетную запись и повторите попытку',
        ERR_DATA_BASE_ERROR:
          'Серверная ошибка базы данный. Мы автоматически регистрируем все ошибки и скоро все исправим',
        INTERNAL_SERVER_ERROR: 'Серверная ошибка. Мы автоматически регистрируем все ошибки и скоро все исправим',
        ERR_INVALID_NICKNAME:
          'Псевдоним должен быть от 7 символов и может содержать только числа, буквы и символ нижнего подчеркивания',
      },
      screens: {
        auth: {
          title: 'Аутентификация',
          signIn: {
            title: 'Войти',
            submit: 'Войти',
          },
          signUp: {
            title: 'Зарегистрироваться',
            submit: 'Зарегистрироваться',
          },
        },
      },
      forms: {
        AuthForm: {
          email: {
            title: 'Email',
            placeholder: 'Укажите email',
          },
          password: {
            title: 'Пароль',
            placeholder: 'Укажите пароль',
          },
        },
        ChangePasswordForm: {
          password: {
            title: 'Пароль',
            placeholder: 'Укажите пароль',
          },
          newPassword: {
            title: 'Новый пароль',
            placeholder: 'Укажите новый пароль',
          },
          repeatPassword: {
            title: 'Повторите пароль',
            placeholder: 'Повторите пароль',
          },
        },
        EmailForm: {
          email: {
            title: 'Email',
            placeholder: 'Укажите email',
          },
        },
        ProfileForm: {
          name: {
            title: 'Псевдоним',
            placeholder: 'Придумайте себе псевдоним',
          },
        },
        RepeatPasswordForm: {
          password: {
            title: 'Пароль',
            placeholder: 'Укажите пароль',
          },
          repeatPassword: {
            title: 'Повторите пароль',
            placeholder: 'Повторите пароль',
          },
        },
      },
      components: {
        login: {
          enter: 'Вход',
          leave: 'Выход',
        },
        header: {
          nav: 'Навигация',
          root: 'Главная',
          secret: 'Секретный экран',
          'home-works': 'Домашние работы',
          examples: 'Примеры',
          teachers: 'Учителя',
        },
      },
    },
  },
};
