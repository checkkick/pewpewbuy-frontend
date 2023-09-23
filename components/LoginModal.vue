<template>
  <div
    class="modal-background"
    @click="closeWindow"
  >
    <div
      class="modal-window"
      @click.stop
    >
      <span
        class="modal-window__close"
        @click="closeWindow"
      />
      <h2
        v-if="!tablet"
        class="modal-window__title"
      >
        Войти в личный кабинет
      </h2>
      <h2
        v-else
        class="modal-window__title"
      >
        Войдите в ЛК
      </h2>

      <label
        class="modal-window__label"
        for="email-login"
      >Email</label>
      <input
        id="email-login"
        v-model="email"
        :disabled="sended"
        class="modal-window__input"
        type="email"
        name="email"
        :placeholder="tablet ? 'Email' : 'yourmail@gmail.com'"
        @keypress.enter="send_code()"
      >

      <div
        v-if="sended"
        class="password-title"
      >
        <label
          class="password-title__label"
          for="password-login"
        >
          Код-пароль
        </label>
        <button
          class="password-title__show"
          @click="showPwd = !showPwd"
        >
          {{ !mobile ? (showPwd ? 'Скрыть' : 'Показать') : '' }}
        </button>
      </div>

      <input
        v-if="sended"
        id="password-login"
        v-model="password"
        class="modal-window__input"
        name="password"
        :type="showPwd ? 'text' : 'password'"
        :placeholder="tablet ? 'Код-пароль' : '****'"
        @keypress.enter="login()"
      >

      <p
        v-if="sendError !== ''"
        class="modal-window__text modal-window__text--error"
      >
        {{ sendError }}
      </p>

      <button
        v-if="!sended"
        class="modal-window__enter-btn"
        @click="send_code()"
      >
        Отправить код
      </button>

      <button
        v-if="sended"
        class="modal-window__enter-btn"
        @click="login()"
      >
        Войти
      </button>

      <p class="modal-window__text">
        Еще нет личного кабинета?
        <a
          href="?login"
          class="modal-window__text modal-window__text--link"
          @click.prevent="$emit('openRegisterWindow')"
        >
          Зарегистрируйтесь
        </a>
      </p>
    </div>

    <BackButtonMobile
      v-if="tablet"
      @click="$emit('closeLoginWindow')"
    />
  </div>
</template>

<script>
import { auth } from '@/store/auth';
import { clients } from '@/store/clients';
import { media } from '@/store/media';
import BackButtonMobile from './mobile/BackButtonMobile.vue';

