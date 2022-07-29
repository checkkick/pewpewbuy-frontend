<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__flex">
        <div class="footer__flex__about">
          <h4 class="footer__flex__about__title">PEWPEW BUY</h4>
          <h5 class="footer__flex__about__subtitle">Страйкбольная барахолка</h5>
        </div>
        <ul class="footer__flex__map">
          <li class="footer__flex__map__item">Страйкбольное оружие</li>
          <li class="footer__flex__map__item">Внешний тюнинг</li>
          <li class="footer__flex__map__item">Внутренний тюнинг</li>
          <li class="footer__flex__map__item">Снаряжение</li>
          <li class="footer__flex__map__item">Поддержка</li>
        </ul>
        <div class="footer__flex__arrow">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.53033 0.469643C6.23744 0.17675 5.76256 0.17675 5.46967 0.469643L0.696699 5.24261C0.403806 5.53551 0.403806 6.01038 0.696699 6.30327C0.989593 6.59617 1.46447 6.59617 1.75736 6.30327L6 2.06063L10.2426 6.30327C10.5355 6.59617 11.0104 6.59617 11.3033 6.30327C11.5962 6.01038 11.5962 5.53551 11.3033 5.24261L6.53033 0.469643ZM6.75 1.58105V0.999974L5.25 0.999974V1.58105H6.75Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  @include defineFontMontserrat(400, 16px, 1.4);
  color: $white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 70px;
  background-color: $black;

  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    &__about {
      &__title {
        @include defineFontSairaStencilOne(16px, 25px);
        margin: 0;
      }

      &__subtitle {
        font-size: 12px;
        line-height: inherit;
        font-weight: inherit;
        margin: 0;
        color: $grey;
      }
    }

    &__map {
      flex-grow: 1;
      margin: 0;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 67px;

      &__item {
        font-weight: inherit;
        font-size: inherit;
        line-height: inherit;
        color: $grey;
      }
    }

    &__arrow {
      width: 35px;
      height: 35px;
      background-color: $white;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
