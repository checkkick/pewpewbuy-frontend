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
  @include defineFontMontserrat(500, 20px, 1.4);
  color: $black;
  width: calc((100% - (20px * 3)) / 4);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  @media (max-width: 1000px) {
    width: calc((100% - (20px * 2)) / 3);
  }

  @media (max-width: 800px) {
    width: calc((100% - (20px * 1)) / 2);
  }

  @media (max-width: 650px) {
    width: 100%;
  }

  &:hover &__image {
    filter: drop-shadow(0px 11px 18px rgba(128, 173, 241, 0.13));
  }

  &__swiper {
    width: 100%;
    max-height: 327px;
    padding-bottom: 25px;
    margin-bottom: 10px;

    &__slide {
      cursor: grab;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f0f0f0;
      border-radius: 15px;

      &__image {
        width: 100%;
        height: 100%;
        border-radius: 15px;
        object-fit: contain;
      }
    }
  }

  &__title {
    @include defineFontMontserrat(700, 20px, 1.4);
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
    cursor: pointer;
    @include defineBtnPrimary(18px, 35px, 18px, 26px);

    &.accent {
      color: $black-light;
      border: 1px solid #515151;
      background: transparent;

      &:hover {
        background-color: #515151;
        color: $white;
      }
    }
  }

  &__like {
    z-index: 1;
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

<style>
.product-card__swiper .swiper-pagination-bullet {
  background-color: #9e9e9e;
}
.product-card__swiper .swiper-pagination-bullet-active {
  background-color: #6f6f6f;
}
.product-card__swiper .swiper-pagination-fraction,
.product-card__swiper .swiper-pagination-custom,
.product-card__swiper .swiper-horizontal > .swiper-pagination-bullets,
.product-card__swiper .swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: 5px;
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
