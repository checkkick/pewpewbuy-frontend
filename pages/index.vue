<template>
  <div class="container">
    <Navigation />
    <main class="main">
      <h2 class="main__title">Доска объявлений</h2>
      <h3 class="main__subtitle">Страйкбольное оружие</h3>
      <FilterBar />
      <section class="main__section-products">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.text {
  font-family: 'SairaStencilOne';
  @include defineFontSairaStencilOne(35px, 1.1);
  color: $accent;
}

.main {
  &__title {
    @include defineFontMontserrat(600px, 36px, 44px);
    margin: 0 0 40px 0;
  }

  &__subtitle {
    @include defineFontMontserrat(600px, 24px, 29px);
    margin: 0;
    margin: 0 0 40px 0;
  }

  &__section-products {
    margin: 0 0 120px 0;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    gap: 20px;
    flex-wrap: wrap;
  }
}
</style>
