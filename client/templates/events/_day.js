var getMonth = function(){
    return Template.parentData().month;
};
var getYear = function(){
    return Template.parentData().year;
};

Template._day.helpers({
    month: function () {
        return getMonth();
    },
    year: function () {
        return getYear();
    },
    //events:function(){
    //    return Events.find({date: formatDateToIso(getYear(),getMonth(),this.day)},{sort:{begin:1}});
    //},
    eventsCount: function(){
        return Events.find({date: formatDateToIso(getYear(),getMonth(),this.day)}).count();
    },
    todayClass: function(){
        if(this.day  == getCurrentDateDay() && getMonth() == getCurrentMonth() && getYear() == getCurrentYear()){
            return 'today';
        }else return '';
    }
});