<template>
  <div class="profile">
    <!-- Главная страница профиля -->
    <a
      class="profile__edit-btn"
      href="#"
      @click.prevent="editProfile = true"
    >Редактировать</a>
    <h3 class="profile__username">
      {{ user.first_name ? user.first_name : "Имя пользователя" }}
      {{ user.last_name }}
    </h3>
    <div class="profile__about substrate-mobile">
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
          {{ user.call_sign }}
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
      class="profile__link-btn substrate-mobile"
      @click.prevent="$emit('changePage', 'publications')"
    >Мои объявления</a>
    <a
      href="#"
      class="profile__link-btn substrate-mobile"
      @click.prevent="$emit('changePage', 'favoritePublications')"
    >Избранное</a>
    <a
      href="#"
      class="profile__link-btn substrate-mobile"
      @click.prevent="$emit('changePage', 'reviews')"
    >Отзывы</a>
    <a
      href="#"
      class="profile__link-btn substrate-mobile"
      @click.prevent="showContacts = true"
    >Мои социальные сети</a>
    <a
      href="#"
      class="profile__exit"
      @click.prevent="exitProfile()"
    >Выйти</a>

    <ContactsModal
      v-if="showContacts"
      :email="user.email"
      :vk="user.vk"
      :tg="user.tg"
      @close-contacts-window="showContacts = false"
    />

    <EditProfile
      v-if="editProfile"
      @close-edit-window="editProfile = false"
    />
  </div>
</template>

<script>
import RatingCalc from '@/components/profile/RatingCalc.vue';
import ContactsModal from '~~/components/product/ContactsModal.vue';
import EditProfile from '@/components/profile/EditProfile.vue';

import { clients } from '@/store/clients';
import { removeCookies } from '@/store/cookies';

import noPhoto from '@/assets/img/no-photo.png';

export default {
  components: {
    RatingCalc,
    ContactsModal,
    EditProfile,
  },
  emits: ['changePage'],
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
      showContacts: false,
    };
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
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;

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
    margin-bottom: 7px;
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

    &:last-child {
      padding-top: 16px;
    }
  }

  &__exit {
    @include defineFontMontserrat(600, 13px, 16px);
    color: $black;
    text-align: center;
  }
}

.substrate-mobile:nth-last-child(2) {
  margin-bottom: 2rem;
}
</style>
