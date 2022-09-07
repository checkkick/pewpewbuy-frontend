<template>
  <div class="container">
    <nav class="profile__nav">
      <h2 class="profile__nav__title">Личный кабинет</h2>
      <div class="profile__nav__buttons">
        <button class="profile__nav__buttons__all-publicity">
          Все объявления
        </button>
        <button class="profile__nav__buttons__new-publicity">
          Разместить объявление
        </button>
      </div>
    </nav>
    <main class="profile__main">
      <section class="profile__main__info">
        <div class="profile__main__info-layout">
          <h3 class="profile__main__info-layout__title">Личная информация</h3>
          <div class="profile__main__info-layout__wrapper">
            <h4 class="profile__main__info-layout__wrapper__name">
              Иван Александрович Негрешный
            </h4>
            <div class="profile__main__info-layout__wrapper__about">
              <div class="profile__main__info-layout__wrapper__about-flex">
                <img
                  class="profile__main__info-layout__wrapper__about-flex__img"
                  src=""
                  alt="profile picture"
                />
                <div
                  class="profile__main__info-layout__wrapper__about-flex__contacts"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="profile__main__info-layout">
          <h3 class="profile__main__info-layout__title">Отзывы</h3>
          <div class="profile__main__info-layout__wrapper"></div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.profile__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  &__title {
    @include defineFontMontserrat(600, 36px, 44px);
    margin: 0;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 20px;

    &__all-publicity {
      cursor: pointer;
      @include defineFontMontserrat(600, 20px, 1.4);
      color: $white;
      padding: 16px 37px;
      background: $primary;
      border-radius: 91px;
      border: none;
      outline: none;

      &:focus-visible {
        outline: 1px solid $black-light;
      }
      &:active {
        box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3);
      }
    }

    &__new-publicity {
      @include defineFontMontserrat(600, 20px, 1.4);
      cursor: pointer;
      padding: 16px 37px;
      background: $accent;
      border: none;
      border-radius: 91px;

      &:focus-visible {
        outline: 1px solid $black-light;
      }
      &:active {
        box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3);
      }
    }
  }
}

.profile__main {
  display: flex;
  flex-direction: column;

  &__info {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    gap: 25px;

    &-layout {
      flex-grow: 1;
      width: 100%;
      display: flex;
      align-items: stretch;
      flex-direction: column;

      &__title {
        @include defineFontMontserrat(600, 24px, 29px);
        color: $primary;
        margin: 0 0 24px 0;
      }

      &__wrapper {
        background: $white;
        padding: 45px 60px;
        border: 1px solid $filter-border;
        box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
        border-radius: 32px;

        &__name {
          @include defineFontMontserrat(600, 24px, 29px);
          color: $black;
          margin: 0 0 34px 0;
        }

        &__about {
          display: flex;
          align-items: center;
          gap: 70px;
        }
      }
    }
  }
}
</style>
