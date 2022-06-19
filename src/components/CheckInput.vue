<template>
  <div class="text-input">
    <label class="text-input__label">
      <input
        type="text"
        class="text-input__input"
        v-model="inputValue"
        :class="{
          'text-input__input--error': hasError,
          'text-input__input--success': isSuccess,
        }"
        placeholder="Text"
      />
    </label>
    <div class="text-input__actions action-input">
      <button class="action-input__button" @click="trashClickHandle">
        <i
          class="
            action-input__icon action-input__icon--warning
            fa-solid fa-trash-can
          "
        ></i></button
      ><button class="action-input__button" @click="checkClickHandle">
        <i
          class="
            action-input__icon action-input__icon--success
            fa-solid fa-check
          "
        ></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasError: false,
      isSuccess: false,
      inputValue: "",
    };
  },
  methods: {
    trashClickHandle() {
      this.inputValue = "";
      this.isSuccess = false;
    },
    checkClickHandle() {
      this.isSuccess = true;
    },
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

  &__actions {
    margin-left: 18px;
  }
}

.action-input {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__button {
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 0px 24px rgba(25, 32, 56, 0.08);
    transition: transform 0.3s ease-in;
    cursor: pointer;

    &:not(&:last-child) {
      margin-right: 10px;
    }

    &:hover {
      transform: scale(0.9);
    }
  }

  &__icon {
    font-size: rem(18);
  }

  &__icon--warning {
    color: $c-warning;
  }

  &__icon--success {
    color: $c-success;
  }
}
</style>