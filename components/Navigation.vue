<template>
  <div class="nav">
    <nav class="nav__filter">
      <ul class="nav__filter__list">
        <li
          v-for="(filterItem, idx) in Object.keys(filterMenu)"
          :key="idx"
          class="nav__filter__list__item"
          :class="{ active: filterItem === chooseFilter }"
          @click="chooseFilter = filterItem"
        >
          <a href="#" class="nav__filter__list__item__link" @click.prevent>{{
            filterItem
          }}</a>
          <ul
            v-if="filterItem === chooseFilter"
            class="nav__filter__dropdown-list"
          >
            <li
              v-for="(item, index) in filterMenu[filterItem]"
              :key="index"
              class="nav__filter__dropdown-list__item"
              :class="{ active: item === chooseSubfilter }"
              @click="chooseSubfilter = item"
            >
              <a
                class="nav__filter__dropdown-list__item__link"
                href="#"
                @click.prevent
                >{{ item }}</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <button class="nav__btn-create">Разместить объявление</button>
  </div>
</template>

<script setup>
const chooseFilter = ref('')
const chooseSubfilter = ref('')
const filterMenu = {
  'Страйкбольное оружие': [
    'АК-серия',
    'Винтовки',
    'Пулеметы',
    'Дробовики',
    'Автоматы',
    'Автоматы прочие модели',
    'АС ВАЛ, ВСС, СР-3М',
    'Гранатометы',
  ],
  'Внешний тюнинг': [
    'Антабки',
    'Трассерные насадки',
    'Глушители',
    'Переходники к глушителям',
    'Коллиматоры',
    'Крепления',
  ],
  'Внутренний тюнинг': [
    'Втулки и подшипники',
    'Направляющие пружин',
    'Гирбоксы',
    'Ноззл',
    'Моторы',
    'Планка переводчика огня',
  ],
  Снаряжение: [
    'Кобуры',
    'Ножи тренировочные',
    'Питьевые системы',
    'Подсумки',
    'Чехлы, сумки',
    'Рюкзаки',
    'Фонари и маркеры',
    'Ремни для оружия',
  ],
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 42px;
  margin-bottom: 40px;
  padding: 0 70px;

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
    @include defineFontMontserrat(600, 24px, 1);
    cursor: pointer;
    padding: 32px 28px;
    background: $accent;
    border: none;
    border-radius: 91px;

    &:focus-visible {
      outline: 1px solid $black-light;
    }

    &:active {
      box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
