<template>
  <header class="header">
    <NuxtLink
      class="header__logo"
      to="/?slug="
    >
      PEWPEW BUY
    </NuxtLink>
    <button class="header__filter">
      Фильтры
    </button>
    <button
      class="header__sort"
      @click="showSort = !showSort"
    >
      Сортировка
    </button>
    <button
      class="category-btn"
      @click="showCategories = !showCategories"
    >
      <p class="category-btn__text">
        Категории
      </p>
      <span class="category-btn__burger" />
    </button>
  </header>

  <Transition name="slide">
    <CategoriesMobile
      v-show="showCategories"
      @close="showCategories = !showCategories"
    />
  </Transition>

  <Transition name="popup">
    <SortMobile
      v-show="showSort"
      @close="showSort = false"
    />
  </Transition>
</template>

<script>
import CategoriesMobile from './CategoriesMobile.vue';
import SortMobile from './SortMobile.vue';

export default {
  components: {
    CategoriesMobile,
    SortMobile,
  },
  data: () => ({
    showCategories: false,
    showSort: false,
  }),
};
</script>

<style lang="scss" scoped>
.slide-enter-active {
  animation: slide-in 0.5s;
}

.slide-leave-active {
  animation: slide-in 0.5s reverse;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.popup-enter-active {
  animation: popup-in 0.5s;
}

.popup-leave-active {
  animation: popup-in 0.5s reverse;
}

@keyframes popup-in {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  position: static;
  z-index: 999;
  padding: 1.5rem 30px 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;

  &__logo {
    @include defineFontSairaStencilOne(20px, 45px);
    text-decoration: none;
    text-align: center;
    padding-left: 40px;
    background: url('@/assets/img/header-logo.png') no-repeat center left / contain;
  }

  &__filter {
    @include defineFontMontserrat(600, 12px, 15px);
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
    padding-left: 25px;
    background: url('@/assets/img/fliter-mobile-logo.svg') no-repeat center left / contain;
  }

  &__sort {
    @include defineFontMontserrat(600, 12px, 15px);
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
    padding-left: 23px;
    background: url('@/assets/img/sort-mobile-logo.svg') no-repeat center left / contain;
  }
}

.category-btn {
  @include defineBtnPrimary(14px, 7px, 15px, 20px);

  &__text {
    @include defineFontMontserrat(500, 16px, 18px);
    margin-right: 35px;
    color: $white;
  }

  &__burger {
    position: relative;
    width: 22px;
    height: 3px;
    background-color: white;
    border-radius: 3px;

    &::before {
      content: '';
      position: absolute;
      top: -8px;
      left: -9px;
      width: 31px;
      height: 3px;
      background-color: white;
      border-radius: 3px;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: -9px;
      width: 31px;
      height: 3px;
      background-color: white;
      border-radius: 3px;
    }
  }
}
</style>
