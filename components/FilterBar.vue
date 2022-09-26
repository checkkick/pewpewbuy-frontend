<template>
  <section class="filter-bar">
    <div class="filter-bar__popular">
      <span class="filter-bar__popular__star"></span>
      <label class="filter-bar__select__label" for="popular"
      >Популярность
      </label>
      <select id="popular" class="filter-bar__select" name="popular" v-model="popularity" v-on:change="unset_filtred">
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
          name="start-price"
          v-on:change="unset_filtred"/>
        р. до
        <input
          v-model="priceEnd"
          class="filter-bar__input"
          type="number"
          name="end-price"
          v-on:change="unset_filtred"/>
        р.
      </p>
    </div>
<!--    <div class="filter-bar__date-add">-->
<!--      <span class="filter-bar__date-add__watch"></span>-->
<!--      <label class="filter-bar__select__label" for="date-add"-->
<!--      >Время добавления</label-->
<!--      >-->
<!--      <select id="date-add" class="filter-bar__select" name="date-add">-->
<!--        <option value="Две недели назад">Две недели назад</option>-->
<!--        <option value="Месяц назад">Месяц назад</option>-->
<!--      </select>-->
<!--    </div>-->
    <button class="filter-bar__sort-btn" v-if="!filtred" v-on:click="get_filtred_products()">Отсортировать</button>
    <button class="filter-bar__sort-btn" v-if="filtred" v-on:click="get_all_products()">Сбросить фильтр</button>
  </section>
</template>

<script>
  import { defineStore, mapStores } from 'pinia'

  const useProductStore = defineStore('products', {})
  export default {
    setup() {
    },
    data: () => {
      return {
        priceStart: null,
        priceEnd: null,
        popularity: null,
        add_time: null,
        filtred: false
      }
    },
    computed: {
      ...mapStores(useProductStore)
    },
    methods: {
      async get_filtred_products() {
        let filter = ''
        if ((this.priceStart !== null) || (this.priceEnd !== null)) {
          if (this.priceStart === null) {
            this.priceStart = 0
          }
          if (this.priceEnd === null) {
            this.priceEnd = 500000
          }
          filter += 'min_price=' + this.priceStart + '&max_price=' + this.priceEnd + '&'
        }
        if (this.popularity === 'По убыванию') {
          filter += 'ordering=-views_count'
        }
        if (this.popularity === 'По возрастанию') {
          filter += 'ordering=+views_count'
        }
        this.filtred = true
        await this.productsStore.GET_FILTRED_PRODUCTS(filter)

      },

      async get_all_products() {
        this.priceStart = null
        this.priceEnd = null
        this.popularity = null
        await this.productsStore.GET_ALL_PRODUCTS()
        this.filtred = false
      },
      unset_filtred() {
        this.filtred = false
      }
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
