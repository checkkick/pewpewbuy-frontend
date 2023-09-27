<template>
  <div class="rating">
    <svg
      v-for="item in 5"
      :key="item"
      :class="{ 'star-active': item <= tempStars }"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @mouseenter="tempStars = item"
      @mouseleave="tempStars = stars"
      @click="chooseStars(item)"
    >
      <path
        d="M8.75 0.75L10.7706 6.96885H17.3095L12.0194 10.8123L14.0401 17.0312L8.75 13.1877L3.45993 17.0312L5.48056 10.8123L0.190492 6.96885H6.72937L8.75 0.75Z"
        fill="#D9D9D9"
      />
    </svg>
  </div>
</template>

<script>
export default {
  emits: ['chooseStars'],
  data: () => ({
    stars: 0,
    tempStars: 0,
  }),
  methods: {
    chooseStars(count) {
      this.stars = count;
      this.tempStars = this.stars;
      this.$emit('chooseStars', this.stars);
    },
  },
};
</script>

<style lang="scss" scoped>
.rating {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
  margin-bottom: 18px;

  & svg {
    cursor: pointer;
  }
}

.star-active path {
  fill: #F8B94E;
}
</style>
