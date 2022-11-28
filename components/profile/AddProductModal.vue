<template>
  <div class="modal-background">
    <div class="close-background" @click="closeWindow"></div>
    <div class="modal-window">
      <span class="modal-window__close" @click="closeWindow"></span>
      <h2 class="modal-window__title">Заполните информацию о товаре</h2>
      <div class="modal-window__column">
        <div class="block">
          <h3 class="modal-window__subtitle">Выберите категорию товара</h3>
          <div class="radio-row">
            <div
              v-for="(item, idx) in Object.keys(useProductStore.categories)"
              :key="idx">
              <input
                :id="idx"
                v-model="chooseCategory"
                :value="item"
                class="radio-row__radiobutton"
                type="radio"
                :name="item" />
              <label class="radio-row__label" :for="idx">
                {{ item }}
              </label>
            </div>
          </div>
        </div>

        <div v-if="useProductStore.categories[chooseCategory]" class="block">
          <h3 class="modal-window__subtitle">Выберите подкатегорию товара</h3>
          <div class="checkbox-row">
            <div
              v-for="item in useProductStore.categories[chooseCategory]"
              :key="item.id">
              <input
                :id="item.slug"
                v-model="chooseSubcategory"
                :value="item.name"
                class="checkbox-row__checkbox"
                type="radio"
                :name="item.name" />
              <label class="checkbox-row__label" :for="item.slug">{{
                item.name
              }}</label>
            </div>
          </div>
        </div>

        <div class="block">
          <h3 class="modal-window__subtitle">Добавьте фотографию товара</h3>
          <input
            ref="image"
            class="modal-window__image"
            type="file"
            @change="addPhotoProduct" />
          <swiper
            class="photo-swiper"
            :slides-per-view="4"
            :space-between="50"
            :centered-slides="true">
            <swiper-slide
              v-for="(item, idx) in tempPhotos"
              :key="idx"
              class="photo-swiper__slide-photo">
              <img
                :src="item"
                :alt="'photo-' + idx"
                class="photo-swiper__image" />
              <button
                class="photo-swiper__delete-btn"
                @click="deleteImage(idx)"></button>
            </swiper-slide>
            <swiper-slide
              class="photo-swiper__add-slide"
              @click="$refs.image.click()">
              <p class="photo-swiper__text">Добавить фото</p>
            </swiper-slide>
          </swiper>
          <p class="modal-window__help-text">(минимум 2 фотографии)</p>
        </div>

        <div class="block">
          <h3 class="modal-window__subtitle">Добавьте характеристики товара</h3>
          <div class="property">
            <label class="property__label" for="model">Модель оружия *</label>
            <input
              id="model"
              v-model="newProduct.name"
              class="property__input"
              type="text"
              name="model"
              placeholder="Colt AR15" />
          </div>

          <div class="property">
            <label class="property__label" for="proizvod">Производитель</label>
            <input
              id="proizvod"
              v-model="newProduct.manufacturer"
              class="property__input"
              type="text"
              name="proizvod"
              placeholder="Cyma" />
          </div>

          <div class="property">
            <label class="property__label" for="location"
              >Местоположение *</label
            >
            <input
              id="location"
              v-model="newProduct.location"
              class="property__input"
              type="text"
              name="location"
              placeholder="г. Москва" />
          </div>

          <div
            v-for="item in assetCategory"
            :key="item.asset.id"
            class="property">
            <label class="property__label" :for="item.asset.slug">{{
              item.asset.name
            }}</label>
            <input
              :id="item.asset.slug"
              v-model="newProduct.assets[item.asset.slug]"
              class="property__input"
              type="text"
              :name="item.asset.slug"
              :placeholder="item.asset.measure_units" />
          </div>

          <div class="property">
            <label class="property__label" for="comment"
              >Дополнительная информация</label
            >
            <textarea
              id="comment"
              v-model="newProduct.description"
              class="property__textarea"
              name="comment"
              rows="3"></textarea>
          </div>
        </div>

        <div class="block">
          <h3 class="modal-window__subtitle">Добавьте стоимость товара</h3>
          <div class="property">
            <label class="property__label" for="price">Цена *</label>
            <input
              id="price"
              v-model="newProduct.price"
              class="property__input"
              type="text"
              name="price" />
          </div>
        </div>

        <button
          class="modal-window__btn"
          :class="{ 'modal-window__btn--active': btnProcess }"
          :disabled="btnProcess"
          @click="createProduct">
          Сохранить
          <span v-if="btnProcess" class="spinner"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from '@/store/products'
