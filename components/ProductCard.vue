<template>
  <div class="product-card">
    <img
      class="product-card__image"
      :src="product.photo[0].file"
      alt="product" />
    <h4 class="product-card__title">
      {{ product.manufacturer }} {{ product.name }}
    </h4>
    <p class="product-card__location">Местоположение: {{ product.location }}</p>
    <div class="product-card__flex">
      <p>Цена:</p>
      <p class="product-card__flex__price">{{ product.price }} р.</p>
    </div>
    <div class="product-card__flex">
      <button class="product-card__btn">Профиль продавца</button>
      <button
        class="product-card__btn accent"
        @click.prevent="$router.push('/product/' + product.id)">
        Подробнее
      </button>
    </div>
    <a
      v-if="authorized"
      class="product-card__like"
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
  </div>
</template>

<script>
import { auth } from '@/store/auth'
import { products } from '@/store/products'

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
    liked: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup() {
    const useAuthStore = auth()
    const useProductStore = products()
    return {
      useAuthStore,
      useProductStore,
      authorized: computed(() => useAuthStore.AUTHORIZED),
    }
  },
  data: () => {
    return {
      like: false,
    }
  },

  mounted() {
    this.like = this.product.is_favourite
  },
  methods: {
    async onLike() {
      if (!this.like) {
        const response = await this.useProductStore.ADD_FAVORITE(
          this.product.id
        )
        if (response !== 400 && response !== 401) {
          this.like = true
        }
      } else {
        const response = await this.useProductStore.REMOVE_FAVORITE(
          this.product.id
        )
        if (response !== 400 && response !== 401) {
          this.like = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.product-card {
  @include defineFontMontserrat(500, 20px, 1.4);
  color: $black;
  width: calc((100% - (20px * 3)) / 4);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 1000px) {
    width: calc((100% - (20px * 2)) / 3);
  }

  @media (max-width: 800px) {
    width: calc((100% - (20px * 1)) / 2);
  }

  @media (max-width: 650px) {
    width: 100%;
  }

  &:hover {
    transform: translateY(-10px);
  }

  &:hover &__image {
    filter: drop-shadow(0px 11px 18px rgba(128, 173, 241, 0.13));
  }

  &__image {
    width: 100%;
    height: 400px;
    border-radius: 15px;
    object-fit: cover;
  }

  &__title {
    font-weight: 700;
  }

  &__flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;

    &__price {
      font-weight: 700;
      font-size: 22px;
    }
  }

  &__btn {
    cursor: pointer;
    @include defineBtnPrimary(18px, 35px, 18px, 26px);

    &.accent {
      color: $black-light;
      border: 1px solid #515151;
      background: transparent;

      &:hover {
        background-color: #515151;
        color: $white;
      }
    }
  }

  &__like {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    width: 48px;
    height: 48px;
    background-color: $grey;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active > svg {
      fill: $accent-dark;
    }

    &.active > svg path {
      stroke: $accent-dark;
    }

    &:hover > svg {
      fill: $accent-dark;
    }

    &:hover > svg path {
      stroke: $accent-dark;
    }

    &:active {
      background-color: #eaeaea;
    }
  }
}
</style>
