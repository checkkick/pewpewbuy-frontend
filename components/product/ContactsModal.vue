<template>
  <Teleport to=".layout">
    <div class="modal-background">
      <div class="modal-window">
        <span class="modal-window__close" @click="closeWindow"></span>
        <h2 class="modal-window__title">Контакты продавца</h2>
        <div v-if="fio" class="fio">
          <h3 class="fio__title">ФИО</h3>
          <p class="fio__text">{{ fio }}</p>
        </div>
        <div v-if="email" class="email">
          <h3 class="email__title">Почта</h3>
          <a :href="`mailto:${email}`" class="email__text">{{ email }}</a>
        </div>
        <div v-if="vk" class="vk">
          <h3 class="vk__title">Вконтакте</h3>
          <a target="_blank" :href="vk" class="vk__text">{{ vk }}</a>
        </div>
        <div v-if="tg" class="tg">
          <h3 class="tg__title">Телеграм</h3>
          <a target="_blank" :href="tg" class="tg__text">{{ tg }}</a>
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
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  },
  methods: {
    closeWindow() {
      document.getElementsByTagName('body')[0].style.overflow = null
      this.$emit('closeLoginWindow')
    },
  },
}
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
  width: 100%;
  position: relative;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  background: $modal-background;
  border-radius: 38px;
  padding: 52px 72px;
  margin: 100px;

  &__close {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 41px;
    right: 41px;

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
    @include defineFontMontserrat(600, 30px, 37px);
  }
}
.fio {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__title {
    @include defineFontMontserrat(600, 28px, 1.4);
  }

  &__text {
    padding-left: 35px;
    @include defineFontMontserrat(400, 24px, 29px);
    background: url('@/assets/img/products-fio.svg') no-repeat left center /
      30px 26px;
  }
}
.email {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__title {
    @include defineFontMontserrat(600, 28px, 1.4);
  }

  &__text {
    text-decoration: none;
    padding-left: 35px;
    color: $black;
    @include defineFontMontserrat(400, 24px, 29px);
    background: url('@/assets/img/products-email.svg') no-repeat left center /
      30px 22px;
  }
}
.vk {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__title {
    @include defineFontMontserrat(600, 28px, 1.4);
  }

  &__text {
    text-decoration: none;
    padding-left: 35px;
    color: $black;
    @include defineFontMontserrat(400, 24px, 29px);
    background: url('@/assets/img/products-vk.svg') no-repeat left center / 30px
      22px;
  }
}
.tg {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__title {
    @include defineFontMontserrat(600, 28px, 1.4);
  }

  &__text {
    text-decoration: none;
    padding-left: 35px;
    color: $black;
    @include defineFontMontserrat(400, 24px, 29px);
    background: url('@/assets/img/products-tg.svg') no-repeat left center / 30px
      22px;
  }
}
</style>
