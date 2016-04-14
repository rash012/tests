UI.registerHelper('currentYear', function () {
    return getCurrentYear();
});
UI.registerHelper('currentMonthNumber', function () {
    return getCurrentMonth();
});

UI.registerHelper('formatDateToLocal', function (date) {
    return formatToLocalDate.fromIsoString(date);
});

UI.registerHelper('wordWithEnding', function (word, count) {
    return wordWithEnding[word](count);
});

UI.registerHelper('monthWithEnding', function (monthNumber) {
    return getMonthNameByNumber.withEnding(monthNumber);
});

UI.registerHelper('isMyEvent', function (eventId) {
    return isMyEvent(eventId);
});

UI.registerHelper('eventTypes', function () {
    return eventTypes;
});

UI.registerHelper('getQueryTypes', function () {
    var types = Router.current().params.query.type;
    if (types) return 'type=' + types;
});