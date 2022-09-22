<template>
  <section class="filter-bar">
    <div class="filter-bar__popular">
      <span class="filter-bar__popular__star"></span>
      <label class="filter-bar__select__label" for="popular"
      >Популярность
      </label>
      <select id="popular" class="filter-bar__select" name="popular">
        <option value="По возрастанию">По возрастанию</option>
        <option value="По убыванию">По убыванию</option>
      </select>
    </div>
    <div class="filter-bar__price">
      <span class="filter-bar__price__dollar"></span>
      <p class="filter-bar__price__text">
        Цена: от
        <input
          v-model="priceStart"
          class="filter-bar__input"
          type="number"
          name="start-price"/>
        р. до
        <input
          v-model="priceEnd"
          class="filter-bar__input"
          type="number"
          name="end-price"/>
        р.
      </p>
    </div>
    <div class="filter-bar__date-add">
      <span class="filter-bar__date-add__watch"></span>
      <label class="filter-bar__select__label" for="date-add"
      >Время добавления</label
      >
      <select id="date-add" class="filter-bar__select" name="date-add">
        <option value="Две недели назад">Две недели назад</option>
        <option value="Месяц назад">Месяц назад</option>
      </select>
    </div>
    <button class="filter-bar__sort-btn" v-on:click="get_filtred_products()">Отсортировать</button>
  </section>
</template>

<script>
  import { products } from '../store/products'

  export default {
    setup() {
      const store = products()
      const priceStart = ref(null)
      const priceEnd = ref(null)
      const popularity = ref(null)
      const add_time = ref(null)
      const search = ref('')
      function get_filtred_products() {
        let filter = ''
        if ((priceStart !== null) && (priceEnd !== null)) {
          filter += 'min_price=' + priceStart + '&max_price=' + priceEnd
        }
        if (popularity !== null) {
          filter += ''
        }
        if (add_time !== null) {
          filter += ''
        }
        store.GET_FILTRED_PRODUCTS(filter)
      }
      return {
        store,
        all_products: computed(() => store.ALL_PRODUCTS),
        get_filtred_products,
        priceStart,
        priceEnd,
        popularity,
        add_time,
        search,
      }
    },
    data: () => {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .filter-bar {
    margin: 0 0 40px 0;
    @include defineFontMontserrat(500, 20px, 24px);
    color: $black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    &__select {
      @include defineFontMontserrat(500, 16px, 20px);
      cursor: pointer;
      max-width: max-content;
      min-width: 2rem;
      width: 100%;
      color: $black;
      outline: none;
      border: none;
      padding: 10px 22px;
      background: #e8e8e8;
      border-radius: 6px;
      appearance: none;

      &:active,
      &:focus {
        outline: 2px solid $primary;
      }

      &__label {
        padding-right: 23px;
        background: url('assets/img/arrow.svg') no-repeat center right;
      }
    }

    &__input {
      @include defineFontMontserrat(500, 14px, 17px);
      color: $black-contrast;
      max-width: 8em;
      min-width: 2em;
      width: 100%;
      outline: none;
      border: none;
      padding: 10px 22px;
      background: #e8e8e8;
      border-radius: 6px;

      &:active,
      &:focus {
        outline: 2px solid $primary;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
      }
    }

    &__popular {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      flex-grow: 1;
      gap: 1rem;

      &__star {
        width: 49px;
        height: 49px;
        border-radius: 8px;
        background: #d8e3ff url('assets/img/filter-star.svg') no-repeat center center;
      }
    }

    &__price {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-grow: 1;

      &__dollar {
        width: 49px;
        height: 49px;
        border-radius: 8px;
        background: #d8e3ff url('assets/img/filter-dollar.svg') no-repeat center center;
      }

      &__text {
        width: 100%;
      }
    }

    &__date-add {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      flex-grow: 1;

      &__watch {
        width: 49px;
        height: 49px;
        border-radius: 8px;
        background: #d8e3ff url('assets/img/filter-watch.svg') no-repeat center center;
      }
    }

    &__sort-btn {
      cursor: pointer;
      @include defineBtnPrimary(18px, 35px, 16px, 22px);
    }
  }
</style>
