<template>
  <div class="custom-select">
    <div class="custom-select__head" @click="isOpen = !isOpen">
      <span class="custom-select__head-text">{{ selectText }}</span
      ><i
        class="custom-select__head-arrow fa-solid fa-chevron-down"
        :class="{ 'custom-select__head-arrow--active': isOpen }"
      ></i>
    </div>
    <transition name="slide-fade">
      <ul class="custom-select__list" v-show="isOpen">
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
    </transition>
  </div>
</template>
<script>
export default {
  props: ["listItems", "selected"],
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
    z-index: 100;
    height: 9em;
    overflow-x: hidden;
    overflow-y: auto;
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>