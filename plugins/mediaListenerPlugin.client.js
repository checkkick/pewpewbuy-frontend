import { media } from '@/store/media';

export default defineNuxtPlugin({
  name: 'media-listener-plugin',
  async setup() {
    const mediaStore = media();

    const tabletQueryList = window.matchMedia('(max-width: 1150px)');
    const mobileQueryList = window.matchMedia('(max-width: 768px)');

    tabletQueryList.addEventListener('change', mediaStore.CHANGE_MEDIA_TABLET);
    mediaStore.CHANGE_MEDIA_TABLET(tabletQueryList);

    mobileQueryList.addEventListener('change', mediaStore.CHANGE_MEDIA_MOBILE);
    mediaStore.CHANGE_MEDIA_MOBILE(mobileQueryList);
  },
});
