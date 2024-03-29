<template>
  <div class="modal-background">
    <div
      class="close-background"
      @click="closeWindow"
    />
    <div class="modal-window">
      <span
        class="modal-window__close"
        @click="closeWindow"
      />
      <h2 class="modal-window__title">
        Заполните информацию о товаре
      </h2>
      <div class="modal-window__column">
        <div class="block">
          <h3 class="modal-window__subtitle">
            Выберите категорию товара
          </h3>
          <div class="radio-row">
            <div
              v-for="item in useProductStore.categories"
              :key="item.id"
            >
              <input
                :id="item.id"
                v-model="chooseCategory"
                :value="item"
                class="radio-row__radiobutton"
                type="radio"
                :name="item.name"
              >
              <label
                class="radio-row__label"
                :for="item.id"
              >
                {{ item.name }}
              </label>
            </div>
          </div>
        </div>

        <div
          v-if="chooseCategory.child_categories && chooseCategory.child_categories.length > 0"
          class="block"
        >
          <h3 class="modal-window__subtitle">
            Выберите подкатегорию товара
          </h3>
          <div class="checkbox-row">
            <div
              v-for="item in chooseCategory.child_categories"
              :key="item.id"
            >
              <input
                :id="item.slug"
                v-model="chooseSubcategory"
                :value="item"
                class="checkbox-row__checkbox"
                type="radio"
                :name="item.name"
              >
              <label
                class="checkbox-row__label"
                :for="item.slug"
              >{{
                item.name
              }}</label>
            </div>
          </div>
        </div>

        <div class="block">
          <h3 class="modal-window__subtitle modal-window__subtitle--margin">
            Добавьте фотографию товара
          </h3>
          <input
            ref="image"
            class="modal-window__image"
            type="file"
            @change="addPhotoProduct"
          >
          <swiper
            class="photo-swiper"
            :breakpoints="breakpoints"
          >
            <swiper-slide
              v-for="(item, idx) in tempPhotos"
              :key="idx"
              class="photo-swiper__slide-photo"
            >
              <img
                :src="item"
                :alt="'photo-' + idx"
                class="photo-swiper__image"
              >
              <button
                class="photo-swiper__delete-btn"
                @click="deleteImage(idx)"
              />
            </swiper-slide>
            <swiper-slide
              class="photo-swiper__add-slide"
              @click="$refs.image.click()"
            >
              <p class="photo-swiper__text">
                Добавить фото
              </p>
            </swiper-slide>
          </swiper>
          <p class="modal-window__help-text">
            (минимум 2 фотографии)
          </p>
        </div>

        <div class="block">
          <h3 class="modal-window__subtitle">
            Добавьте характеристики товара
          </h3>
          <div class="property">
            <label
              class="property__label"
              for="model"
            >Модель оружия *</label>
            <input
              id="model"
              v-model="newProduct.name"
              class="property__input"
              type="text"
              name="model"
              placeholder="Colt AR15"
            >
          </div>

          <div class="property">
            <label
              class="property__label"
              for="proizvod"
            >Производитель</label>
            <input
              id="proizvod"
              v-model="newProduct.manufacturer"
              class="property__input"
              type="text"
              name="proizvod"
              placeholder="Cyma"
            >
          </div>

          <div class="property">
            <label
              class="property__label"
              for="location"
            >Местоположение *</label>
            <input
              id="location"
              v-model="newProduct.location"
              class="property__input"
              type="text"
              name="location"
              placeholder="г. Москва"
            >
          </div>

          <div
            v-for="item in assetCategory"
            :key="item.asset.id"
            class="property"
          >
            <label
              class="property__label"
              :for="item.asset.slug"
            >{{
              item.asset.name
            }}</label>
            <input
              :id="item.asset.slug"
              v-model="newProduct.assets[item.asset.slug]"
              class="property__input"
              type="text"
              :name="item.asset.slug"
              :placeholder="item.asset.measure_units"
            >
          </div>

          <div class="property">
            <label
              class="property__label"
              for="comment"
            >Дополнительная информация</label>
            <textarea
              id="comment"
              v-model="newProduct.description"
              class="property__textarea"
              name="comment"
              rows="6"
            />
          </div>
        </div>

        <div class="block">
          <h3 class="modal-window__subtitle">
            Добавьте стоимость товара
          </h3>
          <div class="property">
            <label
              class="property__label"
              for="price"
            >Цена *</label>
            <input
              id="price"
              v-model="newProduct.price"
              class="property__input"
              type="text"
              name="price"
              @keypress="numbersPrevent"
            >
          </div>
        </div>

        <button
          class="modal-window__btn"
          :class="{ 'modal-window__btn--active': btnProcess }"
          :disabled="btnProcess"
          @click="createProduct"
        >
          Сохранить
          <span
            v-if="btnProcess"
            class="spinner"
          />
        </button>
      </div>
    </div>

    <BackButtonMobile
      v-if="tablet"
      @click="$emit('closeAddProductWindow')"
    />
  </div>
</template>

<script>
import BackButtonMobile from '@/components/mobile/BackButtonMobile.vue';

