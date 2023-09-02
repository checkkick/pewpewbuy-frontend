<template>
  <div class="container">
    <main class="main">
      <h2 class="main__title">
        Доска объявлений
      </h2>
      <section class="crumbs">
        <h4
          v-for="(item, idx) in crumbs"
          :key="idx"
          class="crumbs__title"
          :class="{ 'crumbs__title--active': item.slug }"
          @click="item.slug ? $router.push(`/?slug=${item.slug}`) : ''"
        >
          {{ item.name }}
        </h4>
      </section>

      <section class="card">
        <div class="about-seller">
          <img
            class="about-seller__photo"
            :src="detProduct.user.avatar ? detProduct.user.avatar : noImage"
            alt="seller photo"
          >
          <div class="seller-info">
            <h4 class="seller-info__name">
              {{ detProduct.user.first_name }} {{ detProduct.user.last_name }}
            </h4>
            <div class="seller-detail">
              <p class="seller-detail__text">
                {{ detProduct.user.call_sign }}
              </p>
              <RatingCalc :stars="Math.floor(detProduct.user.rep)" />
              <p class="seller-detail__text">
                {{ detProduct.user.rep }}
              </p>
            </div>
          </div>
          <NuxtLink
            :href="userStore.id === detProduct.user.id
              ? '/profile'
              : `/profile/${detProduct.user.id}`
              "
            class="about-seller__profile-link"
          >
            Профиль продавца
          </NuxtLink>
        </div>

        <h3 class="card__title">
          {{ detProduct.manufacturer }} {{ detProduct.name }}
        </h3>

        <p class="price__value-mobile">
          {{ detProduct.price ? detProduct.price.toLocaleString() : '0' }}
          р.
        </p>

        <div class="description">
          <div class="swiper swiper--relative">
            <swiper
              :space-between="10"
              :navigation="true"
              :thumbs="{ swiper: thumbsSwiper }"
              :modules="modules"
              class="swiper__carousel"
            >
              <swiper-slide
                v-for="item in detProduct.photo"
                :key="item.id"
                class="swiper__slide"
              >
                <img
                  class="swiper__photo"
                  :src="item.file"
                  alt="photo"
                >
              </swiper-slide>
            </swiper>

            <swiper
              class="swiper__preview-carousel"
              :space-between="10"
              :slides-per-view="4"
              free-mode
              watch-slides-progress
              :modules="[Thumbs]"
              @swiper="setThumbsSwiper"
            >
              <swiper-slide
                v-for="(item, idx) in detProduct.photo"
                :key="item.id"
                :class="idx === 0 ? 'swiper-slide-thumb-active' : ''"
                class="swiper__preview-slide"
              >
                <img
                  class="swiper__preview-photo"
                  :src="item.file"
                  alt="photo"
                >
              </swiper-slide>
            </swiper>
          </div>

          <ul
            v-if="detProduct.valueassets ? detProduct.valueassets.length > 0 : false
              "
            class="product-about"
          >
            <h4 class="product-about__title">
              Характеристики
            </h4>
            <li
              v-for="item in detProduct.valueassets"
              :key="item.id"
              class="product-about__item"
            >
              <p class="product-about__label">
                {{ item.asset.name }}
              </p>
              <p class="product-about__value">
                {{ item.value }} {{ item.asset.measure_units }}
              </p>
            </li>
          </ul>

          <p
            v-else
            class="no-product-about"
          >
            Нет данных о характеристиках товара
          </p>
        </div>

        <div class="row-more">
          <div class="switcher">
            <p
              class="switcher__about-product"
              :class="switcher === 'about-product'
                ? 'switcher__about-product--active'
                : ''
                "
              @click="switcher = 'about-product'"
            >
              Описание
            </p>
            <p
              class="switcher__reviews"
              :class="switcher === 'reviews' ? 'switcher__reviews--active' : ''"
              @click="switcher = 'reviews'"
            >
              Отзывы о продавце
            </p>
          </div>
          <div class="price">
            <p class="price__value">
              {{ detProduct.price ? detProduct.price.toLocaleString() : '0' }}
              р.
            </p>
            <button
              class="price__btn-contact"
              @click="showContacts = true"
            >
              Написать продавцу
            </button>
            <button
              class="price__btn-profile-link"
              @click="userStore.id === detProduct.user.id
                ? $router.push('/profile')
                : $router.push(`/profile/${detProduct.user.id}`)"
            >
              Профиль продавца
            </button>
            <NuxtLink
              :href="userStore.id === detProduct.user.id
                ? '/profile?publications'
                : `/profile/${detProduct.user.id}?publications`
                "
              class="price__all-products"
            >
              Все товары продавца
            </NuxtLink>
          </div>
        </div>

        <div
          v-if="switcher === 'about-product'"
          class="product-description"
        >
          <h4 class="product-description__title">
            Описание
          </h4>
          <p class="product-description__text">
            {{ detProduct.description }}
          </p>
        </div>

        <div
          v-if="switcher === 'reviews'"
          class="user-reviews"
        >
          <div
            v-for="user in detProduct.user.about_user_reviews"
            :key="user.id"
            class="review"
          >
            <div class="about-user">
              <img
                :src="user.user.avatar ? user.user.avatar : noImage"
                :alt="user.user.first_name"
                class="about-user__photo"
              >
              <p class="about-user__name">
                {{ user.user.first_name }}
              </p>
              <p class="about-user__rating">
                {{ user.estimate }}
              </p>
              <RatingCalc :stars="user.estimate" />
              <p class="about-user__date">
                {{ new Date(user.created).toLocaleDateString() }}
              </p>
            </div>

            <p class="review__text">
              {{ user.text }}
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
        @close-contacts-window="showContacts = false"
      />
    </main>
  </div>
