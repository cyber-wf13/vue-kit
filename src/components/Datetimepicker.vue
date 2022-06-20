<template>
  <div class="datetimepicker">
    <field
      @focus="isOpen = true"
      @selectDate="handleSelectDate"
      :dateSelect="selectedDate"
    ></field>
    <transition name="slide-fade">
      <calendar
        v-show="isOpen"
        @calendarSelect="handleSelectDate"
        :dateSelect="selectedDate"
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
      selectedDate: {},
    };
  },
  components: {
    Calendar,
    Field,
  },
  methods: {
    handleSelectDate(date) {
      console.log("Date selected", date);
      this.selectedDate = date;
    },
  },
};
</script>
<style lang="scss">
.datetimepicker {
  position: relative;
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