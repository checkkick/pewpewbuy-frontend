<template>
  <div class="favorite">
    <div class="favorite__title" @click="open = !open">
      <span
        class="favorite__title__logo"
        :class="{ favoritePubl, historyPubl }"></span>
      <h3 v-if="favoritePubl" class="favorite__title__name">
        Избранное ({{ publications.length }})
      </h3>
      <h3 v-if="historyPubl" class="favorite__title__name">
        История просмотра
      </h3>
      <a class="favorite__title__open-arrow" :class="{ open }" @click.prevent>
        <svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.2103 0.790208C10.7026 0.282526 9.87946 0.282526 9.37178 0.790208L1.09863 9.06336C0.590946 9.57104 0.590946 10.3942 1.09863 10.9018C1.60631 11.4095 2.42942 11.4095 2.93711 10.9018L10.291 3.54792L17.6449 10.9018C18.1526 11.4095 18.9757 11.4095 19.4834 10.9018C19.9911 10.3942 19.9911 9.57104 19.4834 9.06336L11.2103 0.790208ZM11.591 2.29053V1.70945L8.99102 1.70945V2.29053H11.591Z"
            fill="#8D8D8D" />
        </svg>
      </a>
    </div>
    <transition
      name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave">
      <div
        v-show="open"
        class="favorite__wrapper"
        :class="{ favoritePubl, historyPubl }">
        <swiper
          class="favorite__wrapper__swiper"
          :modules="modules"
          :slides-per-view="4"
          :space-between="25"
          navigation>
          <swiper-slide
            v-for="publication in publications"
            :key="publication.id"
            class="favorite__wrapper__swiper__slide">
            <OtherPublications
              :publication="publication"
              :liked="favoritePubl" />
          </swiper-slide>
        </swiper>
      </div>
    </transition>
  </div>
</template>

<script>
import { Navigation } from 'swiper'
import 'swiper/scss'
import { Swiper, SwiperSlide } from 'swiper/vue'
import OtherPublications from './OtherPublications.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    OtherPublications,
  },
  props: {
    favoritePubl: { type: Boolean, default: false },
    historyPubl: { type: Boolean, default: false },
    publications: { type: Array, default: () => [] },
  },
  setup() {
    const open = ref(true)
    return {
      open,
      modules: [Navigation],
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.height = '0'
    },
    enter: function (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave: function (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave: function (el) {
      el.style.height = '0'
    },
  },
}
</script>

<style lang="scss" scoped>
.favorite {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 25px;
  margin-bottom: 30px;

  &__title {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;

    &__logo {
      width: 34px;
      height: 34px;

      &.favoritePubl {
        background: url('@/assets/img/profile-favorite.svg') no-repeat center
          center;
      }

      &.historyPubl {
        background: url('@/assets/img/profile-history.svg') no-repeat center
          center;
      }
    }

    &__name {
      @include defineFontMontserrat(600, 24px, 29px);
      color: $primary;
      margin: 0;
    }

    &__open-arrow {
      transition: transform 0.3s ease-in-out;

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  &__wrapper {
    overflow: hidden;
    transition: 0.5s ease-out;
    border-radius: 20px;

    &.favoritePubl {
      background: rgba(248, 185, 78, 0.05);
      box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
    }

    &.historyPubl {
      background: rgba(58, 222, 183, 0.04);
      box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
    }

    &__swiper__add {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 13px;
      background: $white;
      outline: 2px dashed $primary;
      outline-offset: -2px;
      border-radius: 20px;
      height: auto;

      &__text {
        @include defineFontMontserrat(500, 20px, 1.4);
      }

      &__image {
        max-width: 45px;
      }
    }
  }
}
</style>

<style lang="scss">
.favorite__wrapper__swiper {
  margin: 40px 30px;
  cursor: grab;
  position: static;
}

.favorite__wrapper__swiper .swiper-button-prev {
  right: 50px;
  left: auto;
}

.favorite__wrapper__swiper .swiper-button-next {
  left: auto;
  right: 0;
}

.favorite__wrapper__swiper .swiper-button-prev,
.favorite__wrapper__swiper .swiper-button-next {
  position: absolute;
  top: 14px;
  width: 38px;
  height: 38px;
  margin-top: calc(0px - 38px / 2);
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
}

.favorite__wrapper__swiper .swiper-button-prev::before,
.favorite__wrapper__swiper .swiper-button-next::before {
  content: '';
  position: absolute;
  background-color: #f7f7f7;
  border: 1px solid #dedede;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.favorite__wrapper__swiper .swiper-button-prev::after {
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

.favorite__wrapper__swiper .swiper-button-next::after {
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

.favorite__wrapper__swiper .swiper-button-prev:hover::before,
.favorite__wrapper__swiper .swiper-button-next:hover::before {
  background-color: $accent;
  border: none;
}

.favorite__wrapper__swiper .swiper-button-prev:active::before,
.favorite__wrapper__swiper .swiper-button-next:active::before {
  background-color: $accent-dark;
  border: none;
}
</style>
