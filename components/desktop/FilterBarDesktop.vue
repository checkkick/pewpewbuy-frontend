<template>
  <section class="filter-bar">
    <div class="popular">
      <span class="popular__star" />
      <label
        class="select__label"
        for="popular"
      >Популярность
      </label>
      <select
        id="popular"
        v-model="popularity"
        class="select"
        name="popular"
        @change="unset_filtred"
      >
        <option value="По возрастанию">
          По возрастанию
        </option>
        <option value="По убыванию">
          По убыванию
        </option>
      </select>
    </div>
    <div class="price">
      <span class="price__dollar" />
      <p class="price__text">
        Цена: от
        <input
          v-model="priceStart"
          class="input"
          type="number"
          name="start-price"
          @change="unset_filtred"
        >
        до
        <input
          v-model="priceEnd"
          class="input"
          type="number"
          name="end-price"
          @change="unset_filtred"
        >
      </p>
    </div>
    <div class="date-add">
      <span class="date-add__watch" />
      <label
        class="select__label"
        for="date-add"
      >Время добавления</label>
      <select
        id="date-add"
        v-model="date"
        class="select"
        name="date-add"
      >
        <option value="Две недели назад">
          Две недели назад
        </option>
        <option value="Месяц назад">
          Месяц назад
        </option>
      </select>
    </div>
    <button
      v-if="!filtred"
      class="sort-btn"
      @click="get_filtred_products()"
    >
      Отсортировать
    </button>
    <button
      v-if="filtred"
      class="sort-btn"
      @click="get_all_products()"
    >
      Сбросить фильтр
    </button>
  </section>
</template>

<script>
import { defineStore, mapStores } from 'pinia';

const useProductStore = defineStore('products', {});
export default {
  data: () => ({
    priceStart: '4000',
    priceEnd: '10000',
    popularity: 'По возрастанию',
    date: 'Две недели назад',
    add_time: null,
    filtred: false,
  }),
  computed: {
    ...mapStores(useProductStore),
  },
  methods: {
    async get_filtred_products() {
      let filter = '';
      if (this.priceStart !== null || this.priceEnd !== null) {
        if (this.priceStart === null) {
          this.priceStart = 0;
        }
        if (this.priceEnd === null) {
          this.priceEnd = 500000;
        }
        filter
          += `min_price=${this.priceStart}&max_price=${this.priceEnd}&`;
      }
      if (this.popularity === 'По убыванию') {
        filter += 'ordering=-views_count';
      }
      if (this.popularity === 'По возрастанию') {
        filter += 'ordering=+views_count';
      }
      this.filtred = true;
      await this.productsStore.GET_FILTRED_PRODUCTS(filter);
    },

    async get_all_products() {
      this.priceStart = null;
      this.priceEnd = null;
      this.popularity = null;
      await this.productsStore.GET_ALL_PRODUCTS();
      this.filtred = false;
    },
    unset_filtred() {
      this.filtred = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-bar {
  @include defineFontMontserrat(500, 15px, 18px);
  color: $black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 0 2rem 0;

  @media (max-width: 1300px) {
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
}

.select {
  @include defineFontMontserrat(500, 12px, 15px);
  cursor: pointer;
  max-width: max-content;
  min-width: 2rem;
  width: 100%;
  color: $black;
  outline: none;
  border: none;
  padding: 6px 16px;
  background: $input-background;
  border-radius: 4px;
  appearance: none;

  &:active,
  &:focus {
    outline: 2px solid $primary;
  }

  &__label {
    padding-right: 1rem;
    background: url('assets/img/arrow.svg') no-repeat center right;
  }
}

.popular {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  gap: 0.5rem;

  &__star {
    width: 2rem;
    height: 2rem;
    border-radius: 6px;
    background: $primary-blur url('assets/img/filter-star.svg') no-repeat center center;
  }
}

.input {
  @include defineFontMontserrat(500, 12px, 15px);
  color: $black-contrast;
  max-width: 5rem;
  min-width: 1rem;
  outline: none;
  border: none;
  padding: 7px 13px;
  background: $input-background;
  border-radius: 4px;

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

.price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-grow: 1;

  &__dollar {
    width: 2rem;
    height: 2rem;
    border-radius: 6px;
    background: $primary-blur url('assets/img/filter-dollar.svg') no-repeat center center;
  }

  &__text {
    margin: 0;
    width: 100%;
  }
}

.date-add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-grow: 1;

  &__watch {
    width: 2rem;
    height: 2rem;
    border-radius: 6px;
    background: $primary-blur url('assets/img/filter-watch.svg') no-repeat center center;
  }
}

.sort-btn {
  cursor: pointer;
  @include defineBtnPrimary(13px, 26px, 12px, 16px);

  @media (max-width: 1300px) {
    flex-grow: 1;
  }
}
</style>
