<template>
  <div class="layout">
    <HeaderDesktop />
    <NavigationDesktop v-if="!mobile" />
    <NavigationMobile v-else />

    <slot />
    <FooterDesktop v-if="!mobile" />

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
