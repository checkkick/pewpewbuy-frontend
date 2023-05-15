import { defineStore } from 'pinia';

export const media = defineStore('media', {
  state: () => ({
    tablet: false,
    mobile: false,
  }),

  actions: {
    CHANGE_MEDIA_TABLET(mediaQuery) {
      if (mediaQuery.matches) {
        this.tablet = true;
      } else {
        this.tablet = false;
      }
    },
    CHANGE_MEDIA_MOBILE(mediaQuery) {
      if (mediaQuery.matches) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    },
  },

  getters: {
    MEDIA_TABLET: (state) => state.tablet,
    MEDIA_MOBILE: (state) => state.mobile,
  },
});
