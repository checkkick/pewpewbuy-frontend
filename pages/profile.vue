<template>
  <div class="container">
    <nav class="profile__nav">
      <h2 class="profile__nav__title">Личный кабинет</h2>
      <div class="profile__nav__buttons">
        <button class="profile__nav__buttons__all-publicity">
          Все объявления
        </button>
        <button
          class="profile__nav__buttons__new-publicity"
          @click="showAddProductModal = true">
          Разместить объявление
        </button>
      </div>
    </nav>
    <main class="profile__main">
      <section class="profile__main__info">
        <div class="profile__main__info-layout">
          <h3 class="profile__main__info-layout__title">Личная информация</h3>
          <div class="profile__main__info-layout__personal-info">
            <h4 class="profile__main__info-layout__personal-info__name">
              {{ user.first_name ? user.first_name : 'Имя пользователя' }}
              {{ user.last_name }}
            </h4>
            <a
              v-if="user.email"
              class="profile__main__info-layout__personal-info__edit"
              @click.prevent="editProfile = true">
              <img src="@/assets/img/profile-edit.svg" alt="profile-edit" />
            </a>
            <div class="profile__main__info-layout__personal-info__about">
              <div
                class="profile__main__info-layout__personal-info__about-flex">
                <img
                  class="profile__main__info-layout__personal-info__about-flex__img"
                  :src="user.avatar ? user.avatar : noImage"
                  alt="profile picture" />
              </div>
              <div
                class="profile__main__info-layout__personal-info__about-flex">
                <div
                  class="profile__main__info-layout__personal-info__about-flex__line">
                  <p
                    class="profile__main__info-layout__personal-info__about-flex__line__title">
                    Рейтинг
                  </p>
                  <RatingCalc :stars="user.rep ? Math.floor(user.rep) : 0" />
                </div>
                <div
                  class="profile__main__info-layout__personal-info__about-flex__line">
                  <p
                    class="profile__main__info-layout__personal-info__about-flex__line__title">
                    Игровой позывной
                  </p>
                  <p
                    v-if="user.call_sign"
                    class="profile__main__info-layout__personal-info__about-flex__line__text">
                    {{ user.call_sign ? user.call_sign : 'не заполнено' }}
                  </p>
                  <p
                    v-else
                    class="profile__main__info-layout__personal-info__about-flex__line__text inactive">
                    не заполнено
                  </p>
                </div>
                <div
                  class="profile__main__info-layout__personal-info__about-flex__line">
                  <p
                    class="profile__main__info-layout__personal-info__about-flex__line__title">
                    Местоположение
                  </p>
                  <p
                    v-if="user.city"
                    class="profile__main__info-layout__personal-info__about-flex__line__text">
                    {{ user.city }}
                  </p>
                  <p
                    v-else
                    class="profile__main__info-layout__personal-info__about-flex__line__text inactive">
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
                class="profile__main__info-layout__personal-info__contacts__item">
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.1818 0.246693C19.921 0.26567 19.665 0.326861 19.4238 0.427881H19.4205C19.1889 0.519693 18.088 0.982818 16.4143 1.68482L10.4164 4.21088C6.11257 6.02276 1.88188 7.80701 1.88188 7.80701L1.93226 7.78751C1.93226 7.78751 1.64057 7.88338 1.33588 8.09219C1.14765 8.21197 0.985672 8.3687 0.859756 8.55288C0.710256 8.77226 0.590006 9.10782 0.634694 9.45476C0.707819 10.0414 1.08807 10.3932 1.36107 10.5874C1.63732 10.784 1.90057 10.8758 1.90057 10.8758H1.90707L5.87451 12.2124C6.05244 12.7836 7.08351 16.1733 7.33132 16.9541C7.47757 17.4205 7.61976 17.7122 7.79769 17.9348C7.88382 18.0486 7.98457 18.1436 8.10563 18.22C8.16857 18.2566 8.23567 18.2855 8.30551 18.3061L8.26488 18.2964C8.27707 18.2996 8.28682 18.3094 8.29576 18.3126C8.32826 18.3216 8.35019 18.3248 8.39163 18.3313C9.01969 18.5214 9.52426 18.1314 9.52426 18.1314L9.55269 18.1087L11.8951 15.9759L15.8211 18.9878L15.9105 19.026C16.7287 19.3851 17.5574 19.1853 17.9954 18.8326C18.4366 18.4776 18.608 18.0234 18.608 18.0234L18.6364 17.9503L21.6703 2.40794C21.7564 2.02444 21.7784 1.66532 21.6833 1.31676C21.5853 0.963989 21.3589 0.660587 21.0488 0.466068C20.7883 0.307724 20.4863 0.231295 20.1818 0.246693ZM20.0998 1.91232C20.0965 1.96351 20.1063 1.95782 20.0835 2.05613V2.06507L17.0781 17.4457C17.0651 17.4676 17.0431 17.5156 16.983 17.5635C16.9196 17.6139 16.8693 17.6456 16.6052 17.5408L11.8033 13.8593L8.90269 16.5032L9.51207 12.6113L17.3576 5.29882C17.6809 4.99819 17.5729 4.93482 17.5729 4.93482C17.5956 4.56594 17.0846 4.82676 17.0846 4.82676L7.19157 10.9554L7.18832 10.9392L2.44657 9.34263V9.33938L2.43438 9.33694C2.44269 9.33418 2.45083 9.33093 2.45876 9.32719L2.48476 9.31419L2.50994 9.30526C2.50994 9.30526 6.74388 7.52101 11.0477 5.70913C13.2024 4.80157 15.3734 3.88751 17.0431 3.18226C18.0334 2.76545 19.0246 2.35107 20.0169 1.93913C20.0835 1.91313 20.0518 1.91313 20.0998 1.91313V1.91232Z"
                    fill="#1F1F1F" />
                </svg>
              </a>
              <a
                v-if="user.vk"
                :href="user.vk"
                target="_blank"
                class="profile__main__info-layout__personal-info__contacts__item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.94675 0.375C3.0006 0.378687 2.09425 0.756179 1.42521 1.42521C0.756179 2.09425 0.378687 3.0006 0.375 3.94675V16.0532C0.378687 16.9994 0.756179 17.9058 1.42521 18.5748C2.09425 19.2438 3.0006 19.6213 3.94675 19.625H16.0532C16.9994 19.6213 17.9058 19.2438 18.5748 18.5748C19.2438 17.9058 19.6213 16.9994 19.625 16.0532V3.94675C19.6213 3.0006 19.2438 2.09425 18.5748 1.42521C17.9058 0.756179 16.9994 0.378687 16.0532 0.375H3.94675ZM3.94675 2.125H16.0532C16.2929 2.12361 16.5304 2.16978 16.752 2.26083C16.9737 2.35189 17.1751 2.48603 17.3445 2.65547C17.514 2.82492 17.6481 3.0263 17.7392 3.24795C17.8302 3.46961 17.8764 3.70712 17.875 3.94675V16.0532C17.8764 16.2929 17.8302 16.5304 17.7392 16.752C17.6481 16.9737 17.514 17.1751 17.3445 17.3445C17.1751 17.514 16.9737 17.6481 16.752 17.7392C16.5304 17.8302 16.2929 17.8764 16.0532 17.875H3.94675C3.70709 17.8765 3.46952 17.8304 3.24781 17.7394C3.02611 17.6484 2.82468 17.5143 2.65521 17.3448C2.48574 17.1753 2.35161 16.9739 2.2606 16.7522C2.16958 16.5305 2.12349 16.2929 2.125 16.0532V3.94675C2.12361 3.70712 2.16978 3.46961 2.26083 3.24795C2.35189 3.0263 2.48603 2.82492 2.65547 2.65547C2.82492 2.48603 3.0263 2.35189 3.24795 2.26083C3.46961 2.16978 3.70712 2.12361 3.94675 2.125ZM9.75412 6.70125C9.111 6.69512 8.56413 6.70125 8.257 6.85175C8.05138 6.9515 7.89475 7.17637 7.99013 7.18687C8.11 7.20437 8.3795 7.26213 8.52387 7.45725C8.70762 7.70662 8.7015 8.271 8.7015 8.271C8.7015 8.271 8.80387 9.82238 8.45125 10.0175C8.20887 10.1505 7.87725 9.88013 7.15975 8.64637C6.794 8.01113 6.5175 7.31025 6.5175 7.31025C6.5175 7.31025 6.465 7.17988 6.3705 7.11163C6.25413 7.02675 6.09312 6.99875 6.09312 6.99875L4.38075 7.00925C4.38075 7.00925 4.12438 7.01975 4.0325 7.12912C3.94675 7.2315 4.0255 7.43275 4.0255 7.43275C4.0255 7.43275 5.36513 10.567 6.88238 12.1464C8.27363 13.5962 9.853 13.5 9.853 13.5H10.5705C10.5705 13.5 10.7858 13.4764 10.8951 13.36C10.9984 13.2506 10.9949 13.045 10.9949 13.045C10.9949 13.045 10.9809 12.0851 11.4254 11.9416C11.8664 11.8042 12.4264 12.8709 13.0249 13.2812C13.4799 13.5919 13.8246 13.5236 13.8246 13.5236L15.425 13.5C15.425 13.5 16.2589 13.4484 15.8625 12.7886C15.8319 12.7379 15.6332 12.3039 14.6769 11.4149C13.6715 10.4856 13.8054 10.6361 15.0146 9.02612C15.7496 8.04525 16.0436 7.44675 15.9509 7.18687C15.8634 6.9445 15.3226 7.00925 15.3226 7.00925L13.521 7.01975C13.521 7.01975 13.388 7.00225 13.2891 7.06087C13.2211 7.11136 13.167 7.17817 13.1316 7.25513C13.1316 7.25513 12.8446 8.01375 12.4649 8.66037C11.6651 10.0201 11.3405 10.0954 11.211 10.0105C10.9065 9.81187 10.9817 9.21688 10.9817 8.79688C10.9817 7.47388 11.183 6.927 10.5924 6.78437C10.3973 6.73625 10.2537 6.70562 9.755 6.70125H9.75412Z"
                    fill="#1F1F1F" />
                </svg>
              </a>
              <a
                :href="`mailto:${user.email}`"
                class="profile__main__info-layout__personal-info__contacts__item">
                <svg
                  width="24"
                  height="18"
                  viewBox="0 0 24 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21.75 0.875H2.25C1.81902 0.875 1.4057 1.0462 1.10095 1.35095C0.796205 1.6557 0.625 2.06902 0.625 2.5V15.5C0.625 15.931 0.796205 16.3443 1.10095 16.649C1.4057 16.9538 1.81902 17.125 2.25 17.125H21.75C22.181 17.125 22.5943 16.9538 22.899 16.649C23.2038 16.3443 23.375 15.931 23.375 15.5V2.5C23.375 2.06902 23.2038 1.6557 22.899 1.35095C22.5943 1.0462 22.181 0.875 21.75 0.875ZM19.9625 2.5L12 8.00875L4.0375 2.5H19.9625ZM2.25 15.5V3.23937L11.5369 9.66625C11.6729 9.7606 11.8345 9.81116 12 9.81116C12.1655 9.81116 12.3271 9.7606 12.4631 9.66625L21.75 3.23937V15.5H2.25Z"
                    fill="#1F1F1F" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="profile__main__info-layout">
          <h3 class="profile__main__info-layout__title">Отзывы</h3>
          <div class="profile__main__info-layout__reviews">
            <swiper
              v-if="
                user.about_me_reviews ? user.about_me_reviews.length > 0 : false
              "
              class="profile__main__info-layout__reviews__swiper"
              :modules="modules"
              :slides-per-view="2"
              :space-between="16"
              navigation
              :pagination="{ clickable: true }">
              <swiper-slide
                v-for="review in user.about_me_reviews"
                :key="review.id"
                class="profile__main__info-layout__reviews__swiper__slide">
                <UserReview :review="review" />
              </swiper-slide>
            </swiper>

            <div v-else class="review-empty">
              <div class="review-user">
                <span class="review-user__photo-empty"></span>
                <p class="review-user__name">Имя пользователя</p>
              </div>
              <div class="review-card">
                <div class="review-value">
                  <p class="review-value__title">Оценка:</p>
                  <div class="review-rating">
                    <p class="review-rating__value">0,0</p>
                    <RatingCalc :stars="0" />
                  </div>
                </div>
                <p class="review-card__text">Комментарии пока отсутствуют...</p>
                <p class="review-card__date">Дата публикации</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="profile__main__active-adv">
        <Advertisment
          :active-publ="true"
          :publications="active"
          @open-add-product="showAddProductModal = true" />
        <Advertisment :inactive-publ="true" :publications="inactive" />
        <FavoriteAndHistory
          id="favorites"
          :favorite-publ="true"
          :publications="user.favortie_products" />
        <FavoriteAndHistory
          :history-publ="true"
          :publications="user.history_products" />
      </section>

      <EditProfile
        v-if="editProfile"
        @close-edit-window="editProfile = false" />
    </main>

    <AddProductModal
      v-if="showAddProductModal"
      @close-add-product-window="showAddProductModal = false" />
  </div>
