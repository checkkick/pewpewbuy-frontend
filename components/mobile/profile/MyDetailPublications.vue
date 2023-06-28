<template>
  <div class="all-publications">
    <slot name="header" />

    <div
      v-if="myPublications"
      class="products-grid"
    >
      <UserPublications
        v-for="item in products"
        :key="item.id"
        :publ="item"
      />
    </div>

    <div
      v-if="!myPublications"
      class="products-grid"
    >
      <OtherPublications
        v-for="item in products"
        :key="item.id"
        :publication="item"
      />
    </div>
  </div>

  <BackButtonMobile @click="$emit('changePage', 'publications')" />
</template>

<script setup>
import UserPublications from '@/components/profile/UserPublications.vue';
import OtherPublications from '@/components/profile/OtherPublications.vue';
import BackButtonMobile from '../BackButtonMobile.vue';

const route = useRoute();
const router = useRouter();

defineEmits(['changePage']);

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  myPublications: {
    type: Boolean,
    default: true,
  },
});

onUnmounted(() => {
  if (Object.hasOwn(route.query, 'favorites')) {
    router.replace(route.path);
  }
});
</script>

<style lang="scss" scoped>
.all-publications {
  width: 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 13px;
}
</style>
