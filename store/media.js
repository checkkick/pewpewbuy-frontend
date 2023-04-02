import { defineStore } from 'pinia';

export const media = defineStore('media', {
  state: () => ({
    mobile: false,
  }),

  actions: {
    CHANGE_MEDIA(mediaQuery) {
      if (mediaQuery.matches) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    },
  },

  getters: {
    MEDIA_MOBILE: (state) => state.mobile,
  },
});
