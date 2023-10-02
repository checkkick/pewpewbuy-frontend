<template>
  <div class="block">
    <MyDesktop v-if="!mobile" />
    <MyMobile v-else />
  </div>
</template>

<script setup>
import MyDesktop from '@/components/desktop/profile/My.vue';
import { media } from '@/store/media';
import { clients } from '@/store/clients';
import MyMobile from '@/components/mobile/profile/My.vue';

definePageMeta({
  middleware: ['authorization'],
  layout: 'auth-no-nav-layout',
});

onMounted(() => clients().GET_SELF());

const mobile = computed(() => media().MEDIA_MOBILE);
</script>

<style lang="scss" scoped></style>
