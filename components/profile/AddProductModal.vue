<template>
  <div class="modal-background">
    <div class="modal-window">
      <span class="modal-window__close" @click="closeWindow"></span>
      <h2 class="modal-window__title">Заполните информацию о товаре</h2>
      <div class=""></div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['closeAddProductWindow'],
  setup() {},
  data: () => {
    return {}
  },

  mounted() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  },

  methods: {
    closeWindow() {
      document.getElementsByTagName('body')[0].style.overflow = null
      this.$emit('closeAddProductWindow')
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
  position: relative;
  max-width: 1023px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $modal-background;
  border-radius: 38px;
  padding: 75px;
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
    @include defineFontMontserrat(700, 24px, 29px);
    color: $black;
    margin-bottom: 49px;
    text-transform: uppercase;
    color: #4b8ff5;
  }
}
</style>
