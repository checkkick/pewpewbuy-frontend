<template>
  <header class="header">
    <NuxtLink
      class="header__logo"
      to="/?slug="
      @click="$emit('closeCategories')"
    >
      PEWPEW BUY
    </NuxtLink>
    <button
      v-if="$route.path === '/' && Object.keys($route.query).length === 0"
      class="header__filter"
      @click="showFilter = !showFilter, showSort = false"
    >
      Фильтры
    </button>
    <button
      v-if="$route.path === '/' && Object.keys($route.query).length === 0"
      class="header__sort"
      @click="showSort = !showSort, showFilter = false"
    >
      Сортировка
    </button>
    <button
      class="category-btn"
      @click="$emit('closeOrOpenCategories'), showSort = false, showFilter = false"
    >
      <p class="category-btn__text">
        Меню
      </p>
      <span class="category-btn__burger" />
    </button>
  </header>

  <Transition name="popup">
    <SortMobile
      v-show="showSort"
      @close="showSort = false"
    />
  </Transition>

  <Transition name="popup">
    <FilterMobile
      v-show="showFilter"
      @close="showFilter = false"
    />
  </Transition>
</template>

<script>

import FilterMobile from './FilterMobile.vue';
import SortMobile from './SortMobile.vue';

export default {
  components: {
    SortMobile,
    FilterMobile,
  },
  emits: ['closeCategories', 'closeOrOpenCategories'],
  data: () => ({
    showSort: false,
    showFilter: false,
  }),
};
</script>

<style lang="scss" scoped>
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
  z-index: 999;
  padding: 1.5rem 30px 1rem 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: sticky;
  background-color: $white;
  top: 0;
  left: 0;
  right: 0;

  @media (max-width: 750px) {
    padding: 1rem 15px;
    display: grid;
    row-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    justify-items: start;
  }

  &__logo {
    @include defineFontSairaStencilOne(20px, 45px);
    text-decoration: none;
    text-align: center;
    padding-left: 40px;
    background: url('@/assets/img/header-logo.png') no-repeat center left / contain;

    @media (max-width: 750px) {
      font-size: 16px;
      line-height: 25px;
      padding-left: 25px;
    }
  }

  &__filter {
    @include defineFontMontserrat(600, 12px, 15px);
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
    padding-left: 25px;
    background: url('@/assets/img/fliter-mobile-logo.svg') no-repeat center left / contain;

    @media (max-width: 750px) {
      order: 3;
    }
  }

  &__sort {
    @include defineFontMontserrat(600, 12px, 15px);
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
    padding-left: 23px;
    background: url('@/assets/img/sort-mobile-logo.svg') no-repeat center left / contain;

    @media (max-width: 750px) {
      order: 4;
      justify-self: end;
      padding-left: 0;
      padding-right: 23px;
      background: url('@/assets/img/sort-mobile-logo.svg') no-repeat center right / contain;
    }
  }
}

.category-btn {
  @include defineBtnPrimary(14px, 7px, 15px, 20px);

  @media (max-width: 750px) {
    padding: 9px 15px;
    justify-self: end;
  }

  &__text {
    @include defineFontMontserrat(500, 16px, 18px);
    margin-right: 35px;
    color: $white;

    @media (max-width: 750px) {
      font-size: 14px;
      line-height: 17px;
      margin-right: 15px;
    }
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

    @media (max-width: 750px) {
      width: 13px;
      height: 2px;
      border-radius: 0;

      &::before {
        top: -6px;
        left: -5px;
        width: 18px;
        height: 2px;
        border-radius: 0;
      }

      &::after {
        bottom: -6px;
        left: -5px;
        width: 18px;
        height: 2px;
        border-radius: 0;
      }
    }
  }
}
</style>
