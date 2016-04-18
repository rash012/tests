var currentMonth = getCurrentMonth();
var currentYear = getCurrentYear();
Template.mainCalendar.helpers({
    dates: function () {
        var dates = [];
        var month = this.monthReal -1;
        var dayNumber = getCurrentDateDay();
        for (var i = 0; i < 14; i++) {
            dates.push(new Date(this.year,  month, dayNumber++));
        }
        return dates;
    },
    month:currentMonth,
    year: currentYear
});