import { defineStore } from 'pinia'
import { notifications } from '@/store/notifications'
import { api } from '@/composables/api'
import { get } from '@/store/cookies'

function filterCategories(allCategories) {
  const tempCategories = {}

  for (const iterator of allCategories) {
    if (
      iterator.parent_category &&
      tempCategories[iterator.parent_category.name]
    ) {
      tempCategories[iterator.parent_category.name].push(iterator)
    } else {
      tempCategories[iterator.name] = []
    }
  }

  return tempCategories
}

export const products = defineStore('products', {
  state: () => {
    return {
      allProducts: [],
      favoriteProducts: [],
      categories: {},
    }
  },

  actions: {
    async CREATE_PRODUCT(data) {
      try {
        await api('products/create_product/', {
          body: data,
          method: 'POST',
          errorAlert: 'Ошибка при добавлении товара',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })

        notifications().ADD_NOTIFICATION(
          'Добавление карточки товара',
          'Карточка товара добавлена и отправлена на модерацию',
          'success'
        )

        return true
      } catch (error) {
        return false
      }
    },

    async REMOVE_PRODUCT(productId) {
      try {
        await api('products/delete_product/' + productId + '/', {
          method: 'DELETE',
          errorAlert: 'Ошибка при удалении товара',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })

        notifications().ADD_NOTIFICATION(
          'Удаление карточки товара',
          'Карточка товара успешно удалена',
          'delete'
        )

        return true
      } catch (error) {
        return false
      }
    },

    async UPDATE_PRODUCT(productId, data) {
      try {
        await api('products/update_product/' + productId + '/', {
          body: data,
          method: 'PATCH',
          errorAlert: 'Ошибка при обновлении товара',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })

        notifications().ADD_NOTIFICATION(
          'Изменение карточки товара',
          'Изменения успешно внесены',
          'edit'
        )

        return true
      } catch (error) {
        return false
      }
    },

    async GET_FILTRED_PRODUCTS(filter) {
      const response = await api('products/filter/?' + filter, {
        method: 'GET',
        errorAlert: 'Ошибка при фильтрации',
      })
      this.allProducts = response.results

      return response
    },

    async GET_SEARCHED_PRODUCTS(search) {
      const response = await api('products/?search=' + search, {
        method: 'GET',
        errorAlert: 'Ошибка при поиске товара',
      })
      this.allProducts = response.results

      return response
    },

    async GET_CATEGORY_PRODUCTS(category) {
      const options = {
        method: 'GET',
        errorAlert: 'Ошибка при загрузке отфильтрованных товаров',
      }

      const access = get('access_pew')

      if (access) {
        options.headers = { Authorization: 'Bearer ' + access }
      }

      const response = await api(
        'products/get_category_products/?slug=' + category,
        options
      )
      this.allProducts = response.results

      return response
    },

    async GET_FAVORITE() {
      const response = await api('products/get_favorite/', {
        method: 'GET',
        errorAlert: 'Ошибка при загрузке избранных товаров',
        headers: { Authorization: 'Bearer ' + get('access_pew') },
      })

      this.favoriteProducts = response

      return response
    },

    async ADD_FAVORITE(product) {
      try {
        await api('products/create_favorite/', {
          body: { product },
          method: 'POST',
          errorAlert: 'Ошибка при добавлении товара в избранное',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })

        notifications().ADD_NOTIFICATION(
          'Добавление товара в избранное',
          'Товар успешно добавлен в избранное',
          'success'
        )

        return true
      } catch (error) {
        return false
      }
    },

    async REMOVE_FAVORITE(product) {
      try {
        await api('products/delete_favorite/' + product + '/', {
          method: 'DELETE',
          errorAlert: 'Ошибка при удалении товара из избранного',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        })

        notifications().ADD_NOTIFICATION(
          'Удаление товара из избранного',
          'Товар успешно удален из избранного',
          'delete'
        )

        return true
      } catch (error) {
        return false
      }
    },

    async GET_ALL_PRODUCTS() {
      const options = {
        method: 'GET',
        errorAlert: 'Ошибка при загрузке товаров',
      }

      const access = get('access_pew')

      if (access) {
        options.headers = { Authorization: 'Bearer ' + access }
      }

      const response = await api('products/all/', options)
      this.allProducts = response.results

      return response
    },

    async GET_DETAIL_PRODUCT(product) {
      const response = await api('products/detail/' + product + '/', {
        method: 'GET',
        errorAlert: 'Ошибка при загрузке подробной информации о продукте',
        headers: { Authorization: 'Bearer ' + get('access_pew') },
      })

      return response
    },

    async GET_ASSET_TEMPLATE(categoryId) {
      const response = await api(
        'products/get_asset_template/' + categoryId + '/',
        {
          method: 'GET',
          errorAlert: 'Ошибка при загрузке шаблонов',
          headers: { Authorization: 'Bearer ' + get('access_pew') },
        }
      )

      return response
    },

    async GET_CATEGORIES_ALL() {
      const response = await api('products/get_categories/', {
        method: 'GET',
        errorAlert: 'Ошибка при загрузке категорий',
      })

      this.categories = filterCategories(response)

      return this.categories
    },
  },

  getters: {
    ALL_PRODUCTS: state => state.allProducts,
    FAVORITE_PRODUCTS: state => state.favoriteProducts,
  },
})
