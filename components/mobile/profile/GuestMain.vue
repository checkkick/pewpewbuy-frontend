<template>
  <div class="profile">
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
      @click.prevent="$emit('changePage', 'activePublications')"
    >{{ activeProductsLength }} активных объявлений</a>
    <a
      href="#"
      class="profile__link-btn substrate-mobile"
      @click.prevent="$emit('changePage', 'inactivePublications')"
    >{{ inactiveProductsLength }} проданных товаров</a>
    <a
      href="#"
      class="profile__link-btn substrate-mobile"
      @click.prevent="showContacts = true"
    >Социальные сети</a>
    <a
      href="#"
      class="profile__link-btn substrate-mobile"
      @click.prevent="$emit('changePage', 'reviews')"
    >Отзывы о продавце</a>
    <button
      class="profile__btn"
      @click="showContacts = true"
    >
      Написать продавцу
    </button>
    <a
      class="profile__review"
      href="#"
      @click.prevent="showWriteReviewModal = true"
    >
      Написать отзыв на продавца
    </a>

    <WriteReviewModal
      v-if="showWriteReviewModal"
      @close-review-window="showWriteReviewModal = false"
    />

    <ContactsModal
      v-if="showContacts"
      :email="user.email"
      :vk="user.vk"
      :tg="user.tg"
      @close-contacts-window="showContacts = false"
    />
  </div>
</template>

<script setup>
import RatingCalc from '@/components/profile/RatingCalc.vue';
import ContactsModal from '@/components/product/ContactsModal.vue';
import noPhoto from '@/assets/img/no-photo.png';
import WriteReviewModal from '@/components/profile/WriteReviewModal.vue';

defineEmits(['changePage']);

defineProps({
  user: {
    type: Object,
    default: () => { },
  },
  activeProductsLength: {
    type: Number,
    default: 0,
  },
  inactiveProductsLength: {
    type: Number,
    default: 0,
  },
});

const showWriteReviewModal = ref(false);
const showContacts = ref(false);

const noImage = ref(noPhoto);
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;

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
  }

  &__btn {
    @include defineBtnPrimary(12px, 68px, 15px, 25px);
    margin-top: 10px;
    align-self: center;
    margin-bottom: 30px;
  }

  &__review {
    @include defineFontMontserrat(600, 12px, 1.4);
    align-self: center;
    color: $primary;
  }
}
</style>
