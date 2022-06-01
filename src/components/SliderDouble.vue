<template>
  <div
    class="slider-double"
    ref="sliderBlock"
    @mouseleave="toggleUp"
    @click="lineClick"
  >
    <button
      class="slider-double__toggle slider-double__toggle-prev"
      :class="{ 'slider__toggle--pressed': isPressed.prev }"
      ref="togglePrev"
      @mousedown="toggleDown"
      @mouseup="toggleUp"
    ></button>
    <span
      class="slider-double__line slider-double__underline"
      ref="underline"
    ></span>
    <span class="slider-double__line"></span>
    <button
      class="slider-double__toggle slider-double__toggle-next"
      :class="{ 'slider__toggle--pressed': isPressed.next }"
      ref="toggleNext"
      @mousedown="toggleDown"
      @mouseup="toggleUp"
    ></button>
  </div>
</template>
<script>
export default {
  props: ["minValue", "maxValue"],
  data() {
    return {
      isPressed: {
        prev: false,
        next: false,
      },
      currentToggle: null,
      currentValue: 0,
      percent: 0,
      underlineCoords: {
        left: 0,
        right: 0,
      },
    };
  },
  methods: {
    toggleDown(e) {
      console.log("Is pressed");
      this.currentToggle = e.target;

      if (this.currentToggle === this.$refs.toggleNext) {
        this.isPressed.next = true;
      } else {
        this.isPressed.prev = true;
      }

      document.addEventListener("mousemove", this.mouseMove);
    },
    toggleUp() {
      if (this.isPressed.prev === false && this.isPressed.next === false) {
        return;
      }

      console.log("Is down");

      this.isPressed.prev = false;
      this.isPressed.next = false;

      document.removeEventListener("mousemove", this.mouseMove);
      this.calculateValue();
      this.$emit("change", this.currentValue);
    },
    mouseMove(e) {
      const moveX = e.x;

      this.calculateTogglePos(moveX);
    },
    lineClick(e) {
      const { target } = e;
      if (
        this.$refs.toggleNext === target ||
        this.$refs.togglePrev === target
      ) {
        return;
      }

      this.mouseMove(e);
      this.calculateValue();
      this.$emit("change", this.currentValue);
    },
    calculateTogglePos(moveX) {
      const sliderX = this.$refs.sliderBlock.getBoundingClientRect().x;
      const sliderWidth = this.$refs.sliderBlock.getBoundingClientRect().width;
      let togglePrevPosX = moveX - sliderX;
      let toggleNextPosX = sliderWidth - (moveX - sliderX);
      let toggleStyleRule = "";

      function validateToggleCoords(coords /* coordsAny */) {
        let togglePos = coords;
        // const toggleAny = coordsAny;
        // const toggleDiff = toggleAny - togglePos - 15;

        if (togglePos > sliderWidth) {
          togglePos = sliderWidth;
        } else if (togglePos < 0) {
          togglePos = 0;
        }
        // else if (toggleDiff <= 0) {
        //   return toggleAny - 15;
        // }

        return togglePos;
      }
      togglePrevPosX = validateToggleCoords(togglePrevPosX, toggleNextPosX);
      toggleNextPosX = validateToggleCoords(toggleNextPosX, togglePrevPosX);

      // const test = toggleNextPosX - togglePrevPosX - 15;

      // if (test <= 0) {
      //   console.log("EQ");
      // }

      if (this.currentToggle === this.$refs.toggleNext) {
        toggleStyleRule = `right: ${toggleNextPosX}px;`;
        this.underlineCoords.right = toggleNextPosX;
      } else {
        toggleStyleRule = `left: ${togglePrevPosX}px;`;
        this.underlineCoords.left = togglePrevPosX;
      }

      this.currentToggle.setAttribute("style", toggleStyleRule);
      this.$refs.underline.setAttribute(
        "style",
        `left: ${this.underlineCoords.left}px; right: ${this.underlineCoords.right}px;`
      );

      this.percent = Math.round((togglePrevPosX / sliderWidth) * 100);
      console.log("Is moveing");
    },
    calculateValue() {
      const diffMinMaxValue = this.maxValue - this.minValue;
      const calcValue = (diffMinMaxValue / 100) * this.percent;
      this.currentValue = Number(this.minValue) + calcValue;
    },
  },
  computed: {
    // classOfPressed() {
    //   return {
    //     "slider__toggle--pressed": this.isPressed.prev || this.isPressed.next,
    //   };
    // },
  },
};
</script>
<style lang="scss">
.slider-double {
  position: relative;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: 100%;

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
      transform: scale3d(1.5, 1.5, 1);
    }
  }

  &__toggle-prev {
    z-index: 20;
  }
}
</style>
