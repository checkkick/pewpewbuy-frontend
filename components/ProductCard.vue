<template>
  <div class="product-card">
    <img
      class="product-card__image"
      src="assets/img/product-example.png"
      alt="product" />
    <h4 class="product-card__title">
      Страйкбольный карабин Cyma Colt model 609 - ХМ177Е1 (CM009E)
    </h4>
    <p class="product-card__location">Местоположение: {{ 'г. Москва' }}</p>
    <div class="product-card__flex">
      <p>Цена:</p>
      <p class="product-card__flex__price">22 500 р.</p>
    </div>
    <div class="product-card__flex">
      <button class="product-card__btn primary">Профиль продавца</button>
      <button class="product-card__btn secondary">Подробнее</button>
    </div>
    <div
      class="product-card__like"
      :class="{ active: like }"
      @click="like = !like">
      <svg
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.56973 10.7847C0.246983 7.76552 1.02123 3.23679 4.89247 1.72722C8.76372 0.217645 11.0865 3.23679 11.8607 4.74637C12.635 3.23679 15.732 0.217645 19.6032 1.72722C23.4744 3.23679 23.4744 7.76552 21.1517 10.7847C18.8289 13.8038 11.8607 19.8421 11.8607 19.8421C11.8607 19.8421 4.89247 13.8038 2.56973 10.7847Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      like: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.product-card {
  @include defineFontMontserrat(500, 20px, 1.4);
  color: $black;
  width: calc((100% - (20px * 3)) / 4);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 1000px) {
    width: calc((100% - (20px * 2)) / 3);
  }

  @media (max-width: 800px) {
    width: calc((100% - (20px * 1)) / 2);
  }

  @media (max-width: 650px) {
    width: 100%;
  }

  &:hover {
    transform: translateY(-15px);
  }
  &:hover &__image {
    filter: drop-shadow(0px 11px 18px rgba(128, 173, 241, 0.13));
  }

  &__image {
    width: 100%;
    border-radius: 15px;
  }

  &__title {
    font-weight: 700;
  }

  &__flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;

    &__price {
      font-weight: 700;
      font-size: 22px;
    }
  }

  &__btn {
    @include defineFontMontserrat(600, 18px, 1.4);
    flex-grow: 1;
    cursor: pointer;
    padding: 18px 26px;
    border-radius: 35px;
    border: none;
    &.primary {
      background: $primary;
      color: $white;
    }
    &.secondary {
      color: $black-light;
      border: 1px solid #515151;
      background: transparent;
    }

    &:focus-visible {
      outline: 1px solid $black-light;
    }

    &:active {
      box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3);
    }
  }

  &__like {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    width: 48px;
    height: 48px;
    background-color: $grey;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active > svg {
      fill: $accent-dark;
    }
    &.active > svg path {
      stroke: $accent-dark;
    }

    &:hover > svg {
      fill: $accent-dark;
    }
    &:hover > svg path {
      stroke: $accent-dark;
    }

    &:active {
      background-color: #eaeaea;
    }
  }
}
</style>
