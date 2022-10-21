<template>
  <div class="container">
    <Navigation />

    <main class="main">
      <h2 class="main__title">Доска объявлений</h2>
      <section class="crumbs">
        <h4 v-for="item in crumbs" :key="item" class="crumbs__title">
          {{ item }}
        </h4>
      </section>

      <section class="card">
        <div class="about-seller">
          <img
            class="about-seller__photo"
            :src="userImage"
            alt="seller photo" />
          <div class="seller-info">
            <h4 class="seller-info__name">
              {{ detProduct.user.first_name }} {{ detProduct.user.last_name }}
            </h4>
            <div class="seller-detail">
              <p class="seller-detail__nickname">
                {{ detProduct.user.call_sign }}
              </p>
              <RatingCalc :stars="Math.floor(detProduct.user.rep)" />
            </div>
          </div>
          <NuxtLink href="/profile" class="about-seller__profile-link"
            >Профиль продавца</NuxtLink
          >
        </div>

        <h3 class="card__title">
          {{ detProduct.manufacturer }} {{ detProduct.name }}
        </h3>

        <div class="description">
          <div class="swiper swiper_relative">
            <swiper
              :space-between="10"
              :navigation="true"
              :thumbs="{ swiper: thumbsSwiper }"
              :modules="modules"
              class="swiper__carousel">
              <swiper-slide
                v-for="item in detProduct.photo"
                :key="item.id"
                class="swiper__slide">
                <img class="swiper__photo" :src="item.file" alt="photo" />
              </swiper-slide>
            </swiper>

            <swiper
              class="swiper__preview-carousel"
              :space-between="10"
              :slides-per-view="4"
              free-mode
              watch-slides-progress
              :modules="[Thumbs]"
              @swiper="setThumbsSwiper">
              <swiper-slide
                v-for="(item, idx) in detProduct.photo"
                :key="item.id"
                :class="idx === 0 ? 'swiper-slide-thumb-active' : ''"
                class="swiper__preview-slide">
                <img
                  class="swiper__preview-photo"
                  :src="item.file"
                  alt="photo" />
              </swiper-slide>
            </swiper>
          </div>

          <ul class="product-about">
            <li class="product-about__item">
              <p class="product-about__label">Модель оружия</p>
              <p class="product-about__value">{{ detProduct.name }}</p>
            </li>
            <li class="product-about__item">
              <p class="product-about__label">Емкость магазина</p>
              <p class="product-about__value">350 шаров</p>
            </li>
            <li class="product-about__item">
              <p class="product-about__label">Тип магазина</p>
              <p class="product-about__value">Бункерный</p>
            </li>
            <li class="product-about__item">
              <p class="product-about__label">Производитель</p>
              <p class="product-about__value">Cyma, Китай</p>
            </li>
            <li class="product-about__item">
              <p class="product-about__label">
                Скорость выхлопа/дульная энергия
              </p>
              <p class="product-about__value">1,7 Дж</p>
            </li>
            <li class="product-about__item">
              <p class="product-about__label">Принцип действия</p>
              <p class="product-about__value">AEG</p>
            </li>
            <li class="product-about__item">
              <p class="product-about__label">Разъем аккумулятора (если АЕГ)</p>
              <p class="product-about__value">Mini-tamya</p>
            </li>
            <li class="product-about__item">
              <p class="product-about__label">Комплектация</p>
              <p class="product-about__value">
                магазин, шарики, инструкция, аккумулятор, зарядное устройство,
                шомпол
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import noPhoto from '@/assets/img/no-photo.png'
import RatingCalc from '@/components/profile/RatingCalc.vue'
import { products } from '@/store/products'