import { products } from '@/store/products';
import { clients } from '@/store/clients';
import { media } from '@/store/media';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
    BackButtonMobile,
  },

  emits: ['closeAddProductWindow'],

  setup() {
    const useProductStore = products();
    const clientsStore = clients();
    const { tablet } = media();

    return {
      useProductStore,
      clientsStore,
      tablet,
    };
  },

  data: () => ({
    chooseCategory: {},
    chooseSubcategory: {},
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
    breakpoints: {
      // mobile
      0: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 10,
      },
      // desktop
      751: {
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 30,
      },
    },
  }),

  watch: {
    async chooseSubcategory() {
      this.newProduct.assets = {};

      this.assetCategory = await this.useProductStore.GET_ASSET_TEMPLATE(
        this.chooseSubcategory.id,
      );

      this.newProduct.category = parseInt(this.chooseSubcategory.id, 10);
    },
  },

  async mounted() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    if (Object.keys(this.useProductStore.categories).length === 0) {
      await this.useProductStore.GET_CATEGORIES_ALL();
    }
  },

  unmounted() {
    if (Object.hasOwn(this.$route.query, 'addproduct')) {
      this.$router.replace(this.$route.path);
    }

    document.getElementsByTagName('body')[0].style.overflow = 'visible';
  },

  methods: {
    closeWindow() {
      document.getElementsByTagName('body')[0].style.overflow = 'visible';
      this.$emit('closeAddProductWindow');
    },
    addPhotoProduct(e) {
      const file = e.target.files[0];
      this.newProduct.files.push(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (t) => this.tempPhotos.push(t.target.result);
    },
    deleteImage(id) {
      this.tempPhotos.splice(id, 1);
      this.newProduct.files.splice(id, 1);
    },
    numbersPrevent(evt) {
      const theEvent = evt || window.event;
      let key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
      const regex = /[0-9]|\./;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    },
    async createProduct() {
      if (
        this.newProduct.category > 0
        && this.newProduct.name.length > 0
        && this.newProduct.price.length > 0
        && this.newProduct.files.length > 0
      ) {
        this.btnProcess = true;

        const data = new FormData();

        Object.keys(this.newProduct).forEach((key) => {
          if (key === 'assets') {
            data.append(key, JSON.stringify(this.newProduct[key]));
          } else if (key === 'files') {
            this.newProduct[key].forEach((iterator) => {
              data.append('files', iterator);
            });
          } else {
            data.append(key, this.newProduct[key]);
          }
        });

        if (await this.useProductStore.CREATE_PRODUCT(data)) {
          await this.clientsStore.GET_SELF();
          this.btnProcess = false;
          this.closeWindow();
        }

        this.btnProcess = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  scale: 0.8;
  position: absolute;
  left: 60px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: inline-block;
  border: 3px solid;
  border-color: $btn-spinner $btn-spinner transparent transparent;
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
    border-color: transparent transparent $btn-spinner-dark $btn-spinner-dark;
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
    border-color: $btn-spinner $btn-spinner transparent transparent;
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

  @media (max-width: 1150px) {
    z-index: 90;
    background: transparent;
    align-items: flex-start;
  }
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
  max-width: 850px;
  display: flex;
  -ms-overflow-style: none;
  scrollbar-width: none;
  flex-direction: column;
  align-items: center;
  background: $white;
  border-radius: 15px;
  padding: 40px 50px;
  margin: 100px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;

  @media (max-width: 1150px) {
    border-radius: 0;
    max-width: none;
    width: 100%;
    height: 100%;
    margin: 0;
    padding-top: 100px;
    padding-bottom: 7rem;
  }

  @media (max-width: 750px) {
    padding: 80px 15px 85px;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 20px;
    right: 20px;

    @media (max-width: 1150px) {
      display: none;
    }

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
    @include defineFontMontserrat(700, 18px, 22px);
    color: $black;
    margin-bottom: 2rem;
    text-transform: uppercase;
    color: $primary;

    @media (max-width: 750px) {
      font-size: 14px;
      margin-bottom: 1.2rem;
    }
  }

  &__subtitle {
    @include defineFontMontserrat(600, 14px, 16px);
    margin-bottom: 20px;
    text-align: center;

    @media (max-width: 750px) {
      font-size: 12px;
      margin-bottom: 15px;
    }

    &--margin {
      @media (max-width: 750px) {
        margin-bottom: 5px;
      }
    }
  }

  &__image {
    position: absolute;
    top: -100%;
    visibility: hidden;
  }

  &__help-text {
    @include defineFontMontserrat(300, 12px, 15px);
    text-align: center;
    color: $input-login-color;

    @media (max-width: 750px) {
      font-size: 10px;
      line-height: 1rem;
    }
  }

  &__column {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 750px) {
      gap: 1rem;
    }
  }

  &__btn {
    @include defineBtnPrimary(15px, 68px, 12px, 33px);
    transition: all 0.2s ease-in-out;

    @media (max-width: 750px) {
      font-size: 14px;
      border-radius: 40px;
    }

    &~&--active {
      opacity: 0;
    }

    &~ :not(&--active) {
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
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 750px) {
    align-items: flex-start;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  &__radiobutton:checked,
  &__radiobutton:not(:checked) {
    position: absolute;
    left: -9999px;
  }

  &__radiobutton:checked+&__label,
  &__radiobutton:not(:checked)+&__label {
    @include defineFontMontserrat(400, 14px, 16px);
    position: relative;
    padding-left: 1rem;
    cursor: pointer;
    display: inline-block;

    @media (max-width: 750px) {
      font-size: 13px;
    }
  }

  &__radiobutton:checked+&__label:before,
  &__radiobutton:not(:checked)+&__label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 1px;
    width: 13px;
    height: 13px;
    border: 1px solid $black-inactive;
    border-radius: 100%;
    background: $white;
  }

  &__radiobutton:checked+&__label:after,
  &__radiobutton:not(:checked)+&__label:after {
    content: '';
    width: 7px;
    height: 7px;
    background: $primary;
    position: absolute;
    top: 4px;
    left: 3px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  &__radiobutton:not(:checked)+&__label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  &__radiobutton:checked+&__label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.checkbox-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;

  @media (max-width: 750px) {
    align-items: flex-start;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  &__checkbox:checked,
  &__checkbox:not(:checked) {
    position: absolute;
    left: -9999px;
  }

  &__checkbox:checked+&__label,
  &__checkbox:not(:checked)+&__label {
    @include defineFontMontserrat(400, 14px, 16px);
    position: relative;
    padding-left: 1rem;
    cursor: pointer;
    display: inline-block;

    @media (max-width: 750px) {
      font-size: 13px;
      padding-left: 1.1rem;
    }
  }

  &__checkbox:checked+&__label:before,
  &__checkbox:not(:checked)+&__label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 1px;
    width: 13px;
    height: 13px;
    border: 1px solid $black-inactive;
    background: $white;

    @media (max-width: 750px) {
      top: 2px;
    }
  }

  &__checkbox:checked+&__label:after,
  &__checkbox:not(:checked)+&__label:after {
    content: '';
    position: absolute;
    left: 0;
    top: 1px;
    width: 12px;
    height: 12px;
    background: url('@/assets/img/check.svg') no-repeat center center;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;

    @media (max-width: 750px) {
      top: 2px;
    }
  }

  &__checkbox:not(:checked)+&__label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  &__checkbox:checked+&__label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  &__checkbox:checked+&__label:before {
    border-color: $black;
  }
}

.photo-swiper {
  margin-bottom: 0.5rem;
  padding-top: 10px;

  @media (max-width: 750px) {
    margin-bottom: 0.7rem;
  }

  &__add-slide {
    cursor: pointer;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $grey-light;
    border: 2px dashed $primary;
    border-radius: 15px;

    @media (max-width: 750px) {
      border-radius: 8px;
      height: 100px;
    }
  }

  &__slide-photo {
    cursor: grab;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed $primary;
    border-radius: 15px;
    height: 170px;

    @media (max-width: 750px) {
      border-radius: 8px;
      height: 100px;
    }
  }

  &__delete-btn {
    cursor: pointer;
    width: 10px;
    height: 16px;
    position: absolute;
    top: -9px;
    right: -9px;
    background: $white;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    -khtml-border-radius: 50%;
    border: 1px solid rgba(175, 175, 175, 0.39);

    @media (max-width: 1150px) {
      width: 14px;
    }

    &::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 4px;
      transform: rotate(45deg);
      width: 12px;
      height: 2px;
      background-color: $black;
    }

    &::after {
      content: '';
      position: absolute;
      top: 8px;
      left: 4px;
      transform: rotate(-45deg);
      width: 12px;
      height: 2px;
      background-color: $black;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__text {
    @include defineFontMontserrat(400, 14px, 16px);
    text-align: center;
    padding-bottom: 30px;
    background: url('@/assets/img/add-publication.svg') no-repeat center bottom / 22px 22px;

    @media (max-width: 750px) {
      font-size: 12px;
      margin: 0 5px 0;
      background-size: 19px 19px;
      padding-bottom: 25px;
    }
  }
}

.property {
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 750px) {
    gap: 4px;
    margin-bottom: 0.7rem;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &__label {
    @include defineFontMontserrat(400, 14px, 16px);

    @media (max-width: 750px) {
      font-size: 12px;
      line-height: 1rem;
    }
  }

  &__input {
    @include defineFontMontserrat(400, 14px, 16px);
    outline: none;
    border: none;
    background: $filter-background;
    border-radius: 6px;
    padding: 14px 12px;
    color: $black;

    @media (max-width: 750px) {
      font-size: 12px;
      line-height: 1rem;
      padding: 11px 12px;
    }

    &::placeholder,
    &:disabled {
      color: rgba(0, 0, 0, 0.2);
    }
  }

  &__textarea {
    @include defineFontMontserrat(400, 14px, 16px);
    resize: none;
    outline: none;
    border: none;
    background: $filter-background;
    border-radius: 6px;
    padding: 14px 12px;
    color: $black;

    @media (max-width: 750px) {
      font-size: 12px;
      line-height: 1rem;
      padding: 11px 12px;
    }

    &::placeholder,
    &:disabled {
      color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
