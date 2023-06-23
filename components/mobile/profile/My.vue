<template>
  <div class="container">
    <!-- Личный просмотр профиля -->
    <MyMain
      v-if="page === 'main'"
      @change-page="(pageName) => page = pageName"
    />
    <MyPublications
      v-if="page === 'publications'"
      @change-page="(pageName) => page = pageName"
    />
  </div>
</template>

<script>
import { auth } from '@/store/auth';
import { clients } from '@/store/clients';
import MyMain from './MyMain.vue';
import MyPublications from './MyPublications.vue';

export default {
  components: { MyMain, MyPublications },
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
