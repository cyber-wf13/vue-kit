<template>
  <div
    class="slider-double"
    ref="sliderBlock"
    @mouseleave="isLeave = true"
    @mouseenter="isLeave = false"
    @click="lineClick"
  >
    <slider-toggle
      :slider-width="sliderParams.width"
      :leave="isLeave"
      :toggle-x="rightX"
      position="left"
      @move="toggleMove"
    ></slider-toggle>
    <span
      class="slider-double__line slider-double__underline"
      ref="underline"
    ></span>
    <span class="slider-double__line"></span>
    <slider-toggle
      :slider-width="sliderParams.width"
      :leave="isLeave"
      :toggle-x="leftX"
      position="right"
      @move="toggleMove"
    ></slider-toggle>
  </div>
</template>
<script>
import SliderToggle from "./SliderDoubleToggle.vue";

export default {
  props: ["minValue", "maxValue"],
  data() {
    return {
      isLeave: false,
      sliderParams: {
        width: 0,
      },
      percent: {
        min: null,
        max: null,
      },
      rangeValue: {
        min: Number(this.minValue),
        max: Number(this.maxValue),
      },
      underlineCoords: {
        left: 0,
        right: 0,
      },
      leftX: 0,
      rightX: 0,
    };
  },
  components: { SliderToggle },
  mounted() {
    this.sliderParams.width =
      this.$refs.sliderBlock.getBoundingClientRect().width;
    this.rightX = this.sliderParams.width;
  },
  methods: {
    toggleMove(toggleParams) {
      if (toggleParams.tag === "left") {
        this.leftX = toggleParams.x;
        this.underlineCoords.left = this.leftX;
        this.percent.min = this.calculatePercent(this.leftX);
        this.rangeValue.min = this.calculateValue(this.percent.min);
      } else if (toggleParams.tag === "right") {
        this.rightX = toggleParams.x;
        this.underlineCoords.right = this.sliderParams.width - this.rightX;
        this.percent.max = this.calculatePercent(this.rightX);
        this.rangeValue.max = this.calculateValue(this.percent.max);
      }

      this.$refs.underline.setAttribute(
        "style",
        `left: ${this.underlineCoords.left}px; right: ${this.underlineCoords.right}px;`
      );
      this.$emit("change", this.rangeValue);
    },
    calculatePercent(value) {
      return Math.round((value / this.sliderParams.width) * 100);
    },
    calculateValue(percent) {
      const value =
        Number(this.minValue) + (this.diffMinMaxValue / 100) * percent;
      return Math.round(value);
    },
  },
  computed: {
    diffMinMaxValue() {
      return this.maxValue - this.minValue;
    },
    // sliderParams() {
    //   return {
    //     width: document.querySelector(".slider-double").getBoundingClientRect()
    //       .width,
    //     x:
    //       document.querySelector(".slider-double").getBoundingClientRect()
    //         .left + window.scrollX,
    //   };
    // },
  },
};
</script>
<style lang="scss">
.slider-double {
  position: relative;
  background-color: transparent;
  height: 15px;
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
}
</style>
