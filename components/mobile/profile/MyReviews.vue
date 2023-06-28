<template>
  <div class="reviews">
    <h3 class="reviews__title">
      Отзывы о продавце
    </h3>

    <UserReview
      v-for="review in user.about_me_reviews"
      :key="review.id"
      :review="review"
    />

    <BackButtonMobile @click="$emit('changePage', 'main')" />
  </div>
</template>

<script setup>
import { clients } from '@/store/clients';
import UserReview from '@/components/profile/UserReview.vue';
import BackButtonMobile from '../BackButtonMobile.vue';

const user = computed(() => clients().USER_STATE);

defineEmits(['changePage']);
</script>

<style lang="scss" scoped>
.reviews {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title {
    @include defineFontMontserrat(600, 15px, 1.2);
    text-align: center;
    margin-bottom: 0.5rem;
  }
}
</style>
