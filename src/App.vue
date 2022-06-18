<template>
  <section class="basic">
    <h2 class="basic__title title">Inputs</h2>
    <div class="basic__content">
      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Checkboxes</h4>
        <div class="basic-block__body">
          <radio-check
            @change="radioCheckHandle"
            v-for="checkbox in checkboxes"
            :key="checkbox.id"
            :value="checkbox.value"
            :type="checkbox.type"
            :name="checkbox.name"
            >RadioCheck {{ checkbox.id }}
          </radio-check>
        </div>
      </div>

      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Radios</h4>
        <div class="basic-block__body">
          <radio-check
            @change="radioCheckHandle"
            v-for="radio in radios"
            :key="radio.id"
            :value="radio.value"
            :type="radio.type"
            :name="radio.name"
            class="toggle"
            >RadioCheck {{ radio.id }}
          </radio-check>
        </div>
      </div>

      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Toggle Buttons</h4>
        <div class="basic-block__body">
          <radio-check
            @change="radioCheckHandle"
            v-for="checkbox in checkboxes"
            :key="checkbox.id"
            :value="checkbox.value"
            :type="checkbox.type"
            :name="checkbox.name"
            class="toggle"
            >RadioCheck {{ checkbox.id }}
          </radio-check>
        </div>
      </div>

      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Sliders</h4>
        <div class="basic-block__body">
          <slider-single min-value="300" max-value="400"></slider-single>
          <slider-double
            min-value="550"
            max-value="600"
            @change="sliderMove"
          ></slider-double>
        </div>
      </div>
    </div>
  </section>

  <section class="basic">
    <h2 class="basic__title title">Components</h2>
    <div class="basic__content">
      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Datetimepicker</h4>
        <div class="basic-block__body">
          <datetimepicker />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RadioCheck from "@/components/RadioCheck.vue";
import SliderSingle from "@/components/SliderSingle.vue";
import SliderDouble from "@/components/SliderDouble.vue";
import Datetimepicker from "@/components/Datetimepicker.vue";

export default {
  name: "App",
  data() {
    return {
      checkboxes: [
        {
          id: 0,
          type: "checkbox",
          name: "RadioCheckName-1",
          value: "CheckBox-1",
        },
        {
          id: 1,
          type: "checkbox",
          name: "RadioCheckName-2",
          value: "CheckBox-2",
        },
        {
          id: 2,
          type: "checkbox",
          name: "RadioCheckName-3",
          value: "CheckBox-3",
        },
      ],
      radios: [
        {
          id: 0,
          type: "radio",
          name: "RadioCheckName",
          value: "Radio-1",
        },
        {
          id: 1,
          type: "radio",
          name: "RadioCheckName",
          value: "Radio-1",
        },
        {
          id: 2,
          type: "radio",
          name: "RadioCheckName",
          value: "Radio-3",
        },
      ],
    };
  },
  components: {
    RadioCheck,
    SliderSingle,
    SliderDouble,
    Datetimepicker,
  },
  methods: {
    radioCheckHandle(e) {
      console.log("From component", e.target.value);
    },
    sliderMove(value) {
      console.log("Value is from PARENT", value);
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/style";

#app {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.title {
  font-size: rem(21);
  font-weight: 400;
  line-height: rem(30);
}

.basic {
  &__content {
    display: flex;
    margin: 10px 0;
  }
}

.basic-block {
  flex: 1 0 25%;
  &__title {
    font-size: rem(16);
    font-weight: 700;
    line-height: rem(27);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5px 0;
  }
}
</style>
