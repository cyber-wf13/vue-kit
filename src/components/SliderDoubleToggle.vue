<template>
  <button
    class="slider-toggle"
    :class="toggleClass"
    ref="toggle"
    @dragstart.prevent
    @mousedown="toggleDown"
    @mouseup="toggleUp"
    @mouseleave="toggleLeave"
  ></button>
</template>
<script>
export default {
  props: ["sliderWidth", "leave", "position", "toggleX"],
  data() {
    return {
      isPressed: false,
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
    },
    toggleLeave() {
      // this.toggleUp();
    },
    mouseMove(e) {
      let moveX = e.x - this.sliderX - 7.5;

      if (moveX > this.sliderWidth) {
        moveX = this.sliderWidth;
      } else if (moveX < 0) {
        moveX = 0;
      }

      this.calculateTogglePos(moveX);
    },
    calculateTogglePos(moveX) {
      const toggleX = moveX;
      const toggleDiff =
        this.position === "left"
          ? toggleX > this.toggleX
          : toggleX < this.toggleX;

      if (toggleDiff) {
        // this.toggleUp();
        return;
      }

      this.drawTogglePosition(toggleX);
    },
    drawTogglePosition(toggleX) {
      this.$refs.toggle.setAttribute("style", `left: ${toggleX}px;`);
      this.$emit("move", { tag: this.position, x: toggleX });
    },
  },
  watch: {
    leave() {
      this.toggleUp();
    },
  },
  computed: {
    toggleClass() {
      return {
        "slider-toggle--pressed": this.isPressed,
        "slider-toggle--left": this.position === "left",
        "slider-toggle--right": this.position === "right",
      };
    },

    sliderX() {
      return (
        this.$refs.toggle.closest(".slider-double").getBoundingClientRect()
          .left + window.scrollX
      );
    },
  },
};
</script>
<style lang="scss">
.slider-toggle {
  position: absolute;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: #fff;
  border: none;
  box-shadow: 0 1px 13px 0 rgba(#000, 0.2);
  cursor: pointer;
  outline: none;
  transition: transform 0.3s ease;

  &--left {
    left: 0;
    z-index: 20;
  }

  &--right {
    left: 100%;
    z-index: 30;
  }

  &--pressed {
    transform: scale3d(1.5, 1.5, 1);
    z-index: 50;
  }
}
</style>