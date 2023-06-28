<template>
  <div class="publications">
    <div
      class="publications__title"
      @click="open = !open"
    >
      <span
        class="publications__logo"
        :class="{ 'publications__logo--active': activePubl, 'publications__logo--inactive': inactivePubl }"
      />
      <h3
        v-if="activePubl"
        class="publications__name"
      >
        Активные объявления ({{ publications.length }})
      </h3>
      <h3
        v-if="inactivePubl"
        class="publications__name"
      >
        Неактивные объявления ({{ publications.length }})
      </h3>
      <a
        class="publications__open-arrow"
        :class="{ 'publications__open-arrow--active': open }"
        @click.prevent
      >
        <svg
          width="18"
          height="11"
          viewBox="0 0 18 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.7955 0.953463C9.35616 0.514123 8.64384 0.514123 8.2045 0.953463L1.04505 8.11292C0.605709 8.55226 0.605709 9.26457 1.04505 9.70391C1.48439 10.1432 2.1967 10.1432 2.63604 9.70391L9 3.33995L15.364 9.70391C15.8033 10.1432 16.5156 10.1432 16.955 9.70391C17.3943 9.26457 17.3943 8.55226 16.955 8.11292L9.7955 0.953463ZM10.125 2.5V1.74896H7.875V2.5H10.125Z"
            fill="#8D8D8D"
          />
        </svg>
      </a>
    </div>
    <transition
      name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div
        v-if="open && (publications.length > 0 || activePubl)"
        class="publications__wrapper"
        :class="{ 'publications__wrapper--active': activePubl, 'publications__wrapper--inactive': inactivePubl }"
      >
        <swiper
          class="publications__swiper"
          :modules="modules"
          :slides-per-view="4"
          :space-between="15"
          navigation
        >
          <swiper-slide
            v-for="publication in publications"
            :key="publication.id"
            class="publications__slide"
          >
            <UserPublications
              :active-publ="activePubl"
              :inactive-publ="inactivePubl"
              :publ="publication"
              :show-edit="!guestUser"
              @show-edit-product-modal="showEditModalMethod"
            />
          </swiper-slide>
          <swiper-slide
            v-if="activePubl && !guestUser"
            class="slide-add"
            @click="$emit('openAddProduct')"
          >
            <p class="slide-add__text">
              Добавить объявление
            </p>
            <img
              class="slide-add__img"
              src="@/assets/img/add-publication.svg"
              alt="add"
            >
          </swiper-slide>
        </swiper>
      </div>
    </transition>
  </div>
</template>

<script>
import { Navigation } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import UserPublications from './UserPublications.vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
    UserPublications,
  },
  props: {
    activePubl: { type: Boolean, default: false },
    inactivePubl: { type: Boolean, default: false },
    guestUser: { type: Boolean, default: false },
    publications: { type: Array, default: () => [] },
  },
  emits: ['openAddProduct', 'showEditProductModal'],
  setup() {
    const open = ref(true);
    return {
      open,
      modules: [Navigation],
    };
  },
  methods: {
    beforeEnter(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = '0';
    },
    enter(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = `${el.scrollHeight}px`;
    },
    beforeLeave(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = `${el.scrollHeight}px`;
    },
    leave(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = '0';
    },
    showEditModalMethod(id) {
      this.$emit('showEditProductModal', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.publications {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  margin-bottom: 1rem;

  &__title {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    cursor: pointer;
  }

  &__logo {
    width: 25px;
    height: 25px;
    margin-right: 0.5rem;
    border-radius: 50%;

    @media (max-width: 1150px) {
      margin-right: 0;
      width: 20px;
      height: 20px;
    }

    &--active {
      background-color: $success;
    }

    &--inactive {
      background-color: $alert;
    }
  }

  &__name {
    @include defineFontMontserrat(600, 19px, 22px);
    color: $primary;
    display: flex;
    align-items: center;

    @media (max-width: 1150px) {
      font-size: 16px;
      line-height: 20px;
    }
  }

  &__open-arrow {
    transition: transform 0.3s ease-in-out;

    & svg {
      @media (max-width: 1150px) {
        width: 16px;
        height: 9px;
      }
    }

    &.publications__open-arrow--active {
      transform: rotate(180deg);
    }
  }

  &__wrapper {
    overflow: hidden;
    transition: 0.5s ease-out;
    border-radius: 15px;

    &--active {
      background-color: rgba(75, 143, 245, 0.06);
      box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
    }

    &--inactive {
      background: rgba(231, 0, 0, 0.03);
      box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
    }
  }

  &__slide {
    display: flex;
    height: auto;
  }
}

.slide-add {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: $white;
  outline: 2px dashed $primary;
  outline-offset: -2px;
  border-radius: 15px;
  height: auto;
  min-height: 500px;

  @media (max-width: 1150px) {
    min-height: 400px;
  }

  &__text {
    @include defineFontMontserrat(500, 15px, 1.4);

    @media (max-width: 1150px) {
      font-size: 13px;
    }
  }

  &__img {
    max-width: 35px;

    @media (max-width: 1150px) {
      max-width: 25px;
    }
  }
}
</style>

<style lang="scss">
.publications__swiper {
  margin: 30px 20px;
  cursor: grab;
  position: static;

  @media (max-width: 1150px) {
    margin: 20px 15px;
  }
}

.publications__swiper .swiper-wrapper {
  align-items: stretch;
}

.publications__swiper .swiper-button-prev {
  right: 35px;
  left: auto;
}

.publications__swiper .swiper-button-next {
  left: auto;
  right: 0;
}

.publications__swiper .swiper-button-prev,
.publications__swiper .swiper-button-next {
  position: absolute;
  top: 14px;
  width: 25px;
  height: 25px;
  margin-top: calc(0px - 25px / 2);
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
}

.publications__swiper .swiper-button-prev::before,
.publications__swiper .swiper-button-next::before {
  content: '';
  position: absolute;
  background-color: $grey-light;
  border: 1px solid $filter-border;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.publications__swiper .swiper-button-prev::after {
  content: '';
  position: absolute;
  left: 10px;
  width: 8px;
  height: 8px;
  border-bottom: 1px solid $black;
  border-left: 1px solid $black;
  transform: rotate(45deg);
  transition: border-color 0.3s ease-in-out;
}

.publications__swiper .swiper-button-next::after {
  content: '';
  position: absolute;
  right: 10px;
  width: 8px;
  height: 8px;
  border-bottom: 1px solid $black;
  border-right: 1px solid $black;
  transform: rotate(-45deg);
  transition: border-color 0.3s ease-in-out;
}

.publications__swiper .swiper-button-prev:hover::before,
.publications__swiper .swiper-button-next:hover::before {
  background-color: $accent;
  border: none;
}

.publications__swiper .swiper-button-prev:active::before,
.publications__swiper .swiper-button-next:active::before {
  background-color: $accent-dark;
  border: none;
}
</style>
