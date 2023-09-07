<template>
  <footer
    class="footer"
    :class="{ 'footer--active': openFooter }"
  >
    <div class="container">
      <div
        class="footer__row"
        :class="{ 'footer__row--active': openFooter }"
      >
        <div class="about">
          <div>
            <h4 class="about__title">
              <a
                href="#"
                class="footer__link"
                @click.prevent
              >PEWPEW BUY</a>
            </h4>
            <h5 class="about__subtitle">
              <a
                href="#"
                class="footer__link"
                @click.prevent
              >Страйкбольная барахолка</a>
            </h5>
          </div>
          <div
            v-if="openFooter"
            class="contacts"
          >
            <div class="contacts__social">
              <a
                href="#"
                class="contacts__link"
                @click.prevent
              >
                <img
                  src="/assets/img/telegram.svg"
                  alt="telegram"
                >
              </a>
              <a
                href="#"
                class="contacts__link"
                @click.prevent
              >
                <img
                  src="/assets/img/whatsapp.svg"
                  alt="whatsapp"
                >
              </a>
              <a
                href="#"
                class="contacts__link"
                @click.prevent
              >
                <img
                  src="/assets/img/vk.svg"
                  alt="vk"
                >
              </a>
              <a
                href="#"
                class="contacts__link"
                @click.prevent
              >
                <img
                  src="/assets/img/mail.svg"
                  alt="mail"
                >
              </a>
            </div>
            <p class="contacts__copyright">
              «PEWPEW BUY» — платформа для продажи страйкбольного оружия,
              пневматики и аксессуаров
            </p>
          </div>
        </div>
        <nav class="map">
          <li
            v-for="item in categories"
            :key="item.id"
            class="map__item"
            :class="{ 'map__item--active': openFooter }"
          >
            <a
              href="#"
              class="footer__link"
              @click.prevent="chooseCategory(item.slug)"
            >{{ item.name }}</a>

            <ul
              v-if="openFooter"
              class="categories"
            >
              <li class="categories__item">
                <a
                  href="#"
                  class="footer__link"
                  @click.prevent="chooseCategory(item.slug)"
                >Показать все товары категории</a>
              </li>
              <li
                v-for="subItem in item.child_categories"
                :key="subItem.id"
                class="categories__item"
              >
                <a
                  href="#"
                  class="footer__link"
                  @click.prevent="chooseCategory(subItem.slug)"
                >{{ subItem.name }}</a>
              </li>
            </ul>
          </li>
        </nav>
        <a
          href="#"
          class="arrow"
          :class="{ 'arrow--active': openFooter }"
          @click.prevent="openFooter = !openFooter"
        >
          <svg
            width="9"
            height="6"
            viewBox="0 0 9 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.14775 1.10177C4.92808 0.882104 4.57192 0.882104 4.35225 1.10177L0.772524 4.6815C0.552855 4.90117 0.552855 5.25733 0.772524 5.477C0.992194 5.69667 1.34835 5.69667 1.56802 5.477L4.75 2.29502L7.93198 5.477C8.15165 5.69667 8.50781 5.69667 8.72748 5.477C8.94715 5.25733 8.94715 4.90117 8.72748 4.6815L5.14775 1.10177ZM5.3125 1.93579V1.49952H4.1875V1.93579H5.3125Z"
              fill="black"
            />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import { products } from '@/store/products';

export default {
  data: () => ({
    openFooter: false,
    categories: {},
  }),
  async mounted() {
    this.categories = products().categories;

    if (Object.keys(this.categories).length === 0) {
      this.categories = await products().GET_CATEGORIES_ALL();
    }
  },
  methods: {
    async chooseCategory(name) {
      await products().GET_CATEGORY_PRODUCTS(name);
      this.openFooter = false;
      this.$router.push(`/?slug=${name}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  @include defineFontMontserrat(400, 12px, 1.4);
  color: $white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 0;
  background-color: $black;
  z-index: 998;

  &.footer--active {
    padding: 50px 0;
  }

  &__link {
    text-decoration: none;
    color: inherit;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    &.footer__row--active {
      gap: 1rem;
      align-items: stretch;
    }
  }
}

.about {
  max-width: 15%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;

  &__title {
    @include defineFontSairaStencilOne(12px, 19px);
    color: $white;
  }

  &__subtitle {
    font-size: 9px;
    line-height: inherit;
    font-weight: inherit;
    margin: 0;
    color: $grey;
  }
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__social {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__link {
    font-size: 0;
    line-height: normal;
  }

  &__copyright {
    @include defineFontMontserrat(400, 9px, 1.4);
    color: $grey;
  }
}

.map {
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

    &.map__item--active>.footer__link {
      font-weight: 700;
      margin-bottom: 20px;
    }
  }
}

.categories {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;

  &__item {
    @include defineFontMontserrat(400, 12px, 15px);
    color: $grey;
  }
}

.arrow {
  width: 25px;
  height: 25px;
  background-color: $white;
  border-radius: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  transition: transform 0.5s ease-in-out, background-color 0.2s ease-in-out;

  &.arrow--active {
    background-color: $accent;
    transform: rotate(180deg);
  }

  &:hover {
    background-color: $accent;
  }

  &:active {
    background-color: $accent-active;
  }
}
</style>
