<template>
  <div class="sort">
    <button
      class="sort__close"
      @click="emit('close')"
    >
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.1666 25.1667L1.83331 1.83333M25.1666 1.83333L1.83331 25.1667"
          stroke="#1A1A1A"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <h4 class="sort__title">
      Сортировка
    </h4>
    <div class="sort__item">
      <a
        class="sort__link"
        href="#"
        :class="{ 'sort__link--active': showPopular }"
        @click.prevent="showPopular = !showPopular"
      >
        <p class="sort__text">Популярность</p>

        <svg
          v-if="!popularSwitcher"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5625 7.125L9.5 13.0625L15.4375 7.125"
            stroke="black"
            stroke-opacity="0.87"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div
          v-else
          class="chosen"
        >
          <p class="chosen__text">({{ popularSwitcher }})</p>
          <button
            class="chosen__clear"
            @click.stop="popularSwitcher = ''"
          />
        </div>
      </a>
      <ul
        v-if="showPopular"
        class="list"
      >
        <li
          v-for="(item, idx) in popularArray"
          :key="idx"
          class="list__item"
        >
          <a
            href="#"
            class="list__link"
            :class="{ 'list__link--active': popularSwitcher === item }"
            @click.prevent="popularSwitcher = item"
          >{{ item }}</a>
        </li>
      </ul>
    </div>
    <div class="sort__item">
      <a
        class="sort__link"
        href="#"
        :class="{ 'sort__link--active': showTime }"
        @click.prevent="showTime = !showTime"
      >
        <p class="sort__text">Время добавления</p>

        <svg
          v-if="!timeSwitcher"
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5625 7.125L9.5 13.0625L15.4375 7.125"
            stroke="black"
            stroke-opacity="0.87"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div
          v-else
          class="chosen"
        >
          <p class="chosen__text">({{ timeSwitcher }})</p>
          <button
            class="chosen__clear"
            @click.stop="timeSwitcher = ''"
          />
        </div>

      </a>
      <ul
        v-if="showTime"
        class="list"
      >
        <li
          v-for="(item, idx) in timeArray"
          :key="idx"
          class="list__item"
        >
          <a
            href="#"
            class="list__link"
            :class="{ 'list__link--active': timeSwitcher === item }"
            @click.prevent="timeSwitcher = item"
          >{{ item }}</a>
        </li>
      </ul>
    </div>
    <button
      class="sort__btn"
      @click="getFilteredProducts"
    >
      Готово
    </button>
    <a
      class="sort__clear"
      href="#"
      @click.prevent="clearSort"
    >Сбросить</a>
  </div>
</template>

<script setup>
import { products } from '@/store/products';

const showPopular = ref(false);
const popularArray = ['по возрастанию', 'по убыванию'];
const popularSwitcher = ref('');

const showTime = ref(false);
const timeArray = ['неделю назад', 'две недели назад', 'месяц назад', 'два месяца назад'];
const timeSwitcher = ref('');

const emit = defineEmits(['close']);

async function clearSort() {
  popularSwitcher.value = '';
  timeSwitcher.value = '';

  await products().GET_ALL_PRODUCTS();

  emit('close');
}

async function getFilteredProducts() {
  let filter = '';
  const currentDate = new Date();
  const filterDate = new Date();

  if (popularSwitcher.value === 'по возрастанию') {
    filter += 'ordering=+views_count&';
  } else if (popularSwitcher.value === 'по убыванию') {
    filter += 'ordering=-views_count&';
  }

  if (timeSwitcher.value === 'неделю назад') {
    filterDate.setDate(currentDate.getDate() - 7);
    filter += `min_created=${filterDate.toISOString().split('T')[0]}&max_created=${currentDate.toISOString().split('T')[0]}`;
  } else if (timeSwitcher.value === 'две недели назад') {
    filterDate.setDate(currentDate.getDate() - 14);
    filter += `min_created=${filterDate.toISOString().split('T')[0]}&max_created=${currentDate.toISOString().split('T')[0]}`;
  } else if (timeSwitcher.value === 'месяц назад') {
    filterDate.setDate(currentDate.getMonth() - 1);
    filter += `min_created=${filterDate.toISOString().split('T')[0]}&max_created=${currentDate.toISOString().split('T')[0]}`;
  } else if (timeSwitcher.value === 'два месяца назад') {
    filterDate.setDate(currentDate.getMonth() - 2);
    filter += `min_created=${filterDate.toISOString().split('T')[0]}&max_created=${currentDate.toISOString().split('T')[0]}`;
  }

  await products().GET_FILTRED_PRODUCTS(filter);

  emit('close');
}
</script>

