import { defineStore } from 'pinia'
import { api } from '~~/composables/api'

export const products = defineStore('products', {
  state: () => {
    return {
      allProducts: []
    }
  },

  actions: {
    async GET_ALL_PRODUCTS() {
      try {
        const response = await api('products/all/', {
          method: 'GET',
          errorAlert: 'при загрузке товара'
        })
        this.allProducts = response.results
      } catch (error) {
        return error.response
      }
    },
    async GET_FILTRED_PRODUCTS(filter) {
      try {
        const response = await api('products/filter/?' + filter, {
          method: 'GET',
          errorAlert: 'при загрузке товара'
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
          errorAlert: 'при загрузке товара'
        })
        this.allProducts = response.results
      } catch (error) {
        return error.response
      }
    },
    async GET_CATEGORY_PRODUCTS(category) {
      try {
        const response = await api('products/get_category_products/?slug=' + category, {
          method: 'GET',
          errorAlert: 'при загрузке товара'
        })
        this.allProducts = response.results
      } catch (error) {
        return error.response
      }
    }
  },

  getters: {
    ALL_PRODUCTS: state => state.allProducts
  }
})
