UI.registerHelper('currentYear', function () {
    return getCurrentYear();
});
UI.registerHelper('currentMonthNumber', function () {
    return getCurrentMonth();
});

UI.registerHelper('formatDateToLocal', function (date) {
    return formatDate.toLocalFromIsoString(date);
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

UI.registerHelper('isEventHappen', function (eventId) {
    return isEventHappen(eventId);
});

UI.registerHelper('getOrdersCount', function (eventId, status) {
    if(!eventId) throw new Meteor.Error('не указан id события');
    return getOrdersCount(eventId, status);
});

UI.registerHelper('getEventIdFromRoute', function () {
    return Router.current().params._id;
});

UI.registerHelper('isThisUser', function (userId) {
    return isThisUser(userId);
});

UI.registerHelper('isInSameStartedEventWithUser', function (votedUserId) {
    return isInSameStartedEventWithUser(votedUserId);
});