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
            :list-items="selectListOfMonth"
            :selected="nameOfMonth[selectedMonth]"
            @select="selectMonth"
          ></custom-select>
          <custom-select
            :list-items="selectListOfYear"
            :selected="selectedYear"
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
        v-for="(day, idx) in days"
        :key="idx"
        :class="{
          'calendar__ceil-under':
            idx < daysIdx.prev || idx >= daysIdx.next ? true : false,
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
  data() {
    return {
      nameOfDays: ["пн", "вт", "ср", "чт", "пт", "сб", "нд"],
      selectedMonth: new Date().getMonth(),
      selectedYear: new Date().getFullYear(),
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
        "sep",
        "aug",
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
      // console.log("Month is update");
    },
    monthNextUpdate() {
      if (this.selectedMonth >= 11) {
        return;
      }
      this.selectedMonth += 1;
      this.days = this.calculateDays();
      // console.log("Month is update");
    },
    yearPrevUpdate() {
      if (this.selectedYear <= 1922) {
        return;
      }
      this.selectedYear -= 1;
      this.days = this.calculateDays();
      // console.log("Year is update");
    },
    yearNextUpdate() {
      if (this.selectedYear >= 2122) {
        return;
      }
      this.selectedYear += 1;
      this.days = this.calculateDays();
      // console.log("Year is update");
    },
    selectMonth(month) {
      this.selectedMonth = month;
      this.days = this.calculateDays();
    },
    selectYear(year) {
      this.selectedYear = year;
      this.days = this.calculateDays();
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
};
</script>
<style lang="scss">
.calendar {
  max-width: 300px;
  width: 100%;
  background-color: $c-primary;
  border-radius: 3px;
  padding: 5px;

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
    color: #fff;
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
    color: rgba(#fff, 0.5);
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
</style>