<template>
  <div class="modal-background">
    <div class="modal-window">
      <span class="modal-window__close" @click="closeWindow"></span>
      <h2 class="modal-window__title">Войти в личный кабинет</h2>

      <label class="modal-window__label" for="email-login">Email</label>
      <input
        id="email-login"
        class="modal-window__input"
        type="email"
        name="email"
        placeholder="yourmail@gmail.com"
      />

      <div class="modal-window__password-title">
        <label class="modal-window__password-title__label" for="password-login">
          Код-пароль
        </label>
        <button class="modal-window__password-title__show">Показать</button>
      </div>
      <input
        id="password-login"
        class="modal-window__input"
        name="password"
        type="password"
        placeholder="****"
      />

      <button class="modal-window__enter-btn">Войти</button>
      <a href="#" class="modal-window__link" @click.prevent>Забыли пароль?</a>
      <p class="modal-window__text">
        Еще нет личного кабинета?
        <a
          href="#"
          class="modal-window__text__link"
          @click.prevent="$emit('openRegisterWindow')"
        >
          Зарегистрируйтесь
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['closeLoginWindow', 'openRegisterWindow'],
  data: () => {},
  mounted() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  },
  methods: {
    closeWindow() {
      document.getElementsByTagName('body')[0].style.overflow = null
      this.$emit('closeLoginWindow')
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-background {
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(31, 31, 31, 0.87);
}

.modal-window {
  position: relative;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $modal-background;
  border-radius: 38px;
  padding: 75px;

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
    @include defineFontMontserrat(600, 20px, 24px);
    outline: none;
    border: none;
    background: #4b8ff5;
    border-radius: 12px;
    display: flex;
    align-items: center;
    color: #ffffff;
    padding: 23px 88px;
    margin-bottom: 10px;
  }

  &__input {
    @include defineFontMontserrat(600, 20px, 23px);
    outline: none;
    border: none;
    background: #eaeaea;
    border-radius: 12px;
    padding: 22px 24px;
    align-self: stretch;
    margin-bottom: 20px;

    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
  }

  &__password-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3px;

    &__label {
      @include defineFontMontserrat(400, 20px, 23px);
    }

    &__show {
      @include defineFontMontserrat(400, 17px, 20px);
      cursor: pointer;
      border: none;
      outline: none;
      padding: 0 0 0 20px;
      background-color: transparent;
      background: url('@/assets/img/password-eye.svg') no-repeat center left;
    }
  }

  &__title {
    @include defineFontMontserrat(600, 30px, 37px);
    margin: 0;
    color: $black;
    margin-bottom: 38px;
  }

  &__label {
    @include defineFontMontserrat(400, 20px, 23px);
    align-self: flex-start;
    margin-bottom: 3px;
  }

  &__link {
    @include defineFontMontserrat(400, 18px, 21px);
    color: $black;
    text-decoration: none;
    border-bottom: 1px solid $black;
    margin-bottom: 45px;
  }

  &__text {
    @include defineFontMontserrat(400, 20px, 23px);
    margin: 0;
    color: $black;

    &__link {
      color: $black;
      text-decoration: none;
      border-bottom: 1px solid $black;
    }
  }
}
</style>