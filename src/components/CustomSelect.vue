<template>
  <div class="custom-select">
    <div class="custom-select__head" @click="toggleList" tabindex="-1">
      <span
        class="custom-select__head-text"
        :class="{ 'custom-select__head-text--selected': isSelected }"
        >{{ selectText }}</span
      >
      <div
        class="custom-select__head-arrow"
        :class="{ 'custom-select__head-arrow--active': isOpen }"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-down" />
      </div>
    </div>
    <ul
      class="custom-select__list"
      :class="{ 'custom-select__list--open': isOpen }"
      v-show="isOpen"
    >
      <li
        class="custom-select__list-item"
        v-for="item in listItems"
        :key="item.value"
        :value="item.value"
        @click="listItemSelect"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["listItems", "selected", "focusValue", "name"],
  data() {
    return {
      isOpen: false,
      selectText: this.selected,
      isSelected: false,
    };
  },
  mounted() {
    window.addEventListener("click", (e) => {
      const { target } = e;
      if (!this.$el.contains(target) && this.isOpen === true) {
        this.isOpen = false;
      }
    });

    if (this.itemForFocus) {
      this.itemForFocus.setAttribute("tabindex", "-1");
    }
  },

  methods: {
    listItemSelect(e) {
      const selectOption = e.currentTarget;
      const selectedText = selectOption.textContent;
      const selectedValue = selectOption.value;

      this.selectText = selectedText;
      this.isOpen = false;
      this.isSelected = true;
      this.$emit("select", { item: this.name, value: selectedValue });
    },
    setFocusToItem() {
      if (this.itemForFocus) {
        this.itemForFocus.focus();
      }
    },
    toggleList() {
      this.isOpen = !this.isOpen;
      this.setFocusToItem();
    },
  },
  computed: {
    itemForFocus() {
      return document.querySelector(`[value='${this.focusValue}']`) || false;
    },
  },
  watch: {
    selected(newValue) {
      this.selectText = newValue;
    },
  },
};
</script>
<style lang="scss">
.custom-select {
  position: relative;
  font-weight: 500;
  font-size: rem(16);
  line-height: 1em;
  max-width: 300px;
  border-radius: 7px;

  &__head {
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 7px;
    cursor: pointer;
    background-color: #fff;
    outline: none;
    border: 1px solid $c-border;
    transition: border 0.3s ease-out;

    &:focus {
      border: 1px solid $c-primary;
    }
  }

  &__head-text {
    display: inline-block;
    margin-right: 8px;
    color: $c-border;
  }

  &__head-text--selected {
    color: $c-font;
  }

  &__head-arrow {
    font-size: 12px;
    transition: 0.3s transform ease-in-out;
    color: $c-font;
  }

  &__head-arrow--active {
    transform: rotate(180deg);
  }

  &__list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 7px;
    background-color: #fff;
    z-index: -1;
    height: 9em;
    overflow-x: hidden;
    overflow-y: auto;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease-out;
    padding: 13px 0;
    box-shadow: 0px 5px 20px rgba(#000, 0.25);

    &--open {
      z-index: 100;
      opacity: 1;
      transform: translateY(0px);
    }
  }

  &__list-item {
    padding: 12px 16px;
    cursor: pointer;
    color: $c-font;
    background-color: transparent;
    transition: 0.3s background-color ease;

    &:hover {
      background-color: rgba(179, 206, 226, 0.2);
    }
  }
}
</style>