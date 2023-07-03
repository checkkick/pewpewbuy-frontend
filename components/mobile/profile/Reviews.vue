<template>
  <div class="reviews">
    <h3 class="reviews__title">
      Отзывы о продавце
    </h3>

    <h4
      v-if="reviews.length === 0"
      class="reviews__empty"
    >
      Отзывы отсутствуют
    </h4>

    <UserReview
      v-for="review in reviews"
      :key="review.id"
      :review="review"
    />

    <BackButtonMobile @click="$emit('changePage', 'main')" />
  </div>
</template>

<script setup>
import UserReview from '@/components/profile/UserReview.vue';
import BackButtonMobile from '../BackButtonMobile.vue';

defineProps({
  reviews: {
    type: Object,
    default: () => { },
  },
});

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

  &__empty {
    @include defineFontMontserrat(600, 17px, 1.2);
    text-align: center;
    color: $black-inactive;
  }
}
</style>
