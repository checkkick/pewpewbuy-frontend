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
        <a
          v-if="authorized && userStore.id !== detProduct.user.id"
          class="favorite"
          :class="{ 'favorite--active': favorite }"
          @click.prevent="onLike()"
        >
          <svg
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.67823 8.34017C0.936027 6.07562 1.51676 2.67879 4.42044 1.54651C7.32412 0.414232 9.06633 2.67879 9.64706 3.81106C10.2278 2.67879 12.5507 0.414232 15.4544 1.54651C18.3581 2.67879 18.3581 6.07562 16.6159 8.34017C14.8737 10.6047 9.64706 15.1338 9.64706 15.1338C9.64706 15.1338 4.42044 10.6047 2.67823 8.34017Z"
              stroke="black"
              stroke-width="1.50013"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
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

        <div
          v-if="detProduct.status === 'DI' && detProduct.user.id === userStore.id"
          class="disalow-reason"
        >
          <h3 class="disalow-reason__title">
            Публикация отклонена модератором
          </h3>
          <p class="disalow-reason__text">
            Причина отклонения:
            {{ detProduct.disalow_reason ? detProduct.disalow_reason : 'Модератор не указал причину отклоения' }}
          </p>
        </div>

        <div class="card__title-row">
          <h3 class="card__title">
            {{ detProduct.manufacturer }} {{ detProduct.name }}
          </h3>

          <a
            v-if="detProduct.user.id === userStore.id"
            class="card__edit"
            @click.prevent="showSettings = true"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.071 3.07475L12.6708 0.675191C12.5583 0.563003 12.4059 0.5 12.2471 0.5C12.0882 0.5 11.9358 0.563003 11.8233 0.675191L4.62279 7.87388C4.51135 7.98816 4.44938 8.14171 4.45028 8.30131V10.7009C4.45028 10.86 4.5135 11.0126 4.62603 11.1251C4.73856 11.2376 4.89118 11.3008 5.05032 11.3008H7.45048C7.5284 11.301 7.6056 11.2859 7.67767 11.2563C7.74975 11.2268 7.81528 11.1832 7.87051 11.1283L15.071 3.9296C15.1277 3.87378 15.1727 3.80725 15.2034 3.73387C15.2342 3.66049 15.25 3.58173 15.25 3.50218C15.25 3.42263 15.2342 3.34387 15.2034 3.27049C15.1727 3.19711 15.1277 3.13057 15.071 3.07475ZM12.8508 4.4545L11.2982 2.90229L12.2508 1.94996L13.8034 3.50218L12.8508 4.4545ZM14.651 7.70142V14.3002C14.651 14.6184 14.5245 14.9236 14.2995 15.1486C14.0744 15.3736 13.7692 15.5 13.4509 15.5H1.45008C1.1318 15.5 0.826554 15.3736 0.601495 15.1486C0.376437 14.9236 0.25 14.6184 0.25 14.3002V2.3024C0.25 1.98419 0.376437 1.67902 0.601495 1.45402C0.826554 1.22902 1.1318 1.10261 1.45008 1.10261H8.05052C8.20966 1.10261 8.36228 1.16582 8.47481 1.27832C8.58734 1.39082 8.65056 1.5434 8.65056 1.7025C8.65056 1.86161 8.58734 2.01419 8.47481 2.12669C8.36228 2.23919 8.20966 2.3024 8.05052 2.3024H1.45008V14.3002H13.4509V7.70142C13.4509 7.54231 13.5141 7.38973 13.6266 7.27723C13.7392 7.16473 13.8918 7.10152 14.0509 7.10152C14.2101 7.10152 14.3627 7.16473 14.4752 7.27723C14.5877 7.38973 14.651 7.54231 14.651 7.70142Z"
                fill="white"
              />
            </svg>
          </a>
        </div>

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
            <div class="price__row">
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

        <Settings
          :show-settings="showSettings"
          :publ-id="detProduct.id"
          :publ-name="detProduct.name"
          :publ-status="detProduct.status"
          @close-settings="showSettings = false"
          @show-edit-product-modal="showEditProductModal = true"
        />
      </section>

      <TransitionGroup name="fade">
        <ContactsModal
          v-if="showContacts"
          :fio="`${detProduct.user.first_name} ${detProduct.user.last_name}`"
          :email="detProduct.user.email"
          :vk="detProduct.user.vk"
          :tg="detProduct.user.tg"
          @close-contacts-window="showContacts = false"
        />

        <EditProductModal
          v-if="detProduct.user.id === userStore.id && showEditProductModal"
          :publication-id="detProduct.id"
          @close-edit-product-window="showEditProductModal = false"
        />
      </TransitionGroup>
    </main>
  </div>
</template>

<script>
import noPhoto from '@/assets/img/no-photo.png';
import ContactsModal from '@/components/product/ContactsModal.vue';
import RatingCalc from '@/components/profile/RatingCalc.vue';
import Settings from '@/components/product/Settings.vue';
import EditProductModal from '@/components/profile/EditProductModal.vue';

