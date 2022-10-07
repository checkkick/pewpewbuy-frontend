<template>
  <div class="container">
    <header class="header">
      <NuxtLink class="header__logo" to="/">PEWPEW BUY</NuxtLink>
      <NuxtLink class="header__title" to="/">
        <h1 class="header__title__text">СТРАЙКБОЛЬНАЯ БАРАХОЛКА</h1>
      </NuxtLink>
      <div class="header__items">
        <input
          id="find"
          class="header__items__find"
          v-model="search"
          type="text"
          name="find"
          placeholder="Поиск"
          v-on:change="get_searched_products"/>
        <a v-if="authorized" href="#" class="header__items__favorite" @click.prevent="$router.push('/profile#favorites')">
          <div class="header__items__favorite__counter">{{favorite_products.length}}</div>
        </a>
        <a
          v-if="!authorized"
          href="#"
          class="header__items__persone"
          @click.prevent="$emit('openLoginWindow')"></a>
        <a
          v-if="authorized"
          href="#"
          class="header__items__persone"
          @click.prevent="$router.push('/profile')"></a>
      </div>
    </header>
  </div>
</template>

<script>

  import { products } from '../store/products'
  import { auth } from '../store/auth.js'
  export default {
    setup() {
      const store = products()
      const authStore = auth()
      const search = ref('')


      function get_searched_products() {
        if (search._value !== '') {
          store.GET_SEARCHED_PRODUCTS(search._value)
        }
        else {
          store.GET_ALL_PRODUCTS()
        }
      }

      return {
        authStore,
        store,
        all_products: computed(() => store.ALL_PRODUCTS),
        favorite_products: computed(() => store.FAVORITE_PRODUCTS),
        get_searched_products,
        authorized: computed(() => authStore.AUTHORIZED),
        search
      }
    },

    emits: ['openLoginWindow']
  }
</script>

<style lang="scss" scoped>
  .header {
    padding: 72px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    margin-bottom: 48px;

    &__logo {
      @include defineFontSairaStencilOne(34px, 54px);
      color: #191b1d;
      text-decoration: none;
      text-align: center;
    }

    &__title {
      margin: 0 auto;
      text-decoration: none;

      &__text {
        @include defineFontMontserrat(700, 36px, 44px);
        margin: 0;
        color: rgba(0, 0, 0, 0.9);
        text-align: center;
      }
    }

    &__items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;

      &__find {
        @include defineFontMontserrat(400, 16px, 22px);
        width: 100%;
        padding: 19px 30px;
        background: #f2f2f2;
        border: 1px solid #dcdcdc;
        border-radius: 54px;
        background-image: url('@/assets/img/finder.svg');
        background-size: 21px 21px;
        background-repeat: no-repeat;
        background-position: calc(100% - 20px) center;

        &::placeholder {
          @include defineFontMontserrat(400, 16px, 22px);
          color: rgba(66, 66, 66, 0.42);
        }

        &:focus {
          outline: none;
        }
      }

      &__favorite {
        cursor: pointer;
        position: relative;
        width: 55px;
        height: 33px;
        background-image: url('@/assets/img/favorite.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;

        &__counter {
          @include defineFontMontserrat(500, 13px, 140%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          width: 24px;
          height: 24px;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          background-color: #4b8ff5;
          color: #ffffff;
        }
      }

      &__persone {
        cursor: pointer;
        position: relative;
        width: 48px;
        height: 28px;
        background-image: url('@/assets/img/personal.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
</style>
