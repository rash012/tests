Template.monthCalendar.helpers({
    currentMonthName: function () {
        return getMonthNameByNumber(getCurrentMonth());
    },
    monthName: function () {
        return getMonthNameByNumber(this.month);
    },
    currentYear: function () {
        return UI._globalHelpers('currentYear');
    },
    days: function () {
        var days = [];
        for (var i = 1; i <= getDaysInMonth(this.month, this.year); i++) {
            days.push({day: i});
        }
        return days;
    },
    nextMonthYear: function () {
        return nextMonthYear(this.month, this.year);
    },
    previousMonthYear: function () {
        return previousMonthYear(this.month, this.year);
    }
});