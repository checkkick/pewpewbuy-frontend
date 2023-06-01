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
      Фильтры
    </h4>

    <label
      class="sort__label"
      for="location"
    >Город</label>
    <input
      id="location"
      v-model="location"
      class="sort__input"
      type="text"
      placeholder="Москва"
    >

    <label
      class="sort__label"
      for="category"
    >Категория</label>
    <input
      id="category"
      v-model="category"
      class="sort__input"
      type="text"
      placeholder="Страйкбольное оружие"
    >

    <label
      class="sort__label"
      for="manufacturer"
    >Производитель</label>
    <input
      id="manufacturer"
      v-model="manufacturer"
      class="sort__input"
      type="text"
      placeholder="Cyma"
    >

    <button
      class="sort__btn"
      @click="getFilteredProducts"
    >
      Показать объявления
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

const emit = defineEmits(['close']);
const location = ref('');
const category = ref('');
const manufacturer = ref('');

async function clearSort() {
  location.value = '';
  category.value = '';
  manufacturer.value = '';

  await products().GET_ALL_PRODUCTS();

  emit('close');
}

async function getFilteredProducts() {
  let filter = '';

  if (location.value.length > 0) {
    filter += `location=${location.value}&`;
  }
  if (category.value.length > 0) {
    filter += `location=${category.value}&`;
  }
  if (manufacturer.value.length > 0) {
    filter += `location=${manufacturer.value}&`;
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

  &__label {
    @include defineFontMontserrat(500, 18px, 22px);
    width: 100%;
    max-width: 480px;
    color: #A3A6AD;
    margin-bottom: 4px;

    @media (max-width: 750px) {
      max-width: none;
      font-size: 13px;
      line-height: 16px;
    }
  }

  &__input {
    @include defineFontMontserrat(500, 16px, 20px);
    padding: 16px 10px;
    max-width: 480px;
    background-color: $white;
    border-radius: 8px;
    outline: none;
    border: none;
    width: 100%;
    margin-bottom: 15px;

    @media (max-width: 750px) {
      max-width: none;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 10px;
    }
  }

  &__btn {
    @include defineBtnPrimary(20px, 10px, 13px, 41px);
    margin: 35px 0 36px;

    @media (max-width: 750px) {
      font-size: 15px;
      line-height: 18px;
      padding: 15px 25px;
      margin: 15px 0 25px;
    }
  }

  &__clear {
    @include defineFontMontserrat(600, 13px, 16px);
    color: $black;
  }
}
</style>