</template>

<script>
import noPhoto from '@/assets/img/no-photo.png';
import ContactsModal from '@/components/product/ContactsModal.vue';
import RatingCalc from '@/components/profile/RatingCalc.vue';

import { products } from '@/store/products';
import { clients } from '@/store/clients';

import { FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/vue';

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
      layout: 'auth-nav-layout',
    });

    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };
    const userStore = clients().USER_STATE;

    const useProductStore = products();
    return {
      useProductStore,
      Thumbs,
      thumbsSwiper,
      setThumbsSwiper,
      userStore,
      modules: [FreeMode, Navigation, Thumbs],
    };
  },
  data: () => ({
    detProduct: {
      user: {
        first_name: 'Имя',
        last_name: 'Фамилия',
        call_sign: 'Позывной',
        rep: 0,
      },
    },
    crumbs: [],
    noImage: noPhoto,
    switcher: 'about-product',
    showContacts: false,
  }),
  async mounted() {
    this.detProduct = await this.useProductStore.GET_DETAIL_PRODUCT(
      this.$route.params.id,
    );

    this.crumbs.push(
      { name: this.detProduct.category.name, slug: '' },
      {
        name: this.detProduct.category.child_categories[0].name,
        slug: this.detProduct.category.child_categories[0].slug,
      },
      {
        name: `${this.detProduct.manufacturer} ${this.detProduct.name}`,
        slug: '',
      },
    );
  },
};
</script>

<style lang="scss" scoped>
.main {
  @media (max-width: 750px) {
    margin-top: 5rem;
  }

  &__title {
    @include defineFontMontserrat(600, 27px, 33px);
    margin-bottom: 2rem;

    @media (max-width: 1150px) {
      font-size: 20px;
      line-height: 24px;
      margin-top: 6rem;
      margin-bottom: 1rem;
    }

    @media (max-width: 750px) {
      display: none;
    }
  }
}

.crumbs {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1150px) {
    margin-bottom: 1rem;
  }

  @media (max-width: 750px) {
    display: none;
  }

  &__title {
    position: relative;
    @include defineFontMontserrat(500, 18px, 22px);
    padding-right: 1.3rem;

    @media (max-width: 1150px) {
      font-size: 16px;
      line-height: 20px;
    }

    &.crumbs__title--active {
      cursor: pointer;
      text-decoration: underline;
      transition: color 0.2s ease-in-out;

      &:hover {
        color: $black-inactive;
      }
    }

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0.4rem;
      bottom: 0;
      width: 0.6rem;
      height: 0.6rem;
      border-bottom: 2px solid $black;
      border-right: 2px solid $black;
      transform: rotate(-45deg);
    }

    &:last-child::after {
      content: none;
    }
  }
}

.card {
  background: $white;
  border: 1px solid $filter-border;
  box-shadow: 0px 9px 100px rgba(255, 255, 255, 0.72);
  border-radius: 24px;
  padding: 2.5rem 4.5rem;
  margin-bottom: 116px;

  @media (max-width: 1150px) {
    padding: 1.5rem 2.5rem;
  }

  @media (max-width: 750px) {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    padding: 0;
    border: none;
  }

  &__title {
    @include defineFontMontserrat(600, 22px, 1.4);
    color: $primary;
    margin-bottom: 1rem;

    @media (max-width: 1150px) {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 0.5rem;
    }

    @media (max-width: 750px) {
      font-size: 15px;
      color: $black;
      text-align: center;
      margin-bottom: 0;
    }
  }
}

