Template.monthCalendar.helpers({
    currentMonthName: function () {
        return getMonthNameByNumber(getCurrentMonth());
    },
    monthName: function () {
        return getMonthNameByNumber(this.monthReal);
    },
    currentYear: function () {
        return UI._globalHelpers('currentYear');
    },
    dates: function () {
        var dates = [];
        var year = this.year;
        var monthReal = this.monthReal;
        for (var i = 1; i <= getDaysInMonth(monthReal, year); i++) {
            dates.push(new Date(year,  monthReal-1, i));
        }
        return dates;
    },
    nextMonthYear: function () {
        return nextMonthYear(this.monthReal, this.year);
    },
    previousMonthYear: function () {
        return previousMonthYear(this.monthReal, this.year);
    }
});