var getMonth = function () {
    return Template.parentData().month;
};
var getYear = function () {
    return Template.parentData().year;
};

_dayHelpers = {
    month: function () {
        return getMonth();
    },
    year: function () {
        return getYear();
    },
    //events:function(){
    //    return Events.find({date: formatDateToIso(getYear(),getMonth(),this.day)},{sort:{begin:1}});
    //},
    eventsCount: function () {
        var types = getTypesFromQuery();

        if (types) {
            return Events.find({
                date: formatDateToIso(getYear(), getMonth(), this.day),
                type: {$in: types}
            }).count();
        } else return Events.find({date: formatDateToIso(getYear(), getMonth(), this.day)}).count();
    },
    todayClass: function () {
        if (this.day == getCurrentDateDay() && getMonth() == getCurrentMonth() && getYear() == getCurrentYear()) {
            return 'today';
        } else return '';
    },
    weekday: function () {
        var weekDayNumber = new Date(getYear(), getMonth() - 1, this.day).getDay();
        return weekDays[weekDayNumber];
    },
};

Template._day.helpers(_dayHelpers);
Template._day_content.helpers(_dayHelpers);