export default {
  components: { BackButtonMobile },

  emits: ['closeLoginWindow', 'openRegisterWindow'],

  setup() {
    const store = auth();
    const clientsStore = clients();
    const { tablet, mobile } = media();

    return {
      store,
      clientsStore,
      tablet,
      mobile,
    };
  },
  data: () => ({
    showPwd: false,
    sended: false,
    email: '',
    password: '',
    sendError: '',
  }),

  mounted() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    this.$router.replace('/?login');
  },

  unmounted() {
    document.getElementsByTagName('body')[0].style.overflow = 'visible';
  },

  methods: {
    closeWindow() {
      document.getElementsByTagName('body')[0].style.overflow = 'visible';
      this.$router.replace('/');
      this.$emit('closeLoginWindow');
    },

    async send_code() {
      const response = await this.store.SEND_CODE(this.email);
      if (response.email === this.email) {
        this.sendError = '';
        this.sended = true;
      } else if (response === 404) {
        this.sendError = 'Пользователь с такой почтой не найден';
      } else if (response === 400) {
        this.sendError = 'Произошла ошибка. Попробуйте еще раз';
      }
    },

    async login() {
      const response = await this.store.GET_TOKEN(this.email, this.password);
      if (response.access) {
        this.sendError = '';
        await this.clientsStore.GET_SELF();
        this.closeWindow();
        this.$router.push('/profile');
      } else if (response === 401) {
        this.sendError = 'Неверный код';
      } else if (response === 400) {
        this.sendError = 'Произошла ошибка. Попробуйте еще раз';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-background {
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $modal-dark-background;

  @media (max-width: 1150px) {
    z-index: 90;
    top: 4rem;
    background: transparent;
  }
}

.modal-window {
  position: relative;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $modal-background;
  border-radius: 38px;
  padding: 50px 60px;
  margin: 100px;

  @media (max-width: 1150px) {
    background: $white;
    border-radius: 0;
    justify-content: center;
    max-width: none;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  @media (max-width: 750px) {
    padding: 50px 20px;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 41px;
    right: 41px;

    @media (max-width: 1150px) {
      display: none;
    }

    &::before {
      content: '';
      position: absolute;
      top: 10px;
      width: 21px;
      height: 2px;
      background-color: $black;
      transform: rotate(45deg);
    }

    &::after {
      content: '';
      position: absolute;
      top: 10px;
      width: 21px;
      height: 2px;
      background-color: $black;
      transform: rotate(-45deg);
    }
  }

  &__enter-btn {
    cursor: pointer;
    @include defineBtnPrimary(15px, 9px, 17px, 66px);
    margin-bottom: 1rem;

    @media (max-width: 1150px) {
      font-size: 18px;
      margin-bottom: 7rem;
      padding: 15px 48px;
    }

    @media (max-width: 750px) {
      margin-top: 10px;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 7rem;
      padding: 12px 40px;
    }
  }

  &__input {
    @include defineFontMontserrat(400, 15px, 17px);
    outline: none;
    border: none;
    background: $input-background;
    border-radius: 9px;
    padding: 16px 18px;
    align-self: stretch;
    margin-bottom: 1rem;
    color: $input-login-color;

    @media (max-width: 1150px) {
      align-self: center;
      width: 470px;
      font-size: 20px;
      line-height: 23px;
    }

    @media (max-width: 750px) {
      width: 100%;
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 0.5rem;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }

    &:disabled {
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  &__title {
    @include defineFontMontserrat(600, 22px, 27px);
    margin: 0;
    color: $black;
    margin-bottom: 2rem;

    @media (max-width: 1150px) {
      font-size: 24px;
      line-height: 1.4;
      margin-bottom: 20px;
      color: $primary;
    }

    @media (max-width: 750px) {
      font-size: 16px;
      margin-bottom: 15px;
    }
  }

  &__label {
    @include defineFontMontserrat(400, 15px, 17px);
    align-self: flex-start;
    margin-bottom: 3px;

    @media (max-width: 1150px) {
      display: none;
    }
  }

  &__link {
    @include defineFontMontserrat(400, 12px, 15px);
    color: $black;
    text-decoration: none;
    border-bottom: 1px solid $black;
    margin-bottom: 45px;
  }

  &__text {
    @include defineFontMontserrat(400, 15px, 20px);
    margin: 0;
    text-align: center;
    color: $black;

    @media (max-width: 1150px) {
      font-size: 18px;
    }

    @media (max-width: 750px) {
      font-size: 12px;
      line-height: 14px;
    }

    &.modal-window__text--error {
      color: red;
      margin-bottom: 20px;

      @media (max-width: 750px) {
        margin-bottom: 1rem;
      }
    }

    &.modal-window__text--link {
      color: $black;
      text-decoration: none;
      border-bottom: 1px solid $black;
    }
  }
}

.password-title {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;

  @media (max-width: 1150px) {
    margin-bottom: 0.5rem;
    width: 450px;
    justify-content: flex-end;
  }

  @media (max-width: 750px) {
    width: 100%;
  }

  &__label {
    @include defineFontMontserrat(400, 15px, 17px);

    @media (max-width: 1150px) {
      display: none;
    }
  }

  &__show {
    @include defineFontMontserrat(400, 12px, 15px);
    cursor: pointer;
    border: none;
    outline: none;
    padding: 0 0 0 20px;
    background-color: transparent;
    background: url('@/assets/img/password-eye.svg') no-repeat center left;

    @media (max-width: 750px) {
      top: 20px;
      right: 15px;
      height: 25px;
      color: transparent;
      position: absolute;
      background: url('@/assets/img/password-eye-mobile.svg') no-repeat center left
    }
  }
}
</style>
