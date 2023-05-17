<template>
  <div class="publication">
    <a
      v-if="showEdit"
      class="publication__edit"
      @click.prevent="showSettings = !showSettings"
    >
      <img
        src="@/assets/img/profile-edit.svg"
        alt="profile-edit"
      >
    </a>
    <p class="publication__status">
      Статус:
      <span
        v-if="activePubl"
        class="publication__status--active"
      >{{ status }}</span>
      <span
        v-if="inactivePubl"
        class="publication__status--inactive"
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
        <p class="advanced__text">
          Местоположение:
        </p>
        <p class="advanced__text advanced__text--location">
          {{ publ.location }}
        </p>
      </div>
      <div class="advanced__line">
        <p class="advanced__text">
          Цена:
        </p>
        <p class="advanced__text-bold">
          {{ publ.price }} руб.
        </p>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="showSettings"
        class="hidden-settings"
      >
        <div
          class="settings-substrat"
          @click="showSettings = !showSettings"
        />
        <ul
          v-if="mainSettnigs"
          class="setting-list"
        >
          <li class="setting-list__item">
            <a
              href=""
              class="setting-list__link"
              @click.prevent="$router.push('product/' + publ.id)"
            >Открыть карточку</a>
          </li>
          <li class="setting-list__item">
            <a
              href=""
              class="setting-list__link"
              @click.prevent="$emit('showEditProductModal', publ.id)"
            >Редактировать</a>
          </li>
          <li class="setting-list__item">
            <a
              href=""
              class="setting-list__link"
              @click.prevent="mainSettnigs = false"
            >Удалить публикацию</a>
          </li>
        </ul>

        <div
          v-else
          class="remove-accept setting-list"
        >
          <p class="remove-accept__text">
            Вы точно уверены, что хотите удалить публикацию?
          </p>
          <div class="remove-accept__row">
            <button
              class="remove-accept__btn-primary"
              @click="deleteProduct(publ.id)"
            >
              Да
            </button>
            <button
              class="remove-accept__btn-secondary"
              @click="mainSettnigs = true"
            >
              Нет
            </button>
          </div>
        </div>
      </div>
    </transition>
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
    activePubl: { type: Boolean, default: false },
    inactivePubl: { type: Boolean, default: false },
    showEdit: { type: Boolean, default: true },
    publ: { type: Object, default: () => ({}) },
  },
  emits: ['refreshProducts', 'showEditProductModal'],
  setup() {
    const removeProduct = products().REMOVE_PRODUCT;

    return {
      removeProduct,
      modules: [Pagination],
    };
  },
  data() {
    return {
      status: '',
      showSettings: false,
      mainSettnigs: true,
    };
  },
  mounted() {
    if (this.publ.status === 'Active') {
      this.status = 'опубликовано';
    } else if (this.publ.status === 'Sold') {
      this.status = 'продано';
    } else if (this.publ.status === 'Publication off') {
      this.status = 'снято с публикации';
    } else if (this.publ.status === 'On moderation') {
      this.status = 'на модерации';
    }
  },
  methods: {
    async deleteProduct(id) {
      if (await this.removeProduct(id)) {
        this.$emit('refreshProducts');
        this.showSettings = false;
      }
    },
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
    }
  }

  &__text-bold {
    @include defineFontMontserrat(700, 14px, 1.4);

    @media (max-width: 1150px) {
      font-size: 12px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hidden-settings {
  cursor: auto;
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 4rem;

  @media (max-width: 1150px) {
    padding-top: 2rem;
  }
}

.settings-substrat {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(60, 60, 60, 0.37);
  border-radius: 15px;
}

.setting-list {
  z-index: 1;
  background: $modal-background;
  border: 1px solid $filter-border;
  box-shadow: 0px 10px 9px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  margin: 0;
  padding: 20px 0;
  list-style: none;

  @media (max-width: 1150px) {
    background-color: $white;
    padding: 15px 0;
  }

  &__item {
    cursor: pointer;
    padding: 8px 20px;
    text-align: center;
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: $primary;
    }
  }

  &__item:hover &__link {
    color: $white;
  }

  &__link {
    @include defineFontMontserrat(500, 12px, 1.4);
    text-decoration: none;
    color: $black;
    transition: color 0.1s ease-in-out;
  }
}

.remove-accept {
  padding: 18px 10px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__text {
    @include defineFontMontserrat(400, 12px, 1.4);
    text-align: center;
    margin-bottom: 0.8rem;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__btn-primary {
    @include defineBtnPrimary(12px, 4px, 5px, 22px);
  }

  &__btn-secondary {
    @include defineBtnPrimary(12px, 4px, 5px, 22px);
    background-color: $filter-border;
    color: $black;

    &:not(:disabled):hover {
      background-color: $filter-border-hover;
      box-shadow: none;
    }

    &:not(:disabled):active {
      background-color: $filter-border-hover;
    }
  }
}
</style>
