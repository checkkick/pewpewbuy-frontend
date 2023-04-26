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
import NavigationMobile from '@/components/mobile/NavigationMobile.vue';
import HeaderDesktop from '@/components/desktop/HeaderDesktop.vue';
import NavigationDesktop from '@/components/desktop/NavigationDesktop.vue';
import FooterDesktop from '@/components/desktop/FooterDesktop.vue';

const mobile = computed(() => media().MEDIA_MOBILE);
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
}
</style>
