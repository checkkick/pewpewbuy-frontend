<template>
  <div class="block">
    <GuestDesktop v-if="!mobile" />
    <GuestMobile v-else />
  </div>
</template>

<script setup>
import GuestDesktop from '@/components/desktop/profile/Guest.vue';
import { media } from '@/store/media';
import GuestMobile from '@/components/mobile/profile/Guest.vue';

definePageMeta({
  middleware: ['authorization'],
  layout: 'auth-no-nav-layout',
});

const mobile = computed(() => media().MEDIA_MOBILE);
</script>

<style lang="scss" scoped></style>
