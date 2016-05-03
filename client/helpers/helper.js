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

UI.registerHelper('isOwner', function (eventId, userId) {
    
    return isOwner(eventId, userId);
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

UI.registerHelper('isEventStarted', function (eventId) {
    return isEventStarted(eventId);
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

UI.registerHelper('getEventDeadline', function () {
    return eventDeadline;
});

UI.registerHelper('isEventShifted', function (eventId) {
    return isEventShifted();
});




Template.onRendered(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    
    // $('[data-toggle="confirmation"]').confirmation({
    //     btnOkLabel:'<i class="icon-ok-sign icon-white"></i> Да',
    //     btnCancelLabel:'<i class="icon-remove-sign"></i> Нет',
    //     placement: 'top',
    // })
});