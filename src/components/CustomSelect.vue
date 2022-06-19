<template>
  <div class="custom-select">
    <div class="custom-select__head" @click="toggleList">
      <span class="custom-select__head-text">{{ selectText }}</span
      ><i
        class="custom-select__head-arrow fa-solid fa-chevron-down"
        :class="{ 'custom-select__head-arrow--active': isOpen }"
      ></i>
    </div>
    <ul
      class="custom-select__list"
      :class="{ 'custom-select__list--open': isOpen }"
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
  props: ["listItems", "selected", "focusValue"],
  data() {
    return {
      isOpen: false,
      selectText: this.selected,
    };
  },
  mounted() {
    window.addEventListener("click", (e) => {
      const target = e.target;
      if (!this.$el.contains(target) && this.isOpen === true) {
        console.log("close", this.$el);
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
      this.$emit("select", selectedValue);
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
  font-size: rem(14);
  line-height: 1em;

  &__head {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $c-white;
    cursor: pointer;
  }

  &__head-text {
    display: inline-block;
    margin-right: 8px;
  }

  &__head-arrow {
    font-size: 12px;
    transition: 0.3s transform ease-in-out;
  }

  &__head-arrow--active {
    transform: rotate(180deg);
  }

  &__list {
    position: absolute;
    top: 100%;
    left: 0;
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