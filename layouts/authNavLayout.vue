<template>
  <div class="layout">
    <HeaderDesktop />
    <NavigationDesktop v-if="!mobile" />
    <NavigationMobile
      v-else
      :show-search="showSearch"
      @open-search="showSearch = true"
      @close-search="showSearch = false"
    />

    <slot />
    <FooterDesktop v-if="!mobile" />

    <LayoutNotifications />

    <SearchMobile
      v-if="showSearch"
      @close-search="showSearch = false"
    />
  </div>
</template>

<script setup>
import { media } from '@/store/media';
import NavigationMobile from '@/components/mobile/NavigationMobile.vue';
import HeaderDesktop from '@/components/desktop/HeaderDesktop.vue';
import NavigationDesktop from '@/components/desktop/NavigationDesktop.vue';
import FooterDesktop from '@/components/desktop/FooterDesktop.vue';
import SearchMobile from '@/components/mobile/SearchMobile.vue';

const showSearch = ref(false);
const mobile = computed(() => media().MEDIA_MOBILE);
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
}
</style>
