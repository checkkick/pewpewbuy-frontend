<template>
  <div class="container">
    <appHeader />
  </div>
</template>

<script>
import appHeader from '@/components/Header.vue'
export default { components: { appHeader } }
</script>

<style lang="scss" scoped>
.text {
  font-family: 'SairaStencilOne';
  @include defineFontSairaStencilOne(35px, 1.1);
  color: $accent;
}
</style>
