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
          v-model="search"
          class="header__items__find"
          type="text"
          name="find"
          placeholder="Поиск"
          @change="get_searched_products" />
        <a
          v-if="authorized"
          href="#"
          class="header__items__favorite"
          @click.prevent="$router.push('/profile?favorites')">
          <div class="header__items__favorite__counter">
            {{ favorite_products.length }}
          </div>
        </a>
        <a
          v-if="!authorized"
          href="#"
          class="header__items__persone"
          @click.prevent="$emit('openLoginWindow')"></a>
        <img
          v-if="authorized"
          :src="clientsStore.user.avatar"
          alt="user avatar"
          class="header__items__user-photo"
          @click.prevent="$router.push('/profile')" />
        <a
          v-if="authorized"
          href="#"
          class="header__items__exit-profile"
          @click.prevent="exitProfile">
          <svg
            width="22"
            height="17"
            viewBox="0 0 22 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.75 4.75V2.875C13.75 2.37772 13.5525 1.90081 13.2008 1.54917C12.8492 1.19754 12.3723 1 11.875 1H2.875C2.37772 1 1.90081 1.19754 1.54917 1.54917C1.19754 1.90081 1 2.37772 1 2.875V14.125C1 14.6223 1.19754 15.0992 1.54917 15.4508C1.90081 15.8025 2.37772 16 2.875 16H11.875C12.3723 16 12.8492 15.8025 13.2008 15.4508C13.5525 15.0992 13.75 14.6223 13.75 14.125V12.25"
              stroke="black"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M16.75 4.75L20.5 8.5L16.75 12.25"
              stroke="black"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M7.70312 8.5H20.5"
              stroke="black"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </header>
  </div>
</template>

<script>
import { auth } from '@/store/auth.js'
import { products } from '@/store/products'
import { clients } from '@/store/clients'
import { removeCookies } from '@/store/cookies'

export default {
  emits: ['openLoginWindow'],
  setup() {
    const store = products()
    const authStore = auth()
    const search = ref('')
    const clientsStore = clients()

    function getSearchedPproducts() {
      if (search.value !== '') {
        store.GET_SEARCHED_PRODUCTS(search.value)
      } else {
        store.GET_ALL_PRODUCTS()
      }
    }

    return {
      clientsStore,
      authStore,
      store,
      all_products: computed(() => store.ALL_PRODUCTS.results),
      favorite_products: computed(() => store.FAVORITE_PRODUCTS),
      getSearchedPproducts,
      authorized: computed(() => authStore.AUTHORIZED),
      user: computed(() => clientsStore.USER_STATE),
      search,
    }
  },
  async mounted() {
    await this.authStore.CHECK_AUTH()

    if (this.authorized && this.user !== {}) {
      await this.clientsStore.GET_SELF()
    }
  },
  methods: {
    exitProfile() {
      removeCookies()
      this.$router.push('/')
      location.reload()
    },
  },
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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;

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
      margin-right: 10px;

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
      margin-right: 10px;

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
        color: $white;
      }
    }

    &__exit-profile {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 5px;
      background: $white;
      box-shadow: 0px 4px 12px rgba(99, 99, 99, 0.06);
      border-radius: 50%;
      width: 100%;
      max-width: 48px;
      height: 48px;
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

    &__user-photo {
      cursor: pointer;
      width: 47px;
      height: 47px;
      border-radius: 50%;
    }
  }
}
</style>
