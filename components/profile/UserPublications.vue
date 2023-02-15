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
        class="active"
      >{{ status }}</span>
      <span
        v-if="inactivePubl"
        class="inactive"
      >{{ status }}</span>
    </p>
    <div
      v-if="activePubl"
      class="publication__views"
    >
      <p class="publication__views__text">
        {{ publ.views_count }} просмотров
      </p>
    </div>
    <swiper
      class="publication__image-swiper"
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :pagination="{ clickable: true }"
    >
      <swiper-slide
        v-for="photo in publ.photo"
        :key="photo.id"
        class="publication__image-swiper__slide"
        :class="{ inactivePubl }"
      >
        <img
          class="publication__image-swiper__slide__photo"
          :src="photo.file"
          alt="product-example"
        >
      </swiper-slide>
    </swiper>
    <h4 class="publication__title">
      {{ publ.manufacturer }} {{ publ.name }}
    </h4>
    <div class="publication__advanced">
      <div class="publication__advanced__line">
        <p class="publication__advanced__line__text">
          Местоположение:
        </p>
        <p class="publication__advanced__line__text">
          {{ publ.location }}
        </p>
      </div>
      <div class="publication__advanced__line">
        <p class="publication__advanced__line__text">
          Цена:
        </p>
        <p class="publication__advanced__line__text-bold">
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
      this.status = 'Опубликовано';
    } else if (this.publ.status === 'Sold') {
      this.status = 'Продано';
    } else if (this.publ.status === 'Publication off') {
      this.status = 'Снято с публикации';
    } else if (this.publ.status === 'On moderation') {
      this.status = 'На модерации';
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
      color: $success;
    }

    & .inactive {
      color: $alert;
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
  padding-top: 60px;
}

.settings-substrat {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(60, 60, 60, 0.37);
  border-radius: 20px;
}

.setting-list {
  z-index: 1;
  background: $modal-background;
  border: 1px solid $filter-border;
  box-shadow: 0px 13px 12px rgba(0, 0, 0, 0.06);
  border-radius: 14px;
  margin: 0;
  padding: 24px 0;
  list-style: none;

  &__item {
    cursor: pointer;
    padding: 10px 26px;
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
    @include defineFontMontserrat(500, 16px, 1.4);
    text-decoration: none;
    color: $black;
    transition: color 0.1s ease-in-out;
  }
}

.remove-accept {
  padding: 24px 20px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__text {
    @include defineFontMontserrat(400, 16px, 1.4);
    text-align: center;
    margin-bottom: 20px;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  &__btn-primary {
    @include defineBtnPrimary(14px, 5px, 8px, 28px);
  }

  &__btn-secondary {
    @include defineBtnPrimary(14px, 5px, 8px, 28px);
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
