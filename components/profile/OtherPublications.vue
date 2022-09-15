<template>
  <div class="publication">
    <a
      class="publication__like"
      :class="{ active: like }"
      @click.prevent="like = !like">
      <svg
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.56973 10.7847C0.246983 7.76552 1.02123 3.23679 4.89247 1.72722C8.76372 0.217645 11.0865 3.23679 11.8607 4.74637C12.635 3.23679 15.732 0.217645 19.6032 1.72722C23.4744 3.23679 23.4744 7.76552 21.1517 10.7847C18.8289 13.8038 11.8607 19.8421 11.8607 19.8421C11.8607 19.8421 4.89247 13.8038 2.56973 10.7847Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </a>
    <div class="publication__user">
      <img
        src="@/assets/img/profile-example.png"
        alt="user photo"
        class="publication__user__image" />
      <div class="publication__user__about">
        <p class="publication__user__about__name">Игорь</p>
        <p class="publication__user__about__date">Публикация: 23.02.2022</p>
      </div>
    </div>
    <div class="publication__image-slider" :class="{ inactivePubl }">
      <img src="@/assets/img/product-example.png" alt="product-example" />
    </div>
    <h4 class="publication__title">
      Страйкбольный карабин Cyma Colt model 609 - ХМ177Е1 (CM009E)
    </h4>
    <div class="publication__advanced">
      <div class="publication__advanced__line">
        <p class="publication__advanced__line__text">Местоположение:</p>
        <p class="publication__advanced__line__text">г. Москва</p>
      </div>
      <div class="publication__advanced__line">
        <p class="publication__advanced__line__text">Цена:</p>
        <p class="publication__advanced__line__text-bold">22 500 р.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const like = ref(false)

    return {
      like,
    }
  },
}
</script>

<style lang="scss" scoped>
.publication {
  cursor: pointer;
  position: relative;
  background-color: $white;
  border-radius: 20px;
  padding: 25px 35px 45px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__like {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    background-color: $grey;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active > svg {
      fill: $accent-dark;
    }
    &.active > svg path {
      stroke: $accent-dark;
    }

    &:hover > svg {
      fill: $accent-dark;
    }
    &:hover > svg path {
      stroke: $accent-dark;
    }

    &:active {
      background-color: #eaeaea;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 12px;

    &__image {
      width: 52px;
      height: 52px;
      border-radius: 50%;
    }

    &__about {
      &__name {
        @include defineFontMontserrat(700, 18px, 22px);
        margin-bottom: 2px;
      }

      &__date {
        @include defineFontMontserrat(400, 13px, 16px);
        color: rgba(122, 122, 122, 0.9);
      }
    }
  }

  &__image-slider {
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: 15px;

    &.inactivePubl {
      opacity: 0.5;
    }

    & img {
      width: 100%;
    }
  }

  &__title {
    @include defineFontMontserrat(700, 18px, 1.4);
    margin: 0 0 14px 0;
  }

  &__advanced {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 11px;

    &__line {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;

      &__text {
        @include defineFontMontserrat(400, 20px, 1.4);
        margin: 0;
      }

      &__text-bold {
        @include defineFontMontserrat(700, 20px, 1.4);
        margin: 0;
      }
    }
  }
}
</style>
