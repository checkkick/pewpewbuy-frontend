<template>
  <div class="container">
    <main class="main">
      <h2
        v-if="!mobile"
        class="main__title"
      >
        Доска объявлений
      </h2>
      <h3
        v-if="!mobile"
        class="main__subtitle"
      >
        Страйкбольное оружие
      </h3>
      <FilterBarDesktop v-if="!mobile" />
      <section class="main__section-products">
        <ProductCard
          v-for="product in all_products"
          :key="product.id"
          :product="product"
        />
      </section>
    </main>
  </div>
</template>

<script>
import { auth } from '@/store/auth';
import { products } from '@/store/products';
import { media } from '@/store/media';
import FilterBarDesktop from '@/components/desktop/FilterBarDesktop.vue';

export default {
  components: { FilterBarDesktop },
  setup() {
    const useProductStore = products();
    const useAuthStore = auth();

    return {
      useAuthStore,
      useProductStore,
      all_products: computed(() => useProductStore.ALL_PRODUCTS),
      authorized: computed(() => useAuthStore.AUTHORIZED),
      mobile: computed(() => media().MEDIA_MOBILE),
    };
  },
  async mounted() {
    if (!Object.hasOwn(this.$route.query, 'slug')) {
      await this.useProductStore.GET_ALL_PRODUCTS();
    }
  },
};
</script>

<style lang="scss" scoped>
.text {
  font-family: 'SairaStencilOne';
  @include defineFontSairaStencilOne(35px, 1.1);
  color: $accent;
}

.main {
  &__title {
    @include defineFontMontserrat(600px, 27px, 33px);
    margin-bottom: 1rem;
  }

  &__subtitle {
    @include defineFontMontserrat(600px, 18зx, 22px);
    margin-bottom: 2rem;
  }

  &__section-products {
    margin: 0 0 7rem 0;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    gap: 15px;
    flex-wrap: wrap;
  }
}
</style>
