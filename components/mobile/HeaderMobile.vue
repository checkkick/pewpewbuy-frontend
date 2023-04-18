<template>
  <div class="container">
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
      <button class="header__sort">
        Сортировка
      </button>
      <button class="category-btn">
        <p class="category-btn__text">
          Категории
        </p>
        <span class="category-btn__burger" />
      </button>
    </header>

    <CategoriesMobile />
  </div>
</template>

<script>
import CategoriesMobile from './CategoriesMobile.vue';

export default {
  components: {
    CategoriesMobile,
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.header {
  padding: 1.5rem 0 0 0;
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
