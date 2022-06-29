<template>
  <div class="custom-select">
    <div class="custom-select__head" @click="toggleList" tabindex="-1">
      <span class="custom-select__head-text">{{ selectText }}</span>
      <div
        class="custom-select__head-arrow"
        :class="{ 'custom-select__head-arrow--active': isOpen }"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-down" />
      </div>
    </div>
    <ul
      class="custom-select__list list-multi"
      :class="{ 'custom-select__list--open': isOpen }"
      v-show="isOpen"
    >
      <li
        class="custom-select__list-item list-multi__item"
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
      checkedItems: [],
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
      const selectedValue = selectOption.value;
      const idxItem = this.checkedItems.indexOf(selectedValue);

      if (idxItem === -1) {
        this.checkedItems.push(selectedValue);
        selectOption.classList.add("list-multi__item--checked");
      } else {
        this.checkedItems.splice(idxItem, 1);
        selectOption.classList.remove("list-multi__item--checked");
      }
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
    isOpen(open) {
      if (open === false) {
        this.$emit("select", { item: this.name, value: this.checkedItems });
      }
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

.list-multi {
  &__item {
    position: relative;
    padding: 12px 16px 12px 40px;
  }

  &__item::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    height: 14px;
    width: 14px;
    border: 2px solid $c-dark;
    border-radius: 2px;
    background-color: $c-white;
    text-align: center;
    color: transparent;
    transition: all 0.2s ease-in;
  }

  &__item--checked::before {
    border: 2px solid $c-primary;
    background-color: $c-primary;
    color: $c-white;
  }
}
</style>