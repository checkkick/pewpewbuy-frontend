<template>
  <div class="user-review">
    <div class="user-review__title">
      <img
        :src="review.user.avatar ? review.user.avatar : noImage"
        alt="profile picture"
        class="user-review__title__img"
      >
      <p class="user-review__title__name">
        {{ review.user.first_name }} {{ review.user.last_name }}
      </p>
    </div>
    <div class="user-review__about">
      <div class="user-review__about__grade">
        <p class="user-review__about__grade__title">
          Оценка:
        </p>
        <div class="user-review__about__grade__rating">
          <p class="user-review__about__grade__rating__text">
            {{ review.estimate }}
          </p>
          <RatingCalc :stars="review.estimate" />
        </div>
      </div>
      <p class="user-review__about__text">
        {{ review.text }}
      </p>
      <p class="user-review__about__date">
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
  gap: 15px;

  &__title {
    display: flex;
    align-items: center;
    gap: 10px;

    &__img {
      max-width: 52px;
      max-height: 52px;
      border-radius: 50%;
    }

    &__name {
      @include defineFontMontserrat(600, 20px, 24px);
      margin: 0;
    }
  }

  &__about {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    padding: 16px;
    background: $grey-light;
    border-radius: 12px;

    &__grade {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__title {
        @include defineFontMontserrat(600, 18px, 1.6);
        margin: 0;
      }

      &__rating {
        display: flex;
        align-items: center;
        gap: 9px;

        &__text {
          @include defineFontMontserrat(400, 17px, 1.6);
          margin: 0;
        }
      }
    }

    &__text {
      @include defineFontMontserrat(400, 17px, 1.6);
      margin: 0 0 10px 0;
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
    }

    &__date {
      @include defineFontMontserrat(400, 14px, 17px);
      color: rgba(65, 65, 65, 0.65);
      margin: 0;
      align-self: flex-end;
      text-align: end;
    }
  }
}
</style>