import { clients } from '@/store/clients'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  emits: ['closeAddProductWindow', 'refreshProducts'],

  setup() {
    const useProductStore = products()
    const clientsStore = clients()
    return {
      useProductStore,
      clientsStore,
    }
  },

  data: () => {
    return {
      chooseCategory: '',
      chooseSubcategory: '',
      subcategoryObject: {},
      assetCategory: [],
      tempPhotos: [],
      newProduct: {
        assets: {},
        category: 0,
        manufacturer: '',
        name: '',
        price: '',
        description: '',
        location: '',
        parent_product: '',
        files: [],
      },
      btnProcess: false,
    }
  },

  watch: {
    async chooseSubcategory() {
      this.newProduct.assets = {}

      this.subcategoryObject = this.useProductStore.categories[
        this.chooseCategory
      ].find(item => item.name === this.chooseSubcategory)

      this.assetCategory = await this.useProductStore.GET_ASSET_TEMPLATE(
        this.subcategoryObject.id
      )

      this.newProduct.category = parseInt(this.subcategoryObject.id)
    },
  },

  async mounted() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'

    if (Object.keys(this.useProductStore.categories).length === 0) {
      await this.useProductStore.GET_CATEGORIES_ALL()
    }
  },

  methods: {
    closeWindow() {
      document.getElementsByTagName('body')[0].style.overflow = null
      this.$emit('closeAddProductWindow')
    },
    addPhotoProduct(e) {
      const file = e.target.files[0]
      this.newProduct.files.push(file)
      const reader = new FileReader()
      const that = this
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        that.tempPhotos.push(e.target.result)
      }
    },
    deleteImage(id) {
      this.tempPhotos.splice(id, 1)
      this.newProduct.files.splice(id, 1)
    },
    async createProduct() {
      if (
        this.newProduct.category > 0 &&
        this.newProduct.name.length > 0 &&
        this.newProduct.price.length > 0 &&
        this.newProduct.files.length > 0
      ) {
        this.btnProcess = true

        const data = new FormData()

        for (const key in this.newProduct) {
          if (key === 'assets') {
            data.append(key, JSON.stringify(this.newProduct[key]))
          } else if (key === 'files') {
            for (const iterator of this.newProduct[key]) {
              data.append('files', iterator)
            }
          } else {
            data.append(key, this.newProduct[key])
          }
        }

        const response = await this.useProductStore.CREATE_PRODUCT(data)

        if (response.id) {
          await this.clientsStore.GET_SELF()
          this.btnProcess = false
          this.$emit('refreshProducts')
          this.closeWindow()
        }

        this.btnProcess = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.spinner {
  position: absolute;
  left: 80px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: inline-block;
  border: 3px solid;
  border-color: #6ebeff #6ebeff transparent transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &::after,
  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 3px solid;
    border-color: transparent transparent #337ab7 #337ab7;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotationBack 0.5s linear infinite;
    transform-origin: center center;
  }

  &::before {
    width: 22px;
    height: 22px;
    border-color: #6ebeff #6ebeff transparent transparent;
    animation: rotation 1.5s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
}
.modal-background {
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $modal-dark-background;
}
.close-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.modal-window {
  z-index: 1;
  position: relative;
  max-width: 1023px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $white;
  border-radius: 21px;
  padding: 75px;
  margin: 100px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;

  &__close {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 41px;
    right: 41px;

    &::before {
      content: '';
      position: absolute;
      top: 10px;
      width: 21px;
      height: 2px;
      background-color: $black;
      transform: rotate(45deg);
    }

    &::after {
      content: '';
      position: absolute;
      top: 10px;
      width: 21px;
      height: 2px;
      background-color: $black;
      transform: rotate(-45deg);
    }
  }

  &__title {
    @include defineFontMontserrat(700, 24px, 29px);
    color: $black;
    margin-bottom: 49px;
    text-transform: uppercase;
    color: #4b8ff5;
  }

  &__subtitle {
    @include defineFontMontserrat(600, 18px, 22px);
    margin-bottom: 20px;
    text-align: center;
  }

  &__image {
    position: absolute;
    top: -100%;
    visibility: hidden;
  }

  &__help-text {
    @include defineFontMontserrat(300, 16px, 20px);
    text-align: center;
    color: #484848;
  }

  &__column {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }

  &__btn {
    @include defineBtnPrimary(20px, 91px, 18px, 44px);
    transition: all 0.2s ease-in-out;

    & ~ &--active {
      opacity: 0;
    }
    & ~ :not(&--active) {
      opacity: 1;
    }

    &--active {
      position: relative;
      background-color: $filter-border;
      outline: 2px solid $primary;
      outline-offset: -2px;
      color: transparent;
      transition: all 0.2s ease-in-out;
    }
  }
}

.block {
  width: 100%;
}

.radio-row {
  display: grid;
  grid-template-columns: repeat(4, max-content);
  justify-content: space-between;
  align-items: center;
  gap: 10px 20px;

  &__radiobutton:checked,
  &__radiobutton:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  &__radiobutton:checked + &__label,
  &__radiobutton:not(:checked) + &__label {
    @include defineFontMontserrat(400, 18px, 22px);
    position: relative;
    padding-left: 27px;
    cursor: pointer;
    display: inline-block;
  }
  &__radiobutton:checked + &__label:before,
  &__radiobutton:not(:checked) + &__label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 2px;
    width: 17px;
    height: 17px;
    border: 1px solid #afafaf;
    border-radius: 100%;
    background: #fff;
  }
  &__radiobutton:checked + &__label:after,
  &__radiobutton:not(:checked) + &__label:after {
    content: '';
    width: 9px;
    height: 9px;
    background: #4b8ff5;
    position: absolute;
    top: 6px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  &__radiobutton:not(:checked) + &__label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  &__radiobutton:checked + &__label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.checkbox-row {
  display: grid;
  grid-template-columns: repeat(4, max-content);
  justify-content: space-between;
  align-items: center;
  gap: 10px 20px;

  &__checkbox:checked,
  &__checkbox:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  &__checkbox:checked + &__label,
  &__checkbox:not(:checked) + &__label {
    @include defineFontMontserrat(400, 18px, 22px);

    position: relative;
    padding-left: 27px;
    cursor: pointer;
    display: inline-block;
  }
  &__checkbox:checked + &__label:before,
  &__checkbox:not(:checked) + &__label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 2px;
    width: 17px;
    height: 17px;
    border: 1px solid #afafaf;
    background: #fff;
  }
  &__checkbox:checked + &__label:after,
  &__checkbox:not(:checked) + &__label:after {
    content: '';
    position: absolute;
    left: 0;
    top: 2px;
    width: 17px;
    height: 17px;
    background: url('@/assets/img/check.svg') no-repeat center center;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  &__checkbox:not(:checked) + &__label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  &__checkbox:checked + &__label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  &__checkbox:checked + &__label:before {
    border-color: $black;
  }
}

.photo-swiper {
  margin-bottom: 13px;
  padding-top: 10px;

  &__add-slide {
    cursor: pointer;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fbfbfb;
    border: 2px dashed #4b8ff5;
    border-radius: 20px;
  }

  &__slide-photo {
    cursor: grab;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed #4b8ff5;
    border-radius: 20px;
    height: 200px;
  }

  &__delete-btn {
    cursor: pointer;
    width: 15px;
    height: 20px;
    position: absolute;
    top: -10px;
    right: -10px;
    background: $white;
    border-radius: 100%;
    border: 1px solid rgba(175, 175, 175, 0.39);

    &::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 6px;
      transform: rotate(45deg);
      width: 12px;
      height: 1px;
      background-color: $black;
    }

    &::after {
      content: '';
      position: absolute;
      top: 10px;
      left: 6px;
      transform: rotate(-45deg);
      width: 12px;
      height: 1px;
      background-color: $black;
    }
  }

  &__image {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
  }

  &__text {
    @include defineFontMontserrat(400, 18px, 22px);
    text-align: center;
    padding-bottom: 40px;
    background: url('@/assets/img/add-publication.svg') no-repeat center bottom /
      28px 28px;
  }
}

.property {
  margin: 0 auto;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }

  &__label {
    @include defineFontMontserrat(400, 18px, 22px);
  }

  &__input {
    @include defineFontMontserrat(400, 18px, 22px);
    outline: none;
    border: none;
    background: #f2f2f2;
    border-radius: 8px;
    padding: 16px 15px;
    color: $black;

    &::placeholder,
    &:disabled {
      color: rgba(0, 0, 0, 0.2);
    }
  }

  &__textarea {
    @include defineFontMontserrat(400, 18px, 22px);
    resize: none;
    outline: none;
    border: none;
    background: #f2f2f2;
    border-radius: 8px;
    padding: 16px 15px;
    color: $black;

    &::placeholder,
    &:disabled {
      color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
