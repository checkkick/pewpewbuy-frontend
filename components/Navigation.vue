<template>
  <div class="nav" @mouseleave="leaveBar()">
    <nav class="nav__filter">
      <ul class="nav__filter__list">
        <li
          v-for="(filterItem, idx) in Object.keys(categories)"
          :key="idx"
          class="nav__filter__list__item"
          :class="{ active: filterItem === chooseFilter }"
          @mouseenter=";(chooseFilter = filterItem), (showSubFilter = true)">
          <a href="#" class="nav__filter__list__item__link">{{ filterItem }}</a>
          <ul
            v-if="
              filterItem === chooseFilter &&
              showSubFilter &&
              categories[filterItem].length > 0
            "
            class="nav__filter__dropdown-list">
            <li
              v-for="item in categories[filterItem]"
              :key="item.id"
              class="nav__filter__dropdown-list__item"
              :class="{ active: item.id === chooseSubfilter.id }"
              @click="chooseSubCategory(item)">
              <a class="nav__filter__dropdown-list__item__link">{{
                item.name
              }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <button
      class="nav__btn-create"
      @click="
        authorization
          ? $router.push('/profile?addproduct')
          : $router.push('/?login')
      ">
      Разместить объявление
    </button>
  </div>
</template>

<script>
import { auth } from '@/store/auth.js'
import { products } from '@/store/products'

export default {
  async setup() {
    const authorization = auth().CHECK_AUTH()
    const categories = await products().GET_CATEGORIES_ALL()
    const filterProducts = products().GET_CATEGORY_PRODUCTS
    const getAllProducts = products().GET_ALL_PRODUCTS

    return {
      authorization,
      categories,
      filterProducts,
      getAllProducts,
    }
  },
  data: () => {
    return {
      showSubFilter: false,
      chooseFilter: '',
      chooseSubfilter: {},
    }
  },
  watch: {
    '$route.query.slug': {
      async handler() {
        await this.loadproductsFromSlug()
      },
      deep: true,
    },
  },
  async mounted() {
    await this.loadproductsFromSlug()
  },
  methods: {
    async chooseSubCategory(item) {
      if (this.chooseSubfilter === item) {
        this.$router.push('/?slug=')
      } else {
        this.chooseSubfilter = item
        this.showSubFilter = false
        await this.filterProducts(item.slug)
        this.$router.push('/?slug=' + item.slug)
      }
    },
    async loadproductsFromSlug() {
      if (Object.hasOwn(this.$route.query, 'slug')) {
        if (this.$route.query.slug) {
          let itemCategory = {}

          for (const iterator in this.categories) {
            const tempIteration = this.categories[iterator].find(
              item => item.slug === this.$route.query.slug
            )

            if (tempIteration) {
              itemCategory = tempIteration
              break
            }
          }

          this.chooseFilter = itemCategory.parent_category.name
          this.chooseSubfilter = itemCategory
        } else {
          this.chooseSubfilter = ''
          this.chooseFilter = ''
          this.showSubFilter = false
          this.$router.push('/')
          await this.getAllProducts()
        }
      }
    },
    leaveBar() {
      if (Object.keys(this.chooseSubfilter).length > 0) {
        this.chooseFilter = this.chooseSubfilter.parent_category.name
      } else {
        this.chooseFilter = ''
      }
      this.showSubFilter = false
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 42px;
  padding-bottom: 10px;
  margin-bottom: 30px;

  &__filter {
    background: $white;
    border: 1px solid $filter-border;
    box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
    border-radius: 91px;
    padding: 15px 13px;

    &__list {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      gap: 15px;

      &__item {
        @include defineFontMontserrat(500, 24px, 29px);
        position: relative;
        cursor: pointer;
        text-align: center;
        padding: 22px 27px;
        border-radius: 91px;
        color: $black;
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

        &.active {
          background-color: $primary;
          color: $white;
        }

        &__link {
          text-decoration: none;
          color: inherit;
        }
      }
    }

    &__dropdown-list {
      z-index: 2;
      position: absolute;
      top: 93px;
      left: 20px;
      right: 20px;
      padding: 0;
      margin: 0;
      list-style: none;
      background: $white;
      border: 1px solid $filter-border;
      box-shadow: 0px 13px 12px rgba(0, 0, 0, 0.15);
      border-radius: 14px;

      &__item {
        cursor: pointer;
        @include defineFontMontserrat(500, 18px, 22px);
        text-align: center;
        padding: 14px 17px;
        color: $black;

        &.active,
        &:hover {
          background: $primary;
          color: $white;
        }

        &:first-child {
          border-radius: 14px 14px 0 0;
        }

        &:last-child {
          border-radius: 0 0 14px 14px;
        }

        &__link {
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }

  &__btn-create {
    @include defineBtnAccent(20px, 91px, 25px, 26px);
    cursor: pointer;
  }
}
</style>
