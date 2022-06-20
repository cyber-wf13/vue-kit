<template>
  <div class="calendar">
    <div class="calendar__head">
      <div class="calendar__head-actions calendar-actions">
        <div class="calendar-actions__items calendar-actions__prev">
          <button
            class="calendar-actions__prev-year calendar-actions__button"
            @click="yearPrevUpdate"
          >
            <i class="fa-solid fa-angles-left"></i>
          </button>
          <button
            class="calendar-actions__prev-month calendar-actions__button"
            @click="monthPrevUpdate"
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>
        </div>
        <div class="calendar-actions__dates">
          <custom-select
            class="calendar-select"
            :list-items="selectListOfMonth"
            :selected="nameOfMonth[selectedMonth]"
            :focus-value="selectedMonth"
            @select="selectMonth"
          ></custom-select>
          <custom-select
            class="calendar-select"
            :list-items="selectListOfYear"
            :selected="selectedYear"
            :focus-value="selectedYear"
            @select="selectYear"
          ></custom-select>
        </div>
        <div class="calendar-actions__items calendar-actions__next">
          <button
            class="calendar-actions__next-month calendar-actions__button"
            @click="monthNextUpdate"
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
          <button
            class="calendar-actions__next-year calendar-actions__button"
            @click="yearNextUpdate"
          >
            <i class="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
      <div class="calendar__days">
        <div
          class="calendar__ceil calendar__ceil-day"
          v-for="name in nameOfDays"
          :key="name"
        >
          {{ name }}
        </div>
      </div>
    </div>
    <div class="calendar__body">
      <div
        class="calendar__ceil"
        @click="clickToDayCeil"
        v-for="(day, idx) in days"
        :key="idx"
        :class="{
          'calendar__ceil-under':
            idx < daysIdx.prev || idx >= daysIdx.next ? true : false,
          'calendar__ceil-prev': idx < daysIdx.prev ? true : false,
          'calendar__ceil-next': idx >= daysIdx.next ? true : false,
          'calendar__ceil-current':
            idx === daysIdx.current && daysIdx.current != -1 ? true : false,
        }"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>
<script>
import CustomSelect from "@/components/CustomSelect.vue";

