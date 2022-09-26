import { defineStore } from 'pinia'
import { api } from '~~/composables/api'

export const products = defineStore('authorization', {
  state: () => {
    return {

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
  },

  getters: {

  }
})
