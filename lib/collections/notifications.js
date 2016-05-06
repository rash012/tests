Notifications = new Mongo.Collection('notifications');

Meteor.methods({
    /**
     *
     * @param eventId {String}
     * @param notificationType {String}
     * @param changesObj {Object=}
     * @returns {{type: String, eventId: String, dateTime: Date}}
     */
    eventNotification: function (eventId, notificationType, changesObj) {
        check(eventId, NonEmptyString);
        check(notificationType, NonEmptyString);
        check(changesObj, Object);

        var notification = {
            type: notificationType,
            eventId: eventId,
            dateTime: new Date(),
        };
        
        if(changesObj) notification.changes = changesObj;

        Notifications.insert(notification, function (error) {
            if (error) throw new Meteor.Error(error);
        });

        return notification;
    }
});