import { products } from '@/store/products';
import { clients } from '@/store/clients';
import { auth } from '@/store/auth';

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
    Settings,
    EditProductModal,
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

    const clientsStore = clients();
    const useAuthStore = auth();
    const useProductStore = products();

    return {
      authorized: computed(() => useAuthStore.AUTHORIZED),
      useProductStore,
      Thumbs,
      thumbsSwiper,
      setThumbsSwiper,
      userStore: computed(() => clientsStore.USER_STATE),
      modules: [FreeMode, Navigation, Thumbs],
    };
  },
  data: () => ({
    showSettings: false,
    showEditProductModal: false,
    detProduct: {
      user: {
        first_name: 'Имя',
        last_name: 'Фамилия',
        call_sign: 'Позывной',
        rep: 0,
      },
    },
    favorite: false,
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
      { name: this.detProduct.parent_category.name, slug: this.detProduct.parent_category.slug },
      {
        name: this.detProduct.category.name,
        slug: this.detProduct.category.slug,
      },
      {
        name: `${this.detProduct.manufacturer} ${this.detProduct.name}`,
        slug: '',
      },
    );

    this.favorite = this.detProduct.is_favorite;
  },
  methods: {
    async onLike() {
      if (!this.favorite) {
        if (await this.useProductStore.ADD_FAVORITE(this.detProduct.id)) {
          this.favorite = true;
        }
      } else if (
        await this.useProductStore.REMOVE_FAVORITE(this.detProduct.id)
      ) {
        this.favorite = false;
      }
    },
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
  position: relative;
  background: $white;
  border: 1px solid $filter-border;
  box-shadow: 0px 9px 100px rgba(255, 255, 255, 0.72);
  border-radius: 15px;
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

  &__title-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    @media (max-width: 1150px) {
      margin-bottom: 0.5rem;
    }

    @media (max-width: 750px) {
      margin-bottom: 0;
      position: relative;
    }
  }

  &__title {
    @include defineFontMontserrat(600, 22px, 1.4);
    color: $primary;

    @media (max-width: 1150px) {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 0.5rem;
    }

    @media (max-width: 750px) {
      font-size: 15px;
      color: $black;
      text-align: center;
    }
  }

  &__edit {
    z-index: 5;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: $primary;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1150px) {
      transform: scale(0.9);
    }

    @media (max-width: 750px) {
      position: absolute;
      background-color: #f4f4f4;
      right: 0;
      bottom: -2rem;

      & path {
        fill: $black-light;
      }
    }
  }
}

.favorite {
  cursor: pointer;
  position: absolute;
  width: 36px;
  height: 36px;
  top: 2.5rem;
  right: 4.5rem;
  background-color: $grey;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);

  @media (max-width: 1150px) {
    top: 1.5rem;
    right: 2.5rem;
    transform: scale(0.9);
  }

  @media (max-width: 750px) {
    top: 7rem;
    right: 0;
  }

  & svg {
    transition: transform 0.1s ease-in-out, fill 0.1s ease-in-out;
  }

  & svg path {
    transition: stroke 0.3s ease-in-out;
  }

  &:hover svg path {
    stroke: $accent-dark;
  }

  &:active svg {
    transform: scale(1.3);
  }

  &.favorite--active svg {
    fill: $accent-dark;
  }

  &.favorite--active svg path {
    stroke: $accent-dark;
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
  display: grid;
  justify-content: stretch;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 0 2rem;

  @media (max-width: 1150px) {
    gap: 0 1rem;
  }

  @media (max-width: 750px) {
    display: flex;
    gap: 1rem;
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

  @media (max-width: 750px) {
    max-height: none;
  }

  &--relative {
    padding: 0 55px;
    margin-left: -55px;
    position: relative;

    @media (max-width: 1150px) {
      padding: 0;
      margin: 0;
    }

    @media (max-width: 750px) {
      padding: 0 30px;
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
      padding: 14px 0 5px 2px;
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
  align-self: flex-end;

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
      padding: 10px 5%;
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
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1150px) {
    gap: 0.5rem 1rem;
  }

  @media (max-width: 750px) {
    gap: 1rem 0.5rem;
  }

  &__row {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 100px;
    grid-auto-flow: dense;
    align-items: stretch;
    justify-content: space-between;
    gap: 1rem;

    @media (max-width: 1150px) {
      grid-template-columns: 1fr 1fr;
      gap: .5rem;
    }
  }

  &__value {
    @include defineFontMontserrat(700, 35px, 1.4);
    letter-spacing: -0.5px;
    flex-grow: 1;

    @media (max-width: 1150px) {
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
    width: 100%;
    justify-content: center;
    @include defineBtnPrimary(15px, 68px, 15px, 23px);

    @media (max-width: 1150px) {
      order: 2;
      flex-grow: 1;
      font-size: 13px;
      padding: 10px 18px;
    }

    @media (max-width: 750px) {
      width: 100%;
      order: 1;
      font-size: 12px;
    }
  }

  &__btn-profile-link {
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
      grid-column-start: 1;
      grid-column-end: 3;
      order: 3;
      text-align: center;
      flex-grow: 1;
      font-size: 13px;
    }

    @media (max-width: 750px) {
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

.disalow-reason {
  padding: 22px 77px;
  border-radius: 15px;
  margin-bottom: 2rem;
  background: url('@/assets/img/notification-alert.svg') no-repeat 20px center, #FFF5F5;

  @media (max-width: 1150px) {
    margin-bottom: 1rem;
  }

  @media (max-width: 1150px) {
    margin-bottom: 0;
  }

  &__title {
    @include defineFontMontserrat(600, 17px, normal);
    margin-bottom: 8px;
  }

  &__text {
    @include defineFontMontserrat(400, 15px, 1.3);
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
