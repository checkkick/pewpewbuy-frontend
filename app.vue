<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { media } from '@/store/cookies';

const mediaQueryList = window.matchMedia('(max-width: 1150px)');

function screenTest(e) {
  if (e.matches) {
    media.mobile = true;
  } else {
    media.mobile = false;
  }
}

onMounted(() => {
  mediaQueryList.addEventListener('change', screenTest);
  screenTest(mediaQueryList);
});

onUnmounted(() => mediaQueryList.removeEventListener('change', screenTest));
</script>
