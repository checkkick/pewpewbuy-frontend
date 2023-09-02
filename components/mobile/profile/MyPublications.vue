<template>
  <div class="publications">
    <a
      href="#"
      class="publications__link-btn substrate-mobile"
      @click.prevent="$emit('changePage', 'activePublications')"
    >
      <span class="publications__logo publications__logo--active" />
      <p class="publications__text">Активные объявления ({{ activePublicationsLength }}/{{ activePublicationsLength +
        inactivePublicationsLength }})</p>
    </a>
    <a
      href="#"
      class="publications__link-btn substrate-mobile"
      @click.prevent="$emit('changePage', 'inactivePublications')"
    >
      <span class="publications__logo publications__logo--inactive" />
      <p class="publications__text">Неактивные объявления ({{ inactivePublicationsLength }}/{{ activePublicationsLength
        + inactivePublicationsLength }})</p>
    </a>
    <a
      href="#"
      class="publications__link-btn substrate-mobile"
      @click.prevent="$emit('changePage', 'favoritePublications')"
    >
      <span class="publications__logo publications__logo--favorite" />
      <p class="publications__text">Избранное ({{ favoritePublicationsLength }})</p>
    </a>
    <a
      href="#"
      class="publications__link-btn substrate-mobile"
      @click.prevent="$emit('changePage', 'historyPublications')"
    >
      <span class="publications__logo publications__logo--history" />
      <p class="publications__text">История просмотра</p>
    </a>

    <BackButtonMobile @click="$emit('changePage', 'main')" />
  </div>
</template>

<script setup>
import { clients } from '@/store/clients';
import BackButtonMobile from '../BackButtonMobile.vue';

defineEmits(['changePage']);

const activePublicationsLength = computed(() => clients().ACTIVE_USER_PRODUCTS.length);
const inactivePublicationsLength = computed(() => clients().INACTIVE_USER_PRODUCTS.length);
const favoritePublicationsLength = computed(() => clients().USER_STATE.favorite_products.length);
</script>

<style lang="scss" scoped>
.publications {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;

  &__link-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    background: url('@/assets/img/arrow-right.svg') no-repeat calc(100% - 16px) center, $modal-mobile-background;
  }

  &__text {
    @include defineFontMontserrat(600, 13px, 16px);
    color: $black;
  }

  &__logo {
    display: block;
    width: 25px;
    height: 25px;
    margin-right: 0.5rem;
    border-radius: 50%;

    @media (max-width: 1150px) {
      margin-right: 0;
      width: 20px;
      height: 20px;
    }

    &--active {
      background-color: $success;
    }

    &--inactive {
      background-color: $alert;
    }

    &--favorite {
      background: url('@/assets/img/profile-favorite.svg') no-repeat center center / 20px 20px;
    }

    &--history {
      background: url('@/assets/img/profile-history.svg') no-repeat center center / 20px 20px;
    }
  }
}
</style>
