<template>
  <div class="calendar">
    <div class="calendar__head">
      <div class="calendar__head-actions"></div>
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
      <div class="calendar__ceil" v-for="day in days" :key="day">{{ day }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nameOfDays: ["пн", "вт", "ср", "чт", "пт", "сб", "нб"],
      selectedMonth: 11,
      selectedYear: 2022,
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
  computed: {
    days() {
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

      // Алгоритм додавання в календар вибраної дати
      for (let day = 1; day <= this.daysCount[this.selectedMonth]; day++) {
        daysOfArray.push(
          new Date(this.selectedYear, this.selectedMonth, day).getDate()
        );
      }

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
    daysCount() {
      const countOfFebruary = this.selectedYear % 4 === 0 ? 29 : 28;
      return [31, countOfFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
      z-index: 1;
      transition: background-color 0.2s ease;
      border-radius: 3px;
    }

    &:hover::after {
      background-color: rgba(#fff, 0.3);
    }
  }

  &__ceil-day {
    text-transform: capitalize;

    &::after {
      content: none;
    }
  }
}
</style>