<template>
  <div>
    <ProfileGuestDesktop v-if="!mobile" />
  </div>
</template>

<script setup>
import ProfileGuestDesktop from '@/components/desktop/ProfileGuestDesktop.vue';
import { media } from '@/store/media';

definePageMeta({
  middleware: ['authorization'],
  layout: 'auth-no-nav-layout',
});

const mobile = computed(() => media().MEDIA_MOBILE);
</script>

<style lang="scss" scoped></style>
