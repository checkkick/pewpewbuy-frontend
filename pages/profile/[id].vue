<template>
  <div class="container">
    <!-- Гостевой просмотр профиля -->
    <nav class="nav">
      <h2 class="nav__title">
        Профиль пользователя
      </h2>
      <div
        v-if="!tablet"
        class="nav__buttons"
      >
        <button
          class="nav__all-publicity"
          @click="$router.push('/')"
        >
          Все объявления
        </button>
        <button
          class="nav__new-publicity"
          @click="showAddProductModal = true"
        >
          Разместить объявление
        </button>
      </div>
    </nav>
    <main class="main">
      <section class="main__info">
        <div class="info-layout">
          <h3 class="info-layout__title">
            Личная информация
          </h3>
          <div class="personal-info">
            <h4 class="personal-info__name">
              {{ user.first_name ? user.first_name : 'Имя пользователя' }}
              {{ user.last_name }}
            </h4>
            <div class="personal-info__about">
              <div class="personal-info__row">
                <img
                  class="personal-info__img"
                  :src="user.avatar ? user.avatar : noImage"
                  alt="profile picture"
                >
              </div>
              <div class="personal-info__row">
                <div class="personal-info__line">
                  <p class="personal-info__title">
                    Рейтинг
                  </p>
                  <RatingCalc :stars="user.rep ? Math.floor(user.rep) : 0" />
                </div>
                <div class="personal-info__line">
                  <p class="personal-info__title">
                    Игровой позывной
                  </p>
                  <p
                    v-if="user.call_sign"
                    class="personal-info__text"
                  >
                    {{ user.call_sign ? user.call_sign : 'не заполнено' }}
                  </p>
                  <p
                    v-else
                    class="personal-info__text personal-info__text--inactive"
                  >
                    не заполнено
                  </p>
                </div>
                <div class="personal-info__line">
                  <p class="personal-info__title">
                    Местоположение
                  </p>
                  <p
                    v-if="user.city"
                    class="personal-info__text"
                  >
                    {{ user.city }}
                  </p>
                  <p
                    v-else
                    class="personal-info__text personal-info__text--inactive"
                  >
                    не заполнено
                  </p>
                </div>
              </div>
            </div>
            <div class="contacts">
              <a
                v-if="user.tg"
                :href="user.tg"
                target="_blank"
                class="contacts__item"
              >
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.084 0.501459C14.8895 0.515713 14.6986 0.561677 14.5187 0.637558H14.5163C14.3436 0.706523 13.5226 1.0544 12.2744 1.58171L7.80158 3.47916C4.59208 4.84016 1.43712 6.1804 1.43712 6.1804L1.47468 6.16575C1.47468 6.16575 1.25716 6.23777 1.02995 6.39462C0.889574 6.48459 0.768783 6.60231 0.674884 6.74066C0.563396 6.90545 0.473722 7.1575 0.507047 7.41811C0.561579 7.85875 0.845144 8.12301 1.04873 8.26888C1.25474 8.41657 1.45105 8.48554 1.45105 8.48554H1.4559L4.41455 9.4895C4.54725 9.91855 5.31614 12.4648 5.50094 13.0513C5.61001 13.4016 5.71604 13.6207 5.84874 13.7879C5.91296 13.8734 5.98809 13.9448 6.07837 14.0021C6.12531 14.0296 6.17535 14.0514 6.22743 14.0668L6.19713 14.0595C6.20622 14.0619 6.21349 14.0693 6.22016 14.0717C6.24439 14.0784 6.26075 14.0809 6.29165 14.0857C6.76002 14.2286 7.13629 13.9356 7.13629 13.9356L7.1575 13.9185L8.90433 12.3165L11.8321 14.5789L11.8987 14.6076C12.5089 14.8773 13.1269 14.7272 13.4535 14.4623C13.7825 14.1956 13.9103 13.8544 13.9103 13.8544L13.9316 13.7995L16.194 2.12488C16.2582 1.83682 16.2746 1.56706 16.2037 1.30524C16.1306 1.04026 15.9618 0.812356 15.7305 0.666243C15.5363 0.547302 15.311 0.489893 15.084 0.501459ZM15.0228 1.7526C15.0204 1.79104 15.0276 1.78677 15.0107 1.86062V1.86733L12.7694 13.4205C12.7597 13.437 12.7434 13.473 12.6985 13.509C12.6513 13.5468 12.6137 13.5706 12.4168 13.4919L8.83586 10.7266L6.67277 12.7125L7.1272 9.78916L12.9779 4.29637C13.219 4.07055 13.1384 4.02295 13.1384 4.02295C13.1554 3.74587 12.7743 3.94178 12.7743 3.94178L5.39673 8.54535L5.3943 8.53314L1.85822 7.33388V7.33144L1.84913 7.32961C1.85533 7.32754 1.8614 7.32509 1.86731 7.32229L1.8867 7.31252L1.90548 7.30581C1.90548 7.30581 5.06287 5.96557 8.27237 4.60458C9.87924 3.92286 11.4982 3.23626 12.7434 2.70651C13.4818 2.39342 14.221 2.08216 14.961 1.77274C15.0107 1.75321 14.987 1.75321 15.0228 1.75321V1.7526Z"
                    fill="#1F1F1F"
                  />
                </svg>
              </a>
              <a
                v-if="user.vk"
                :href="user.vk"
                target="_blank"
                class="contacts__item"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.14402 0.5C2.44362 0.502729 1.77269 0.782172 1.27743 1.27743C0.782172 1.77269 0.502729 2.44362 0.5 3.14402V12.106C0.502729 12.8064 0.782172 13.4773 1.27743 13.9726C1.77269 14.4678 2.44362 14.7473 3.14402 14.75H12.106C12.8064 14.7473 13.4773 14.4678 13.9726 13.9726C14.4678 13.4773 14.7473 12.8064 14.75 12.106V3.14402C14.7473 2.44362 14.4678 1.77269 13.9726 1.27743C13.4773 0.782172 12.8064 0.502729 12.106 0.5H3.14402ZM3.14402 1.79545H12.106C12.2834 1.79442 12.4592 1.8286 12.6233 1.89601C12.7874 1.96341 12.9364 2.06271 13.0619 2.18814C13.1873 2.31357 13.2866 2.46265 13.354 2.62673C13.4214 2.79081 13.4556 2.96664 13.4545 3.14402V12.106C13.4556 12.2834 13.4214 12.4592 13.354 12.6233C13.2866 12.7874 13.1873 12.9364 13.0619 13.0619C12.9364 13.1873 12.7874 13.2866 12.6233 13.354C12.4592 13.4214 12.2834 13.4556 12.106 13.4545H3.14402C2.96661 13.4557 2.79075 13.4215 2.62663 13.3542C2.46251 13.2868 2.3134 13.1875 2.18795 13.0621C2.0625 12.9366 1.96321 12.7875 1.89583 12.6234C1.82845 12.4593 1.79434 12.2834 1.79545 12.106V3.14402C1.79442 2.96664 1.8286 2.79081 1.89601 2.62673C1.96341 2.46265 2.06271 2.31357 2.18814 2.18814C2.31357 2.06271 2.46265 1.96341 2.62673 1.89601C2.79081 1.8286 2.96664 1.79442 3.14402 1.79545ZM7.44299 5.18307C6.96691 5.17853 6.56208 5.18307 6.33473 5.29448C6.18251 5.36832 6.06657 5.53478 6.13717 5.54256C6.22591 5.55551 6.42541 5.59826 6.53228 5.7427C6.66831 5.92731 6.66377 6.34509 6.66377 6.34509C6.66377 6.34509 6.73956 7.49351 6.47852 7.63795C6.2991 7.73641 6.05361 7.53626 5.52248 6.62297C5.25173 6.15272 5.04705 5.63389 5.04705 5.63389C5.04705 5.63389 5.00818 5.53737 4.93823 5.48685C4.85208 5.42402 4.7329 5.4033 4.7329 5.4033L3.4653 5.41107C3.4653 5.41107 3.27551 5.41884 3.2075 5.49981C3.14402 5.57559 3.20232 5.72457 3.20232 5.72457C3.20232 5.72457 4.19399 8.04473 5.31715 9.21387C6.34703 10.2872 7.51618 10.2159 7.51618 10.2159H8.04732C8.04732 10.2159 8.20666 10.1984 8.28763 10.1123C8.36406 10.0313 8.36146 9.87909 8.36146 9.87909C8.36146 9.87909 8.3511 9.16853 8.68015 9.06231C9.0066 8.96061 9.42115 9.75019 9.86419 10.054C10.201 10.2839 10.4562 10.2334 10.4562 10.2334L11.6409 10.2159C11.6409 10.2159 12.2582 10.1777 11.9648 9.68931C11.9421 9.65174 11.7951 9.33047 11.0871 8.67237C10.3429 7.98449 10.442 8.0959 11.3371 6.90408C11.8812 6.17798 12.0989 5.73493 12.0302 5.54256C11.9654 5.36314 11.5651 5.41107 11.5651 5.41107L10.2315 5.41884C10.2315 5.41884 10.133 5.40589 10.0598 5.44928C10.0095 5.48666 9.96938 5.53611 9.94322 5.59308C9.94322 5.59308 9.73076 6.15466 9.44965 6.63333C8.85762 7.6399 8.61732 7.6956 8.52145 7.63277C8.29605 7.48574 8.35175 7.04528 8.35175 6.73438C8.35175 5.75501 8.50073 5.35018 8.06351 5.2446C7.91907 5.20898 7.81284 5.18631 7.44364 5.18307H7.44299Z"
                    fill="#1F1F1F"
                  />
                </svg>
              </a>
              <a
                :href="`mailto:${user.email}`"
                class="contacts__item"
              >
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0179 0H1.23214C0.905358 0 0.591958 0.126428 0.360886 0.351472C0.129815 0.576515 0 0.88174 0 1.2V10.8C0 11.1183 0.129815 11.4235 0.360886 11.6485C0.591958 11.8736 0.905358 12 1.23214 12H16.0179C16.3446 12 16.658 11.8736 16.8891 11.6485C17.1202 11.4235 17.25 11.1183 17.25 10.8V1.2C17.25 0.88174 17.1202 0.576515 16.8891 0.351472C16.658 0.126428 16.3446 0 16.0179 0ZM14.6625 1.2L8.625 5.268L2.5875 1.2H14.6625ZM1.23214 10.8V1.746L8.27384 6.492C8.37697 6.56168 8.49949 6.59901 8.625 6.59901C8.75051 6.59901 8.87303 6.56168 8.97616 6.492L16.0179 1.746V10.8H1.23214Z"
                    fill="#1F1F1F"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="info-layout">
          <h3 class="info-layout__title">
            Отзывы
          </h3>
          <div class="reviews">
            <swiper
              v-if="user.reviews ? user.reviews.length > 0 : false"
              class="reviews__swiper"
              :modules="modules"
              :slides-per-view="2"
              :space-between="16"
              navigation
              :pagination="{ clickable: true }"
            >
              <swiper-slide
                v-for="review in user.reviews"
                :key="review.id"
                class="reviews__slide"
              >
                <UserReview :review="review" />
              </swiper-slide>
            </swiper>

            <div
              v-else
              class="review-empty"
            >
              <div class="review-user">
                <span class="review-user__photo-empty" />
                <p class="review-user__name">
                  Имя пользователя
                </p>
              </div>
              <div class="review-card">
                <div class="review-value">
                  <p class="review-value__title">
                    Оценка:
                  </p>
                  <div class="review-rating">
                    <p class="review-rating__value">
                      0,0
                    </p>
                    <RatingCalc :stars="0" />
                  </div>
                </div>
                <p class="review-card__text">
                  Комментарии пока отсутствуют...
                </p>
                <p class="review-card__date">
                  Дата публикации
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="main__active-adv">
        <Advertisment
          :active-publ="true"
          :publications="active"
          :guest-user="true"
        />
        <Advertisment
          :inactive-publ="true"
          :publications="inactive"
          :guest-user="true"
        />
      </section>
    </main>
  </div>
