import { defineStore } from 'pinia'
import { api } from '~~/composables/api'
import { get } from '~~/store/cookies'

export const products = defineStore('products', {
  state: () => {
    return {
      allProducts: [],
      favoriteProducts: [],
    }
  },

  actions: {
    async GET_ALL_PRODUCTS() {
      const options = {
        method: 'GET',
        errorAlert: 'при загрузке товара',
      }
      if (get('access_pew')) {
        options.headers = { Authorization: 'Bearer ' + get('access_pew') }
      }
      try {
        const response = await api('products/all/', options)
        this.allProducts = response
      } catch (error) {
        return error.response
      }
    },
    async GET_FILTRED_PRODUCTS(filter) {
      try {
        const response = await api('products/filter/?' + filter, {
          method: 'GET',
          errorAlert: 'при загрузке товара',
        })
        this.allProducts = response.results
      } catch (error) {
        return error.response
      }
    },
    async GET_SEARCHED_PRODUCTS(search) {
      try {
        const response = await api('products/?search=' + search, {
          method: 'GET',
          errorAlert: 'при загрузке товара',
        })
        this.allProducts = response.results
      } catch (error) {
        return error.response
      }
    },
    async GET_CATEGORY_PRODUCTS(category) {
      try {
        const response = await api(
          'products/get_category_products/?slug=' + category,
          {
            method: 'GET',
            errorAlert: 'при загрузке товара',
          }
        )
        this.allProducts = response.results
      } catch (error) {
        return error.response
      }
    },
    async GET_FAVORITE() {
      try {
        const response = await api('products/get_favorite/', {
          method: 'GET',
          errorAlert: 'при загрузке товара',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })
        this.favoriteProducts = response
      } catch (error) {
        return error.response
      }
    },
    async ADD_FAVORITE(product) {
      try {
        return await api('products/create_favorite/', {
          body: { product },
          method: 'POST',
          errorAlert: 'Ошибка. Попробуйте снова',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })
      } catch (error) {
        return error.response.status
      }
    },
    async REMOVE_FAVORITE(product) {
      try {
        return await api('products/delete_favorite/' + product + '/', {
          method: 'DELETE',
          errorAlert: 'Ошибка. Попробуйте снова',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })
      } catch (error) {
        return error.response.status
      }
    },
    async GET_DETAIL_PRODUCT(product) {
      const response = await api('products/detail/' + product + '/', {
        method: 'GET',
        errorAlert: 'Ошибка. Попробуйте снова',
      })

      return response
    },
  },

  getters: {
    ALL_PRODUCTS: state => state.allProducts,
    FAVORITE_PRODUCTS: state => state.favoriteProducts,
  },
})
