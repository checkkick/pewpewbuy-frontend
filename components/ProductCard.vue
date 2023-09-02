<template>
  <div
    class="product-card"
    @click="tablet
      ? (authorized
        ? $router.push('/product/' + product.id)
        : $router.push('/?login'))
      : ''
      "
  >
    <swiper
      v-if="product.photo.length > 0"
      class="product-card__swiper"
      :modules="modules"
      :slides-per-view="1"
      :space-between="50"
      :pagination="{ clickable: true }"
    >
      <swiper-slide
        v-for="photo in product.photo"
        :key="photo.id"
        class="product-card__slide"
      >
        <img
          class="product-card__image"
          :src="photo.file"
          alt="product"
        >
      </swiper-slide>
    </swiper>
    <div
      v-else
      class="product-card__swiper"
    >
      <div class="product-card__no-photo">
        <p class="product-card__no-text">
          Фото товара отсутствует
        </p>
      </div>
    </div>

    <h4 class="product-card__title">
      {{ product.manufacturer }} {{ product.name }}
    </h4>

    <p
      v-if="!tablet"
      class="product-card__text"
    >
      Местоположение: {{ product.location }}
    </p>
    <p
      v-else
      class="product-card__text"
    >
      {{ product.location }}
    </p>

    <div class="product-card__flex">
      <p
        v-if="!tablet"
        class="product-card__text"
      >
        Цена:
      </p>
      <p class="product-card__price">
        {{ product.price }} р.
      </p>
    </div>
    <div
      v-if="!tablet"
      class="product-card__flex"
    >
      <button
        class="product-card__btn"
        @click.prevent="authorized
          ? $router.push('/profile/' + product.user)
          : $router.push('/?login')
          "
      >
        Профиль продавца
      </button>
      <button
        class="product-card__btn product-card__btn--accent"
        @click="authorized
          ? $router.push('/product/' + product.id)
          : $router.push('/?login')
          "
      >
        Подробнее
      </button>
    </div>
    <a
      v-if="authorized"
      class="product-card__like"
      :class="{ 'product-card__like--active': like }"
      @click.stop="onLike()"
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99075 16.4745C9.72158 16.5695 9.27825 16.5695 9.00909 16.4745C6.71325 15.6908 1.58325 12.4212 1.58325 6.87952C1.58325 4.43327 3.5545 2.4541 5.98492 2.4541C7.42575 2.4541 8.70033 3.15077 9.49992 4.22744C10.2995 3.15077 11.582 2.4541 13.0149 2.4541C15.4453 2.4541 17.4166 4.43327 17.4166 6.87952C17.4166 12.4212 12.2866 15.6908 9.99075 16.4745Z"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>
  </div>
</template>

<script>
import { auth } from '@/store/auth';
import { products } from '@/store/products';
import { media } from '@/store/media';

import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    liked: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {
    const useAuthStore = auth();
    const useProductStore = products();
    return {
      useAuthStore,
      useProductStore,
      authorized: computed(() => useAuthStore.AUTHORIZED),
      modules: [Pagination],
      tablet: computed(() => media().MEDIA_TABLET),
    };
  },
  data: () => ({
    like: false,
  }),

  mounted() {
    this.like = this.product.is_favorite;
  },
  methods: {
    async onLike() {
      if (!this.like) {
        if (await this.useProductStore.ADD_FAVORITE(this.product.id)) {
          this.like = true;
        }
      } else if (await this.useProductStore.REMOVE_FAVORITE(this.product.id)) {
        this.like = false;
      }
    },
  },
};
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
  gap: 1rem;
  justify-content: space-between;
  transition: transform 0.2s ease-in-out;

  @media (max-width: 1150px) {
    gap: 0.1rem;
  }

  @media (max-width: 750px) {
    width: calc((100% - (15px * 1)) / 2);
  }

  @media (min-width: 1150px) {
    &:hover {
      transform: translateY(-5px);
    }
  }

  &__swiper {
    width: 100%;
    height: 327px;
    padding-bottom: 25px;
    margin-bottom: 10px;
    border-radius: 11px;

    @media (max-width: 1150px) {
      height: 234px;
      padding-bottom: 25px;
      margin-bottom: 0;
    }

    @media (max-width: 550px) {
      height: 168px;
    }
  }

  &__no-photo {
    text-align: center;
    background-color: $filter-background;
    border-radius: 11px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1150px) {
      background-color: $modal-background;
    }
  }

  &__no-text {
    @include defineFontMontserrat(500, 14px, 1.4);
    padding: 0 0.5rem;
    width: 350px;
  }

  &__slide {
    cursor: grab;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $filter-background;
    border-radius: 11px;

    @media (max-width: 1150px) {
      background-color: $modal-background;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    border-radius: 11px;
    object-fit: contain;
  }

  &__title {
    @include defineFontMontserrat(700, 15px, 1.4);

    @media (max-width: 1150px) {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    @media (max-width: 750px) {
      font-size: 13px;
      line-height: 1.2;
      margin-bottom: 0.3rem;
    }
  }

  &__flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  &__text {
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: 1.3em;

    @media (max-width: 1150px) {
      max-width: 80%;
      font-weight: 400;
      font-size: 15px;
      color: $black-inactive;
    }

    @media (max-width: 750px) {
      font-size: 12px;
    }
  }

  &__price {
    margin: 0;
    font-weight: 700;
    font-size: 15px;

    @media (max-width: 750px) {
      font-size: 13px;
    }
  }

  &__btn {
    cursor: pointer;
    @include defineBtnPrimary(14px, 26px, 12px, 16px);
    justify-content: center;
    flex-grow: 1;

    &.product-card__btn--accent {
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

    @media (max-width: 1150px) {
      top: auto;
      right: 0;
      bottom: 0;
    }

    &>svg {
      transition: scale 0.1s ease-in-out, fill 0.1s ease-in-out;
    }

    &>svg path {
      transition: stroke 0.3s ease-in-out;
    }

    &.product-card__like--active>svg {
      fill: $accent-dark;
    }

    &.product-card__like--active>svg path {
      stroke: $accent-dark;
    }

    &:hover>svg path {
      stroke: $accent-dark;
    }

    &:active>svg {
      scale: 1.3;
    }
  }
}
</style>
