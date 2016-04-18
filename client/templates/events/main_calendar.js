var currentMonth = getCurrentMonth();
var currentYear = getCurrentYear();
Template.mainCalendar.helpers({
    days: function () {
        var days = [];
        var month = this.month;
        var dayNumber = getCurrentDateDay();
        var daysInMonth = getDaysInMonth(getCurrentMonth(),getCurrentYear());
        for (var i = 0; i < 14; i++) {
            days.push({day: dayNumber++});
            if(dayNumber>daysInMonth) dayNumber = 1;
        }
        return {
            days:days,
            month: 1
        };
    },
    month:currentMonth,
    year: currentYear
});