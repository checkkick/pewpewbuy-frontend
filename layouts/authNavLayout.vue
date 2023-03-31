<template>
  <div class="layout">
    <Header />
    <Navigation />
    <slot />
    <Footer v-if="!mobile" />

    <LayoutNotifications />
  </div>
</template>

<script setup>
import { media } from '@/store/media';

const mobile = computed(() => media().MEDIA_MOBILE);
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
}
</style>