</template>

<script>
import Advertisment from '@/components/profile/Advertisment.vue';
import RatingCalc from '@/components/profile/RatingCalc.vue';
import UserReview from '@/components/profile/UserReview.vue';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { clients } from '@/store/clients';
import { media } from '@/store/media';

import noPhoto from '@/assets/img/no-photo.png';

export default {
  components: {
    Swiper,
    SwiperSlide,
    RatingCalc,
    UserReview,
    Advertisment,
  },
  setup() {
    definePageMeta({
      middleware: ['authorization'],
      layout: 'auth-no-nav-layout',
    });

    const route = useRoute();

    const user = ref({});
    const active = ref([]);
    const inactive = ref([]);

    onMounted(async () => {
      user.value = await clients().GET_DETAIL_USER(route.params.id);

      user.value.products.forEach((product) => {
        if (product.status === 'Active') {
          active.value.push(product);
        } else {
          inactive.value.push(product);
        }
      });
    });

    return {
      modules: [Navigation, Pagination],
      tablet: computed(() => media().MEDIA_TABLET),
      user,
      active,
      inactive,
    };
  },
  data() {
    return {
      showAddProductModal: false,
      noImage: noPhoto,
    };
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  @media (max-width: 1150px) {
    margin-top: 6rem;
    margin-bottom: 1rem;
  }

  &__title {
    @include defineFontMontserrat(600, 27px, 33px);
    margin: 0;

    @media (max-width: 1150px) {
      font-size: 20px;
      line-height: 24px;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__all-publicity {
    @include defineBtnPrimary(15px, 68px, 12px, 27px);
  }

  &__new-publicity {
    @include defineBtnAccent(15px, 68px, 12px, 27px);
  }
}

.main {
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;

  @media (max-width: 1150px) {
    margin-bottom: 7rem;
  }

  &__info {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    gap: 1.5rem;
    margin-bottom: 3rem;

    @media (max-width: 1150px) {
      gap: 1rem;
      margin-bottom: 1rem;
    }
  }
}

.info-layout {
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;

  &__title {
    @include defineFontMontserrat(600, 18px, 22px);
    color: $primary;
    margin-bottom: 1rem;

    @media (max-width: 1150px) {
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 0.5rem;
    }
  }
}

.personal-info {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: $white;
  padding: 42px 45px;
  border: 1px solid $filter-border;
  box-shadow: 0px 10px 105px rgba(255, 255, 255, 0.72);
  border-radius: 24px;

  @media (max-width: 1150px) {
    padding: 25px 32px;
  }

  &__name {
    @include defineFontMontserrat(600, 18px, 22px);
    color: $black;
    margin-bottom: 2rem;

    @media (max-width: 1150px) {
      font-size: 15px;
      line-height: 18px;
      margin-bottom: 1rem;
    }
  }

  &__about {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 3rem;
    margin-bottom: 1rem;

    @media (max-width: 1150px) {
      gap: 1rem;
      margin-bottom: 0.5rem;
    }
  }

  &__row {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    gap: 1rem;

    &:last-child {
      width: 100%;
    }
  }

  &__img {
    width: 135px;
    height: 135px;
    border-radius: 50%;
    object-fit: cover;

    @media (max-width: 1150px) {
      width: 95px;
      height: 95px;
    }
  }

  &__line {
    display: flex;
    align-items: center;
  }

  &__title {
    @include defineFontMontserrat(600, 13px, 16px);
    width: 100%;
  }

  &__text {
    @include defineFontMontserrat(400, 13px, 16px);
    width: 100%;

    &.personal-info__text--inactive {
      color: $black-inactive;
    }
  }
}

.contacts {
  width: 100%;
  max-width: 135px;
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 1150px) {
    max-width: 95px;
    gap: 0.6rem;

    &__item {
      transform: scale(0.8);
    }
  }
}

.reviews {
  position: relative;
  height: 100%;
  background: $white;
  padding: 35px 50px;
  border: 1px solid $filter-border;
  box-shadow: 0px 10px 105px rgba(255, 255, 255, 0.72);
  border-radius: 24px;

  @media (max-width: 1150px) {
    padding: 20px 35px;
  }

  &__swiper {
    position: static;
  }

  &__slide {
    align-self: stretch;
    height: auto;
  }
}

.review-empty {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-user {
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1150px) {
    gap: 0.5rem;
  }

  &__photo-empty {
    width: 39px;
    height: 39px;
    background-color: $input-background;
    border-radius: 50%;

    @media (max-width: 1150px) {
      width: 28px;
      height: 28px;
    }
  }

  &__name {
    @include defineFontMontserrat(600, 15px, 18px);

    @media (max-width: 1150px) {
      font-size: 13px;
      line-height: 16px;
    }
  }
}

.review-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: $grey-light;
  border-radius: 12px;
  padding: 12px 16px;

  &__text {
    @include defineFontMontserrat(400, 12px, 1.6);
    color: $black-inactive;
  }

  &__date {
    @include defineFontMontserrat(400, 10px, 1.6);
    color: $grey;
    align-self: flex-end;
  }
}

.review-value {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    @include defineFontMontserrat(600, 13px, 1.6);
  }
}

