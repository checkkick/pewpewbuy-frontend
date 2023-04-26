<template>
  <nav class="nav container">
    <ul class="nav__list">
      <li class="nav__item">
        <a
          class="nav__link"
          href="#"
          @click.prevent
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="8.83765"
              cy="8.83746"
              rx="7.125"
              ry="7.125"
              stroke="#1A1A1A"
              stroke-width="1.5"
            />
            <path
              d="M14.0625 14.0625L19.1006 19.1006"
              stroke="#1A1A1A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="nav__text">Поиск</p>
        </a>
      </li>
      <li class="nav__item">
        <a
          class="nav__link"
          href="#"
          @click.prevent="$router.push('/profile?favorites')"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0942 19.9429C11.7684 20.0579 11.2317 20.0579 10.9059 19.9429C8.12675 18.9942 1.91675 15.0362 1.91675 8.32791C1.91675 5.36666 4.303 2.97083 7.24508 2.97083C8.98925 2.97083 10.5322 3.81416 11.5001 5.11749C12.468 3.81416 14.0205 2.97083 15.7551 2.97083C18.6972 2.97083 21.0834 5.36666 21.0834 8.32791C21.0834 15.0362 14.8734 18.9942 12.0942 19.9429Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="nav__text">Избранное</p>
        </a>
      </li>
      <li class="nav__item">
        <button
          class="nav__btn"
          @click="authorization ? $router.push('/profile?addproduct') : $router.push('/?login')"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.769 13.6008V15.825C19.769 18.6535 19.769 20.0677 18.8903 20.9464C18.0116 21.825 16.5974 21.825 13.769 21.825H8.29248C5.46405 21.825 4.04984 21.825 3.17116 20.9464C2.29248 20.0677 2.29248 18.6535 2.29248 15.825V9.3205C2.29248 6.49207 2.29248 5.07785 3.17116 4.19918C4.04984 3.3205 5.46405 3.3205 8.29248 3.3205H11.0307"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M18.741 2.29242L18.741 10.5167"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M22.853 6.40454L14.6288 6.40454"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M7.43262 13.6008L14.6288 13.6008"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M7.43262 9.48865L11.5447 9.48865"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M7.43262 17.7129L11.5447 17.7129"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </li>
      <li class="nav__item">
        <NuxtLink
          class="nav__link"
          to="/?slug="
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.26825 2.60334L3.32742 6.45334C2.50242 7.09501 1.83325 8.46084 1.83325 9.49667V16.2892C1.83325 18.4158 3.56575 20.1575 5.69242 20.1575H16.3074C18.4341 20.1575 20.1666 18.4158 20.1666 16.2983V9.62501C20.1666 8.51584 19.4241 7.09501 18.5166 6.46251L12.8516 2.49334C11.5683 1.59501 9.50575 1.64084 8.26825 2.60334Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11 16.4908V13.7408"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="nav__text">
            Главная
          </p>
        </NuxtLink>
      </li>
      <li class="nav__item">
        <a
          v-if="authorization"
          class="nav__link"
          href="#"
          @click.prevent="$router.push('/profile')"
        >
          <img
            class="nav__image"
            :src="clientsStore.USER_STATE.avatar ? clientsStore.USER_STATE.avatar : noImage"
            alt="user avatar"
          >
          <p class="nav__text">{{ userName }}</p>
        </a>
        <a
          v-else
          class="nav__link"
          href="#"
          @click.prevent
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4999 11.5C14.1463 11.5 16.2916 9.35472 16.2916 6.70835C16.2916 4.06199 14.1463 1.91669 11.4999 1.91669C8.85355 1.91669 6.70825 4.06199 6.70825 6.70835C6.70825 9.35472 8.85355 11.5 11.4999 11.5Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.732 21.0833C19.732 17.3746 16.0424 14.375 11.4999 14.375C6.9574 14.375 3.26782 17.3746 3.26782 21.0833"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="nav__text">Профиль</p>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import noPhoto from '@/assets/img/no-photo.png';
import { auth } from '@/store/auth';
import { products } from '@/store/products';
import { clients } from '@/store/clients';

export default {
  async setup() {
    const authorization = await auth().CHECK_AUTH();
    let { categories } = products();
    const clientsStore = clients();

    if (Object.keys(categories).length === 0) {
      categories = await products().GET_CATEGORIES_ALL();
    }

    const filterProducts = products().GET_CATEGORY_PRODUCTS;
    const getAllProducts = products().GET_ALL_PRODUCTS;

    return {
      clientsStore,
      authorization,
      categories,
      filterProducts,
      getAllProducts,
    };
  },
  data: () => ({
    noImage: noPhoto,
    userName: '',
  }),
  watch: {
    '$route.query.slug': {
      async handler() {
        await this.loadproductsFromSlug();
      },
      deep: true,
    },
  },
  async mounted() {
    await this.loadproductsFromSlug();

    if (this.authorization && this.clientsStore.USER_STATE !== {}) {
      this.clientsStore.GET_SELF().then(() => this.createProfileName());
    }
  },
  methods: {
    async loadproductsFromSlug() {
      if (Object.hasOwn(this.$route.query, 'slug')) {
        if (this.$route.query.slug) {
          await this.filterProducts(this.$route.query.slug);
        } else {
          await this.getAllProducts();
          this.$router.push('/');
        }
      }
    },
    createProfileName() {
      if (this.clientsStore.USER_STATE.first_name) {
        this.userName += this.clientsStore.USER_STATE.first_name[0];
      } else if (this.clientsStore.USER_STATE.last_name) {
        this.userName += this.clientsStore.USER_STATE.last_name[0];
      }

      if (this.userName.length === 0) {
        this.userName = 'Профиль';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  z-index: 999;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 13px 0;
  background-color: #F0F6FF;

  &__list {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 75px;
  }

  &__link {
    @include defineFontMontserrat(500, 10px, 1.4);
    text-decoration: none;
    color: $black-inactive;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  &__image {
    width: 24px;
    height: 24px;
    border-radius: 100%;
  }

  &__text {
    margin: 0;
  }

  &__btn {
    @include defineBtnPrimary(0, 100%, 18px, 18px);
    padding-left: 20px;
    padding-right: 16px;
  }
}
</style>
