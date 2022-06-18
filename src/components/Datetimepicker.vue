<template>
  <div class="datetimepicker">
    <field
      @focus="isOpen = true"
      @selectDate="handleField"
      :date-select="selectCalendarDate"
    ></field>
    <transition name="slide-fade">
      <calendar
        v-show="isOpen"
        :date-select="selectedInputDate"
        @calendarSelect="handleCalendarSelect"
      ></calendar
    ></transition>
  </div>
</template>
<script>
import Calendar from "@/components/DatetimepickerCalendar.vue";
import Field from "@/components/DatetimepickerField.vue";

export default {
  mounted() {
    window.addEventListener("click", (e) => {
      const target = e.target;
      if (!this.$el.contains(target) && this.isOpen === true) {
        this.isOpen = false;
      }
    });
  },
  data() {
    return {
      isOpen: false,
      selectedInputDate: {},
      selectCalendarDate: {},
    };
  },
  components: {
    Calendar,
    Field,
  },
  methods: {
    handleField(date) {
      this.selectedInputDate = date;
    },
    handleCalendarSelect(date) {
      this.selectCalendarDate = date;
    },
  },
};
</script>
<style lang="scss">
.datetimepicker {
  width: 300px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>