Events = new Mongo.Collection('events');

Meteor.methods({
    insertEvent: function (eventObj) {
        check(Meteor.userId(), String);
        check(eventObj, {
            eventName: String,
            type: String,
            description: String,
            date: String,
            begin: String,
            end: String
        });
        var user = Meteor.user();
        var event = _.extend(eventObj, {
            userId: user._id,
            username: user.username,
            submitted: new Date()
        });

        var eventId = Events.insert(event);

        return {
            _id: eventId
        };
    }
});