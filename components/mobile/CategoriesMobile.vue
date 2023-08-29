<template>
  <div class="categories">
    <div class="categories__container">
      <ul class="categories__list">
        <li
          v-for="filterItem in categories"
          :key="filterItem.id"
          class="categories__item"
        >
          <a
            href="#"
            class="categories__link"
            :class="{ 'categories__link--active': chooseFilter === filterItem.id }"
            @click.prevent="chooseFilter !== filterItem.id ? chooseFilter = filterItem.id : chooseFilter = -1"
          >
            {{ filterItem.name }}
            <svg
              width="21"
              height="13"
              viewBox="0 0 21 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.2314 1.55669L10.1827 10.6055L1.13388 1.55669"
                stroke="#222222"
                stroke-width="2.2622"
              />
            </svg>
          </a>

          <ul
            v-if="chooseFilter === filterItem.id && filterItem.child_categories.length > 0"
            class="dropdown-list"
          >
            <li
              v-for="item in filterItem.child_categories"
              :key="item.id"
              class="dropdown-list__item"
              @click.prevent="chooseSubFilter(item)"
            >
              <a class="dropdown-list__link">{{
                item.name
              }}</a>
            </li>
          </ul>
        </li>
      </ul>
      <div class="contacts">
        <div class="contacts__social">
          <a
            href="#"
            class="contacts__link"
            @click.prevent
          >
            <img
              class="contacts__image"
              src="/assets/img/telegram-black.svg"
              alt="telegram"
            >
          </a>
          <a
            href="#"
            class="contacts__link"
            @click.prevent
          >
            <img
              class="contacts__image"
              src="/assets/img/whatsapp-black.svg"
              alt="whatsapp"
            >
          </a>
          <a
            href="#"
            class="contacts__link"
            @click.prevent
          >
            <img
              class="contacts__image"
              src="/assets/img/vk-black.svg"
              alt="vk"
            >
          </a>
          <a
            href="#"
            class="contacts__link"
            @click.prevent
          >
            <img
              class="contacts__image"
              src="/assets/img/mail-black.svg"
              alt="mail"
            >
          </a>
        </div>
        <p class="contacts__copyright">
          © 2011-2022 «PEWPEW BUY» — продажа страйкбольного оружия, пневматики и
          аксессуаров
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { products } from '@/store/products';

let { categories } = products();
const chooseFilter = ref(-1);
const router = useRouter();
const emit = defineEmits(['close']);

if (Object.keys(categories).length === 0) {
  categories = await products().GET_CATEGORIES_ALL();
}

function chooseSubFilter(item) {
  router.push(`/?slug=${item.slug}`);
  emit('close');
}
</script>

<style lang="scss" scoped>
.categories {
  z-index: 999;
  position: fixed;
  right: 0;
  left: 0;
  top: 5rem;
  bottom: 0;
  background-color: $mobile-modal;
  border-radius: 10px;

  @media (max-width: 750px) {
    top: 4rem;
  }

  &__container {
    overflow: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    padding: 60px 100px 120px;

    @media (max-width: 750px) {
      padding: 35px 30px 150px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
    list-style: none;
    max-height: 60vh;
    overflow: auto;
    margin-right: -2rem;
    padding-right: 2rem;

    @media (max-width: 750px) {
      margin-right: -1rem;
      padding-right: 1rem;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media (max-width: 750px) {
      & svg {
        width: 15px
      }
    }
  }

  &__link {
    @include defineFontMontserrat(600, 22px, 1.3);
    text-decoration: none;
    color: $black;
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 750px) {
      font-size: 15px;
    }

    & svg {
      transition: transform 0.2s ease-in-out;
    }

    &--active svg {
      transform: rotate(180deg);
    }
  }
}

.contacts {
  display: flex;
  align-items: flex-end;
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

  &__image {
    max-width: 45px;

    @media (max-width: 750px) {
      max-width: 30px;
    }
  }

  &__copyright {
    @include defineFontMontserrat(400, 13px, 1.4);
    text-align: right;
    color: $black;
    max-width: 365px;

    @media (max-width: 750px) {
      font-size: 10px;
    }
  }
}

.dropdown-list {
  width: 100%;
  text-align: end;
  padding: 25px 0 !important;
  margin-bottom: 10px !important;
  list-style: none;
  margin: 0;
  border-bottom: 1px solid #C3C9D2;
  display: flex;
  flex-direction: column;
  gap: 21px;

  @media (max-width: 750px) {
    padding: 20px 0 !important;
    gap: 14px;
  }

  &__link {
    @include defineFontMontserrat(500, 18px, 22px);
    color: rgba(65, 65, 65, 0.9);
    cursor: pointer;

    @media (max-width: 750px) {
      font-size: 14px;
    }
  }
}
</style>
