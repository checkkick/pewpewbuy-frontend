import { api } from '@/composables/api';
import { get } from '@/store/cookies';
import { notifications } from '@/store/notifications';
import { defineStore } from 'pinia';

export const clients = defineStore('clients', {
  state: () => ({
    user: {},
    activeUserProducts: [],
    inactiveUserProducts: [],
  }),

  actions: {
    async GET_SELF() {
      try {
        const response = await api('clients/getself/', {
          method: 'GET',
          errorAlert: 'Ошибка при загрузке данных пользователя',
          headers: { Authorization: `Bearer ${get('access_pew')}` },
        });

        this.user = response;

        this.activeUserProducts = [];
        this.inactiveUserProducts = [];
        this.user.products.forEach((product) => {
          if (product.status === 'AC') {
            this.activeUserProducts.push(product);
          } else {
            this.inactiveUserProducts.push(product);
          }
        });

        return true;
      } catch (error) {
        return false;
      }
    },

    async UPDATE_USER(id, data) {
      try {
        const response = await api(`clients/updateuser/${id}/`, {
          method: 'PATCH',
          body: data,
          errorAlert: 'Ошибка при обновлении данных пользователя',
          headers: {
            Authorization: `Bearer ${get('access_pew')}`,
          },
        });

        Object.keys(response).forEach((key) => {
          this.user[key] = response[key];
        });

        notifications().ADD_NOTIFICATION(
          'Изменение профиля',
          'Профиль успешно изменен',
          'success',
        );

        return true;
      } catch (error) {
        return false;
      }
    },

    async GET_DETAIL_USER(id) {
      const response = await api(`clients/getdetailuser/${id}/`, {
        method: 'GET',
        errorAlert: 'Ошибка при загрузке данных пользователя',
        headers: { Authorization: `Bearer ${get('access_pew')}` },
      });

      return response;
    },
  },

  getters: {
    USER_STATE: (state) => state.user,
    ACTIVE_USER_PRODUCTS: (state) => state.activeUserProducts,
    INACTIVE_USER_PRODUCTS: (state) => state.inactiveUserProducts,
  },
});
