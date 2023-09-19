<template>
  <div
    class="modal-background"
    @click="closeWindow"
  >
    <div
      class="modal-window"
      @click.stop
    >
      <span
        class="modal-window__close"
        @click="closeWindow"
      />
      <h2 class="modal-window__title">
        Отзыв о продавце
      </h2>
      <h3 class="modal-window__subtitle">
        Поставьте оценку продавцу
      </h3>
      <RatingCalcClickable @choose-stars="chooseStars" />
      <h4 class="modal-window__subtitle">
        Напишите отзыв
      </h4>
      <textarea
        id="review"
        v-model="textReview"
        class="modal-window__input"
        name="review"
        rows="6"
        placeholder="Отзыв"
      />
      <button
        class="modal-window__submit-btn"
        @click="sendReview"
      >
        Оставить отзыв
      </button>
    </div>

    <BackButtonMobile
      v-if="tablet"
      @click="$emit('closeReviewWindow')"
    />
  </div>
</template>

<script setup lang="ts">
import BackButtonMobile from '@/components/mobile/BackButtonMobile.vue';
import { media } from '@/store/media';
import { clients } from '@/store/clients';
import RatingCalcClickable from './RatingCalcClickable.vue';

const emit = defineEmits(['closeReviewWindow']);
const props = defineProps({
  userId: {
    type: Number,
    default: 0,
  },
});

const { tablet } = media();
const { SEND_REVIEW } = clients();

const estimate = ref(0);
const textReview = ref('');

onMounted(() => {
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
});

function chooseStars(stars: number) {
  estimate.value = stars;
}

async function sendReview() {
  await SEND_REVIEW({
    estimate: estimate.value,
    text: textReview.value,
    recipient: props.userId,
  });
}

function closeWindow() {
  document.getElementsByTagName('body')[0].style.overflow = 'visible';
  emit('closeReviewWindow');
}
</script>

<style scoped lang="scss">
.modal-background {
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $modal-dark-background;

  @media (max-width: 1150px) {
    z-index: 90;
    top: 4rem;
    background: transparent;
  }
}

.modal-window {
  position: relative;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $modal-background;
  border-radius: 15px;
  padding: 25px 35px;
  margin: 100px;

  @media (max-width: 1150px) {
    background: $white;
    border-radius: 0;
    justify-content: center;
    max-width: none;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  @media (max-width: 750px) {
    padding: 50px 20px;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 18px;
    right: 18px;

    @media (max-width: 1150px) {
      display: none;
    }

    &::before {
      content: '';
      position: absolute;
      top: 10px;
      width: 21px;
      height: 2px;
      background-color: $black;
      transform: rotate(45deg);
    }

    &::after {
      content: '';
      position: absolute;
      top: 10px;
      width: 21px;
      height: 2px;
      background-color: $black;
      transform: rotate(-45deg);
    }
  }

  &__title {
    @include defineFontMontserrat(600, 19px, normal);
    margin: 0;
    color: $black;
    margin-bottom: 22px;

    @media (max-width: 1150px) {
      font-size: 16px;
      margin-bottom: 20px;
      color: $primary;
    }

    @media (max-width: 750px) {
      margin-bottom: 15px;
    }
  }

  &__subtitle {
    @include defineFontMontserrat(400, 13px, 1.6);
    margin: 0;
    color: $black;
    margin-bottom: 10px;

    @media (max-width: 1150px) {
      font-size: 12px;
      line-height: 1.4;
      margin-bottom: 20px;
      color: $primary;
    }

    @media (max-width: 750px) {
      margin-bottom: 15px;
    }
  }

  &__input {
    @include defineFontMontserrat(400, 15px, 17px);
    outline: none;
    border: none;
    background: $input-background;
    border-radius: 9px;
    padding: 16px 18px;
    align-self: stretch;
    margin-bottom: 1rem;
    color: $input-login-color;
    resize: none;

    @media (max-width: 1150px) {
      align-self: center;
      width: 470px;
      font-size: 20px;
      line-height: 23px;
    }

    @media (max-width: 750px) {
      width: 100%;
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 0.5rem;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }

    &:disabled {
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  &__submit-btn {
    cursor: pointer;
    @include defineBtnPrimary(15px, 68px, 12px, 26px);

    @media (max-width: 1150px) {
      font-size: 18px;
      margin-bottom: 7rem;
      padding: 15px 48px;
    }

    @media (max-width: 750px) {
      margin-top: 10px;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 7rem;
      padding: 12px 40px;
    }
  }
}
</style>
