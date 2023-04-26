<template>
  <div
    class="nav container"
    @mouseleave="leaveBar()"
  >
    <nav class="filter">
      <ul class="filter__list">
        <li
          v-for="(filterItem, idx) in Object.keys(categories)"
          :key="idx"
          class="filter__item"
          :class="{ 'filter__item--active': filterItem === chooseFilter }"
          @mouseenter="; (chooseFilter = filterItem), (showSubFilter = true)"
        >
          <a
            href="#"
            class="filter__link"
          >{{ filterItem }}</a>
          <ul
            v-if="filterItem === chooseFilter && showSubFilter && categories[filterItem].length > 0"
            class="dropdown-list"
          >
            <li
              v-for="item in categories[filterItem]"
              :key="item.id"
              class="dropdown-list__item"
              :class="{ 'dropdown-list__item--active': item.id === chooseSubfilter.id }"
              @click="chooseSubCategory(item)"
            >
              <a class="dropdown-list__link">{{
                item.name
              }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <button
      class="nav__btn-create"
      @click="authorization ? $router.push('/profile?addproduct') : $router.push('/?login')"
    >
      Разместить объявление
    </button>
  </div>
</template>

<script>
import { auth } from '@/store/auth';
import { products } from '@/store/products';

export default {
  async setup() {
    const authorization = await auth().CHECK_AUTH();
    let { categories } = products();

    if (Object.keys(categories).length === 0) {
      categories = await products().GET_CATEGORIES_ALL();
    }

    const filterProducts = products().GET_CATEGORY_PRODUCTS;
    const getAllProducts = products().GET_ALL_PRODUCTS;

    return {
      authorization,
      categories,
      filterProducts,
      getAllProducts,
    };
  },
  data: () => ({
    showSubFilter: false,
    chooseFilter: '',
    chooseSubfilter: {},
  }),
  watch: {
    '$route.query.slug': {
      async handler() {
        await this.loadproductsFromSlug();
      },
      deep: true,
    },
  },
  async mounted() {
    await this.loadproductsFromSlug();
  },
  methods: {
    chooseSubCategory(item) {
      if (this.chooseSubfilter === item) {
        this.$router.push('/?slug=');
      } else {
        this.chooseSubfilter = item;
        this.showSubFilter = false;
        this.$router.push(`/?slug=${item.slug}`);
      }
    },
    async loadproductsFromSlug() {
      if (Object.hasOwn(this.$route.query, 'slug')) {
        if (this.$route.query.slug) {
          let itemCategory = {};

          Object.keys(this.categories).forEach((iterator) => {
            const tempIteration = this.categories[iterator].find(
              (item) => item.slug === this.$route.query.slug,
            );

            if (tempIteration) {
              itemCategory = tempIteration;
            }
          });

          this.chooseFilter = itemCategory.parent_category.name;
          this.chooseSubfilter = itemCategory;

          await this.filterProducts(this.$route.query.slug);
        } else {
          this.chooseSubfilter = '';
          this.chooseFilter = '';
          this.showSubFilter = false;
          await this.getAllProducts();
          this.$router.push('/');
        }
      }
    },
    leaveBar() {
      if (Object.keys(this.chooseSubfilter).length > 0) {
        this.chooseFilter = this.chooseSubfilter.parent_category.name;
      } else {
        this.chooseFilter = '';
      }
      this.showSubFilter = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem 2rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 1300px) {
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  &__btn-create {
    @include defineBtnAccent(15px, 68px, 18px, 19px);
    cursor: pointer;

    @media (max-width: 1300px) {
      width: 95%;
    }
  }
}

.filter {
  background: $white;
  border: 1px solid $filter-border;
  box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
  border-radius: 68px;
  padding: 11px 9px;

  @media (max-width: 1300px) {
    width: 100%;
  }

  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 1rem;
  }

  &__item {
    @include defineFontMontserrat(500, 18px, 22px);
    position: relative;
    cursor: pointer;
    text-align: center;
    padding: 16px 20px;
    border-radius: 68px;
    color: $black;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

    &.filter__item--active {
      background-color: $primary;
      color: $white;
    }

  }

  &__link {
    text-decoration: none;
    color: inherit;
  }
}

.dropdown-list {
  z-index: 2;
  position: absolute;
  left: 20px;
  right: 20px;
  top: calc(100% + 1rem);
  padding: 0;
  margin: 0;
  list-style: none;
  background: $white;
  border: 1px solid $filter-border;
  box-shadow: 0px 13px 12px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  &__item {
    cursor: pointer;
    @include defineFontMontserrat(500, 13px, 16px);
    text-align: center;
    padding: 10px 12px;
    color: $black;

    &.dropdown-list__item--active,
    &:hover {
      background: $primary;
      color: $white;
    }

    &:first-child {
      border-radius: 10px 10px 0 0;
    }

    &:last-child {
      border-radius: 0 0 10px 10px;
    }

  }

  &__link {
    text-decoration: none;
    color: inherit;
  }
}
</style>
