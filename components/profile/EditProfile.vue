<template>
  <div class="profile__main__edit">
    <div class="close-background" @click="closeWindow"></div>
    <div class="profile__main__edit__window">
      <button
        class="profile__main__edit__window__close"
        @click="closeWindow"></button>

      <h3 class="profile__main__edit__window__title">
        Заполните информацию о себе
      </h3>

      <div
        class="profile__main__edit__window__photo"
        @click="$refs.image.click()">
        <img
          class="profile__main__edit__window__photo__image"
          :src="image"
          alt="no-photo" />
        <a
          href=""
          class="profile__main__edit__window__photo__link"
          @click.prevent
          >Изменить фотографию</a
        >
        <input
          ref="image"
          class="profile__main__edit__window__photo__input"
          type="file"
          @change="changeImage" />
      </div>

      <div class="profile__main__edit__window__field">
        <label class="profile__main__edit__window__field__label" for="name"
          >Имя</label
        >
        <input
          id="name"
          v-model="user.first_name"
          class="profile__main__edit__window__field__input"
          type="text"
          placeholder="Иван" />
      </div>

      <div class="profile__main__edit__window__field">
        <label class="profile__main__edit__window__field__label" for="lastName"
          >Фамилия</label
        >
        <input
          id="lastName"
          v-model="user.last_name"
          class="profile__main__edit__window__field__input"
          type="text"
          placeholder="Негрешный" />
      </div>

      <div class="profile__main__edit__window__field">
        <label class="profile__main__edit__window__field__label" for="nickname"
          >Игровой позывной</label
        >
        <input
          id="nickname"
          v-model="user.call_sign"
          class="profile__main__edit__window__field__input"
          type="text"
          placeholder="Сокол" />
      </div>

      <div class="profile__main__edit__window__field">
        <label class="profile__main__edit__window__field__label" for="location"
          >Местоположение</label
        >
        <input
          id="location"
          v-model="user.city"
          class="profile__main__edit__window__field__input"
          type="text"
          placeholder="г. Москва" />
      </div>

      <div class="profile__main__edit__window__field">
        <label class="profile__main__edit__window__field__label" for="telegram"
          >Ссылка на телеграмм</label
        >
        <input
          id="telegram"
          v-model="user.tg"
          class="profile__main__edit__window__field__input"
          type="text"
          placeholder="https://t.me/123456789" />
      </div>

      <div class="profile__main__edit__window__field">
        <label class="profile__main__edit__window__field__label" for="email"
          >Почта</label
        >
        <input
          id="email"
          v-model="user.email"
          class="profile__main__edit__window__field__input"
          type="email"
          placeholder="yourmail@gmail.com"
          disabled />
      </div>

      <div class="profile__main__edit__window__field">
        <label class="profile__main__edit__window__field__label" for="vk"
          >Ссылка на VK</label
        >
        <input
          id="vk"
          v-model="user.vk"
          class="profile__main__edit__window__field__input"
          type="text"
          placeholder="https://vk.com/id123456789" />
      </div>

      <p class="profile__main__edit__window__agree">
        Нажимая на кнопку вы соглашаетесь с
        <a
          href="#"
          class="profile__main__edit__window__agree__link"
          @click.prevent>
          политикой конфиденциальности
        </a>
      </p>

      <button
        class="profile__main__edit__window__save-btn"
        :disabled="saveDisable"
        @click="updateUserData">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import { notifications } from '@/store/notifications'
import noPhoto from '@/assets/img/no-photo.png'
import { clients } from '@/store/clients'

export default {
  emits: ['closeEditWindow'],
  setup() {
    const clientsStore = clients()
    const addNotifications = notifications().ADD_NOTIFICATION

    return {
      clientsStore,
      noImage: noPhoto,
      addNotifications,
    }
  },
  data: () => {
    return {
      saveDisable: true,
      image: '',
      user: {},
    }
  },
  watch: {
    user: {
      handler() {
        for (const key in this.user) {
          if (this.user[key] !== this.clientsStore.USER_STATE[key]) {
            this.saveDisable = false
            return
          } else {
            this.saveDisable = true
          }
        }
      },
      deep: true,
    },
  },
  mounted() {
    for (const key in this.clientsStore.USER_STATE) {
      this.user[key] = this.clientsStore.USER_STATE[key]
    }

    if (this.user.avatar) {
      this.image = this.user.avatar
    } else {
      this.image = noPhoto
    }

    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  },
  methods: {
    async updateUserData() {
      const data = new FormData()

      for (const key in this.user) {
        if (this.user[key] !== this.clientsStore.USER_STATE[key]) {
          data.append(key, this.user[key])
        }
      }

      if (
        await this.clientsStore.UPDATE_USER(
          this.clientsStore.USER_STATE.id,
          data
        )
      ) {
        this.closeWindow()
      }
    },
    changeImage(e) {
      const file = e.target.files[0]
      this.user.avatar = file
      const reader = new FileReader()
      const that = this
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        that.image = e.target.result
      }
    },
    closeWindow() {
      document.getElementsByTagName('body')[0].style.overflow = null
      this.$emit('closeEditWindow')
    },
  },
}
</script>

<style lang="scss" scoped>
.close-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.profile__main__edit {
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $modal-dark-background;

  &__window {
    max-height: 90vh;
    overflow: auto;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    padding: 67px 82px;
    background: $modal-background;
    border-radius: 21px;

    &__close {
      cursor: pointer;
      position: absolute;
      outline: none;
      border: none;
      background: transparent;
      top: 35px;
      right: 35px;
      width: 20px;
      height: 20px;

      &::before {
        content: '';
        position: absolute;
        top: 40%;
        left: 0;
        width: 20px;
        height: 2px;
        background-color: $black;
        transform: rotate(45deg);
      }
      &::after {
        content: '';
        position: absolute;
        top: 40%;
        left: 0;
        width: 20px;
        height: 2px;
        background-color: $black;
        transform: rotate(-45deg);
      }
    }

    &__title {
      @include defineFontMontserrat(700, 24px, 29px);
      color: $primary;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    &__photo {
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 15px;

      &__image {
        width: 106px;
        height: 106px;
        border-radius: 50%;
      }

      &__link {
        @include defineFontMontserrat(500, 18px, 22px);
        text-decoration: none;
        border-bottom: 1px solid $black;
        color: $black;
      }

      &__input {
        position: absolute;
        top: -100%;
        visibility: hidden;
      }
    }

    &__field {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 6px;
      width: 100%;

      &__label {
        @include defineFontMontserrat(500, 18px, 22px);
        color: $black;
      }

      &__input {
        @include defineFontMontserrat(400, 18px, 22px);
        width: 100%;
        outline: none;
        border: none;
        background: $input-background;
        border-radius: 8px;
        padding: 18px 15px;
        color: $input-login-color;

        &::placeholder {
          color: rgba(0, 0, 0, 0.2);
        }

        &:disabled {
          cursor: not-allowed;
        }
      }
    }

    &__agree {
      max-width: 390px;
      @include defineFontMontserrat(400, 20px, 23px);
      margin: 0;
      color: $black;
      text-align: center;
      margin-bottom: 10px;

      &__link {
        color: $black;
        text-decoration: none;
        border-bottom: 1px solid $black;
      }
    }

    &__save-btn {
      cursor: pointer;
      @include defineBtnPrimary(20px, 91px, 18px, 43px);

      &:disabled {
        background-color: $input-background;
      }
    }
  }
}
</style>
