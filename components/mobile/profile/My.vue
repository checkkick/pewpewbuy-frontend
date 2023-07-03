<template>
  <div class="container">
    <!-- Личный просмотр профиля -->
    <MyMain
      v-if="page === 'main'"
      @change-page="(pageName) => page = pageName"
    />

    <MyPublications
      v-if="page === 'publications'"
      @change-page="(pageName) => page = pageName"
    />

    <Reviews
      v-if="page === 'reviews'"
      :reviews="user.about_me_reviews"
      @change-page="(pageName) => page = pageName"
    />

    <DetailPublications
      v-if="page === 'activePublications'"
      :products="activePublications"
      :my-publications="true"
      @change-page="(pageName) => page = pageName"
    >
      <template #header>
        <div class="publications-name substrate-mobile">
          <span class="publications-name__logo publications-name__logo--active" />
          <p class="publications-name__text">
            Активные объявления
          </p>
        </div>
      </template>
    </DetailPublications>

    <DetailPublications
      v-if="page === 'inactivePublications'"
      :products="inactivePublications"
      :my-publications="true"
      @change-page="(pageName) => page = pageName"
    >
      <template #header>
        <div class="publications-name substrate-mobile">
          <span class="publications-name__logo publications-name__logo--inactive" />
          <p class="publications-name__text">
            Неактивные объявления
          </p>
        </div>
      </template>
    </DetailPublications>

    <DetailPublications
      v-if="page === 'favoritePublications'"
      :products="user.favortie_products"
      :my-publications="false"
      @change-page="(pageName) => page = pageName"
    >
      <template #header>
        <div class="publications-name substrate-mobile">
          <span class="publications-name__logo publications-name__logo--favorite" />
          <p class="publications-name__text">
            Избранное
          </p>
        </div>
      </template>
    </DetailPublications>

    <DetailPublications
      v-if="page === 'historyPublications'"
      :products="user.history_products"
      :my-publications="false"
      @change-page="(pageName) => page = pageName"
    >
      <template #header>
        <div class="publications-name substrate-mobile">
          <span class="publications-name__logo publications-name__logo--history" />
          <p class="publications-name__text">
            История просмотра
          </p>
        </div>
      </template>
    </DetailPublications>

    <AddProductModal
      v-if="page === 'addProduct'"
      @close-add-product-window="page = 'main'"
    />
  </div>
</template>

<script>
import { auth } from '@/store/auth';
import { clients } from '@/store/clients';
import AddProductModal from '@/components/profile/AddProductModal.vue';
import MyMain from './MyMain.vue';
import MyPublications from './MyPublications.vue';
import DetailPublications from './DetailPublications.vue';
import Reviews from './Reviews.vue';

export default {
  components: {
    MyMain, MyPublications, DetailPublications, Reviews, AddProductModal,
  },
  setup() {
    const authStore = auth();
    const clientsStore = clients();

    return {
      authStore,
      clientsStore,
      authorized: computed(() => authStore.AUTHORIZED),
      user: computed(() => clientsStore.USER_STATE),
      activePublications: computed(() => clientsStore.ACTIVE_USER_PRODUCTS),
      inactivePublications: computed(() => clientsStore.INACTIVE_USER_PRODUCTS),
    };
  },
  data() {
    return {
      page: 'main',
    };
  },
  watch: {
    '$route.query': {
      handler() {
        if (Object.hasOwn(this.$route.query, 'favorites')) {
          this.page = 'favoritePublications';
        }

        if (Object.hasOwn(this.$route.query, 'addproduct')) {
          this.page = 'addProduct';
        }
      },
      deep: true,
    },
  },
  async mounted() {
    await this.authStore.CHECK_AUTH();

    if (this.authorized && Object.keys(this.user).length === 0) {
      await this.clientsStore.GET_SELF();
    }

    if (Object.hasOwn(this.$route.query, 'favorites')) {
      this.page = 'favoritePublications';
    }

    if (Object.hasOwn(this.$route.query, 'addproduct')) {
      this.page = 'addProduct';
    }
  },
};
</script>

<style lang="scss" scoped>
.publications-name {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  background: $modal-mobile-background;

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
