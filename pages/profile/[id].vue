<template>
  <div class="block">
    <GuestProfileDesktop v-if="!mobile" />
    <GuestProfileMobile v-else />
  </div>
</template>

<script setup>
import GuestProfileDesktop from '@/components/desktop/profile/GuestProfileDesktop.vue';
import { media } from '@/store/media';
import GuestProfileMobile from '@/components/mobile/profile/GuestProfileMobile.vue';

definePageMeta({
  middleware: ['authorization'],
  layout: 'auth-no-nav-layout',
});

const mobile = computed(() => media().MEDIA_MOBILE);
</script>

<style lang="scss" scoped>
.block {
  @media (max-width: 1150px) {
    margin-top: 5rem;
  }
}
</style>
