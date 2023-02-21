<template>
  <ul
    v-if="notificationsStore.ALL_NOTIFICATIONS.length > 0"
    class="notification"
  >
    <li
      v-for="item in notificationsStore.ALL_NOTIFICATIONS"
      :key="item.id"
      class="notification__item"
      :class="'notification__item--' + item.type"
    >
      <h4 class="notification__title">
        {{ item.title }}
      </h4>
      <p class="notification__text">
        {{ item.text }}
      </p>
      <button
        class="notification__close"
        @click="notificationsStore.DELETE_NOTIFICATION(item.id)"
      />
    </li>
  </ul>
</template>

<script setup>
import { notifications } from '@/store/notifications';

const notificationsStore = notifications();
</script>

<style lang="scss" scoped>
.notification {
  overflow: auto;
  padding: 15px 0 0 15px;
  max-height: 60vh;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 0;
  position: fixed;
  top: 25%;
  right: 0;

  &__item {
    max-width: 500px;
    position: relative;
    border: 1px solid $filter-border;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 20px 30px 20px 90px;

    &.notification__item--alert {
      background: url('@/assets/img/notification-alert.svg') no-repeat 37px center / 42px 38px,
        $white;
    }

    &.notification__item--success {
      background: url('@/assets/img/notification-success.svg') no-repeat 37px center / 42px 38px,
        $white;
    }

    &.notification__item--edit {
      background: url('@/assets/img/notification-edit.svg') no-repeat 37px center / 42px 38px,
        $white;
    }

    &.notification__item--delete {
      background: url('@/assets/img/notification-delete.svg') no-repeat 37px center / 42px 38px,
        $white;
    }
  }

  &__close {
    cursor: pointer;
    position: absolute;
    top: -12px;
    left: -12px;
    border-radius: 100%;
    width: 32px;
    height: 32px;
    background-color: $white;
    border: 1px solid $filter-border;

    &::before {
      content: '';
      position: absolute;
      top: 14px;
      left: 7px;
      width: 16px;
      height: 2px;
      background-color: $black;
      transform: rotate(45deg);
    }

    &::after {
      content: '';
      position: absolute;
      top: 14px;
      left: 7px;
      width: 16px;
      height: 2px;
      background-color: $black;
      transform: rotate(-45deg);
    }
  }

  &__title {
    @include defineFontMontserrat(600, 16px, 20px);
    margin-bottom: 8px;
  }

  &__text {
    @include defineFontMontserrat(400, 15px, 18px);
  }
}
</style>
