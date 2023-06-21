<template>
  <div class="block">
    <MyProfileDesktop v-if="!mobile" />
    <MyProfileMobile v-else />
  </div>
</template>

<script setup>
import MyProfileDesktop from '@/components/desktop/profile/MyProfileDesktop.vue';
import { media } from '@/store/media';
import MyProfileMobile from '@/components/mobile/profile/MyProfileMobile.vue';

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