export default {
  props: ["dateSelect"],
  data() {
    return {
      fromCalendar: false,
      nameOfDays: ["пн", "вт", "ср", "чт", "пт", "сб", "нд"],
      selectedMonth: new Date().getMonth(),
      selectedYear: new Date().getFullYear(),
      selectedDateParams: {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
      days: [],
      daysIdx: {
        prev: 0,
        next: 0,
        current: 0,
      },
      selectedListItem: "jan",
      selectListOfMonth: [
        {
          text: "jan",
          value: "0",
        },
        {
          text: "feb",
          value: "1",
        },
        {
          text: "mar",
          value: "2",
        },
        {
          text: "apr",
          value: "3",
        },
        {
          text: "may",
          value: "4",
        },
        {
          text: "jun",
          value: "5",
        },
        {
          text: "jul",
          value: "6",
        },
        {
          text: "aug",
          value: "7",
        },
        {
          text: "sep",
          value: "8",
        },
        {
          text: "oct",
          value: "9",
        },
        {
          text: "nov",
          value: "10",
        },
        {
          text: "dec",
          value: "11",
        },
      ],
      nameOfMonth: [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ],
    };
  },
  components: { CustomSelect },
  mounted() {
    this.days = this.calculateDays();
  },
  methods: {
    calculateDays() {
      // Масив для відображення днів (макс. 42 елементи)
      let daysOfArray = [];

      /* Вираховуємо стартовий індекс, для того щоб почати відлік відносно дня тижня 
        В даному разі віднімаємо 1, щоб відлік йшов з понеділка.
      */
      let startIdx =
        new Date(this.selectedYear, this.selectedMonth, 1).getDay() - 1;

      // Перевірка, якщо індекс виходить за межі, то перекидувало на індекс неділі (6)
      if (startIdx === -1) {
        startIdx = 6;
      }
      // Вираховуємо індекс для прописання класу попереднім дням
      this.daysIdx.prev = startIdx;
      // Визначення попереднього місяця та року для заповнення попередньої частини
      let prevMonth = this.selectedMonth - 1;
      let prevYear = this.selectedYear;

      // Перевірка, якщо місяць "січень"
      if (this.selectedMonth === 0) {
        prevMonth = 11;
        prevYear -= 1;
      }

      // Алгоритм заповнення попередніх елементів перед датою
      while (startIdx !== 0) {
        let startDate = new Date(
          prevYear,
          prevMonth,
          this.daysCount[prevMonth] - startIdx + 1 //Отримуємо із списку в залежності від місяця день та нормалізуємо його
        );
        daysOfArray.push(startDate.getDate());
        startIdx--;
      }

      // Масив з днями вибраного місяця
      let currentDaysOfArray = [];

      // Алгоритм додавання в календар вибраної дати
      for (let day = 1; day <= this.daysCount[this.selectedMonth]; day++) {
        currentDaysOfArray.push(
          new Date(this.selectedYear, this.selectedMonth, day).getDate()
        );
      }

      // Вираховуємо індекс поточного дня поточного місяця та об'єднуємо масиви
      if (
        this.selectedMonth === new Date().getMonth() &&
        this.selectedYear === new Date().getFullYear()
      ) {
        this.daysIdx.current =
          this.daysIdx.prev + currentDaysOfArray.indexOf(new Date().getDate());
      } else {
        this.daysIdx.current = -1;
      }
      daysOfArray = daysOfArray.concat(currentDaysOfArray);

      // Вираховуємо індекс для прописання класу наступних днів
      this.daysIdx.next = daysOfArray.length;

      // Вираховуємо скільки порожніх комірок та виставляємо дату для кінцевих комірок
      const endIdx = 42 - daysOfArray.length;
      let endDay = 1;

      // Визначення попереднього місяця та року для заповнення кінцевої частини
      let nextMonth = this.selectedMonth + 1;
      let nextYear = this.selectedYear;

      // Перевірка, якщо місяць "грудень"
      if (this.selectedMonth === 11) {
        nextMonth = 0;
        nextYear += 1;
      }

      while (endDay <= endIdx) {
        let endDate = new Date(nextYear, nextMonth, endDay).getDate();
        daysOfArray.push(endDate);
        endDay++;
      }

      return daysOfArray;
    },
    monthPrevUpdate() {
      if (this.selectedMonth <= 0) {
        return;
      }
      this.selectedMonth -= 1;
      this.days = this.calculateDays();
      this.monthDateUpdate();

      // console.log("Month is update");
    },
    monthNextUpdate() {
      if (this.selectedMonth >= 11) {
        return;
      }
      this.selectedMonth += 1;
      this.days = this.calculateDays();
      this.monthDateUpdate();
      // console.log("Month is update");
    },
    monthDateUpdate() {
      this.selectedDateParams = Object.assign({}, this.selectedDateParams, {
        month: this.selectedMonth + 1,
      });
      this.emitSelectDate();
    },
    yearPrevUpdate() {
      if (this.selectedYear <= 1922) {
        return;
      }
      this.selectedYear = Number(this.selectedYear) - 1;
      this.days = this.calculateDays();
      this.yearDateUpdate();
      // console.log("Year is update");
    },
    yearNextUpdate() {
      if (this.selectedYear >= 2122) {
        return;
      }
      this.selectedYear = Number(this.selectedYear) + 1;
      this.days = this.calculateDays();
      this.yearDateUpdate();
      // console.log("Year is update");
    },
    yearDateUpdate() {
      this.selectedDateParams = Object.assign({}, this.selectedDateParams, {
        year: this.selectedYear,
      });
      this.emitSelectDate();
    },
    selectMonth(month) {
      this.selectedMonth = month;
      this.days = this.calculateDays();
      this.monthDateUpdate();
    },
    selectYear(year) {
      this.selectedYear = year;
      this.days = this.calculateDays();
      this.yearDateUpdate();
    },
    clickToDayCeil(e) {
      const ceil = e.currentTarget;
      let selectDay = ceil.textContent;
      let selectMonth = this.selectedMonth + 1;
      let selectYear = this.selectedYear;

      if (ceil.classList.contains("calendar__ceil-prev")) {
        selectMonth -= 1;
      } else if (ceil.classList.contains("calendar__ceil-next")) {
        selectMonth += 1;
      }

      this.selectedDateParams = {
        day: Number(selectDay),
        month: Number(selectMonth),
        year: Number(selectYear),
      };

      this.emitSelectDate();
    },
    emitSelectDate() {
      this.$emit("calendarSelect", this.selectedDateParams);
      this.fromCalendar = true;
    },
  },
  computed: {
    daysCount() {
      const countOfFebruary = this.selectedYear % 4 === 0 ? 29 : 28;
      return [31, countOfFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    },
    selectListOfYear() {
      const rangeOfYear = [];
      for (let year = 1922; year <= 2122; year++) {
        rangeOfYear.push({
          text: year,
          value: year,
        });
      }
      return rangeOfYear;
    },
  },
  watch: {
    dateSelect() {
      if (this.fromCalendar === true) {
        this.fromCalendar = false;
        return;
      }
      let year = this.dateSelect.year;
      let month = this.dateSelect.month - 1;
      console.log("Update");
      this.selectedYear = year;
      this.selectedMonth = month;
      this.days = this.calculateDays();
    },
  },
};
</script>
<style lang="scss">
.calendar {
  position: absolute;
  z-index: 100;
  top: 100%;
  max-width: 300px;
  width: 100%;
  background-color: $c-dark;
  border-radius: 12px;
  padding: 16px 32px;
  box-shadow: 0px 30px 84px rgba(19, 10, 46, 0.08),
    0px 8px 32px rgba(19, 10, 46, 0.07), 0px 3px 14px rgba(19, 10, 46, 0.03),
    0px 1px 3px rgba(19, 10, 46, 0.13);

  &__body,
  &__days {
    display: flex;
    flex-wrap: wrap;
  }

  &__ceil {
    position: relative;
    flex: 1 0 14.28%;
    text-align: center;
    height: 30px;
    color: $c-white;
    font-size: rem(14);
    font-weight: 300;
    line-height: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: rgba(#fff, 0);
      height: 70%;
      width: 70%;
      transform: translate(-50%, -50%);
      z-index: -1;
      transition: background-color 0.2s ease;
      border-radius: 3px;
    }

    &:hover::after {
      background-color: rgba(#fff, 0.3);
    }
  }

  &__ceil-under {
    color: rgba(#d1d5db, 0.4);
  }

  &__ceil-current {
    &::after {
      content: none;
    }
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: rgba(#aa0000, 0.7);
      height: 70%;
      width: 70%;
      transform: translate(-50%, -50%);
      z-index: -1;
      border-radius: 3px;
    }
  }

  &__ceil-day {
    text-transform: capitalize;

    &::after {
      content: none;
    }
  }
}

.calendar-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  &__button {
    background-color: transparent;
    height: 27px;
    width: 27px;
    text-align: center;
    font-size: rem(12);
    line-height: 1em;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: 0.3s transform ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }

  &__dates {
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    font-size: rem(14);
  }

  &__date {
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
    transition: 0.3s transform ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
}

.calendar-select {
  font-size: rem(14);
  .custom-select {
    &__head {
      padding: 8px;
      color: $c-white;
      background-color: transparent;
      border: none;
    }

    &__head-text,
    &__head-arrow {
      color: $c-white;
    }

    &__list {
      width: auto;
      box-shadow: none;
    }
  }
}
</style>