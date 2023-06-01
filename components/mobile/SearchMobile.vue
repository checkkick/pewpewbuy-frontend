<template>
  <div class="search">
    <input
      ref="search"
      class="search__input"
      type="text"
    >

    <BackButtonMobile @click="$emit('closeSearch'), $router.replace('/');" />
  </div>
</template>

<script>
import BackButtonMobile from './BackButtonMobile.vue';

export default {
  components: { BackButtonMobile },

  emits: ['closeSearch'],

  mounted() {
    this.$refs.search.focus();
    this.$router.replace('/?search');
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 2rem 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 99;
  top: 6rem;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $white;

  @media (max-width: 750px) {
    padding: 0 20px 0;
    top: 5rem;
  }

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

    @media (max-width: 750px) {
      width: 100%;
      padding: 10px 20px 10px 45px;
      background-position: 20px;
      background-size: 15px 15px;
    }

    &::placeholder {
      color: rgba(66, 66, 66, 0.42);
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
