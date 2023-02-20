<template>
  <div
    class="publication"
    @click.self="$router.push(`/product/${publication.id}`)"
  >
    <a
      class="publication__like"
      :class="{ active: like }"
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
    <div class="user">
      <img
        :src="publication.user.avatar"
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
        <p class="advanced__text">
          Местоположение:
        </p>
        <p class="advanced__text advanced__text--location">
          {{ publication.location }}
        </p>
      </div>
      <div class="advanced__line">
        <p class="advanced__text">
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
import { products } from '@/store/products';
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
  },
  setup() {
    const useProductStore = products();
    return {
      useProductStore,
      modules: [Pagination],
    };
  },
  data() {
    return {
      like: false,
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

    &.active svg {
      fill: $accent-dark;
    }

    &.active svg path {
      stroke: $accent-dark;
    }
  }

  &__swiper {
    width: 100%;
    height: 270px;
    padding-bottom: 1.5rem;
    margin-bottom: 0;
  }

  &__slide {
    cursor: grab;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $filter-background;
    border-radius: 10px;
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
  }
}

.user {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.8rem;

  &__image {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    object-fit: cover
  }

  &__name {
    max-width: 95%;
    @include defineFontMontserrat(700, 14px, 16px);
  }

  &__date {
    @include defineFontMontserrat(400, 10px, 12px);
    color: rgba(122, 122, 122, 0.9);
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

  &__line {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: space-between;
  }

  &__text {
    width: 40%;
    @include defineFontMontserrat(400, 14px, 1.4);

    &--location {
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

  &__text-bold {
    width: 40%;
    @include defineFontMontserrat(700, 14px, 1.4);
  }
}
</style>
