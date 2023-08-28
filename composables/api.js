import { notifications } from '@/store/notifications';

const config = useRuntimeConfig();
const apiPort = config.public.API_PORT ? `:${config.public.API_PORT}` : '';

export const api = (url, otherOptions = {}) => $fetch(
  `${config.public.API_URL}${apiPort}/api/${url}`,
  {
    retry: 0,
    ...otherOptions,

    // async onResponse({ request, response, options }) {
    //   console.log('[fetch response]')
    // },
    // async onResponseError({ request, response, options }) {
    //   console.log('[fetch response error]')
    // },

    // async onRequest({ request, options }) {
    //   console.log('[fetch request]')
    // },
    // async onRequestError({ request, options, error }) {
    //   console.log('[fetch request error]')
    // },

    onResponseError({ options }) {
      const storeNotifications = notifications();

      storeNotifications.ADD_NOTIFICATION(
        options.errorAlert,
        'Системная ошибка',
        'alert',
      );

      return false;
    },
  },
);
