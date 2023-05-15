<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { media } from '@/store/media';

const tabletQueryList = window.matchMedia('(max-width: 1150px)');
const mobileQueryList = window.matchMedia('(max-width: 768px)');
const mediaStore = media();

onMounted(() => {
  tabletQueryList.addEventListener('change', mediaStore.CHANGE_MEDIA_TABLET);
  mediaStore.CHANGE_MEDIA_TABLET(tabletQueryList);

  mobileQueryList.addEventListener('change', mediaStore.CHANGE_MEDIA_MOBILE);
  mediaStore.CHANGE_MEDIA_MOBILE(mobileQueryList);
});

onUnmounted(() => {
  tabletQueryList.removeEventListener('change', mediaStore.CHANGE_MEDIA_TABLET);
  mobileQueryList.removeEventListener('change', mediaStore.CHANGE_MEDIA_MOBILE);
});
</script>
