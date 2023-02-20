<template>
  <div class="container">
    <!-- Гостевой просмотр профиля -->
    <nav class="profile__nav">
      <h2 class="profile__nav__title">
        Личный кабинет
      </h2>
      <div class="profile__nav__buttons">
        <button
          class="profile__nav__buttons__all-publicity"
          @click="$router.push('/')"
        >
          Все объявления
        </button>
        <button
          class="profile__nav__buttons__new-publicity"
          @click="showAddProductModal = true"
        >
          Разместить объявление
        </button>
      </div>
    </nav>
    <main class="profile__main">
      <section class="profile__main__info">
        <div class="profile__main__info-layout">
          <h3 class="profile__main__info-layout__title">
            Личная информация
          </h3>
          <div class="profile__main__info-layout__personal-info">
            <h4 class="profile__main__info-layout__personal-info__name">
              {{ user.first_name ? user.first_name : 'Имя пользователя' }}
              {{ user.last_name }}
            </h4>
            <div class="profile__main__info-layout__personal-info__about">
              <div class="profile__main__info-layout__personal-info__about-flex">
                <img
                  class="profile__main__info-layout__personal-info__about-flex__img"
                  :src="user.avatar ? user.avatar : noImage"
                  alt="profile picture"
                >
              </div>
              <div class="profile__main__info-layout__personal-info__about-flex">
                <div class="profile__main__info-layout__personal-info__about-flex__line">
                  <p class="profile__main__info-layout__personal-info__about-flex__line__title">
                    Рейтинг
                  </p>
                  <RatingCalc :stars="user.rep ? Math.floor(user.rep) : 0" />
                </div>
                <div class="profile__main__info-layout__personal-info__about-flex__line">
                  <p class="profile__main__info-layout__personal-info__about-flex__line__title">
                    Игровой позывной
                  </p>
                  <p
                    v-if="user.call_sign"
                    class="profile__main__info-layout__personal-info__about-flex__line__text"
                  >
                    {{ user.call_sign ? user.call_sign : 'не заполнено' }}
                  </p>
                  <p
                    v-else
                    class="profile__main__info-layout__personal-info__about-flex__line__text inactive"
                  >
                    не заполнено
                  </p>
                </div>
                <div class="profile__main__info-layout__personal-info__about-flex__line">
                  <p class="profile__main__info-layout__personal-info__about-flex__line__title">
                    Местоположение
                  </p>
                  <p
                    v-if="user.city"
                    class="profile__main__info-layout__personal-info__about-flex__line__text"
                  >
                    {{ user.city }}
                  </p>
                  <p
                    v-else
                    class="profile__main__info-layout__personal-info__about-flex__line__text inactive"
                  >
                    не заполнено
                  </p>
                </div>
              </div>
            </div>
            <div class="profile__main__info-layout__personal-info__contacts">
              <a
                v-if="user.tg"
                :href="user.tg"
                target="_blank"
                class="profile__main__info-layout__personal-info__contacts__item"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.94675 0.375C3.0006 0.378687 2.09425 0.756179 1.42521 1.42521C0.756179 2.09425 0.378687 3.0006 0.375 3.94675V16.0532C0.378687 16.9994 0.756179 17.9058 1.42521 18.5748C2.09425 19.2438 3.0006 19.6213 3.94675 19.625H16.0532C16.9994 19.6213 17.9058 19.2438 18.5748 18.5748C19.2438 17.9058 19.6213 16.9994 19.625 16.0532V3.94675C19.6213 3.0006 19.2438 2.09425 18.5748 1.42521C17.9058 0.756179 16.9994 0.378687 16.0532 0.375H3.94675ZM3.94675 2.125H16.0532C16.2929 2.12361 16.5304 2.16978 16.752 2.26083C16.9737 2.35189 17.1751 2.48603 17.3445 2.65547C17.514 2.82492 17.6481 3.0263 17.7392 3.24795C17.8302 3.46961 17.8764 3.70712 17.875 3.94675V16.0532C17.8764 16.2929 17.8302 16.5304 17.7392 16.752C17.6481 16.9737 17.514 17.1751 17.3445 17.3445C17.1751 17.514 16.9737 17.6481 16.752 17.7392C16.5304 17.8302 16.2929 17.8764 16.0532 17.875H3.94675C3.70709 17.8765 3.46952 17.8304 3.24781 17.7394C3.02611 17.6484 2.82468 17.5143 2.65521 17.3448C2.48574 17.1753 2.35161 16.9739 2.2606 16.7522C2.16958 16.5305 2.12349 16.2929 2.125 16.0532V3.94675C2.12361 3.70712 2.16978 3.46961 2.26083 3.24795C2.35189 3.0263 2.48603 2.82492 2.65547 2.65547C2.82492 2.48603 3.0263 2.35189 3.24795 2.26083C3.46961 2.16978 3.70712 2.12361 3.94675 2.125ZM9.75412 6.70125C9.111 6.69512 8.56413 6.70125 8.257 6.85175C8.05138 6.9515 7.89475 7.17637 7.99013 7.18687C8.11 7.20437 8.3795 7.26213 8.52387 7.45725C8.70762 7.70662 8.7015 8.271 8.7015 8.271C8.7015 8.271 8.80387 9.82238 8.45125 10.0175C8.20887 10.1505 7.87725 9.88013 7.15975 8.64637C6.794 8.01113 6.5175 7.31025 6.5175 7.31025C6.5175 7.31025 6.465 7.17988 6.3705 7.11163C6.25413 7.02675 6.09312 6.99875 6.09312 6.99875L4.38075 7.00925C4.38075 7.00925 4.12438 7.01975 4.0325 7.12912C3.94675 7.2315 4.0255 7.43275 4.0255 7.43275C4.0255 7.43275 5.36513 10.567 6.88238 12.1464C8.27363 13.5962 9.853 13.5 9.853 13.5H10.5705C10.5705 13.5 10.7858 13.4764 10.8951 13.36C10.9984 13.2506 10.9949 13.045 10.9949 13.045C10.9949 13.045 10.9809 12.0851 11.4254 11.9416C11.8664 11.8042 12.4264 12.8709 13.0249 13.2812C13.4799 13.5919 13.8246 13.5236 13.8246 13.5236L15.425 13.5C15.425 13.5 16.2589 13.4484 15.8625 12.7886C15.8319 12.7379 15.6332 12.3039 14.6769 11.4149C13.6715 10.4856 13.8054 10.6361 15.0146 9.02612C15.7496 8.04525 16.0436 7.44675 15.9509 7.18687C15.8634 6.9445 15.3226 7.00925 15.3226 7.00925L13.521 7.01975C13.521 7.01975 13.388 7.00225 13.2891 7.06087C13.2211 7.11136 13.167 7.17817 13.1316 7.25513C13.1316 7.25513 12.8446 8.01375 12.4649 8.66037C11.6651 10.0201 11.3405 10.0954 11.211 10.0105C10.9065 9.81187 10.9817 9.21688 10.9817 8.79688C10.9817 7.47388 11.183 6.927 10.5924 6.78437C10.3973 6.73625 10.2537 6.70562 9.755 6.70125H9.75412Z"
                    fill="#1F1F1F"
                  />
                </svg>
              </a>
              <a
                v-if="user.vk"
                :href="user.vk"
                target="_blank"
                class="profile__main__info-layout__personal-info__contacts__item"
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
                class="profile__main__info-layout__personal-info__contacts__item"
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
        <div class="profile__main__info-layout">
          <h3 class="profile__main__info-layout__title">
            Отзывы
          </h3>
          <div class="profile__main__info-layout__reviews">
            <swiper
              v-if="user.reviews ? user.reviews.length > 0 : false"
              class="profile__main__info-layout__reviews__swiper"
              :modules="modules"
              :slides-per-view="2"
              :space-between="16"
              navigation
              :pagination="{ clickable: true }"
            >
              <swiper-slide
                v-for="review in user.reviews"
                :key="review.id"
                class="profile__main__info-layout__reviews__swiper__slide"
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

      <section class="profile__main__active-adv">
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

