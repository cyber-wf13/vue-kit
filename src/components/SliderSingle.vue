<template>
  <div
    class="slider"
    ref="sliderBlock"
    :style="{ width: `${sliderWidth}px` }"
    @mouseleave="toggleUp"
    @click="lineClick"
  >
    <span class="slider__line slider__underline" ref="underline"></span>
    <span class="slider__line"></span>
    <button
      class="slider__toggle"
      :class="classOfPressed"
      ref="toggle"
      @mousedown="toggleDown"
      @mouseup="toggleUp"
    ></button>
  </div>
</template>
<script>
export default {
  props: ["minValue", "maxValue", "name", "sliderWidth"],
  data() {
    return {
      isPressed: false,
      currentValue: 0,
      percent: 0,
    };
  },
  methods: {
    toggleDown() {
      this.isPressed = true;
      document.addEventListener("mousemove", this.mouseMove);
    },
    toggleUp() {
      if (this.isPressed === false) {
        return;
      }

      this.isPressed = false;
      document.removeEventListener("mousemove", this.mouseMove);
      this.calculateValue();
      this.$emit("move", { item: this.name, value: this.currentValue });
    },
    mouseMove(e) {
      const moveX = e.x;

      this.calculateTogglePos(moveX);
    },
    lineClick(e) {
      const { target } = e;
      if (this.$refs.toggle === target) {
        return;
      }

      this.mouseMove(e);
      this.calculateValue();
      this.$emit("move", { item: this.name, value: this.currentValue });
    },
    calculateTogglePos(moveX) {
      const sliderX = this.$refs.sliderBlock.getBoundingClientRect().x;
      const sliderWidth = this.$refs.sliderBlock.getBoundingClientRect().width;
      let togglePosX = moveX - sliderX;

      if (togglePosX > sliderWidth) {
        togglePosX = sliderWidth;
      } else if (togglePosX < 0) {
        togglePosX = 0;
      }

      this.$refs.toggle.setAttribute("style", `left: ${togglePosX}px;`);
      this.$refs.underline.setAttribute("style", `width: ${togglePosX}px;`);

      this.percent = Math.round((togglePosX / sliderWidth) * 100);
    },
    calculateValue() {
      const diffMinMaxValue = this.maxValue - this.minValue;
      const calcValue = (diffMinMaxValue / 100) * this.percent;
      this.currentValue = Number(this.minValue) + calcValue;
    },
  },
  computed: {
    classOfPressed() {
      return {
        "slider__toggle--pressed": this.isPressed,
      };
    },
  },
};
</script>
<style lang="scss">
.slider {
  position: relative;
  background-color: transparent;
  display: flex;
  align-items: center;
  z-index: 1;

  @media (max-width: (575.98px - 0.02)) {
    width: 200px;
  }

  &__line {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    height: 1px;
    border-radius: 3px;
    background-color: $c-border;
    z-index: 5;
  }

  &__underline {
    width: 0;
    z-index: 3;
    background-color: $c-primary;
  }

  &__toggle {
    position: relative;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #fff;
    border: none;
    box-shadow: 0 1px 13px 0 rgba(#000, 0.2);
    cursor: pointer;
    outline: none;
    z-index: 10;
    transition: transform 0.3s ease;

    &--pressed {
      transform: scale(1.5);
    }
  }
}
</style>
