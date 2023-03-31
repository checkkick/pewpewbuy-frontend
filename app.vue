<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { media } from '@/store/media';

const mediaQueryList = window.matchMedia('(max-width: 1150px)');
const mediaStore = media();

onMounted(() => {
  mediaQueryList.addEventListener('change', mediaStore.CHANGE_MEDIA);
  mediaStore.CHANGE_MEDIA(mediaQueryList);
});

onUnmounted(() => mediaQueryList.removeEventListener('change', mediaStore.CHANGE_MEDIA));
</script>
