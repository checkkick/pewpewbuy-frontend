<template>
  <div
    class="publication"
    @click.self="$router.push(`/product/${publication.id}`)"
  >
    <a
      v-if="publication.status === 'AC'"
      class="publication__like"
      :class="{ 'publication__like--active': like }"
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
    <div
      v-if="!guestShow"
      class="user"
    >
      <img
        :src="publication.user.avatar ? publication.user.avatar : noImage"
        alt="user photo"
        class="user__image"
      >
      <div class="user__about">
        <p class="user__name">
          {{ publication.user.first_name }} {{ publication.user.last_name }}
        </p>
        <p class="user__date">
          Публикация: {{ new Date(publication.created).toLocaleDateString() }}
        </p>
      </div>
    </div>
    <swiper
      v-if="publication.photo.length > 0"
      class="publication__swiper"
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :pagination="{ clickable: true }"
    >
      <swiper-slide
        v-for="photo in publication.photo"
        :key="photo.id"
        class="publication__slide"
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
    <h4
      class="publication__title"
      @click="$router.push(`/product/${publication.id}`)"
    >
      {{ publication.manufacturer }} {{ publication.name }}
    </h4>
    <div
      class="advanced"
      @click="$router.push(`/product/${publication.id}`)"
    >
      <div class="advanced__line">
        <p
          v-if="!mobile"
          class="advanced__text"
        >
          Местоположение:
        </p>
        <p class="advanced__text advanced__text--location">
          {{ publication.location }}
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
          {{ publication.price }} р.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import noPhoto from '@/assets/img/no-photo.png';
import { products } from '@/store/products';
import { media } from '@/store/media';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    publication: {
      type: Object,
      default() {
        return {};
      },
    },
    guestShow: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const useProductStore = products();
    return {
      useProductStore,
      modules: [Pagination],
      mobile: computed(() => media().MEDIA_MOBILE),
    };
  },
  data() {
    return {
      like: false,
      noImage: noPhoto,
    };
  },
  mounted() {
    this.like = this.publication.is_favourite;
  },
  methods: {
    async onLike() {
      if (!this.like) {
        if (await this.useProductStore.ADD_FAVORITE(this.publication.id)) {
          this.like = true;
        }
      } else if (
        await this.useProductStore.REMOVE_FAVORITE(this.publication.id)
      ) {
        this.like = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.publication {
  overflow: hidden;
  cursor: pointer;
  background-color: $white;
  border-radius: 15px;
  padding: 18px 20px 35px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;

  @media (max-width: 1150px) {
    padding: 13px 18px 28px;
  }

  @media (max-width: 750px) {
    position: relative;
    padding: 0;
    border-radius: 0;
    justify-content: space-between;
  }

  &__like {
    cursor: pointer;
    position: absolute;
    width: 36px;
    height: 36px;
    top: 15px;
    right: 15px;
    background-color: $grey;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2);

    @media (max-width: 1150px) {
      top: 9px;
      transform: scale(0.9);
    }

    @media (max-width: 750px) {
      top: auto;
      bottom: 0;
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

    &.publication__like--active svg {
      fill: $accent-dark;
    }

    &.publication__like--active svg path {
      stroke: $accent-dark;
    }
  }

  &__swiper {
    width: 100%;
    height: 270px;
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
      margin-bottom: 0.3rem;
    }
  }
}

.user {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.8rem;

  @media (max-width: 1150px) {
    margin-bottom: 0.8rem;
  }

  &__image {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    object-fit: cover;

    @media (max-width: 1150px) {
      width: 28px;
      height: 28px;
    }
  }

  &__name {
    max-width: 95%;
    @include defineFontMontserrat(700, 14px, 16px);

    @media (max-width: 1150px) {
      font-size: 12px;
      line-height: 14px;
    }

    @media (max-width: 750px) {
      max-width: none;
    }
  }

  &__date {
    @include defineFontMontserrat(400, 10px, 12px);
    color: rgba(122, 122, 122, 0.9);

    @media (max-width: 1150px) {
      font-size: 9px;
      line-height: 10px;
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