import { FreeMode, Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { Swiper, SwiperSlide } from 'swiper/vue'

export default {
  components: {
    RatingCalc,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const thumbsSwiper = ref(null)
    const setThumbsSwiper = swiper => {
      thumbsSwiper.value = swiper
    }

    const useProductStore = products()
    return {
      useProductStore,
      Thumbs,
      thumbsSwiper,
      setThumbsSwiper,
      modules: [FreeMode, Navigation, Thumbs],
    }
  },
  data: () => {
    return {
      detProduct: {
        user: {
          first_name: '',
          last_name: '',
          call_sign: '',
          rep: 0,
        },
      },
      crumbs: [],
      userImage: '',
    }
  },
  async mounted() {
    try {
      this.detProduct = await this.useProductStore.GET_DETAIL_PRODUCT(
        this.$route.params.id
      )

      if (this.detProduct.user.avatar) {
        this.userImage = this.detProduct.user.avatar
      } else {
        this.userImage = noPhoto
      }

      console.log(this.detProduct)

      this.crumbs.push(
        this.detProduct.category.parent_category.name,
        this.detProduct.category.name,
        `${this.detProduct.manufacturer} ${this.detProduct.name}`
      )
    } catch (error) {}
  },
}
</script>

<style lang="scss" scoped>
.main {
  &__title {
    @include defineFontMontserrat(600, 36px, 44px);
    margin-bottom: 40px;
  }
}
.crumbs {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 35px;

  &__title {
    position: relative;
    @include defineFontMontserrat(500, 24px, 1.4);
    padding-right: 32px;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 12px;
      bottom: 0;
      width: 0.7rem;
      height: 0.7rem;
      border-bottom: 3px solid $black;
      border-right: 3px solid $black;
      transform: rotate(-45deg);
    }

    &:last-child::after {
      content: none;
    }
  }
}
.card {
  background: #ffffff;
  border: 1px solid #dedede;
  box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
  border-radius: 32px;
  padding: 50px 105px;

  &__title {
    @include defineFontMontserrat(600, 30px, 1.4);
    color: #4b8ff5;
    margin-bottom: 35px;
  }
}
.about-seller {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 40px;

  &__photo {
    border-radius: 50%;
    align-self: center;
    width: 72px;
    height: 72px;
  }

  &__profile-link {
    @include defineFontMontserrat(500, 20px, 1.4);
    color: #4b8ff5;
    text-decoration: none;
    border-bottom: 1px solid #4b8ff5;
  }
}
.seller-info {
  margin-right: 30px;

  &__name {
    @include defineFontMontserrat(500, 24px, 29px);
    margin-bottom: 17px;
  }
}
.seller-detail {
  display: flex;
  align-items: center;
  gap: 19px;

  &__nickname {
    @include defineFontMontserrat(400, 18px, 22px);
  }
}
.description {
  display: flex;
  justify-content: stretch;
  width: 100%;
  gap: 45px;
}
.swiper {
  position: static;
  width: 100%;
  max-height: 550px;

  &_relative {
    padding: 0 75px;
    margin-left: -75px;
    position: relative;
  }

  &__carousel {
    height: 80%;
    width: 100%;
  }

  &__slide {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $filter-background;
    border-radius: 32px;
  }

  &__photo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 32px;
  }

  &__preview-carousel {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0 10px 2px;
    & .swiper-slide-thumb-active {
      opacity: 1;
      outline: 2px solid #f8b94e;
    }
  }

  &__preview-slide {
    border-radius: 12px;
    cursor: pointer;
    width: 25%;
    height: 100%;
    opacity: 0.4;
    background-color: $filter-background;
  }

  &__preview-photo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;
  }
}
.product-about {
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 23px;

  &__item {
    display: flex;
    gap: 70px;
  }

  &__label {
    @include defineFontMontserrat(400, 25px, 1.4);
    width: 100%;
  }
  &__value {
    @include defineFontMontserrat(600, 22px, 1.4);
    width: 100%;
  }
}
</style>

<style lang="scss">
.swiper__carousel .swiper-button-prev {
  left: 0;
  right: auto;
}

.swiper__carousel .swiper-button-next {
  left: auto;
  right: 0;
}

.swiper__carousel .swiper-button-prev,
.swiper__carousel .swiper-button-next {
  position: absolute;
  top: 40%;
  width: 45px;
  height: 45px;
  margin-top: calc(0px - 45px / 2);
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $accent;
  transition: opacity 0.3s ease-in-out;
}

.swiper__carousel .swiper-button-prev::before,
.swiper__carousel .swiper-button-next::before {
  content: '';
  position: absolute;
  background-color: #f7f7f7;
  border: 1px solid #dedede;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.swiper__carousel .swiper-button-prev::after {
  content: '';
  position: absolute;
  left: 19px;
  width: 10px;
  height: 10px;
  border-bottom: 1px solid $black;
  border-left: 1px solid $black;
  transform: rotate(45deg);
  transition: border-color 0.3s ease-in-out;
}

.swiper__carousel .swiper-button-next::after {
  content: '';
  position: absolute;
  right: 19px;
  width: 10px;
  height: 10px;
  border-bottom: 1px solid $black;
  border-right: 1px solid $black;
  transform: rotate(-45deg);
}

.swiper__carousel
  .swiper-button-prev:not(.swiper-button-disabled):hover::before,
.swiper__carousel
  .swiper-button-next:not(.swiper-button-disabled):hover::before {
  background-color: $accent;
  border: none;
}

.swiper__carousel
  .swiper-button-prev:not(.swiper-button-disabled):active::before,
.swiper__carousel
  .swiper-button-next:not(.swiper-button-disabled):active::before {
  background-color: $accent-dark;
  border: none;
}
.swiper__carousel .swiper-button-disabled {
  opacity: 0.3;
}
</style>
