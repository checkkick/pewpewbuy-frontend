<template>
  <div class="container">
    <header class="header">
      <NuxtLink
        class="header__logo"
        to="/?slug="
      >
        PEWPEW BUY
      </NuxtLink>
      <NuxtLink
        class="header__link"
        to="/?slug="
      >
        <h1 class="header__title">
          СТРАЙКБОЛЬНАЯ БАРАХОЛКА
        </h1>
      </NuxtLink>
      <div class="header__items">
        <input
          id="find"
          v-model="search"
          class="header__items__find"
          type="text"
          name="find"
          placeholder="Поиск"
          @change="get_searched_products"
        >
        <a
          v-if="authorized"
          href="#"
          class="header__items__favorite"
          @click.prevent="$router.push('/profile?favorites')"
        >
          <p class="header__items__favorite__counter">
            {{ user.favortie_products ? user.favortie_products.length : '0' }}
          </p>
        </a>
        <a
          v-if="!authorized"
          href="#"
          class="header__items__persone"
          @click.prevent="$emit('openLoginWindow')"
        />
        <a
          v-if="authorized"
          class="header__items__user-photo"
          href="#"
          @click.prevent="$router.push('/profile')"
        >
          <img
            class="header__items__user-photo__image"
            :src="clientsStore.user.avatar ? clientsStore.user.avatar : noImage"
            alt="user avatar"
          >
        </a>
        <a
          v-if="authorized"
          href="#"
          class="header__items__exit-profile"
          @click.prevent="exitProfile"
        >
          <svg
            width="22"
            height="17"
            viewBox="0 0 22 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.75 4.75V2.875C13.75 2.37772 13.5525 1.90081 13.2008 1.54917C12.8492 1.19754 12.3723 1 11.875 1H2.875C2.37772 1 1.90081 1.19754 1.54917 1.54917C1.19754 1.90081 1 2.37772 1 2.875V14.125C1 14.6223 1.19754 15.0992 1.54917 15.4508C1.90081 15.8025 2.37772 16 2.875 16H11.875C12.3723 16 12.8492 15.8025 13.2008 15.4508C13.5525 15.0992 13.75 14.6223 13.75 14.125V12.25"
              stroke="black"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.75 4.75L20.5 8.5L16.75 12.25"
              stroke="black"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.70312 8.5H20.5"
              stroke="black"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </header>
  </div>
</template>

<script>
import noPhoto from '@/assets/img/no-photo.png';
import { auth } from '@/store/auth';
import { products } from '@/store/products';
import { clients } from '@/store/clients';
import { removeCookies } from '@/store/cookies';

export default {
  emits: ['openLoginWindow'],
  setup() {
    const store = products();
    const authStore = auth();
    const search = ref('');
    const clientsStore = clients();

    function getSearchedPproducts() {
      if (search.value !== '') {
        store.GET_SEARCHED_PRODUCTS(search.value);
      } else {
        store.GET_ALL_PRODUCTS();
      }
    }

    return {
      clientsStore,
      authStore,
      store,
      all_products: computed(() => store.ALL_PRODUCTS.results),
      getSearchedPproducts,
      authorized: computed(() => authStore.AUTHORIZED),
      user: computed(() => clientsStore.USER_STATE),
      search,
    };
  },
  data: () => ({
    noImage: noPhoto,
  }),
  async mounted() {
    await this.authStore.CHECK_AUTH();

    if (this.authorized && this.user !== {}) {
      await this.clientsStore.GET_SELF();
    }
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
.header {
  padding: 2rem 0 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 2rem;

  &__logo {
    @include defineFontSairaStencilOne(25px, 40px);
    text-decoration: none;
    text-align: center;
    padding-left: 40px;
    background: url('@/assets/img/header-logo.png') no-repeat center left / contain;
  }

  &__link {
    text-decoration: none;
  }

  &__title {
    @include defineFontMontserrat(700, 27px, 33px);
    color: $black;
    text-align: center;
  }

  &__items {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    &__find {
      @include defineFontMontserrat(400, 13px, 16px);
      padding: 14px 22px;
      background: $white;
      border: 1px solid #dcdcdc;
      border-radius: 40px;
      background-image: url('@/assets/img/finder.svg');
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: calc(100% - 20px) center;
      margin-right: 10px;

      &::placeholder {
        color: rgba(66, 66, 66, 0.42);
      }

      &:focus {
        outline: none;
      }
    }

    &__favorite {
      cursor: pointer;
      position: relative;
      min-width: 26px;
      min-height: 24px;
      background-image: url('@/assets/img/favorite.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      margin-right: 10px;

      &__counter {
        @include defineFontMontserrat(500, 12px, 1.4);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 24px;
        height: 24px;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        background-color: $primary;
        color: $white;
      }
    }

    &__exit-profile {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 5px;
      background: $white;
      border: 1px solid #dcdcdc;
      border-radius: 50%;
      min-width: 48px;
      min-height: 48px;
      transition: background-color 0.2s ease-in-out,
        border-color 0.2s ease-in-out;

      &>svg>path {
        transition: stroke 0.2s ease-in-out;
      }

      &:hover {
        background-color: $primary;
        border-color: $primary;
      }

      &:hover>svg>path {
        stroke: $white;
      }
    }

    &__persone {
      cursor: pointer;
      position: relative;
      min-width: 30px;
      min-height: 28px;
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
      display: flex;
      align-items: center;
      justify-content: center;

      &__image {
        width: 100%;
        height: 47px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
}
</style>
