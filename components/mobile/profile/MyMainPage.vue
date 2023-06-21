<template>
  <div class="profile">
    <!-- Главная страница профиля -->
    <a
      class="profile__edit-btn"
      href="#"
    >Редактировать</a>
    <h3 class="profile__username">
      {{ user.first_name ? user.first_name : "Имя пользователя" }}
      {{ user.last_name }}
    </h3>
    <div class="profile__about substrate">
      <div class="profile__row">
        <img
          class="profile__img"
          :src="user.avatar ? user.avatar : noImage"
          alt="profile picture"
        >
      </div>
      <div class="profile__row">
        <p class="profile__title">
          Рейтинг
        </p>
        <RatingCalc :stars="user.rep ? Math.floor(user.rep) : 0" />
        <p class="profile__title">
          Игровой позывной
        </p>
        <p
          v-if="user.call_sign"
          class="profile__text"
        >
          {{ user.call_sign ? user.call_sign : "не заполнено" }}
        </p>
        <p
          v-else
          class="profile__text profile__text--inactive"
        >
          не заполнено
        </p>
        <p class="profile__title">
          Местоположение
        </p>
        <p
          v-if="user.city"
          class="profile__text"
        >
          {{ user.city }}
        </p>
        <p
          v-else
          class="profile__text profile__text--inactive"
        >
          не заполнено
        </p>
      </div>
    </div>
    <a
      href="#"
      class="profile__link-btn substrate"
    >Мои объявления</a>
    <a
      href="#"
      class="profile__link-btn substrate"
    >Избранное</a>
    <div class="substrate substrate__block">
      <a
        href="#"
        class="profile__link-btn substrate__block--bottom-border"
      >Мои отзывы</a>
      <a
        href="#"
        class="profile__link-btn"
      >Отзывы обо мне</a>
    </div>
    <a
      href="#"
      class="profile__link-btn substrate"
    >Мои социальные сети</a>
    <a
      href="#"
      class="profile__exit"
      @click="exitProfile()"
    >Выйти</a>
  </div>
</template>

<script>
// import EditProfile from '@/components/profile/EditProfile.vue';
import RatingCalc from '@/components/profile/RatingCalc.vue';
// import AddProductModal from '@/components/profile/AddProductModal.vue';

import { clients } from '@/store/clients';
import { removeCookies } from '@/store/cookies';

import noPhoto from '@/assets/img/no-photo.png';

export default {
  components: {
    RatingCalc,
    // EditProfile,
    // AddProductModal,
  },
  setup() {
    const clientsStore = clients();

    return {
      clientsStore,
      user: computed(() => clientsStore.USER_STATE),
      noImage: noPhoto,
    };
  },
  data() {
    return {
      editProfile: false,
      showAddProductModal: false,
    };
  },
  watch: {
    '$route.query': {
      handler() {
        if (Object.hasOwn(this.$route.query, 'favorites')) {
          document.getElementById('favorites').scrollIntoView();
        }

        if (Object.hasOwn(this.$route.query, 'addproduct')) {
          this.showAddProductModal = true;
        } else {
          this.showAddProductModal = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    exitProfile() {
      removeCookies();
      this.$router.push('/');
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &__edit-btn {
    position: absolute;
    right: 15px;
    top: 0;
    @include defineFontMontserrat(600, 13px, 1.4);
    color: $primary;
  }

  &__username {
    @include defineFontMontserrat(600, 15px, 1.4);
    color: $black;
    margin-bottom: 15px;
  }

  &__about {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    flex-wrap: wrap;
    align-items: stretch;
    gap: 1rem 0.5rem;

    &:last-child {
      width: 100%;
    }
  }

  &__img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }

  &__line {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__title {
    @include defineFontMontserrat(600, 12px, 15px);
    text-align: right;
    letter-spacing: -0.01em;
  }

  &__text {
    @include defineFontMontserrat(400, 12px, 15px);

    &.profile__text--inactive {
      color: $black-inactive;
    }
  }

  &__link-btn {
    @include defineFontMontserrat(600, 13px, 16px);
    text-decoration: none;
    color: $black;

  }

  &__exit {
    @include defineFontMontserrat(600, 13px, 16px);
    color: $black;
    text-align: center;
  }
}

.substrate {
  padding: 17px 15px;
  background-color: #F2F7FF;
  border: 1px solid #D8E7FF;
  border-radius: 12px;
  margin-bottom: 8px;

  &:nth-last-child(2) {
    margin-bottom: 2rem;
  }

  &__block {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &--bottom-border {
      padding-bottom: 16px;
      border-bottom: 1px solid #C0D1EB;
    }
  }
}
</style>
