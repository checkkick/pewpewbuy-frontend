<template>
  <div
    class="publication"
    @click.self="$router.push(`/product/${publication.id}`)">
    <a
      class="publication__like"
      :class="{ active: like }"
      @click.prevent="onLike()">
      <svg
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.56973 10.7847C0.246983 7.76552 1.02123 3.23679 4.89247 1.72722C8.76372 0.217645 11.0865 3.23679 11.8607 4.74637C12.635 3.23679 15.732 0.217645 19.6032 1.72722C23.4744 3.23679 23.4744 7.76552 21.1517 10.7847C18.8289 13.8038 11.8607 19.8421 11.8607 19.8421C11.8607 19.8421 4.89247 13.8038 2.56973 10.7847Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </a>
    <div class="publication__user">
      <img
        :src="publication.user.avatar"
        alt="user photo"
        class="publication__user__image" />
      <div class="publication__user__about">
        <p class="publication__user__about__name">
          {{ publication.user.first_name }} {{ publication.user.last_name }}
        </p>
        <p class="publication__user__about__date">
          Публикация: {{ new Date(publication.created).toLocaleDateString() }}
        </p>
      </div>
    </div>
    <swiper
      class="publication__image-swiper"
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :pagination="{ clickable: true }">
      <swiper-slide
        v-for="photo in publication.photo"
        :key="photo.id"
        class="publication__image-swiper__slide">
        <img
          class="publication__image-swiper__slide__photo"
          :src="photo.file"
          alt="product-example" />
      </swiper-slide>
    </swiper>
    <h4
      class="publication__title"
      @click="$router.push(`/product/${publication.id}`)">
      {{ publication.manufacturer }} {{ publication.name }}
    </h4>
    <div
      class="publication__advanced"
      @click="$router.push(`/product/${publication.id}`)">
      <div class="publication__advanced__line">
        <p class="publication__advanced__line__text">Местоположение:</p>
        <p class="publication__advanced__line__text">
          {{ publication.location }}
        </p>
      </div>
      <div class="publication__advanced__line">
        <p class="publication__advanced__line__text">Цена:</p>
        <p class="publication__advanced__line__text-bold">
          {{ publication.price }} р.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from '@/store/products'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    publication: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup() {
    const useProductStore = products()
    return {
      useProductStore,
      modules: [Pagination],
    }
  },
  data() {
    return {
      like: false,
    }
  },
  mounted() {
    this.like = this.publication.is_favourite
  },
  methods: {
    async onLike() {
      if (!this.like) {
        if (await this.useProductStore.ADD_FAVORITE(this.publication.id)) {
          this.like = true
        }
      } else if (
        await this.useProductStore.REMOVE_FAVORITE(this.publication.id)
      ) {
        this.like = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.publication {
  cursor: pointer;
  position: relative;
  background-color: $white;
  border-radius: 20px;
  padding: 25px 35px 45px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__like {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
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

  &__user {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;

    &__image {
      width: 52px;
      height: 52px;
      border-radius: 50%;
    }

    &__about {
      &__name {
        @include defineFontMontserrat(700, 18px, 22px);
        margin-bottom: 2px;
      }

      &__date {
        @include defineFontMontserrat(400, 13px, 16px);
        color: rgba(122, 122, 122, 0.9);
      }
    }
  }

  &__image-swiper {
    width: 100%;
    height: 327px;
    padding-bottom: 25px;
    margin-bottom: 10px;

    &__slide {
      cursor: grab;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $filter-background;
      border-radius: 15px;

      &__photo {
        width: 100%;
        height: 100%;
        border-radius: 15px;
        object-fit: contain;
      }
    }
  }

  &__title {
    @include defineFontMontserrat(700, 18px, 1.4);
    margin-bottom: 15px;
  }

  &__advanced {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 11px;

    &__line {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;

      &__text {
        @include defineFontMontserrat(400, 20px, 1.4);
        margin: 0;
      }

      &__text-bold {
        @include defineFontMontserrat(700, 20px, 1.4);
        margin: 0;
      }
    }
  }
}
</style>

<style lang="scss">
.publication__image-swiper .swiper-pagination-bullet {
  background-color: $black;
}
.publication__image-swiper .swiper-pagination-bullet-active {
  background-color: $input-login-color;
}
.publication__image-swiper .swiper-pagination-fraction,
.publication__image-swiper .swiper-pagination-custom,
.publication__image-swiper .swiper-horizontal > .swiper-pagination-bullets,
.publication__image-swiper
  .swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.publication__image-swiper .swiper-pagination-lock {
  display: flex;
}
.publication__image-swiper .swiper-pagination-bullet:only-child {
  display: block !important;
}
</style>
