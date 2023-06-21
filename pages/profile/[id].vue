<template>
  <div class="block">
    <ProfileGuestDesktop v-if="!mobile" />
    <ProfileGuestMobile v-else />
  </div>
</template>

<script setup>
import ProfileGuestDesktop from '@/components/desktop/profile/ProfileGuestDesktop.vue';
import { media } from '@/store/media';
import ProfileGuestMobile from '@/components/mobile/profile/ProfileGuestMobile.vue';

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
