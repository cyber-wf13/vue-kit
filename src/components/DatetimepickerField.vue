<template>
  <label class="calendar-field">
    <input
      type="text"
      class="calendar-field__input"
      placeholder="Date"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      v-model="inputDate"
      maxlength="10"
    /><i class="calendar-field__icon fa-solid fa-calendar-days"></i>
  </label>
</template>
<script>
export default {
  props: ["dateSelect"],
  data() {
    return {
      inputDate: "",
    };
  },
  methods: {
    parseDate(date) {
      const dateParts = date.split("/");
      const dateParams = {
        day: dateParts[0],
        month: dateParts[1] - 1,
        year: dateParts[2],
      };

      return dateParams;
    },
  },
  watch: {
    inputDate(newValue, oldValue) {
      const inputLength = this.inputDate.length;

      // Перевірка, якщо день менше за календарний 1-31
      if (inputLength === 3) {
        if (oldValue < 1 || oldValue > 31) {
          this.inputDate = oldValue;
          console.log("Error!! Undefined Day");
          return;
        }
      }

      // Перевірка, якщо місяць менше за календарний 1-12
      if (inputLength === 6) {
        const inputMonth = oldValue.slice(3, 5);

        if (inputMonth < 1 || inputMonth > 12) {
          this.inputDate = oldValue;
          console.log("Error!! Undefined Month");
          return;
        }
      }

      // Перевірка, якщо рік менше діапазону 1922-2122
      if (inputLength === 10) {
        const inputYear = newValue.slice(6, 10);

        if (inputYear < 1922 || inputYear > 2122) {
          this.inputDate = newValue;
          console.log("Error!! Undefined Year");
          return;
        }
      }

      /*  Додавати / лише коли довжина поля 2|5(введені число або місяць) 
      та минуле значення не має / (в разі видалення) */
      if (
        (inputLength === 2 && oldValue[2] !== "/") ||
        (inputLength === 5 && oldValue[5] !== "/")
      ) {
        this.inputDate += "/";
      }

      if (inputLength === 10) {
        const resultDate = this.parseDate(this.inputDate);

        this.$emit("selectDate", resultDate);
      }
    },
    dateSelect(newDate) {
      this.inputDate = `${newDate.day}/${newDate.month}/${newDate.year}`;
      console.log("Calendar date", newDate);
    },
  },
};
</script>
<style lang="scss">
.calendar-field {
  display: flex;
  align-items: center;
  position: relative;
  max-width: 300px;

  &__input {
    width: 300px;
    height: 45px;
    background: #fff;
    border: 1px solid $c-border;
    border-radius: 7px;
    padding: 8px 40px 8px 16px;
    color: #374151;
    font-size: 1rem;
    line-height: rem(20);
    outline: none;
    transition: border 0.3s ease, background 0.3s ease;

    &:focus {
      border: 1px solid $c-primary;
      background: rgba(160, 195, 255, 0.1);
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
}
</style>