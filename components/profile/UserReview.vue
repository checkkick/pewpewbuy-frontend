<template>
  <div class="user-review">
    <div class="user-review__title">
      <img
        :src="review.user.avatar ? review.user.avatar : noImage"
        alt="profile picture"
        class="user-review__img"
      >
      <p class="user-review__name">
        {{ review.user.first_name }} {{ review.user.last_name }}
      </p>
    </div>
    <div class="user-review__about">
      <div class="user-review__grade">
        <p class="user-review__summary">
          Оценка:
        </p>
        <div class="user-rating">
          <p class="user-rating__text">
            {{ review.estimate }}
          </p>
          <RatingCalc :stars="review.estimate" />
        </div>
      </div>
      <p class="user-review__text">
        {{ review.text }}
      </p>
      <p class="user-review__date">
        {{ new Date(review.created).toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>

<script>
import noPhoto from '@/assets/img/no-photo.png';
import RatingCalc from './RatingCalc.vue';

export default {
  components: { RatingCalc },
  props: {
    review: { type: Object, default: () => { } },
  },
  data: () => ({
    noImage: noPhoto,
  }),
};
</script>

<style lang="scss" scoped>
.user-review {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;

  @media (max-width: 1150px) {
    gap: 0.5rem;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  &__img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    object-fit: cover;

    @media (max-width: 1150px) {
      width: 28px;
      height: 28px;
    }
  }

  &__name {
    @include defineFontMontserrat(600, 15px, 18px);

    @media (max-width: 1150px) {
      font-size: 13px;
      line-height: 16px;
    }
  }

  &__about {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    padding: 12px 16px;
    background: $grey-light;
    border-radius: 9px;
  }

  &__grade {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap
  }

  &__summary {
    @include defineFontMontserrat(600, 14px, 1.6);

    @media (max-width: 1150px) {
      font-size: 10px;
    }
  }

  &__text {
    @include defineFontMontserrat(400, 13px, 1.6);
    margin-bottom: 0.7rem;
    height: 100%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: -webkit-gradient(linear,
        left top,
        left bottom,
        from($black),
        color-stop($black),
        to(rgba(0, 0, 0, 0)));
    background-image: -o-linear-gradient(top,
        $black,
        $black,
        rgba(0, 0, 0, 0));
    background-image: linear-gradient(to bottom,
        $black,
        $black,
        rgba(0, 0, 0, 0));

    @media (max-width: 1150px) {
      font-size: 12px;
    }
  }

  &__date {
    @include defineFontMontserrat(400, 11px, 13px);
    color: rgba(65, 65, 65, 0.65);
    align-self: flex-end;
    text-align: end;

    @media (max-width: 1150px) {
      font-size: 9px;
      line-height: 11px;
    }
  }
}

.user-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 1150px) {
    gap: 0.3rem;
  }

  &__text {
    @include defineFontMontserrat(400, 14px, 1.6);

    @media (max-width: 1150px) {
      font-size: 10px;
    }
  }
}
</style>
