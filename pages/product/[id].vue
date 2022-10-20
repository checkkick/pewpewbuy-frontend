<template>
  <div class="container">
    <Navigation />

    <main class="main">
      <h2 class="main__title">Доска объявлений</h2>
      <section class="crumbs">
        <h4 v-for="item in crumbs" :key="item" class="crumbs__title">
          {{ item }}
        </h4>
      </section>

      <section class="card">
        <div class="about-seller">
          <img
            class="about-seller__photo"
            :src="userImage"
            alt="seller photo" />
          <div class="seller-info">
            <h4 class="seller-info__name">
              {{ detProduct.user.first_name }} {{ detProduct.user.last_name }}
            </h4>
            <div class="seller-detail">
              <p class="seller-detail__nickname">
                {{ detProduct.user.call_sign }}
              </p>
              <RatingCalc :stars="Math.floor(detProduct.user.rep)" />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import noPhoto from '@/assets/img/no-photo.png'
import RatingCalc from '@/components/profile/RatingCalc.vue'
import { products } from '@/store/products'

export default {
  components: {
    RatingCalc,
  },
  setup() {
    const useProductStore = products()
    return {
      useProductStore,
    }
  },
  data: () => {
    return {
      detProduct: {
        user: {
          first_name: '',
          last_name: '',
          call_sign: '',
          rep: 0,
        },
      },
      crumbs: [],
      userImage: '',
    }
  },
  async mounted() {
    try {
      this.detProduct = await this.useProductStore.GET_DETAIL_PRODUCT(
        this.$route.params.id
      )

      if (this.detProduct.user.avatar) {
        this.userImage = this.detProduct.user.avatar
      } else {
        this.userImage = noPhoto
      }

      this.crumbs.push(this.detProduct.category.parent_category.name)
      this.crumbs.push(this.detProduct.category.name)
      this.crumbs.push(
        `${this.detProduct.manufacturer} ${this.detProduct.name}`
      )
    } catch (error) {}
  },
}
</script>

<style lang="scss" scoped>
.main {
  &__title {
    @include defineFontMontserrat(600, 36px, 44px);
    margin-bottom: 40px;
  }
}
.crumbs {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 35px;

  &__title {
    position: relative;
    @include defineFontMontserrat(500, 24px, 1.4);
    padding-right: 32px;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 12px;
      bottom: 0;
      width: 0.7rem;
      height: 0.7rem;
      border-bottom: 3px solid $black;
      border-right: 3px solid $black;
      transform: rotate(-45deg);
    }

    &:last-child::after {
      content: none;
    }
  }
}
.card {
  background: #ffffff;
  border: 1px solid #dedede;
  box-shadow: 0px 13px 140px rgba(255, 255, 255, 0.72);
  border-radius: 32px;
  padding: 50px 105px;
}
.about-seller {
  display: flex;
  gap: 14px;

  &__photo {
    border-radius: 50%;
    align-self: center;
    width: 72px;
    height: 72px;
  }
}
.seller-info {
  &__name {
    @include defineFontMontserrat(500, 24px, 29px);
    margin-bottom: 17px;
  }
}
.seller-detail {
  display: flex;
  align-items: center;
  gap: 19px;

  &__nickname {
    @include defineFontMontserrat(400, 18px, 22px);
  }
}
</style>
