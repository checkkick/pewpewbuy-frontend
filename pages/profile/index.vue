<template>
  <div class="block">
    <ProfileMyDesktop v-if="!mobile" />
    <ProfileMyMobile v-else />
  </div>
</template>

<script setup>
import ProfileMyDesktop from '@/components/desktop/profile/ProfileMyDesktop.vue';
import { media } from '@/store/media';
import ProfileMyMobile from '@/components/mobile/profile/ProfileMyMobile.vue';

definePageMeta({
  middleware: ['authorization'],
  layout: 'auth-no-nav-layout',
});

const mobile = computed(() => media().MEDIA_MOBILE);
</script>

<style lang="scss" scoped>
.block {
  @media (max-width: 1150px) {
    margin-top: 4.5rem;
  }
}
</style>
