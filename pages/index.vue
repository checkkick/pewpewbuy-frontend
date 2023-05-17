<template>
  <div class="container">
    <main class="main">
      <h2
        v-if="!tablet"
        class="main__title"
      >
        Доска объявлений
      </h2>
      <h3
        v-if="!tablet"
        class="main__subtitle"
      >
        Страйкбольное оружие
      </h3>
      <FilterBarDesktop v-if="!tablet" />
      <section
        v-if="all_products.length > 0"
        class="main__section-products"
      >
        <ProductCard
          v-for="product in all_products"
          :key="product.id"
          :product="product"
        />
      </section>
      <section
        v-else
        class="no-found-products"
      >
        <img
          class="no-found-products__image"
          src="@/assets/img/no-found-products.svg"
          alt="no found products"
        >
        <p class="no-found-products__text">
          Такого товара не существует...
        </p>
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
      tablet: computed(() => media().MEDIA_TABLET),
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
  margin-bottom: 3rem;

  @media (max-width: 1150px) {
    margin-bottom: 6rem;
  }

  &__title {
    @include defineFontMontserrat(600px, 27px, 33px);
    margin-bottom: 1rem;
  }

  &__subtitle {
    @include defineFontMontserrat(600px, 18px, 22px);
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

.no-found-products {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__text {
    @include defineFontMontserrat(500, 17px, 21px);
  }
}
</style>
