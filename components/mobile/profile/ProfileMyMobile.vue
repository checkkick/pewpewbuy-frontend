<template>
  <div class="container">
    <!-- Личный просмотр профиля -->
    <MyMainPage v-if="page === 'main'" />
  </div>
</template>

<script>
import { auth } from '@/store/auth';
import { clients } from '@/store/clients';
import MyMainPage from './MyMainPage.vue';

export default {
  components: { MyMainPage },
  setup() {
    const authStore = auth();
    const clientsStore = clients();

    return {
      authStore,
      clientsStore,
      authorized: computed(() => authStore.AUTHORIZED),
      user: computed(() => clientsStore.USER_STATE),
    };
  },
  data() {
    return {
      page: 'main',
    };
  },
  async mounted() {
    await this.authStore.CHECK_AUTH();

    if (this.authorized && Object.keys(this.user).length > 0) {
      await this.clientsStore.GET_SELF();
    }

    if (Object.hasOwn(this.$route.query, 'favorites')) {
      // document.getElementById('favorites').scrollIntoView();
    }

    if (Object.hasOwn(this.$route.query, 'addproduct')) {
      // this.showAddProductModal = true;
    }
  },
};
</script>

<style lang="scss" scoped></style>
