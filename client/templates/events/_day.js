var getMonthReal = function (context) {
    return context.getMonth()+1;
};
var getYear = function (context) {
    return context.getFullYear();
};
var getDate = function (context) {
    return context.getDate();
};

_dayHelpers = {
    day: function () {
        return getDate(this);
    },
    month: function () {
        return getMonthReal(this);
    },
    year: function () {
        return getYear(this);
    },
    //events:function(){
    //    return Events.find({date: formatDateToIso(getYear(),getMonth(),this.day)},{sort:{begin:1}});
    //},
    eventsCount: function () {
        var types = getTypesFromQuery();

        if (types) {
            return Events.find({
                date: formatDateToIso(getYear(this), getMonthReal(this), this.getDate()),
                type: {$in: types}
            }).count();
        } else return Events.find({date: formatDateToIso(getYear(this), getMonthReal(this), this.getDate())}).count();
    },
    todayClass: function () {
        if (this.getDate() == getCurrentDateDay() && getMonthReal(this) == getCurrentMonth() && getYear(this) == getCurrentYear()) {
            return 'today';
        } else return '';
    },
    weekday: function () {
        var weekDayNumber = new Date(getYear(this), this.getMonth(), this.getDate()).getDay();
        return weekDays[weekDayNumber];
    },
};

Template._day.helpers(_dayHelpers);
Template._day_content.helpers(_dayHelpers);