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
        v-if="allProducts.length > 0"
        class="main__section-products"
      >
        <ProductCard
          v-for="product in allProducts"
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

<script setup>
import { products } from '@/store/products';
import { media } from '@/store/media';
import FilterBarDesktop from '@/components/desktop/FilterBarDesktop.vue';

const useProductStore = products();
const route = useRoute();
const allProducts = computed(() => useProductStore.ALL_PRODUCTS);
const tablet = computed(() => media().MEDIA_TABLET);

onMounted(async () => {
  if (!Object.hasOwn(route.query, 'slug')) {
    await useProductStore.GET_ALL_PRODUCTS();
  }
});
</script>

<style lang="scss" scoped>
.text {
  @include defineFontSairaStencilOne(35px, 1.1);
  color: $accent;
}

.main {
  margin-bottom: 3rem;

  @media (max-width: 1150px) {
    margin-bottom: 6rem;
  }

  &__title {
    @include defineFontMontserrat(600, 27px, 33px);
    margin-bottom: 1rem;
  }

  &__subtitle {
    @include defineFontMontserrat(600, 18px, 22px);
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
