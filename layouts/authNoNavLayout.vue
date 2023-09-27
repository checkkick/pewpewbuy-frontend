<template>
  <div class="layout">
    <HeaderDesktop v-if="!tablet" />
    <HeaderMobile
      v-else
      @close-categories="showCategories = false"
      @close-or-open-categories="showCategories = !showCategories"
    />

    <Transition name="slide">
      <CategoriesMobile
        v-if="tablet"
        v-show="showCategories"
        @close="showCategories = false"
      />
    </Transition>

    <NavigationMobile
      v-if="tablet"
      :show-search="showSearch"
      @open-search="showSearch = true"
      @close-search="showSearch = false"
      @any-click="showCategories = false"
    />
    <slot />
    <FooterDesktop v-if="!tablet" />

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
import FooterDesktop from '@/components/desktop/FooterDesktop.vue';
import SearchMobile from '@/components/mobile/SearchMobile.vue';
import HeaderMobile from '@/components/mobile/HeaderMobile.vue';
import CategoriesMobile from '@/components/mobile/CategoriesMobile.vue';

const showCategories = ref(false);
const showSearch = ref(false);
const tablet = computed(() => media().MEDIA_TABLET);
</script>

<style lang="scss" scoped>
.slide-enter-active {
  animation: slide-in 0.5s;
}

.slide-leave-active {
  animation: slide-in 0.5s reverse;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.layout {
  position: relative;
}
</style>