.review-rating {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &__value {
    @include defineFontMontserrat(400, 13px, 1.6);
  }
}
</style>

<style lang="scss">
.main__info-layout__reviews__swiper .swiper-button-prev {
  left: 11px;
  right: auto;
}

.main__info-layout__reviews__swiper .swiper-button-next {
  left: auto;
  right: 11px;
}

.main__info-layout__reviews__swiper .swiper-button-prev,
.main__info-layout__reviews__swiper .swiper-button-next {
  position: absolute;
  top: 50%;
  width: 28px;
  height: 28px;
  margin-top: calc(0px - 28px / 2);
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary;
}

.main__info-layout__reviews__swiper .swiper-button-prev::before,
.main__info-layout__reviews__swiper .swiper-button-next::before {
  content: "";
  position: absolute;
  background-color: $grey-light;
  border: 1px solid $filter-border;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.main__info-layout__reviews__swiper .swiper-button-prev::after {
  content: "";
  position: absolute;
  left: 12px;
  width: 8px;
  height: 8px;
  border-bottom: 1px solid $black;
  border-left: 1px solid $black;
  transform: rotate(45deg);
  transition: border-color 0.3s ease-in-out;
}

.main__info-layout__reviews__swiper .swiper-button-next::after {
  content: "";
  position: absolute;
  right: 12px;
  width: 8px;
  height: 8px;
  border-bottom: 1px solid $black;
  border-right: 1px solid $black;
  transform: rotate(-45deg);
  transition: border-color 0.3s ease-in-out;
}

.main__info-layout__reviews__swiper .swiper-button-prev:not(.swiper-button-disabled):hover::before,
.main__info-layout__reviews__swiper .swiper-button-next:not(.swiper-button-disabled):hover::before {
  background-color: $primary-hover;
  border: none;
}

.main__info-layout__reviews__swiper .swiper-button-prev:not(.swiper-button-disabled):hover::after,
.main__info-layout__reviews__swiper .swiper-button-next:not(.swiper-button-disabled):hover::after {
  border-color: $white;
}

.main__info-layout__reviews__swiper .swiper-button-prev:not(.swiper-button-disabled):active::before,
.main__info-layout__reviews__swiper .swiper-button-next:not(.swiper-button-disabled):active::before {
  background-color: $primary-active;
  border: none;
}

.main__info-layout__reviews__swiper .swiper-button-disabled {
  opacity: 0.3;
}
</style>
