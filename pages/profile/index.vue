<template>
  <div class="block">
    <MyDesktop v-if="!mobile" />
    <MyMobile v-else />
  </div>
</template>

<script setup>
import MyDesktop from '@/components/desktop/profile/My.vue';
import { media } from '@/store/media';
import MyMobile from '@/components/mobile/profile/My.vue';

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
