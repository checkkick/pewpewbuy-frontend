<template>
  <div class="modal-background">
    <div class="modal-window">
      <span
        class="modal-window__close"
        @click="closeWindow"
      />
      <h2 class="modal-window__title">
        Зарегистрироваться
      </h2>

      <label
        class="modal-window__label"
        for="email-register"
      >Email</label>
      <input
        id="email-login"
        v-model="mail"
        class="modal-window__input"
        type="email"
        name="email"
        :disabled="sended"
        placeholder="yourmail@gmail.com"
        @keypress.enter="check_mail()"
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
          {{ showPwd ? 'Скрыть' : 'Показать' }}
        </button>
      </div>

      <input
        v-if="sended"
        id="password-login"
        v-model="code"
        class="modal-window__input"
        name="password"
        :type="showPwd ? 'text' : 'password'"
        placeholder="****"
        @keypress.enter="confirm_mail()"
      >

      <p
        v-if="send_error !== ''"
        style="color: red"
      >
        {{ send_error }}
      </p>

      <p class="modal-window__text modal-window__text--margin">
        Нажимая на кнопку вы соглашаетесь с
        <a
          href="#"
          class="modal-window__text modal-window__text--link"
          @click.prevent
        >
          политикой конфиденциальности
        </a>
      </p>

      <button
        v-if="sended"
        class="modal-window__enter-btn"
        @click="confirm_mail()"
      >
        Подтвердить
      </button>

      <button
        v-if="!sended"
        class="modal-window__enter-btn"
        @click="check_mail()"
      >
        Зарегистрироваться
      </button>

      <p class="modal-window__text">
        Уже есть личный кабинет?
        <a
          href="#"
          class="modal-window__text modal-window__text--link"
          @click.prevent="$emit('openLoginWindow')"
        >
          Войти
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { auth } from '@/store/auth';
import { clients } from '@/store/clients';

export default {
  emits: ['closeRegisterWindow', 'openLoginWindow'],
  setup() {
    const store = auth();
    const clientsStore = clients();
    return {
      store,
      clientsStore,
    };
  },
  data: () => ({
    showPwd: false,
    mail: '',
    code: '',
    send_error: '',
    sended: false,
  }),
  mounted() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  },
  methods: {
    closeWindow() {
      document.getElementsByTagName('body')[0].style.overflow = null;
      this.$emit('closeRegisterWindow');
    },
    async check_mail() {
      const response = await this.store.CHECK_MAIL(this.mail);
      if (response.message === 'Message sended') {
        this.send_error = '';
        this.sended = true;
      } else if (response.message === 'Existed') {
        this.send_error = 'Пользователь с такой почтой уже существует';
      } else if (response === 400) {
        this.send_error = 'Произошла ошибка. Попробуйте еще раз';
      }
    },

    async confirm_mail() {
      const response = await this.store.CONFIRM_MAIL(this.mail, this.code);
      if (response.message === 'Mail confirmed') {
        this.send_error = '';
        this.sended = true;
        await this.store.GET_TOKEN(this.mail, this.code);
        await this.clientsStore.GET_SELF();
        this.closeWindow();
        this.$router.push('/profile');
        this.sended = true;
      } else if (response.message === 'Mail not exist') {
        this.send_error = 'Неверный код';
      } else if (response === 400) {
        this.send_error = 'Произошла ошибка. Попробуйте еще раз';
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
}

.modal-window {
  margin: 100px;
  position: relative;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $modal-background;
  border-radius: 38px;
  padding: 50px 60px;

  &__close {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 41px;
    right: 41px;

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
  }

  &__label {
    @include defineFontMontserrat(400, 15px, 17px);
    align-self: flex-start;
    margin-bottom: 3px;
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
    color: $black;
    text-align: center;

    &.modal-window__text--margin {
      margin-bottom: 20px;
    }

    &.modal-window__text--link {
      color: $black;
      text-decoration: none;
      border-bottom: 1px solid $black;
    }
  }
}

.password-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;

  &__label {
    @include defineFontMontserrat(400, 15px, 17px);
  }

  &__show {
    @include defineFontMontserrat(400, 12px, 15px);
    cursor: pointer;
    border: none;
    outline: none;
    padding: 0 0 0 20px;
    background-color: transparent;
    background: url('@/assets/img/password-eye.svg') no-repeat center left;
  }
}
</style>
