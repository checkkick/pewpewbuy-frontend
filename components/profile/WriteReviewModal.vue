<template>
  <div
    class="modal-background"
    @click="closeWindow"
  >
    <div
      class="modal-window"
      @click.stop
    >
      <span
        class="modal-window__close"
        @click="closeWindow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['closeReviewWindow']);

function closeWindow() {
  document.getElementsByTagName('body')[0].style.overflow = 'null';
  emit('closeReviewWindow');
}
</script>

<style scoped lang="scss">
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

  @media (max-width: 1150px) {
    z-index: 90;
    top: 4rem;
    background: transparent;
  }
}

.modal-window {
  position: relative;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $modal-background;
  border-radius: 38px;
  padding: 50px 60px;
  margin: 100px;

  @media (max-width: 1150px) {
    background: $white;
    border-radius: 0;
    justify-content: center;
    max-width: none;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  @media (max-width: 750px) {
    padding: 50px 20px;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 41px;
    right: 41px;

    @media (max-width: 1150px) {
      display: none;
    }

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
}
</style>
