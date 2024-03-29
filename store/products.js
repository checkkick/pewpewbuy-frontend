import { defineStore } from 'pinia';
import { notifications } from '@/store/notifications';
import { api } from '@/composables/api';
import { get } from '@/store/cookies';
import { clients } from './clients';

export const products = defineStore('products', {
  state: () => ({
    allProducts: [],
    categories: {},
  }),

  actions: {
    async CREATE_PRODUCT(data) {
      try {
        await api('products/create_product/', {
          body: data,
          method: 'POST',
          errorAlert: 'Ошибка при добавлении товара',
          headers: { Authorization: `Bearer ${get('access_pew')}` },
        });

        notifications().ADD_NOTIFICATION(
          'Добавление карточки товара',
          'Карточка товара добавлена и отправлена на модерацию',
          'success',
        );

        return true;
      } catch (error) {
        return false;
      }
    },

    async REMOVE_PRODUCT(productId) {
      try {
        await api(`products/delete_product/${productId}/`, {
          method: 'DELETE',
          errorAlert: 'Ошибка при удалении товара',
          headers: { Authorization: `Bearer ${get('access_pew')}` },
        });

        notifications().ADD_NOTIFICATION(
          'Удаление карточки товара',
          'Карточка товара успешно удалена',
          'delete',
        );

        return true;
      } catch (error) {
        return false;
      }
    },

    async UPDATE_PRODUCT(productId, data) {
      try {
        await api(`products/update_product/${productId}/`, {
          body: data,
          method: 'PATCH',
          errorAlert: 'Ошибка при обновлении товара',
          headers: { Authorization: `Bearer ${get('access_pew')}` },
        });

        notifications().ADD_NOTIFICATION(
          'Изменение карточки товара',
          'Изменения успешно внесены',
          'edit',
        );

        return true;
      } catch (error) {
        return false;
      }
    },

    async ADD_PHOTO(data) {
      try {
        const response = await api('products/add_photo/', {
          body: data,
          method: 'POST',
          errorAlert: 'Ошибка при добавлении фотографии',
          headers: { Authorization: `Bearer ${get('access_pew')}` },
        });

        notifications().ADD_NOTIFICATION(
          'Добавление фотографии',
          'Фотография успешно добавлена',
          'success',
        );

        return response;
      } catch (error) {
        return false;
      }
    },

    async REMOVE_PHOTO(photoId) {
      try {
        await api(`products/delete_photo/${photoId}/`, {
          method: 'DELETE',
          errorAlert: 'Ошибка при удалении фотографии',
          headers: { Authorization: `Bearer ${get('access_pew')}` },
        });

        notifications().ADD_NOTIFICATION(
          'Удаление фотографии',
          'Фотография успешно удалена',
          'delete',
        );

        return true;
      } catch (error) {
        return false;
      }
    },

    async GET_FILTRED_PRODUCTS(filter) {
      const response = await api(`products/filter/?${filter}`, {
        method: 'GET',
        errorAlert: 'Ошибка при фильтрации',
      });
      this.allProducts = response.results;

      return response;
    },

    async GET_SEARCHED_PRODUCTS(search) {
      const response = await api(`products/?search=${search}`, {
        method: 'GET',
        errorAlert: 'Ошибка при поиске товара',
      });
      this.allProducts = response.results;

      return response;
    },

    async GET_CATEGORY_PRODUCTS(category) {
      const options = {
        method: 'GET',
        errorAlert: 'Ошибка при загрузке отфильтрованных товаров',
      };

      const access = get('access_pew');

      if (access) {
        options.headers = { Authorization: `Bearer ${access}` };
      }

      const response = await api(
        `products/get_category_products/?slug=${category}`,
        options,
      );
      this.allProducts = response.results;

      return response;
    },

    async ADD_FAVORITE(product) {
      try {
        await api('products/create_favorite/', {
          body: { product },
          method: 'POST',
          errorAlert: 'Ошибка при добавлении товара в избранное',
          headers: { Authorization: `Bearer ${get('access_pew')}` },
        });

        notifications().ADD_NOTIFICATION(
          'Добавление товара в избранное',
          'Товар успешно добавлен в избранное',
          'success',
        );

        await clients().GET_SELF();

        return true;
      } catch (error) {
        return false;
      }
    },

    async REMOVE_FAVORITE(product) {
      try {
        await api(`products/delete_favorite/${product}/`, {
          method: 'DELETE',
          errorAlert: 'Ошибка при удалении товара из избранного',
          headers: { Authorization: `Bearer ${get('access_pew')}` },
        });

        notifications().ADD_NOTIFICATION(
          'Удаление товара из избранного',
          'Товар успешно удален из избранного',
          'delete',
        );

        await clients().GET_SELF();

        return true;
      } catch (error) {
        return false;
      }
    },

    async GET_ALL_PRODUCTS() {
      const options = {
        method: 'GET',
        errorAlert: 'Ошибка при загрузке товаров',
      };

      const access = get('access_pew');

      if (access) {
        options.headers = { Authorization: `Bearer ${access}` };
      }

      const response = await api('products/all/', options);
      this.allProducts = response.results;

      return response;
    },

    async GET_DETAIL_PRODUCT(product) {
      const response = await api(`products/detail/${product}/`, {
        method: 'GET',
        errorAlert: 'Ошибка при загрузке подробной информации о продукте',
        headers: { Authorization: `Bearer ${get('access_pew')}` },
      });

      return response;
    },

    async GET_ASSET_TEMPLATE(categoryId) {
      const response = await api(
        `products/get_asset_template/${categoryId}/`,
        {
          method: 'GET',
          errorAlert: 'Ошибка при загрузке шаблонов',
          headers: { Authorization: `Bearer ${get('access_pew')}` },
        },
      );

      return response;
    },

    async GET_CATEGORIES_ALL() {
      const response = await api('products/get_categories/', {
        method: 'GET',
        errorAlert: 'Ошибка при загрузке категорий',
      });

      this.categories = response;

      return this.categories;
    },
  },

  getters: {
    ALL_PRODUCTS: (state) => state.allProducts,
  },
});
