<template>
  <footer class="footer" :class="{ active: openFooter }">
    <div class="container">
      <div class="footer__flex" :class="{ active: openFooter }">
        <div class="footer__flex__about">
          <div>
            <h4 class="footer__flex__about__title">
              <a href="#" class="footer__link" @click.prevent>PEWPEW BUY</a>
            </h4>
            <h5 class="footer__flex__about__subtitle">
              <a href="#" class="footer__link" @click.prevent
                >Страйкбольная барахолка</a
              >
            </h5>
          </div>
          <div v-if="openFooter" class="footer__flex__about__contacts">
            <div class="footer__flex__about__contacts__social">
              <a
                href="#"
                class="footer__flex__about__contacts__social__link"
                @click.prevent>
                <img src="assets/img/telegram.svg" alt="telegram" />
              </a>
              <a
                href="#"
                class="footer__flex__about__contacts__social__link"
                @click.prevent>
                <img src="assets/img/whatsapp.svg" alt="whatsapp" />
              </a>
              <a
                href="#"
                class="footer__flex__about__contacts__social__link"
                @click.prevent>
                <img src="assets/img/vk.svg" alt="vk" />
              </a>
              <a
                href="#"
                class="footer__flex__about__contacts__social__link"
                @click.prevent>
                <img src="assets/img/mail.svg" alt="mail" />
              </a>
            </div>
            <p class="footer__flex__about__contacts__copyright">
              © 2011-2022 «PEWPEW BUY» — продажа страйкбольного оружия,
              пневматики и аксессуаров
            </p>
          </div>
        </div>
        <ul class="footer__flex__map">
          <li class="footer__flex__map__item" :class="{ active: openFooter }">
            <a href="#" class="footer__link" @click.prevent
              >Страйкбольное оружие</a
            >

            <ul v-if="openFooter" class="footer__flex__categories">
              <li
                v-for="item in filterMenu['Страйкбольное оружие']"
                :key="item"
                class="footer__flex__categories__item">
                <a href="#" class="footer__link" @click.prevent>{{ item }}</a>
              </li>
            </ul>
          </li>
          <li class="footer__flex__map__item" :class="{ active: openFooter }">
            <a href="#" class="footer__link" @click.prevent>Внешний тюнинг</a>

            <ul v-if="openFooter" class="footer__flex__categories">
              <li
                v-for="item in filterMenu['Внешний тюнинг']"
                :key="item"
                class="footer__flex__categories__item">
                <a href="#" class="footer__link" @click.prevent>{{ item }}</a>
              </li>
            </ul>
          </li>
          <li class="footer__flex__map__item" :class="{ active: openFooter }">
            <a href="#" class="footer__link" @click.prevent
              >Внутренний тюнинг</a
            >

            <ul v-if="openFooter" class="footer__flex__categories">
              <li
                v-for="item in filterMenu['Внутренний тюнинг']"
                :key="item"
                class="footer__flex__categories__item">
                <a href="#" class="footer__link" @click.prevent>{{ item }}</a>
              </li>
            </ul>
          </li>
          <li class="footer__flex__map__item" :class="{ active: openFooter }">
            <a href="#" class="footer__link" @click.prevent>Снаряжение</a>

            <ul v-if="openFooter" class="footer__flex__categories">
              <li
                v-for="item in filterMenu['Снаряжение']"
                :key="item"
                class="footer__flex__categories__item">
                <a href="#" class="footer__link" @click.prevent>{{ item }}</a>
              </li>
            </ul>
          </li>
          <li class="footer__flex__map__item" :class="{ active: openFooter }">
            <a href="#" class="footer__link" @click.prevent>Поддержка</a>

            <ul v-if="openFooter" class="footer__flex__categories">
              <li class="footer__flex__categories__item">
                <a href="#" class="footer__link" @click.prevent>Центр помощи</a>
              </li>
              <li class="footer__flex__categories__item">
                <a href="#" class="footer__link" @click.prevent
                  >Информация о безопасности</a
                >
              </li>
              <li class="footer__flex__categories__item">
                <a href="#" class="footer__link" @click.prevent>Чат-бот</a>
              </li>
              <li class="footer__flex__categories__item">
                <a href="#" class="footer__link" @click.prevent
                  >Договор оферта</a
                >
              </li>
              <li class="footer__flex__categories__item">
                <a href="#" class="footer__link" @click.prevent
                  >Политика конфиденциальности</a
                >
              </li>
            </ul>
          </li>
        </ul>
        <a
          href="#"
          class="footer__flex__arrow"
          :class="{ active: openFooter }"
          @click.prevent="openFooter = !openFooter">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.53033 0.469643C6.23744 0.17675 5.76256 0.17675 5.46967 0.469643L0.696699 5.24261C0.403806 5.53551 0.403806 6.01038 0.696699 6.30327C0.989593 6.59617 1.46447 6.59617 1.75736 6.30327L6 2.06063L10.2426 6.30327C10.5355 6.59617 11.0104 6.59617 11.3033 6.30327C11.5962 6.01038 11.5962 5.53551 11.3033 5.24261L6.53033 0.469643ZM6.75 1.58105V0.999974L5.25 0.999974V1.58105H6.75Z"
              fill="black" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const openFooter = ref(false)
const filterMenu = {
  'Страйкбольное оружие': [
    'АК-серия',
    'Винтовки',
    'Пулеметы',
    'Дробовики',
    'Автоматы',
    'Автоматы прочие модели',
    'АС ВАЛ, ВСС, СР-3М',
    'Гранатометы',
  ],
  'Внешний тюнинг': [
    'Антабки',
    'Трассерные насадки',
    'Глушители',
    'Переходники к глушителям',
    'Коллиматоры',
    'Крепления',
  ],
  'Внутренний тюнинг': [
    'Втулки и подшипники',
    'Направляющие пружин',
    'Гирбоксы',
    'Ноззл',
    'Моторы',
    'Планка переводчика огня',
  ],
  Снаряжение: [
    'Кобуры',
    'Ножи тренировочные',
    'Питьевые системы',
    'Подсумки',
    'Чехлы, сумки',
    'Рюкзаки',
    'Фонари и маркеры',
    'Ремни для оружия',
  ],
}
</script>

<style lang="scss" scoped>
.footer {
  @include defineFontMontserrat(400, 16px, 1.4);
  color: $white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 0;
  background-color: $black;
  z-index: 998;

  &.active {
    padding: 70px 0;
  }

  &__link {
    text-decoration: none;
    color: inherit;
  }

  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    &.active {
      align-items: stretch;
    }

    &__about {
      max-width: 15%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

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

      &__contacts {
        display: flex;
        flex-direction: column;
        gap: 15px;

        &__social {
          display: flex;
          align-items: center;
          gap: 20px;

          &__link {
            font-size: 0;
            line-height: normal;
          }
        }

        &__copyright {
          margin: 0;
          @include defineFontMontserrat(400, 12px, 1.4);
          color: $grey;
        }
      }
    }

    &__map {
      flex-grow: 1;
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: 67px;

      &__item {
        font-weight: inherit;
        font-size: inherit;
        line-height: inherit;
        color: $grey;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        &.active > .footer__link {
          font-weight: 700;
          margin-bottom: 20px;
        }
      }
    }

    &__categories {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 10px;

      &__item {
        @include defineFontMontserrat(400, 14px, 17px);
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
      transition: transform 0.5s ease-in-out;

      &.active {
        background-color: $accent;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
