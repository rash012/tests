Template.monthCalendar.helpers({
  currentMonthName: function () {
    return getMonthNameByNumber(getCurrentMonth());
  },
  currentYear: function(){
    return UI._globalHelpers('currentYear');
  },
  days: function () {
    var days = [];
    for (var i = 1; i <= Date.prototype.getDaysInMonth(getCurrentMonth()); i++) {
      days.push(i);
    }
    return days;
  }
});