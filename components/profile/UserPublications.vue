<template>
  <div class="publication">
    <a
      v-if="showEdit"
      class="publication__edit"
      @click.prevent="showSettings = !showSettings"
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
    <p class="publication__status">
      Статус:
      <span
        v-if="publ.status"
        :class="publ.status === 'AC' ? 'publication__status--active' : 'publication__status--inactive'"
      >{{ status }}</span>
    </p>
    <div
      v-if="activePubl"
      class="views"
    >
      <p class="views__text">
        {{ publ.views_count }} просмотров
      </p>
    </div>
    <swiper
      v-if="publ.photo.length > 0"
      class="publication__swiper"
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :pagination="{ clickable: true }"
    >
      <swiper-slide
        v-for="photo in publ.photo"
        :key="photo.id"
        class="publication__slide"
        :class="{ 'publication__slide--inactive': inactivePubl }"
      >
        <img
          class="publication__photo"
          :src="photo.file"
          alt="product-example"
        >
      </swiper-slide>
    </swiper>
    <div
      v-else
      class="publication__swiper"
    >
      <div class="publication__no-photo">
        <p class="publication__no-text">
          Фото товара отсутствует
        </p>
      </div>
    </div>
    <h4 class="publication__title">
      {{ publ.manufacturer }} {{ publ.name }}
    </h4>
    <div class="advanced">
      <div class="advanced__line">
        <p
          v-if="!mobile"
          class="advanced__text"
        >
          Местоположение:
        </p>
        <p class="advanced__text advanced__text--location">
          {{ publ.location }}
        </p>
      </div>
      <div class="advanced__line">
        <p
          v-if="!mobile"
          class="advanced__text"
        >
          Цена:
        </p>
        <p class="advanced__text-bold">
          {{ publ.price }} руб.
        </p>
      </div>
    </div>

    <Settings
      :show-settings="showSettings"
      :publ-id="publ.id"
      :publ-name="publ.name"
      :publ-status="publ.status"
      @close-settings="showSettings = false"
      @show-edit-product-modal="$emit('showEditProductModal', publ.id)"
    />
  </div>
</template>

<script>
import Settings from '@/components/product/Settings.vue';
import { media } from '@/store/media';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
  components: {
    Swiper,
    SwiperSlide,
    Settings,
  },
  props: {
    activePubl: { type: Boolean, default: false },
    inactivePubl: { type: Boolean, default: false },
    showEdit: { type: Boolean, default: true },
    publ: { type: Object, default: () => ({}) },
  },
  emits: ['showEditProductModal'],
  setup() {
    return {
      modules: [Pagination],
      mobile: computed(() => media().MEDIA_MOBILE),
    };
  },
  data() {
    return {
      status: '',
      showSettings: false,
    };
  },
  mounted() {
    if (this.publ.status === 'AC') {
      this.status = 'опубликовано';
    } else if (this.publ.status === 'SO') {
      this.status = 'продано';
    } else if (this.publ.status === 'PO') {
      this.status = 'снято с публикации';
    } else if (this.publ.status === 'OM') {
      this.status = 'на модерации';
    } else if (this.publ.status === 'DI') {
      this.status = 'отклонено';
    }
  },
};
</script>

<style lang="scss" scoped>
.publication {
  cursor: pointer;
  overflow: hidden;
  background-color: $white;
  border-radius: 15px;
  padding: 18px 20px 35px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;

  @media (max-width: 1150px) {
    padding: 13px 18px 28px;
  }

  @media (max-width: 750px) {
    position: relative;
    padding: 0;
    border-radius: 0;
  }

  &__edit {
    z-index: 5;
    cursor: pointer;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 15px;
    right: 15px;
    border-radius: 50%;
    background-color: $primary;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1150px) {
      top: 10px;
      transform: scale(0.9);
    }

    @media (max-width: 750px) {
      top: auto;
      bottom: 0;
      right: 0;
      background-color: #f4f4f4;

      & path {
        fill: $black-light;
      }
    }
  }

  &__status {
    @include defineFontMontserrat(700, 14px, 16px);
    color: $black;
    margin-bottom: 0.4rem;

    @media (max-width: 1150px) {
      font-size: 12px;
      line-height: 14px;
      margin-bottom: 0.3rem;
    }

    @media (max-width: 750px) {
      font-size: 10px;
      line-height: normal;
    }

    & &--active {
      color: $success;
    }

    & &--inactive {
      color: $alert;
    }
  }

  &__swiper {
    width: 100%;
    height: 270px;
    margin-top: 1rem;
    padding-bottom: 1.5rem;
    margin-bottom: 0;

    @media (max-width: 1150px) {
      padding-bottom: 1.3rem;
      height: 240px;
    }

    @media (max-width: 750px) {
      margin-top: 0;
      padding-bottom: 1.2rem;
      height: 170px;
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
    border-radius: 10px;

    @media (max-width: 1150px) {
      background-color: $modal-background;
    }

    &.publication__slide--inactive {
      opacity: 0.5;
    }
  }

  &__photo {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: contain;
  }

  &__title {
    @include defineFontMontserrat(700, 14px, 1.4);
    margin-bottom: 0.5rem;

    @media (max-width: 1150px) {
      font-size: 12px;
      margin-bottom: 0.2rem;
    }

    @media (max-width: 750px) {
      margin-bottom: 0.5rem;
    }
  }
}

.views {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 17px;
  background: url('@/assets/img/views-eye.svg') no-repeat left center;

  @media (max-width: 1150px) {
    padding-left: 15px;
    background-size: 11px 11px;
  }

  @media (max-width: 750px) {
    display: none;
  }

  &__text {
    @include defineFontMontserrat(500, 11px, 13px);
    color: rgba(98, 98, 98, 0.9);

    @media (max-width: 1150px) {
      font-size: 10px;
    }
  }
}

.advanced {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  flex-grow: 1;
  gap: 0.5rem;

  @media (max-width: 750px) {
    gap: 3px;
    justify-content: flex-end;
  }

  &__line {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.2rem 0.5rem;
    justify-content: space-between;
  }

  &__text {
    @include defineFontMontserrat(400, 14px, 1.4);

    @media (max-width: 1150px) {
      font-size: 12px;
    }

    &--location {
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;

      @media (max-width: 750px) {
        color: #9D9D9D;
      }
    }
  }

  &__text-bold {
    @include defineFontMontserrat(700, 14px, 1.4);

    @media (max-width: 1150px) {
      font-size: 12px;
    }
  }
}
</style>

<style lang="scss">
@media (max-width: 750px) {
  .swiper-pagination-bullet {
    width: 4px;
    height: 4px;
  }
}
</style>
