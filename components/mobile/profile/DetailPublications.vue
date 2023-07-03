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
        @show-edit-product-modal="showEditProduct"
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
        :guest-show="guestShow"
      />
    </div>
  </div>

  <EditProductModal
    v-if="editProduct.show && myPublications"
    :publication-id="editProduct.publicationId"
    @close-edit-product-window="editProduct.show = false"
  />

  <BackButtonMobile @click="$emit('changePage', 'publications')" />
</template>

<script setup>
import UserPublications from '@/components/profile/UserPublications.vue';
import EditProductModal from '@/components/profile/EditProductModal.vue';
import OtherPublications from '@/components/profile/OtherPublications.vue';
import BackButtonMobile from '../BackButtonMobile.vue';

const route = useRoute();
const router = useRouter();

const editProduct = ref({ show: false, publicationId: 0 });

function showEditProduct(id) {
  editProduct.value.show = true;
  editProduct.value.publicationId = id;
}

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
  guestShow: {
    type: Boolean,
    default: false,
  },
});

onUnmounted(() => {
  if (Object.hasOwn(route.query, 'favorites')) {
    router.replace(route.path);
  }

  if (Object.hasOwn(route.query, 'publications')) {
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
