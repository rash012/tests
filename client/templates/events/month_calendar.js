// var type= ReactiveVar();

Template.monthCalendar.events({
    'change #type': function () {
        var type = $('#type option:selected').val();
        var month = Router.current().params.month;
        var year = Router.current().params.year;

        if (type) Router.go('monthCalendar', {year: year, month: month}, {query: 'type=' + type});
        else Router.go('monthCalendar', {year: year, month: month});
    }
});

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
    },
    select: function (type) {
        if (_.contains(getTypesFromQuery(), type)) {
            return 'selected';
        }
        return '';
    }
});

Template.monthCalendar.destroyed = function () {
    //status.set('все');
};