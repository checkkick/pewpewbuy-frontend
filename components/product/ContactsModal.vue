<template>
  <Teleport to=".layout">
    <div class="modal-background">
      <div class="modal-window">
        <span
          class="modal-window__close"
          @click="closeWindow"
        />
        <h2 class="modal-window__title">
          Контакты продавца
        </h2>
        <div
          v-if="fio"
          class="item"
        >
          <h3 class="item__title">
            ФИО
          </h3>
          <p class="item__text item__text--fio">
            {{ fio }}
          </p>
        </div>
        <div
          v-if="email"
          class="item"
        >
          <h3 class="item__title">
            Почта
          </h3>
          <a
            :href="`mailto:${email}`"
            class="item__text item__text--email"
          >{{ email }}</a>
        </div>
        <div
          v-if="vk"
          class="item"
        >
          <h3 class="item__title">
            Вконтакте
          </h3>
          <a
            target="_blank"
            :href="vk"
            class="item__text item__text--vk"
          >{{ vk }}</a>
        </div>
        <div
          v-if="tg"
          class="item"
        >
          <h3 class="item__title">
            Телеграм
          </h3>
          <a
            target="_blank"
            :href="tg"
            class="item__text item__text--tg"
          >{{ tg }}</a>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  props: {
    fio: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    vk: {
      type: String,
      default: '',
    },
    tg: {
      type: String,
      default: '',
    },
  },
  emits: ['closeLoginWindow'],
  mounted() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  },
  methods: {
    closeWindow() {
      document.getElementsByTagName('body')[0].style.overflow = null;
      this.$emit('closeLoginWindow');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-background {
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $modal-dark-background;
}

.modal-window {
  position: relative;
  min-width: 350px;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: $modal-background;
  border-radius: 15px;
  padding: 2rem;
  margin: 100px;

  &__close {
    cursor: pointer;
    position: absolute;
    width: 15px;
    height: 15px;
    top: 20px;
    right: 30px;

    &::before {
      content: '';
      position: absolute;
      top: 10px;
      width: 21px;
      height: 2px;
      background-color: $black;
      transform: rotate(45deg);
    }

    &::after {
      content: '';
      position: absolute;
      top: 10px;
      width: 21px;
      height: 2px;
      background-color: $black;
      transform: rotate(-45deg);
    }
  }

  &__title {
    @include defineFontMontserrat(600, 18px, 22px);
    margin-bottom: 0.5rem;

    @media (max-width: 1150px) {
      font-size: 16px;
      line-height: 1rem;
    }
  }
}

.item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__title {
    @include defineFontMontserrat(600, 16px, 1.4);

    @media (max-width: 1150px) {
      font-size: 15px;
      line-height: 1rem;
    }
  }

  &__text {
    text-decoration: none;
    color: $black;
    padding-left: 1.6rem;
    @include defineFontMontserrat(400, 16px, 22px);

    @media (max-width: 1150px) {
      font-size: 14px;
      line-height: 17px;
      padding-left: 1.4rem;
    }

    &--fio {
      background: url('@/assets/img/products-fio.svg') no-repeat left center / 20px 19px;

      @media (max-width: 1150px) {
        background-size: 17px 16px;
      }
    }

    &--email {
      background: url('@/assets/img/products-email.svg') no-repeat left center / 20px 15px;

      @media (max-width: 1150px) {
        background-size: 17px 14px;
      }
    }

    &--vk {
      background: url('@/assets/img/products-vk.svg') no-repeat left center / 20px 15px;

      @media (max-width: 1150px) {
        background-size: 17px 14px;
      }
    }

    &--tg {
      background: url('@/assets/img/products-tg.svg') no-repeat left center / 20px 15px;

      @media (max-width: 1150px) {
        background-size: 17px 14px;
      }
    }
  }
}
</style>