.about-seller {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 1150px) {
    margin-bottom: 1rem;
  }

  @media (max-width: 750px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 40px;
    background: $modal-mobile-background;
    border: 1px solid $boder-mobile;
    border-radius: 12px;
    margin-bottom: 0;
  }

  &__photo {
    border-radius: 50%;
    align-self: center;
    object-fit: cover;
    width: 55px;
    height: 55px;

    @media (max-width: 1150px) {
      width: 45px;
      height: 45px;
    }
  }

  &__profile-link {
    @include defineFontMontserrat(600, 15px, 1.4);
    color: $primary;
    text-decoration: none;
    border-bottom: 1px solid $primary;

    @media (max-width: 1150px) {
      font-size: 13px;
      line-height: 1rem;
    }

    @media (max-width: 750px) {
      display: none;
    }
  }
}

.seller-info {
  margin-right: 1rem;

  &__name {
    @include defineFontMontserrat(600, 18px, 22px);
    margin-bottom: 0.5rem;

    @media (max-width: 1150px) {
      font-size: 16px;
      line-height: 20px;
    }

    @media (max-width: 750px) {
      font-size: 12px;
      line-height: 15px;
    }
  }
}

.seller-detail {
  display: flex;
  align-items: center;
  gap: 0.7rem;

  &__text {
    @include defineFontMontserrat(400, 14px, 16px);

    @media (max-width: 750px) {
      font-size: 11px;
      line-height: 13px;
    }
  }
}

.description {
  display: flex;
  justify-content: stretch;
  width: 100%;
  gap: 3rem;

  @media (max-width: 1150px) {
    gap: 1rem;
  }

  @media (max-width: 750px) {
    gap: 0.5rem;
    flex-direction: column;
  }

  &:nth-child(3) {
    margin-bottom: 3rem;

    @media (max-width: 1150px) {
      margin-bottom: 1rem;
    }
  }
}

.swiper {
  position: static;
  width: 100%;
  max-height: 450px;

  &--relative {
    padding: 0 55px;
    margin-left: -55px;
    position: relative;

    @media (max-width: 750px) {
      padding: 0 30px;
      margin: 0;
    }
  }

  &__carousel {
    height: 80%;
    width: 100%;

    @media (max-width: 750px) {
      height: 90%;
    }
  }

  &__slide {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $modal-background;
    border-radius: 5px;
  }

  &__photo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 5px;

    @media (max-width: 750px) {
      max-height: 30vh;
    }
  }

  &__preview-carousel {
    height: 20%;
    box-sizing: border-box;
    padding: 14px 0 14px 2px;

    @media (max-width: 750px) {
      height: 7vh;
    }

    & .swiper-slide-thumb-active {
      opacity: 1;
      outline: 2px solid $accent-dark;
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
  gap: 1rem;

  &__title {
    display: none;

    @media (max-width: 750px) {
      text-align: center;
      @include defineFontMontserrat(700, 15px, 1.4);
      color: $black;
      display: block;
    }
  }

  &__item {
    display: flex;
    gap: 3rem;
  }

  &__label {
    @include defineFontMontserrat(400, 19px, 1.4);
    width: 100%;

    @media (max-width: 1150px) {
      font-size: 16px;
    }

    @media (max-width: 750px) {
      font-size: 13px;
    }
  }

  &__value {
    @include defineFontMontserrat(600, 17px, 1.4);
    width: 100%;

    @media (max-width: 1150px) {
      font-size: 14px;
    }

    @media (max-width: 750px) {
      font-size: 12px;
      text-align: center;
    }
  }
}

.no-product-about {
  text-align: center;
  margin: 0;
  padding: 0;
  width: 100%;
  @include defineFontMontserrat(500, 20px, 1.4);
  color: $black-light;

  @media (max-width: 1150px) {
    font-size: 16px;
  }

  @media (max-width: 750px) {
    font-size: 14px;
  }
}

.row-more {
  width: 100%;
  display: flex;
  align-items: flex-end;

  @media (max-width: 750px) {
    order: 2;
    flex-direction: column-reverse;
  }
}

.switcher {
  width: 100%;
  display: flex;

  @media (max-width: 750px) {
    display: none;
  }

  &__about-product,
  &__reviews {
    cursor: pointer;
    position: relative;
    @include defineFontMontserrat(600, 19px, 1.4);
    color: $black-contrast;
    padding: 15px 10%;
    border-bottom: 2px solid #bdbdbd;

    @media (max-width: 1150px) {
      padding: 10px 8%;
      font-size: 16px;
    }
  }

  &__about-product--active:after,
  &__reviews--active:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: -2px;
    left: 0;
    right: 0;
    border-bottom: 2px solid $black-light;
  }
}

