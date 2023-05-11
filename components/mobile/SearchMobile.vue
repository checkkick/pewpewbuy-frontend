<template>
  <div class="search">
    <input
      ref="search"
      class="search__input"
      type="text"
    >

    <BackButtonMobile @click="$emit('closeSearch')" />
  </div>
</template>

<script>
import BackButtonMobile from './BackButtonMobile.vue';

export default {
  components: { BackButtonMobile },
  emits: ['closeSearch'],
  mounted() {
    this.$refs.search.focus();
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 2rem 30px 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 99;
  top: 6rem;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $modal-background;

  &__input {
    width: 80%;
    @include defineFontMontserrat(600, 15px, 1.4);
    padding: 12px 20px 12px 65px;
    background: $white;
    border: 0.5px solid $filter-border;
    border-radius: 54px;
    background-image: url('@/assets/img/finder.svg');
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 25px center;

    &::placeholder {
      color: rgba(66, 66, 66, 0.42);
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