<style lang="scss" scoped>
.sort {
  max-height: 100vh;
  overflow-y: auto;
  padding: 55px 20px 140px;
  z-index: 100;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: $mobile-modal;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 750px) {
    padding: 25px 20px 120px;
  }

  &__close {
    position: absolute;
    top: 30px;
    right: 30px;
    padding: 0;
    border: none;
    background-color: transparent;

    @media (max-width: 750px) {
      top: 22px;
      right: 22px;

      & svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  &__title {
    @include defineFontMontserrat(700, 24px, 29px);
    color: $black;
    margin-bottom: 45px;

    @media (max-width: 750px) {
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 20px;
    }
  }

  &__item {
    width: 100%;
    max-width: 480px;
    padding-bottom: 25px;
    border-bottom: 1px solid #C4DBFF;

    @media (max-width: 750px) {
      padding-bottom: 15px;
      max-width: none;
    }

    &:nth-child(4) {
      border: none;
      padding: 25px 0 0 0;
      margin-bottom: 55px;

      @media (max-width: 750px) {
        padding-top: 15px;
        margin-bottom: 35px;
      }
    }
  }

  &__link {
    @include defineFontMontserrat(600, 16px, 20px);
    text-decoration: none;
    color: $black;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 750px) {
      font-size: 14px;
      line-height: 17px;
    }

    & svg {
      transition: transform 0.2s ease-in-out;

      @media (max-width: 750px) {
        width: 17px;
        height: 17px;
      }
    }

    &--active {
      margin-bottom: 11px;

      & svg {
        transform: rotate(180deg)
      }
    }
  }

  &__text {
    margin: 0;
    padding: 0;
  }

  &__btn {
    @include defineBtnPrimary(20px, 10px, 13px, 41px);
    margin-bottom: 36px;

    @media (max-width: 750px) {
      font-size: 15px;
      line-height: 18px;
      padding: 15px 25px;
      margin-bottom: 25px;
    }
  }

  &__clear {
    @include defineFontMontserrat(600, 13px, 16px);
    color: $black;
  }
}

.list {
  list-style: none;
  padding: 16px 27px;
  margin: 0;
  background-color: $white;
  border-radius: 8px;

  &__item {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__link {
    display: block;
    width: 100%;
    @include defineFontMontserrat(600, 15px, 18px);
    text-decoration: none;
    color: $black;

    @media (max-width: 750px) {
      font-size: 13px;
      line-height: 16px;
    }

    &--active {
      color: $primary;
      background: url('@/assets/img/sort-mobile-check.svg') no-repeat right center;
    }
  }
}

.chosen {
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 750px) {
    gap: 10px;
  }

  &__text {
    @include defineFontMontserrat(500, 15px, 18px);
    color: $primary;

    @media (max-width: 750px) {
      font-size: 13px;
      line-height: 16px;
    }
  }

  &__clear {
    width: 20px;
    height: 20px;
    border: none;
    background: url('@/assets/img/sort-mobile-clear.svg') no-repeat center center / 20px 20px;

    @media (max-width: 750px) {
      width: 16px;
      height: 16px;
      background-size: 16px 16px;
    }
  }
}
</style>