.profile__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  &__title {
    @include defineFontMontserrat(600, 27px, 33px);
    margin: 0;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__all-publicity {
      @include defineBtnPrimary(15px, 68px, 12px, 27px);
    }

    &__new-publicity {
      @include defineBtnAccent(15px, 68px, 12px, 27px);
    }
  }
}

.profile__main {
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;

  &__info {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    gap: 1.5rem;
    margin-bottom: 3rem;

    &-layout {
      overflow: hidden;
      width: 100%;
      display: flex;
      align-items: stretch;
      flex-direction: column;

      &__title {
        @include defineFontMontserrat(600, 18px, 22px);
        color: $primary;
        margin-bottom: 1rem;
      }

      &__personal-info {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: $white;
        padding: 42px 45px;
        border: 1px solid $filter-border;
        box-shadow: 0px 10px 105px rgba(255, 255, 255, 0.72);
        border-radius: 24px;

        &__name {
          @include defineFontMontserrat(600, 18px, 22px);
          color: $black;
          margin-bottom: 2rem;
        }

        &__about {
          height: 100%;
          display: flex;
          align-items: center;
          gap: 3rem;
          margin-bottom: 1rem;

          &-flex {
            display: flex;
            align-items: stretch;
            flex-direction: column;
            gap: 1rem;

            &:last-child {
              width: 100%;
            }

            &__img {
              width: 135px;
              height: 135px;
              border-radius: 50%;
              object-fit: cover;
            }

            &__line {
              display: flex;
              align-items: center;

              &__title {
                @include defineFontMontserrat(600, 13px, 16px);
                width: 100%;
              }

              &__text {
                @include defineFontMontserrat(400, 13px, 16px);
                width: 100%;

                &.inactive {
                  color: $black-inactive;
                }
              }
            }
          }
        }

        &__contacts {
          width: 100%;
          max-width: 135px;
          align-self: flex-start;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
      }

      &__reviews {
        position: relative;
        height: 100%;
        background: $white;
        padding: 35px 50px;
        border: 1px solid $filter-border;
        box-shadow: 0px 10px 105px rgba(255, 255, 255, 0.72);
        border-radius: 24px;

        &__swiper {
          position: static;

          &__slide {
            align-self: stretch;
            height: auto;
          }
        }
      }
    }
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

  &__photo-empty {
    width: 39px;
    height: 39px;
    background-color: $input-background;
    border-radius: 50%;
  }

  &__name {
    @include defineFontMontserrat(600, 15px, 18px);
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
.profile__main__info-layout__reviews__swiper .swiper-button-prev {
  left: 11px;
  right: auto;
}

.profile__main__info-layout__reviews__swiper .swiper-button-next {
  left: auto;
  right: 11px;
}

.profile__main__info-layout__reviews__swiper .swiper-button-prev,
.profile__main__info-layout__reviews__swiper .swiper-button-next {
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

.profile__main__info-layout__reviews__swiper .swiper-button-prev::before,
.profile__main__info-layout__reviews__swiper .swiper-button-next::before {
  content: "";
  position: absolute;
  background-color: $grey-light;
  border: 1px solid $filter-border;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.profile__main__info-layout__reviews__swiper .swiper-button-prev::after {
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

.profile__main__info-layout__reviews__swiper .swiper-button-next::after {
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

.profile__main__info-layout__reviews__swiper .swiper-button-prev:not(.swiper-button-disabled):hover::before,
.profile__main__info-layout__reviews__swiper .swiper-button-next:not(.swiper-button-disabled):hover::before {
  background-color: $primary-hover;
  border: none;
}

.profile__main__info-layout__reviews__swiper .swiper-button-prev:not(.swiper-button-disabled):hover::after,
.profile__main__info-layout__reviews__swiper .swiper-button-next:not(.swiper-button-disabled):hover::after {
  border-color: $white;
}

.profile__main__info-layout__reviews__swiper .swiper-button-prev:not(.swiper-button-disabled):active::before,
.profile__main__info-layout__reviews__swiper .swiper-button-next:not(.swiper-button-disabled):active::before {
  background-color: $primary-active;
  border: none;
}

.profile__main__info-layout__reviews__swiper .swiper-button-disabled {
  opacity: 0.3;
}
</style>
