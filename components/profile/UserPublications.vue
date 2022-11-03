<template>
  <div class="publication">
    <a class="publication__edit" @click.prevent>
      <img src="@/assets/img/profile-edit.svg" alt="profile-edit" />
    </a>
    <p class="publication__status">
      Статус:
      <span v-if="activePubl" class="active">{{ status }}</span>
      <span v-if="inactivePubl" class="inactive">{{ status }}</span>
    </p>
    <div v-if="activePubl" class="publication__views">
      <p class="publication__views__text">{{ publ.views_count }} просмотров</p>
    </div>
    <swiper
      class="publication__image-swiper"
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :pagination="{ clickable: true }">
      <swiper-slide
        v-for="photo in publ.photo"
        :key="photo.id"
        class="publication__image-swiper__slide"
        :class="{ inactivePubl }">
        <img
          class="publication__image-swiper__slide__photo"
          :src="photo.file"
          alt="product-example" />
      </swiper-slide>
    </swiper>
    <h4 class="publication__title">{{ publ.manufacturer }} {{ publ.name }}</h4>
    <div class="publication__advanced">
      <div class="publication__advanced__line">
        <p class="publication__advanced__line__text">Местоположение:</p>
        <p class="publication__advanced__line__text">{{ publ.location }}</p>
      </div>
      <div class="publication__advanced__line">
        <p class="publication__advanced__line__text">Цена:</p>
        <p class="publication__advanced__line__text-bold">
          {{ publ.price }} руб.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
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
    activePubl: { type: Boolean, default: false },
    inactivePubl: { type: Boolean, default: false },
    publ: { type: Object, default: () => {} },
  },
  setup() {
    return {
      modules: [Pagination],
    }
  },
  data() {
    return {
      status: '',
    }
  },
  mounted() {
    if (this.publ.status === 'Active') {
      this.status = 'Опубликовано'
    } else if (this.publ.status === 'Sold') {
      this.status = 'Продано'
    } else if (this.publ.status === 'Publication off') {
      this.status = 'Снято с публикации'
    } else if (this.publ.status === 'On moderation') {
      this.status = 'На модерации'
    }
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

  &__edit {
    z-index: 5;
    cursor: pointer;
    width: 43px;
    height: 43px;
    position: absolute;
    top: 25px;
    right: 25px;
    border-radius: 50%;
    background-color: $primary;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__status {
    @include defineFontMontserrat(700, 18px, 22px);
    color: $black;
    margin: 0 0 10px 0;

    & .active {
      color: #00ad45;
    }
    & .inactive {
      color: #f50000;
    }
  }

  &__views {
    display: flex;
    align-items: center;
    gap: 7px;
    padding-left: 23px;
    background: url('@/assets/img/views-eye.svg') no-repeat left center;

    &__text {
      @include defineFontMontserrat(500, 14px, 17px);
      color: rgba(98, 98, 98, 0.9);
      margin: 0;
    }
  }

  &__image-swiper {
    width: 100%;
    height: 327px;
    margin-top: 20px;
    padding-bottom: 25px;
    margin-bottom: 10px;

    &__slide {
      cursor: grab;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $filter-background;
      border-radius: 15px;

      &.inactivePubl {
        opacity: 0.5;
      }

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
    margin: 0 0 14px 0;
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