.price {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 1150px) {
    justify-content: stretch;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
  }

  @media (max-width: 750px) {
    gap: 1rem 0.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  &__value {
    @include defineFontMontserrat(700, 35px, 1.4);
    letter-spacing: -0.5px;

    @media (max-width: 1150px) {
      order: 1;
      text-align: center;
      flex-grow: 1;
      font-size: 24px;
    }

    @media (max-width: 750px) {
      display: none;
    }
  }

  &__value-mobile {
    display: none;
    @include defineFontMontserrat(700, 18px, 1.4);
    text-align: center;
    margin-bottom: 0.5rem;

    @media (max-width: 750px) {
      display: block;
    }
  }

  &__btn-contact {
    justify-content: center;
    @include defineBtnPrimary(15px, 68px, 15px, 23px);

    @media (max-width: 1150px) {
      order: 3;
      flex-grow: 1;
      font-size: 13px;
      padding: 10px 18px;
    }

    @media (max-width: 750px) {
      height: 100%;
      width: 100%;
      order: 1;
      font-size: 12px;
    }
  }

  &__btn-profile-link {
    height: 100%;
    width: 100%;
    display: none;
    justify-content: center;
    @include defineBtnPrimary(13px, 68px, 10px, 18px);
    background-color: transparent;
    color: $primary;
    border: 1px solid $primary;

    &:not(:disabled):hover,
    &:not(:disabled):active {
      color: white;
    }

    @media (max-width: 750px) {
      order: 2;
      display: flex;
    }
  }

  &__all-products {
    @include defineFontMontserrat(600, 15px, 18px);
    color: $primary;
    letter-spacing: -0.5px;

    @media (max-width: 1150px) {
      order: 2;
      text-align: center;
      flex-grow: 1;
      font-size: 13px;
    }

    @media (max-width: 750px) {
      width: 200%;
      text-align: center;
      color: $black;
      font-size: 14px;
    }
  }
}

.product-description {
  padding-top: 1.5rem;

  @media (max-width: 1150px) {
    padding-top: 1rem;
  }

  @media (max-width: 750px) {
    padding-top: 0;
    padding-bottom: 0.5rem;
  }

  &__title {
    display: none;

    @media (max-width: 750px) {
      text-align: center;
      @include defineFontMontserrat(700, 15px, 1.4);
      margin-bottom: 0.5rem;
      color: $black;
      display: block;
    }
  }

  &__text {
    @include defineFontMontserrat(400, 17px, 1.75);

    @media (max-width: 1150px) {
      font-size: 15px;
    }
  }
}

.user-reviews {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1.5rem;
}

.review {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  &__text {
    @include defineFontMontserrat(400, 15px, 1.75);
    margin: 0;
    padding: 0;
  }
}

.about-user {
  display: flex;
  align-items: center;

  &__photo {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 1rem;
  }

  &__name {
    @include defineFontMontserrat(600, 15px, 18px);
    width: 100%;
    margin-right: 1.5rem;
  }

  &__rating {
    @include defineFontMontserrat(400, 13px, 1.6);
    margin-right: 0.3rem;
    padding: 0;
  }

  &__date {
    @include defineFontMontserrat(400, 13px, 16px);
    padding: 0 0 0 1rem;
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
  width: 33px;
  height: 33px;
  margin-top: calc(0px - 33px / 2);
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $accent;
  transition: opacity 0.3s ease-in-out;

  @media (max-width: 1150px) {
    display: none;
  }

  @media (max-width: 750px) {
    display: flex;
    width: 21px;
    height: 21px;
  }
}

.swiper__carousel .swiper-button-prev::before,
.swiper__carousel .swiper-button-next::before {
  content: '';
  position: absolute;
  background-color: $grey-light;
  border: 1px solid $filter-border;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.swiper__carousel .swiper-button-prev::after {
  content: '';
  position: absolute;
  left: 14px;
  width: 8px;
  height: 8px;
  border-bottom: 1px solid $black;
  border-left: 1px solid $black;
  transform: rotate(45deg);
  transition: border-color 0.3s ease-in-out;

  @media (max-width: 750px) {
    left: 9px;
    width: 6px;
    height: 6px;
  }
}

.swiper__carousel .swiper-button-next::after {
  content: '';
  position: absolute;
  right: 14px;
  width: 8px;
  height: 8px;
  border-bottom: 1px solid $black;
  border-right: 1px solid $black;
  transform: rotate(-45deg);

  @media (max-width: 750px) {
    right: 9px;
    width: 6px;
    height: 6px;
  }
}

.swiper__carousel .swiper-button-prev:not(.swiper-button-disabled):hover::before,
.swiper__carousel .swiper-button-next:not(.swiper-button-disabled):hover::before {
  background-color: $accent;
  border: none;
}

.swiper__carousel .swiper-button-prev:not(.swiper-button-disabled):active::before,
.swiper__carousel .swiper-button-next:not(.swiper-button-disabled):active::before {
  background-color: $accent-dark;
  border: none;
}

.swiper__carousel .swiper-button-disabled {
  opacity: 0.3;
}
</style>
