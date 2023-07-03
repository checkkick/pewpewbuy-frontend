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
        <div class="about-seller">
          <img
            class="about-seller__photo"
            :src="user.avatar ? user.avatar : noImage"
            alt="seller photo"
          >
          <div class="seller-info">
            <h4 class="seller-info__name">
              {{ user.first_name }} {{ user.last_name }}
            </h4>
            <div class="seller-detail">
              <p class="seller-detail__text">
                {{ user.call_sign }}
              </p>
              <RatingCalc :stars="Math.floor(user.rep)" />
              <p class="seller-detail__text">
                {{ user.rep }}
              </p>
            </div>
          </div>
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
        <div class="about-seller">
          <img
            class="about-seller__photo"
            :src="user.avatar ? user.avatar : noImage"
            alt="seller photo"
          >
          <div class="seller-info">
            <h4 class="seller-info__name">
              {{ user.first_name }} {{ user.last_name }}
            </h4>
            <div class="seller-detail">
              <p class="seller-detail__text">
                {{ user.call_sign }}
              </p>
              <RatingCalc :stars="Math.floor(user.rep)" />
              <p class="seller-detail__text">
                {{ user.rep }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </DetailPublications>
  </div>
</template>

<script setup>
import { clients } from '@/store/clients';
import RatingCalc from '@/components/profile/RatingCalc.vue';
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

<style lang="scss" scoped>
.about-seller {
  display: flex;
  gap: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 40px;
  background: $modal-mobile-background;
  border: 1px solid $boder-mobile;
  border-radius: 12px;
  margin-bottom: 0;

  &__photo {
    border-radius: 50%;
    align-self: center;
    object-fit: cover;
    width: 45px;
    height: 45px;
  }
}

.seller-info {
  margin-right: 1rem;

  &__name {
    @include defineFontMontserrat(600, 12px, 15px);
    margin-bottom: 0.5rem;
  }
}

.seller-detail {
  display: flex;
  align-items: center;
  gap: 0.7rem;

  &__text {
    @include defineFontMontserrat(400, 11px, 13px);
  }
}
</style>
