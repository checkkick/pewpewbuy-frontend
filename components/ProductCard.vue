<template>
  <div class="product-card">
    <swiper
      class="product-card__swiper"
      :modules="modules"
      :slides-per-view="1"
      :space-between="50"
      :pagination="{ clickable: true }">
      <swiper-slide
        v-for="photo in product.photo"
        :key="photo.id"
        class="product-card__swiper__slide">
        <img
          class="product-card__swiper__slide__image"
          :src="photo.file"
          alt="product" />
      </swiper-slide>
    </swiper>

    <h4 class="product-card__title">
      {{ product.manufacturer }} {{ product.name }}
    </h4>
    <p class="product-card__location">Местоположение: {{ product.location }}</p>
    <div class="product-card__flex">
      <p>Цена:</p>
      <p class="product-card__flex__price">{{ product.price }} р.</p>
    </div>
    <div class="product-card__flex">
      <button class="product-card__btn">Профиль продавца</button>
      <button
        class="product-card__btn accent"
        @click.prevent="
          authorized
            ? $router.push('/product/' + product.id)
            : $router.push('/?login')
        ">
        Подробнее
      </button>
    </div>
    <a
      v-if="authorized"
      class="product-card__like"
      :class="{ active: like }"
      @click.prevent="onLike()">
      <svg
        width="19"
        height="17"
        viewBox="0 0 19 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.4273 8.83847C0.685237 6.57411 1.26592 3.17756 4.16935 2.04538C7.07279 0.913203 8.81485 3.17756 9.39553 4.30975C9.97622 3.17756 12.299 0.913203 15.2024 2.04538C18.1058 3.17756 18.1058 6.57411 16.3638 8.83847C14.6217 11.1028 9.39553 15.6316 9.39553 15.6316C9.39553 15.6316 4.16935 11.1028 2.4273 8.83847Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </a>
  </div>
</template>

<script>
import { auth } from '@/store/auth'
import { products } from '@/store/products'

import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
    liked: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup() {
    const useAuthStore = auth()
    const useProductStore = products()
    return {
      useAuthStore,
      useProductStore,
      authorized: computed(() => useAuthStore.AUTHORIZED),
      modules: [Pagination],
    }
  },
  data: () => {
    return {
      like: false,
    }
  },

  mounted() {
    this.like = this.product.is_favourite
  },
  methods: {
    async onLike() {
      if (!this.like) {
        if (await this.useProductStore.ADD_FAVORITE(this.product.id)) {
          this.like = true
        }
      } else if (await this.useProductStore.REMOVE_FAVORITE(this.product.id)) {
        this.like = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.product-card {
  @include defineFontMontserrat(500, 14px, 1.4);
  color: $black;
  width: calc((100% - (15px * 3)) / 4);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  &:hover &__image {
    filter: drop-shadow(0px 11px 18px rgba(128, 173, 241, 0.13));
  }

  &__swiper {
    width: 100%;
    height: 100%;
    max-height: 327px;
    padding-bottom: 25px;
    margin-bottom: 10px;
    border-radius: 11px;

    &__slide {
      cursor: grab;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $filter-background;
      border-radius: 11px;

      &__image {
        width: 100%;
        height: 100%;
        border-radius: 11px;
        object-fit: contain;
      }
    }
  }

  &__title {
    @include defineFontMontserrat(700, 15px, 1.4);
  }

  &__flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;

    &__price {
      font-weight: 700;
      font-size: 15px;
    }
  }

  &__btn {
    cursor: pointer;
    @include defineBtnPrimary(14px, 26px, 12px, 16px);
    justify-content: center;
    flex-grow: 1;

    &.accent {
      color: $black-light;
      border: 1px solid $input-login-color;
      background: transparent;

      &:hover {
        box-shadow: none;
        background-color: $input-login-color;
        color: $white;
      }
    }
  }

  &__like {
    z-index: 1;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    background-color: $grey;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);

    & > svg {
      transition: scale 0.1s ease-in-out, fill 0.1s ease-in-out;
    }

    & > svg path {
      transition: stroke 0.3s ease-in-out;
    }

    &.active > svg {
      fill: $accent-dark;
    }

    &.active > svg path {
      stroke: $accent-dark;
    }

    &:hover > svg path {
      stroke: $accent-dark;
    }

    &:active > svg {
      scale: 1.3;
    }
  }
}
</style>

<style lang="scss">
.product-card__swiper .swiper-pagination-bullet {
  background-color: $black;
  width: 7px;
  height: 7px;
}
.product-card__swiper .swiper-pagination-bullet-active {
  background-color: $input-login-color;
}
.product-card__swiper .swiper-pagination-fraction,
.product-card__swiper .swiper-pagination-custom,
.product-card__swiper .swiper-horizontal > .swiper-pagination-bullets,
.product-card__swiper .swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-card__swiper .swiper-pagination-lock {
  display: flex;
}
.product-card__swiper .swiper-pagination-bullet:only-child {
  display: block !important;
}
</style>
