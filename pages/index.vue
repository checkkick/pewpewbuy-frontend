<template>
  <div class="container">
    <Header />
    <Navigation />
    <main class="main">
      <h2 class="main__title">Доска объявлений</h2>
      <h3 class="main__subtitle">Страйкбольное оружие</h3>
      <FilterBar />
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
  padding: 0 70px;

  &__title {
    @include defineFontMontserrat(600px, 36px, 44px);
    margin: 0 0 40px 0;
  }

  &__subtitle {
    @include defineFontMontserrat(600px, 24px, 29px);
    margin: 0;
    margin: 0 0 40px 0;
  }
}
</style>
