<template>
  <label class="radiocheck" :class="classOfToggle" :for="id">
    <input
      class="radiocheck__input _visually-hidden"
      :type="type"
      :name="name"
      :id="id"
      :value="value"
      :disabled="$attrs.disabled"
      @change="changeInputHandle"
    />
    <slot>{{ type }}</slot>
    <span class="radiocheck__icon" :class="classOfType">
      <font-awesome-icon v-if="toggle == false" :icon="classOfIcon" />
    </span>
  </label>
</template>
<script>
export default {
  props: {
    value: {},
    type: {},
    name: {},
    toggle: {
      type: Boolean,
      default: false,
    },
  },
  name: "RadioCheck",
  inheritAttrs: false,
  data() {
    return {
      id: Math.random().toString(36).substr(2, 10),
    };
  },
  methods: {
    changeInputHandle(e) {
      const inputValue = e.currentTarget.value;
      const inputName = this.name;

      this.$emit("change", { value: inputValue, item: inputName });
    },
  },
  computed: {
    classOfType() {
      return {
        "radiocheck__icon-circle": this.type === "radio",
        "radiocheck__icon-box": this.type === "checkbox",
      };
    },
    classOfToggle() {
      return {
        radiocheck: this.toggle === false,
        toggle: this.toggle === true,
      };
    },
    classOfIcon() {
      if (this.type === "radio") {
        return "fa-solid fa-circle";
      }
      return "fa-solid fa-check";
    },
  },
};
</script>
<style lang="scss">
.radiocheck {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;

  &__input:checked + &__icon-box {
    background-color: $c-primary;
    border: 1px solid $c-primary;
    color: #fff;
  }

  &__input:checked + &__icon-circle {
    border: 1px solid $c-primary;
    color: $c-primary;
  }

  &__input:disabled + &__icon-box {
    background-color: $c-border;
    border: 1px solid $c-border;
    color: #fff;
  }

  &__input:disabled + &__icon-circle {
    border: 1px solid $c-border;
    color: $c-border;
  }

  &__icon {
    height: 30px;
    width: 30px;
    border: 1px solid $c-border;
    border-radius: 4px;
    background-color: #fff;
    margin-right: 10px;
    transition: all 0.4s ease-out;
    text-align: center;
    font-size: rem(18);
    padding: rem(4);
    color: transparent;
  }

  &__icon-box {
    border-radius: 4px;
  }

  &__icon-circle {
    border-radius: 50%;
  }
}

.toggle {
  .radiocheck__input:checked + .radiocheck__icon {
    background-color: $c-primary;
    border: none;
  }

  .radiocheck__input:checked + .radiocheck__icon::before {
    left: 50%;
  }

  .radiocheck__input:disabled + .radiocheck__icon {
    border: none;
    color: $c-border;
  }

  .radiocheck__icon {
    position: relative;
    height: 28px;
    width: 53px;
    border-radius: 15.5px;
    border: none;
    background-color: #d1d5db;
    margin-right: 10px;
    transition: all 0.4s ease-out;
    font-size: 0;
    padding: rem(2);

    &::before {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      height: 24px;
      width: 24px;
      background-color: #fff;
      border-radius: 50%;
      transition: left 0.4s ease-out;
    }
  }
}
</style>
