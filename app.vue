<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { media } from '@/store/globals';

const mediaQueryList = window.matchMedia('(max-width: 1150px)');

function screenTest(e) {
  if (e.matches) {
    media.mobile = true;
  } else {
    media.mobile = false;
  }
}

mediaQueryList.addEventListener('change', screenTest);
screenTest(mediaQueryList);
</script>
