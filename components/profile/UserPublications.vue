<template>
  <div class="publication">
    <p class="publication__status">
      Статус:
      <span v-if="true" class="active">опубликовано</span>
      <span v-if="false" class="inactive">не опубликовано</span>
    </p>
    <div class="publication__views">
      <p class="publication__views__text">1267 просмотров</p>
    </div>
    <div class="publication__image-slider">
      <img src="@/assets/img/product-example.png" alt="product-example" />
    </div>
    <h4 class="publication__title">
      Страйкбольный карабин Cyma Colt model 609 - ХМ177Е1 (CM009E)
    </h4>
    <div class="publication__advanced">
      <div class="publication__advanced__line">
        <p class="publication__advanced__line__text">Местоположение:</p>
        <p class="publication__advanced__line__text">г. Москва</p>
      </div>
      <div class="publication__advanced__line">
        <p class="publication__advanced__line__text">Цена:</p>
        <p class="publication__advanced__line__text-bold">22 500 р.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.publication {
  position: relative;
  background-color: $white;
  border-radius: 20px;
  padding: 25px 35px 45px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__status {
    @include defineFontMontserrat(700, 18px, 22px);
    color: $black;
    margin: 0 0 3px 0;

    & .active {
      color: #00ad45;
    }
    & .inactive {
      color: #f50000;
    }
  }

  &__views {
    display: flex;
    align-items: center;
    gap: 7px;
    padding-left: 23px;
    background: url('@/assets/img/views-eye.svg') no-repeat left center;
    margin-bottom: 32px;

    &__text {
      @include defineFontMontserrat(500, 14px, 17px);
      color: rgba(98, 98, 98, 0.9);
      margin: 0;
    }
  }

  &__image-slider {
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: 15px;

    & img {
      width: 100%;
    }
  }

  &__title {
    @include defineFontMontserrat(700, 18px, 1.4);
    margin: 0 0 14px 0;
  }

  &__advanced {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 11px;

    &__line {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;

      &__text {
        @include defineFontMontserrat(400, 20px, 1.4);
        margin: 0;
      }

      &__text-bold {
        @include defineFontMontserrat(700, 20px, 1.4);
        margin: 0;
      }
    }
  }
}
</style>
