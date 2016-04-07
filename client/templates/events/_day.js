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
    events:function(){
        return Events.find({date: formatDateToIso(getYear(),getMonth(),this.day)},{sort:{begin:1}});
    },
});