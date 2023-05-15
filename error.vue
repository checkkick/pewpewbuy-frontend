<template>
  <NuxtLayout>
    <div class="container">
      <div class="error">
        <img
          class="error__image"
          src="@/assets/img/page-not-found.svg"
          alt="error image"
        >
        <div class="error__block">
          <h4 class="error__title">
            404
          </h4>
          <p class="error__text">
            Упс... Страница, которую вы ищете, не существует...
          </p>
          <button
            class="error__btn"
            @click="$router.push('/?slug=')"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { media } from '@/store/media';

const tabletQueryList = window.matchMedia('(max-width: 1150px)');
const mobileQueryList = window.matchMedia('(max-width: 768px)');
const mediaStore = media();

onMounted(() => {
  tabletQueryList.addEventListener('change', mediaStore.CHANGE_MEDIA_TABLET);
  mediaStore.CHANGE_MEDIA_TABLET(tabletQueryList);

  mobileQueryList.addEventListener('change', mediaStore.CHANGE_MEDIA_MOBILE);
  mediaStore.CHANGE_MEDIA_MOBILE(mobileQueryList);
});

onUnmounted(() => {
  tabletQueryList.removeEventListener('change', mediaStore.CHANGE_MEDIA_TABLET);
  mobileQueryList.removeEventListener('change', mediaStore.CHANGE_MEDIA_MOBILE);
});
</script>

<style lang="scss" scoped>
.error {
  padding-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  height: 50vh;

  @media (max-width: 1150px) {
    height: 70vh;
  }

  &__block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 35px;
  }

  &__title {
    @include defineFontMontserrat(700, 55px, 68px);
  }

  &__text {
    @include defineFontMontserrat(500, 21px, 26px);
  }

  &__btn {
    @include defineBtnPrimary(15px, 68px, 14px, 23px)
  }
}
</style>