</template>

<script>
import Advertisment from '@/components/profile/Advertisment.vue'
import EditProfile from '@/components/profile/EditProfile.vue'
import FavoriteAndHistory from '@/components/profile/FavoriteAndHistory.vue'
import RatingCalc from '@/components/profile/RatingCalc.vue'
import UserReview from '@/components/profile/UserReview.vue'
import AddProductModal from '@/components/profile/AddProductModal.vue'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { auth } from '@/store/auth.js'
import { clients } from '@/store/clients'

import noPhoto from '@/assets/img/no-photo.png'

export default {
  components: {
    Swiper,
    SwiperSlide,
    RatingCalc,
    UserReview,
    Advertisment,
    FavoriteAndHistory,
    EditProfile,
    AddProductModal,
  },
  setup() {
    definePageMeta({
      middleware: ['authorization'],
    })

    const store = auth()
    const clientsStore = clients()
    return {
      store,
      clientsStore,
      modules: [Navigation, Pagination],
      authorized: computed(() => store.AUTHORIZED),
      user: computed(() => clientsStore.USER_STATE),
      noImage: noPhoto,
    }
  },
  data() {
    return {
      active: [],
      inactive: [],
      editProfile: false,
      showAddProductModal: false,
    }
  },
  watch: {
    '$route.query': {
      handler() {
        if (Object.hasOwn(this.$route.query, 'favorites')) {
          document.getElementById('favorites').scrollIntoView()
        }
      },
      deep: true,
    },
  },
  async mounted() {
    await this.store.CHECK_AUTH()

    if (this.authorized && this.user !== {}) {
      await this.clientsStore.GET_SELF()

      this.user.products.forEach(product => {
        if (product.status === 'Active') {
          this.active.push(product)
        } else {
          this.inactive.push(product)
        }
      })
    }

    if (Object.hasOwn(this.$route.query, 'favorites')) {
      document.getElementById('favorites').scrollIntoView()
    }

    if (Object.hasOwn(this.$route.query, 'addproduct')) {
      this.showAddProductModal = true
    }
  },
}
</script>

