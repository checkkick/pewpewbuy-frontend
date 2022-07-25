import { defineStore } from 'pinia'
import { api } from '~~/composables/api'

export const products = defineStore('products', {
  state: () => {
    return {
      allProducts: [],
    }
  },

  actions: {
    async GET_ALL_PRODUCTS() {
      try {
        const response = await api('products/all/', {
          method: 'GET',
          errorAlert: 'при загрузке товара',
        })
        this.allProducts = response.results
      } catch (error) {
        return error.response
      }
    },
  },

  getters: {
    ALL_PRODUCTS: state => state.allProducts,
  },
})
