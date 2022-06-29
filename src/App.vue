<template>
  <section class="basic">
    <h2 class="basic__title title">Selected item:</h2>
    <div class="basic__block basic-block">
      <div class="basic-block__body">
        <div class="display">
          <span class="display__text"
            >Selected is:
            <b class="display__value">{{ selectedElement }}</b></span
          >
          <span class="display__text"
            >Value is: <b class="display__value">{{ selectedValue }}</b></span
          >
          <button
            class="display__button-reset"
            @click="
              selectedElement = 'none selected';
              selectedValue = 'none selected';
            "
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  </section>

  <section class="basic">
    <h2 class="basic__title title">Inputs</h2>
    <div class="basic__content radiocheck-content">
      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Checkboxes</h4>
        <div class="basic-block__body">
          <radio-check
            @change="changeInputsHandle"
            v-for="checkbox in checkboxes"
            :key="checkbox.id"
            :value="checkbox.value"
            :type="checkbox.type"
            :name="checkbox.name"
            >Checkbox {{ checkbox.id }}
          </radio-check>
        </div>
      </div>

      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Radios</h4>
        <div class="basic-block__body">
          <radio-check
            @change="changeInputsHandle"
            v-for="radio in radios"
            :key="radio.id"
            :value="radio.value"
            :type="radio.type"
            :name="radio.name"
            >Radio {{ radio.id }}
          </radio-check>
        </div>
      </div>

      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Toggle Buttons</h4>
        <div class="basic-block__body">
          <radio-check
            @change="changeInputsHandle"
            v-for="checkbox in checkboxes"
            :key="checkbox.id"
            :value="checkbox.value"
            :type="checkbox.type"
            :name="checkbox.name"
            toggle
            >Toggle {{ checkbox.id }}
          </radio-check>
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

      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Sliders</h4>
        <div class="basic-block__body">
          <slider-single
            min-value="300"
            max-value="400"
            name="slider-single"
            slider-width="300"
            @move="changeInputsHandle"
          ></slider-single>
          <slider-double
            min-value="550"
            max-value="600"
            name="slider-double"
            slider-width="300"
            @move="sliderMove"
          ></slider-double>
        </div>
      </div>
    </div>
  </section>

  <section class="basic">
    <h2 class="basic__title title">Text input</h2>
    <div class="basic__content">
      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Default</h4>
        <div class="basic-block__body">
          <text-input />
        </div>
      </div>
      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Status input</h4>
        <div class="basic-block__body">
          <text-input :withStatus="true" />
        </div>
      </div>
      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Check / Delete</h4>
        <div class="basic-block__body">
          <check-input />
        </div>
      </div>
    </div>
  </section>

  <section class="basic">
    <h2 class="basic__title title">Dropdown</h2>
    <div class="basic__content">
      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Default</h4>
        <div class="basic-block__body">
          <custom-select
            class="basic-select"
            :list-items="selectList"
            selected="Default title"
            :focus-value="1"
            name="select"
            @select="changeInputsHandle"
          />
        </div>
      </div>
      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Multiselect</h4>
        <div class="basic-block__body">
          <custom-select-multi
            class="basic-select"
            :list-items="selectList"
            selected="Default title"
            :focus-value="1"
            @select="changeInputsHandle"
            name="select-multi"
          />
        </div>
      </div>
    </div>
  </section>

  <section class="basic">
    <h2 class="basic__title title">Tooltip</h2>
    <div class="basic__content">
      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Default</h4>
        <div class="basic-block__body">
          <div
            class="basic-block__item-tooltip"
            v-tooltip="'Tooltip content here'"
          >
            <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
          </div>
        </div>
      </div>
      <div class="basic__block basic-block">
        <h4 class="basic-block__title">Warning</h4>
        <div class="basic-block__body">
          <div
            class="basic-block__item-tooltip"
            v-tooltip:[color]="'Tooltip content here'"
          >
            <font-awesome-icon
              class="
                basic-block__item-tooltip basic-block__item-tooltip--warning
              "
              icon="fa-solid fa-triangle-exclamation"
            />
          </div>
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
import TextInput from "@/components/TextInput.vue";
import CheckInput from "@/components/CheckInput.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import CustomSelectMulti from "@/components/CustomSelectMulti.vue";

export default {
  name: "App",
  mounted() {
    document.title = "Vue-Kit";
  },
  data() {
    return {
      color: "#bb0000",
      selectedElement: "none selected",
      selectedValue: "none selected",
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
          value: "Radio-2",
        },
        {
          id: 2,
          type: "radio",
          name: "RadioCheckName",
          value: "Radio-3",
        },
      ],
      selectList: [
        {
          text: "Option 1",
          value: "1",
        },
        {
          text: "Option 2",
          value: "2",
        },
        {
          text: "Option 3",
          value: "3",
        },
        {
          text: "Option 4",
          value: "4",
        },
      ],
    };
  },
  components: {
    RadioCheck,
    SliderSingle,
    SliderDouble,
    Datetimepicker,
    TextInput,
    CheckInput,
    CustomSelect,
    CustomSelectMulti,
  },
  methods: {
    changeInputsHandle({ item, value }) {
      this.selectedElement = item;
      this.selectedValue = value;
    },
    sliderMove({ item, value }) {
      this.selectedElement = item;
      this.selectedValue = `Min: ${value.min} <==> Max: ${value.max}`;
    },
    handleSelect({ item, value }) {
      this.selectedElement = item;
      this.selectedValue = value;
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/style";

#app {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  background: #f3f4f6;
  border-radius: 56px;
  padding: 50px 55px 105px 55px;
  margin: 20px auto;
  border: 1px solid $c-border;
  box-shadow: 0px 0px 15px 0px rgba($c-border, 0.8);

  @media (max-width: 575.98px) {
    padding: 20px;
  }
}

.title {
  font-size: rem(21);
  font-weight: 400;
  line-height: rem(30);

  @media (max-width: 767.98px) {
    text-align: center;
  }
}

.basic {
  &__content {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    gap: 20px 40px;

    @media (max-width: 575.98px) {
      justify-content: center;
    }
  }
}

.basic-block {
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

  &__item-tooltip {
    height: 24px;
    width: 24px;
    color: $c-dark;
    font-size: rem(24);
    cursor: pointer;

    @media (max-width: (575.98px - 0.02)) {
      margin: 0 auto;
    }
  }

  &__item-tooltip--warning {
    color: $c-warning;
  }
}

.radiocheck-content {
  justify-content: space-between;

  @media (max-width: 575.98px) {
    justify-content: center;
  }
}

.display {
  display: flex;
  flex-direction: column;
  font-size: rem(19);
  width: 100%;

  @media (max-width: (map.get($breakpoints, "sm") - 0.02)) {
    align-items: center;
  }

  &__text {
    margin: 5px 0;
  }

  &__value {
    text-decoration: underline;
    color: $c-primary;
    font-size: rem(18);
  }

  &__button-reset {
    border: none;
    background: rgba($c-primary, 0.4);
    border-radius: 7px;
    max-width: 100px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    transition: 0.3s color ease-in;
    font-size: rem(17);
    padding: 5px;

    @media (any-hover: hover) {
      &:hover {
        color: $c-white;
      }
    }
  }
}
</style>
