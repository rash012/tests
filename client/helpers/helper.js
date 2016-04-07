//UI.registerHelper('currentYear', function () {
//  return getCurrentYear();
//});
//UI.registerHelper('currentMonthNumber', function () {
//  return getCurrentMonth();
//});

UI.registerHelper('formatDateToLocal', function (date) {
  return formatToLocalDate.fromIsoString(date);
});