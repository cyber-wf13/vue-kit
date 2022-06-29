<template>
  <div
    class="slider-double"
    :style="{ width: `${sliderWidth}px` }"
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
  props: ["minValue", "maxValue", "name", "sliderWidth"],
  data() {
    return {
      isLeave: false,
      sliderParams: {
        width: this.sliderWidth,
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
      rightX: this.sliderWidth,
    };
  },
  components: { SliderToggle },
  mounted() {
    // this.rightX = this.sliderParams.width;
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
      this.$emit("move", { item: this.name, value: this.rangeValue });
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
    //   console.log(this.$el);
    //   return {
    //     width: this.$el.querySelector(".slider-double").getBoundingClientRect()
    //       .width,
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
    display: block;
    z-index: 3;
    background-color: $c-primary;
  }
}
</style>
