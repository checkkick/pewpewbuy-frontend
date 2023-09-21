<template>
  <transition name="fade">
    <div
      v-if="showSettings"
      class="hidden-settings"
    >
      <div
        class="settings-substrat"
        @click="$emit('closeSettings')"
      />
      <ul
        v-if="mainSettnigs"
        class="setting-list"
      >
        <h4
          v-if="mobile"
          class="setting-list__title"
        >
          {{ publName }}
        </h4>
        <li class="setting-list__item">
          <a
            href=""
            class="setting-list__link"
            @click.prevent="$router.push('product/' + publId)"
          >Открыть карточку</a>
        </li>
        <li class="setting-list__item">
          <a
            href=""
            class="setting-list__link"
            @click.prevent="$emit('showEditProductModal'), $emit('closeSettings')"
          >Редактировать</a>
        </li>
        <li
          v-if="publStatus === 'AC'"
          class="setting-list__item"
        >
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
            @click="deleteProduct(publId)"
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
</template>

<script>
import { products } from '@/store/products';
import { clients } from '@/store/clients';
import { media } from '@/store/media';

export default {
  props: {
    showSettings: { type: Boolean, default: false },
    publId: { type: Number, default: 0 },
    publName: { type: String, default: '' },
    publStatus: { type: String, default: '' },
  },
  emits: ['showEditProductModal', 'closeSettings'],
  setup() {
    const removeProduct = products().REMOVE_PRODUCT;

    return {
      removeProduct,
      mobile: computed(() => media().MEDIA_MOBILE),
    };
  },
  data() {
    return {
      clientsStore: clients(),
      mainSettnigs: true,
    };
  },
  methods: {
    async deleteProduct(id) {
      if (await this.removeProduct(id)) {
        await this.clientsStore.GET_SELF();
        this.$emit('closeSettings');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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

  @media (max-width: 750px) {
    z-index: 9999;
    position: fixed;
    align-items: center;
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

  @media (max-width: 750px) {
    background: rgba(17, 17, 17, 0.42);
    border-radius: 0;
  }
}

.setting-list {
  display: flex;
  align-items: stretch;
  flex-direction: column;
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

  &__title {
    @media (max-width: 750px) {
      @include defineFontMontserrat(600, 13px, 1.2);
      text-align: center;
      margin: 0 1rem 0.5rem;
    }
  }

  &__link {
    display: block;
    @include defineFontMontserrat(500, 12px, 1.4);
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    padding: 8px 20px;
    color: $black;
    transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;

    &:hover {
      color: $white;
      background-color: $primary;
    }
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
