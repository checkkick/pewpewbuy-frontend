<template>
  <div class="nav">
    <nav class="nav__filter">
      <ul class="nav__filter__list">
        <li
          v-for="(filterItem, idx) in Object.keys(filterMenu)"
          :key="idx"
          class="nav__filter__list__item"
          :class="{ active: filterItem === chooseFilter }"
          @click.self="chooseCategory(filterItem)">
          <a href="#" class="nav__filter__list__item__link" @click.self="chooseCategory(filterItem)">{{
            filterItem
            }}</a>
          <ul
            v-if="filterItem === chooseFilter&&showFilter"
            class="nav__filter__dropdown-list">
            <li
              v-for="(item, index) in filterMenu[filterItem]"
              :key="index"
              class="nav__filter__dropdown-list__item"
              :class="{ active: item[1] === chooseSubfilter }"
              @click="chooseSubCategory(item[1])">
              <a
                class="nav__filter__dropdown-list__item__link"
              >{{ item[0] }}</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <button class="nav__btn-create">Разместить объявление</button>
  </div>
</template>

<script>
  import { defineStore, mapStores } from 'pinia'

  const useProductStore = defineStore('products', {})
  export default {
    setup() {
    },
    data: () => {
      return {
        showFilter: false,
        chooseFilter: '',
        chooseSubfilter: '',
        filterMenu: {
          'Страйкбольное оружие': [
            ['АК-серия', 'ak-series'],
            ['М-серия', 'm-series'],
            ['Винтовки', 'rifles'],
            ['Пулеметы', 'machineguns'],
            ['Дробовики', 'shotgun'],
            ['Автоматы прочие модели', 'auto_other'],
            ['АС ВАЛ, ВСС, СР-3М', 'val'],
            ['Гранатометы', 'launchers']
          ],
          'Внешний тюнинг': [
            ['Трассерные насадки', 'tracers'],
            ['Магазины', 'magazines'],
            ['Глушители', 'silencers'],
            ['Прицелы', 'scopes'],
            ['Крепления', 'bracing'],
            ['Рукоятки', 'handle'],
            ['Прочее', 'external_other']
          ],
          'Внутренний тюнинг': [
            ['Гирбоксы', 'gearboxs'],
            ['Пружины', 'springs'],
            ['Моторы', 'motors'],
            ['ВВД-системы', 'vvd'],
            ['Аккумуляторы', 'batteries'],
            ['Прочее', 'internal_other']
          ],
          Снаряжение: [
            ['Шлемы', 'helmets'],
            ['Одежда', 'clothes'],
            ['Очки', 'glasses'],
            ['Подсумки', 'pouch'],
            ['Чехлы, сумки', 'bags'],
            ['Рюкзаки', 'backpacks'],
            ['Разгрузочные системы', 'unloading'],
            ['Средства связи', 'communication'],
            ['Наушники', 'headphones'],
            ['Бронежилеты и плитники', 'armors'],
            ['Фонари и маркеры', 'flashlights'],
            ['Ремни', 'belts'],
            ['Прочее', 'equipment_other']
          ]
        }
      }
    },
    computed: {
      ...mapStores(useProductStore)
    },
    methods: {
      chooseCategory(item) {
        this.showFilter = !this.showFilter
        this.chooseFilter = item
      },
      chooseSubCategory(item) {
        this.showFilter = !this.showFilter
        this.chooseSubfilter = item
        this.productsStore.GET_CATEGORY_PRODUCTS(item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 42px;
    margin-bottom: 40px;

    &__filter {
      background: $filter-background;
      border: 1px solid $filter-border;
      box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
      border-radius: 91px;
      padding: 15px 13px;

      &__list {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        gap: 15px;

        &__item {
          @include defineFontMontserrat(500, 24px, 29px);
          position: relative;
          text-align: center;
          padding: 22px 27px;
          border-radius: 91px;
          color: $black;

          &.active {
            background: $primary;
            color: $white;
          }

          &__link {
            text-decoration: none;
            color: inherit;
          }
        }
      }

      &__dropdown-list {
        z-index: 1;
        position: absolute;
        top: 93px;
        left: 20px;
        right: 20px;
        padding: 0;
        margin: 0;
        list-style: none;
        background: $filter-background;
        border: 1px solid $filter-border;
        box-shadow: 0px 13px 12px rgba(0, 0, 0, 0.15);
        border-radius: 14px;

        &__item {
          @include defineFontMontserrat(500, 18px, 22px);
          text-align: center;
          padding: 14px 17px;
          color: $black;

          &.active {
            background: $primary;
            color: $white;
          }

          &:first-child {
            border-radius: 14px 14px 0 0;
          }

          &:last-child {
            border-radius: 0 0 14px 14px;
          }

          &__link {
            text-decoration: none;
            color: inherit;
          }
        }
      }
    }

    &__btn-create {
      @include defineBtnAccent(24px, 91px, 32px, 28px);
      cursor: pointer;
    }
  }
</style>
