<template>
  <div class="rating">
    <svg
      v-for="item in stars"
      :key="item"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75 0.75L10.7706 6.96885H17.3095L12.0194 10.8123L14.0401 17.0312L8.75 13.1877L3.45993 17.0312L5.48056 10.8123L0.190492 6.96885H6.72937L8.75 0.75Z"
        fill="#F8B94E"
      />
    </svg>
    <svg
      v-for="item in 5 - stars"
      :key="item"
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 0.75L11.5206 6.96885H18.0595L12.7694 10.8123L14.7901 17.0312L9.5 13.1877L4.20993 17.0312L6.23056 10.8123L0.940492 6.96885H7.47937L9.5 0.75Z"
        fill="#D9D9D9"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    stars: {
      type: Number,
      required: true,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.rating {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1px;

  @media (max-width: 1150px) {
    & svg {
      width: 14px;
      height: 14px;
    }
  }

  @media (max-width: 750px) {
    & svg {
      width: 15px;
      height: 15px;
    }
  }
}
</style>