<style lang="scss" scoped>
.profile__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  &__title {
    @include defineFontMontserrat(600, 36px, 44px);
    margin: 0;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 20px;

    &__all-publicity {
      @include defineBtnPrimary(20px, 91px, 16px, 37px);
      cursor: pointer;
    }

    &__new-publicity {
      @include defineBtnAccent(20px, 91px, 16px, 37px);
      cursor: pointer;
    }
  }
}

.profile__main {
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;

  &__info {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    gap: 25px;
    margin-bottom: 43px;

    &-layout {
      overflow: hidden;
      width: 100%;
      display: flex;
      align-items: stretch;
      flex-direction: column;

      &__title {
        @include defineFontMontserrat(600, 24px, 29px);
        color: $primary;
        margin: 0 0 24px 0;
      }

      &__personal-info {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: $white;
        padding: 45px 60px;
        border: 1px solid $filter-border;
        box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
        border-radius: 32px;

        &__name {
          @include defineFontMontserrat(600, 24px, 29px);
          color: $black;
          margin: 0 0 34px 0;
        }

        &__edit {
          cursor: pointer;
          width: 43px;
          height: 43px;
          position: absolute;
          top: 40px;
          right: 50px;
          border-radius: 50%;
          background-color: $primary;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &__about {
          height: 100%;
          display: flex;
          align-items: center;
          gap: 70px;
          margin-bottom: 22px;

          &-flex {
            display: flex;
            align-items: stretch;
            flex-direction: column;
            gap: 20px;

            &:last-child {
              width: 100%;
            }

            &__img {
              width: 181px;
              height: 181px;
              border-radius: 50%;
            }

            &__line {
              display: flex;
              align-items: center;

              &__title {
                @include defineFontMontserrat(600, 18px, 22px);
                width: 100%;
                margin: 0;
              }

              &__text {
                @include defineFontMontserrat(400, 18px, 22px);
                width: 100%;
                margin: 0;
                &.inactive {
                  color: #b1b1b1;
                }
              }
            }
          }
        }

        &__contacts {
          padding-left: 35px;
          align-self: flex-start;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
      }

      &__reviews {
        position: relative;
        height: 100%;
        background: $white;
        padding: 45px 68px;
        border: 1px solid $filter-border;
        box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
        border-radius: 32px;

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
  gap: 15px;
}
.review-user {
  display: flex;
  align-items: center;
  gap: 12px;

  &__photo-empty {
    width: 52px;
    height: 52px;
    background-color: #efefef;
    border-radius: 50%;
  }

  &__name {
    @include defineFontMontserrat(600, 20px, 24px);
  }
}
.review-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f7f7f7;
  border-radius: 12px;
  padding: 18px 22px;

  &__text {
    @include defineFontMontserrat(400, 18px, 1.6);
    color: #bbbbbb;
  }

  &__date {
    @include defineFontMontserrat(400, 14px, 1.6);
    color: #bbbbbb;
    align-self: flex-end;
  }
}
.review-value {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    @include defineFontMontserrat(600, 18px, 1.6);
  }
}
.review-rating {
  display: flex;
  gap: 7px;
  align-items: center;

  &__value {
    @include defineFontMontserrat(400, 17px, 1.6);
  }
}
</style>

<style lang="scss">
.profile__main__info-layout__reviews__swiper .swiper-button-prev {
  left: 15px;
  right: auto;
}

.profile__main__info-layout__reviews__swiper .swiper-button-next {
  left: auto;
  right: 15px;
}

.profile__main__info-layout__reviews__swiper .swiper-button-prev,
.profile__main__info-layout__reviews__swiper .swiper-button-next {
  position: absolute;
  top: 50%;
  width: 38px;
  height: 38px;
  margin-top: calc(0px - 38px / 2);
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007aff;
}

.profile__main__info-layout__reviews__swiper .swiper-button-prev::before,
.profile__main__info-layout__reviews__swiper .swiper-button-next::before {
  content: '';
  position: absolute;
  background-color: #f7f7f7;
  border: 1px solid #dedede;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.profile__main__info-layout__reviews__swiper .swiper-button-prev::after {
  content: '';
  position: absolute;
  left: 16px;
  width: 10px;
  height: 10px;
  border-bottom: 1px solid $black;
  border-left: 1px solid $black;
  transform: rotate(45deg);
  transition: border-color 0.3s ease-in-out;
}

.profile__main__info-layout__reviews__swiper .swiper-button-next::after {
  content: '';
  position: absolute;
  right: 16px;
  width: 10px;
  height: 10px;
  border-bottom: 1px solid $black;
  border-right: 1px solid $black;
  transform: rotate(-45deg);
  transition: border-color 0.3s ease-in-out;
}

.profile__main__info-layout__reviews__swiper
  .swiper-button-prev:not(.swiper-button-disabled):hover::before,
.profile__main__info-layout__reviews__swiper
  .swiper-button-next:not(.swiper-button-disabled):hover::before {
  background-color: #1875ff;
  border: none;
}

.profile__main__info-layout__reviews__swiper
  .swiper-button-prev:not(.swiper-button-disabled):hover::after,
.profile__main__info-layout__reviews__swiper
  .swiper-button-next:not(.swiper-button-disabled):hover::after {
  border-color: $white;
}

.profile__main__info-layout__reviews__swiper
  .swiper-button-prev:not(.swiper-button-disabled):active::before,
.profile__main__info-layout__reviews__swiper
  .swiper-button-next:not(.swiper-button-disabled):active::before {
  background-color: #2c73dd;
  border: none;
}
.profile__main__info-layout__reviews__swiper .swiper-button-disabled {
  opacity: 0.3;
}
</style>
