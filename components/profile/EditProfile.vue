<template>
  <div class="profile-edit">
    <div
      class="close-background"
      @click="closeWindow"
    />
    <div class="profile-edit__window">
      <button
        class="profile-edit__window__close"
        @click="closeWindow"
      />

      <h3 class="profile-edit__window__title">
        Заполните информацию о себе
      </h3>

      <div
        class="profile-edit__window__photo"
        @click="$refs.image.click()"
      >
        <img
          class="profile-edit__window__photo__image"
          :src="image"
          alt="no-photo"
        >
        <a
          href=""
          class="profile-edit__window__photo__link"
          @click.prevent
        >Изменить фотографию</a>
        <input
          ref="image"
          class="profile-edit__window__photo__input"
          type="file"
          @change="changeImage"
        >
      </div>

      <div class="profile-edit__window__field">
        <label
          class="profile-edit__window__field__label"
          for="name"
        >Имя</label>
        <input
          id="name"
          v-model="user.first_name"
          class="profile-edit__window__field__input"
          type="text"
          placeholder="Иван"
        >
      </div>

      <div class="profile-edit__window__field">
        <label
          class="profile-edit__window__field__label"
          for="lastName"
        >Фамилия</label>
        <input
          id="lastName"
          v-model="user.last_name"
          class="profile-edit__window__field__input"
          type="text"
          placeholder="Негрешный"
        >
      </div>

      <div class="profile-edit__window__field">
        <label
          class="profile-edit__window__field__label"
          for="nickname"
        >Игровой позывной</label>
        <input
          id="nickname"
          v-model="user.call_sign"
          class="profile-edit__window__field__input"
          type="text"
          placeholder="Сокол"
        >
      </div>

      <div class="profile-edit__window__field">
        <label
          class="profile-edit__window__field__label"
          for="location"
        >Местоположение</label>
        <input
          id="location"
          v-model="user.city"
          class="profile-edit__window__field__input"
          type="text"
          placeholder="г. Москва"
        >
      </div>

      <div class="profile-edit__window__field">
        <label
          class="profile-edit__window__field__label"
          for="telegram"
        >Ссылка на телеграмм</label>
        <input
          id="telegram"
          v-model="user.tg"
          class="profile-edit__window__field__input"
          type="text"
          placeholder="https://t.me/123456789"
        >
      </div>

      <div class="profile-edit__window__field">
        <label
          class="profile-edit__window__field__label"
          for="email"
        >Почта</label>
        <input
          id="email"
          v-model="user.email"
          class="profile-edit__window__field__input"
          type="email"
          placeholder="yourmail@gmail.com"
          disabled
        >
      </div>

      <div class="profile-edit__window__field">
        <label
          class="profile-edit__window__field__label"
          for="vk"
        >Ссылка на VK</label>
        <input
          id="vk"
          v-model="user.vk"
          class="profile-edit__window__field__input"
          type="text"
          placeholder="https://vk.com/id123456789"
        >
      </div>

      <p class="profile-edit__window__agree">
        Нажимая на кнопку вы соглашаетесь с
        <a
          href="#"
          class="profile-edit__window__agree__link"
          @click.prevent
        >
          политикой конфиденциальности
        </a>
      </p>

      <button
        class="profile-edit__window__save-btn"
        @click="updateUserData"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import { notifications } from '@/store/notifications';
import noPhoto from '@/assets/img/no-photo.png';
import { clients } from '@/store/clients';

export default {
  emits: ['closeEditWindow'],
  setup() {
    const clientsStore = clients();
    const addNotifications = notifications().ADD_NOTIFICATION;

    return {
      clientsStore,
      noImage: noPhoto,
      addNotifications,
    };
  },
  data: () => ({
    image: '',
    user: {},
  }),
  mounted() {
    Object.keys(this.clientsStore.USER_STATE).forEach((key) => {
      this.user[key] = this.clientsStore.USER_STATE[key];
    });

    if (this.user.avatar) {
      this.image = this.user.avatar;
    } else {
      this.image = noPhoto;
    }

    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  },
  methods: {
    async updateUserData() {
      const data = new FormData();

      Object.keys(this.user).forEach((key) => {
        if (this.user[key] !== this.clientsStore.USER_STATE[key]) {
          data.append(key, this.user[key]);
        }
      });

      if (
        await this.clientsStore.UPDATE_USER(
          this.clientsStore.USER_STATE.id,
          data,
        )
      ) {
        this.closeWindow();
      }
    },
    changeImage(e) {
      const file = e.target.files[0];
      this.user.avatar = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (t) => {
        this.image = t.target.result;
      };
    },
    closeWindow() {
      document.getElementsByTagName('body')[0].style.overflow = null;
      this.$emit('closeEditWindow');
    },
  },
};
</script>

<style lang="scss" scoped>
.close-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.profile-edit {
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
    -ms-overflow-style: none;
    scrollbar-width: none;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    padding: 40px 50px;
    background: $modal-background;
    border-radius: 15px;

    &::-webkit-scrollbar {
      display: none;
    }

    &__close {
      cursor: pointer;
      position: absolute;
      outline: none;
      border: none;
      background: transparent;
      top: 20px;
      right: 20px;
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
      @include defineFontMontserrat(700, 18px, 22px);
      color: $primary;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    &__photo {
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 0.5rem;

      &__image {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }

      &__link {
        @include defineFontMontserrat(500, 14px, 16px);
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
      gap: 0.3rem;
      width: 100%;

      &__label {
        @include defineFontMontserrat(500, 14px, 16px);
        color: $black;
      }

      &__input {
        @include defineFontMontserrat(400, 14px, 16px);
        width: 100%;
        outline: none;
        border: none;
        background: $input-background;
        border-radius: 8px;
        padding: 13px 12px;
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
      max-width: 290px;
      @include defineFontMontserrat(400, 12px, 13px);
      margin: 0;
      color: $black;
      text-align: center;
      margin-bottom: 0.5rem;

      &__link {
        color: $black;
        text-decoration: none;
        border-bottom: 1px solid $black;
      }
    }

    &__save-btn {
      cursor: pointer;
      @include defineBtnPrimary(15px, 68px, 13px, 33px);

      &:disabled {
        background-color: $input-background;
      }
    }
  }
}
</style>
