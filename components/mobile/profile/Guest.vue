<template>
  <div class="container">
    <!-- Гостевой просмотр профиля -->

    <GuestMain
      v-if="page === 'main'"
      :user="user"
      :active-products-length="activeProducts.length"
      :inactive-products-length="inactiveProducts.length"
      @change-page="(pageName) => page = pageName"
    />

    <Reviews
      v-if="page === 'reviews'"
      :reviews="user.reviews"
      @change-page="(pageName) => page = pageName"
    />

    <DetailPublications
      v-if="page === 'activePublications'"
      :products="activeProducts"
      :my-publications="false"
      :guest-show="true"
      @change-page="page = 'main'"
    >
      <template #header>
        <div class="publications-name substrate-mobile">
          <span class="publications-name__logo publications-name__logo--history" />
          <p class="publications-name__text">
            Актив
          </p>
        </div>
      </template>
    </DetailPublications>

    <DetailPublications
      v-if="page === 'inactivePublications'"
      :products="inactiveProducts"
      :my-publications="false"
      :guest-show="true"
      @change-page="page = 'main'"
    >
      <template #header>
        <div class="publications-name substrate-mobile">
          <span class="publications-name__logo publications-name__logo--history" />
          <p class="publications-name__text">
            Неактив
          </p>
        </div>
      </template>
    </DetailPublications>
  </div>
</template>

<script setup>
import { clients } from '@/store/clients';
import GuestMain from './GuestMain.vue';
import Reviews from './Reviews.vue';
import DetailPublications from './DetailPublications.vue';

const route = useRoute();

const page = ref('main');

const user = ref({});
const activeProducts = ref([]);
const inactiveProducts = ref([]);

onMounted(async () => {
  user.value = await clients().GET_DETAIL_USER(route.params.id);

  user.value.products.forEach((product) => {
    if (product.status === 'Active') {
      activeProducts.value.push(product);
    } else {
      inactiveProducts.value.push(product);
    }
  });
});
</script>

<style lang="scss" scoped></style>
