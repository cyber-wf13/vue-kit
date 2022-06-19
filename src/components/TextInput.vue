<template>
  <label class="text-input">
    <input
      type="text"
      class="text-input__input"
      :class="{
        'text-input__input--error': hasError && withStatus,
        'text-input__input--success': (isSuccess = !hasError) && withStatus,
      }"
      placeholder="Text"
    />
    <div
      class="text-input__status-field status-field"
      :class="{
        'status-field--error': hasError,
        'status-field--success': (isSuccess = !hasError),
      }"
      v-if="withStatus"
    >
      <i
        class="fa-solid status-field__icon"
        :class="{
          'fa-triangle-exclamation': hasError,
          'fa-circle-check': (isSuccess = !hasError),
        }"
      ></i
      ><span class="status-field__descr">Status message</span>
    </div>
  </label>
</template>
<script>
export default {
  props: {
    withStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasError: false,
      isSuccess: false,
    };
  },
};
</script>
<style lang="scss">
.text-input {
  display: flex;
  align-items: center;

  &__input {
    height: 45px;
    width: 300px;
    border: 1px solid $c-border;
    border-radius: 7px;
    padding: 10px 10px 10px 16px;
    font-weight: 400;
    font-size: 1rem;
    line-height: rem(24);
    color: $c-font;
    background: #fff;
    transition: 0.3s all ease-out;
    outline: none;
    cursor: pointer;

    &:focus {
      border: 1px solid $c-primary;
      background: rgba(160, 195, 255, 0.2);
    }

    &:hover {
      border: 1px solid $c-primary;
      background: rgba(160, 195, 255, 0.1);
    }
  }

  &__input--error {
    border: 1px solid $c-warning;
  }

  &__input--success {
    border: 1px solid $c-success;
  }

  &__status-field {
    margin-left: 18px;
  }
}

.status-field {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  line-height: rem(20);
  color: $c-font;

  &__icon {
    display: inline-block;
    font-size: rem(20);
    margin-right: 8px;
  }

  &--error {
    color: $c-warning;
  }

  &--success {
    color: $c-success;
  }
}
</style>