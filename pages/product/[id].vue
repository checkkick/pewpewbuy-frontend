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

          <ul
            v-if="
              detProduct.valueassets ? detProduct.valueassets.length > 0 : false
            "
            class="product-about">
            <li
              v-for="item in detProduct.valueassets"
              :key="item.id"
              class="product-about__item">
              <p class="product-about__label">
                {{ item.asset.name }}
              </p>
              <p class="product-about__value">
                {{ item.value }} {{ item.asset.measure_units }}
              </p>
            </li>
          </ul>

          <p v-else class="no-product-about">
            Нет данных о характеристиках товара
          </p>
        </div>

        <div class="row-more">
          <div class="switcher">
            <p
              class="switcher__about-product"
              :class="
                switcher === 'about-product'
                  ? 'switcher__about-product_active'
                  : ''
              "
              @click="switcher = 'about-product'">
              Описание
            </p>
            <p
              class="switcher__reviews"
              :class="switcher === 'reviews' ? 'switcher__reviews_active' : ''"
              @click="switcher = 'reviews'">
              Отзывы о продавце
            </p>
          </div>
          <div class="price">
            <p class="price__value">
              {{
                detProduct.price ? detProduct.price.toLocaleString() : '0'
              }}
              р.
            </p>
            <button class="price__btn-contact" @click="showContacts = true">
              Написать продавцу
            </button>
            <NuxtLink href="#" class="price__all-products"
              >Все товары продавца</NuxtLink
            >
          </div>
        </div>

        <div v-if="switcher === 'about-product'" class="product-description">
          <p class="product-description__text">{{ detProduct.description }}</p>
        </div>

        <div v-if="switcher === 'reviews'" class="user-reviews">
          <div class="review">
            <div class="about-user">
              <img
                src="@/assets/img/no-photo.png"
                alt=""
                class="about-user__photo" />
              <p class="about-user__name">Кирилл</p>
              <p class="about-user__rating">5,0</p>
              <RatingCalc :stars="5" />
              <p class="about-user__date">22.04.2022</p>
            </div>

            <p class="review__text">
              Отличный продавец! Все в точности, как было в описании к товару.
              Приятный в общении, ответственный! Продавца 100% рекомендую!
              Отличный продавец! Все в точности, как было в описании к товару.
              Приятный в общении, ответственный! Продавца 100% рекомендую!
              Приятный в общении, ответственный! Продавца 100%
              рекомендую!Приятный в общении, ответственный! Продавца 100%
              рекомендую!
            </p>
          </div>
        </div>
      </section>

      <ContactsModal
        v-if="showContacts"
        :fio="`${detProduct.user.first_name} ${detProduct.user.last_name}`"
        :email="detProduct.user.email"
        :vk="detProduct.user.vk"
        :tg="detProduct.user.tg"
        @close-login-window="showContacts = false" />
    </main>
  </div>
</template>

<script>
import noPhoto from '@/assets/img/no-photo.png'
import ContactsModal from '@/components/product/ContactsModal.vue'
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
    ContactsModal,
  },
  setup() {
    definePageMeta({
      middleware: ['authorization'],
    })

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
      switcher: 'about-product',
      showContacts: false,
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
  margin-bottom: 116px;

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

  &:nth-child(3) {
    margin-bottom: 90px;
  }
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
    background-color: $modal-background;
    border-radius: 7px;
  }

  &__photo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 7px;
  }

  &__preview-carousel {
    height: 20%;
    box-sizing: border-box;
    padding: 18px 0 18px 2px;
    & .swiper-slide-thumb-active {
      opacity: 1;
      outline: 2px solid #f8b94e;
    }
  }

  &__preview-slide {
    border-radius: 2px;
    cursor: pointer;
    width: 25%;
    height: 100%;
    opacity: 0.4;
    background-color: $modal-background;
  }

  &__preview-photo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 2px;
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
.no-product-about {
  text-align: center;
  margin: 0;
  padding: 0;
  width: 100%;
  @include defineFontMontserrat(500, 28px, 1.4);
  color: $black-light;
}
.row-more {
  width: 100%;
  display: flex;
  align-items: flex-end;
}
.switcher {
  width: 85%;
  display: flex;
  margin-right: 75px;

  &__about-product,
  &__reviews {
    cursor: pointer;
    position: relative;
    @include defineFontMontserrat(600, 25px, 1.4);
    color: #070707;
    padding: 19px 10%;
    border-bottom: 2px solid #bdbdbd;
  }

  &__about-product_active:after,
  &__reviews_active:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: -2px;
    left: 0;
    right: 0;
    border-bottom: 2px solid #101010;
  }
}
.price {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  &__value {
    @include defineFontMontserrat(700, 47px, 1.4);
    letter-spacing: -0.5px;
  }

  &__btn-contact {
    @include defineBtnPrimary(20px, 91px, 21px, 32px);
  }

  &__all-products {
    @include defineFontMontserrat(600, 20px, 24px);
    color: $primary;
    letter-spacing: -0.5px;
  }
}
.product-description {
  padding-top: 53px;

  &__text {
    @include defineFontMontserrat(400, 25px, 1.75);
    margin: 0;
    padding: 0;
  }
}
.user-reviews {
  padding-top: 68px;
}
.review {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 35px;

  &__text {
    @include defineFontMontserrat(400, 25px, 1.75);
    margin: 0;
    padding: 0;
  }
}
.about-user {
  display: flex;
  align-items: center;

  &__photo {
    border-radius: 50%;
    width: 52px;
    height: 52px;
    margin-right: 20px;
  }
  &__name {
    @include defineFontMontserrat(600, 20px, 24px);
    margin-right: 30px;
    padding: 0;
  }
  &__rating {
    @include defineFontMontserrat(400, 17px, 1.6);
    margin-right: 10px;
    padding: 0;
  }
  &__date {
    @include defineFontMontserrat(400, 17px, 21px);
    padding: 0 0 0 35px;
    color: rgba(65, 65, 65, 0.65);
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
