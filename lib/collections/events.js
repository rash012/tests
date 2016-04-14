Events = new Mongo.Collection('events');

Meteor.methods({
    insertEvent: function (eventObj) {
        check(Meteor.userId(), NonEmptyString);
        check(eventObj, {
            eventName: NonEmptyString,
            type: NonEmptyString,
            description: NonEmptyString,
            date: NonEmptyString,
            begin: NonEmptyString,
            end: NonEmptyString
        });
        var user = Meteor.user();
        var event = _.extend(eventObj, {
            owner: {_id: user._id, name: user.username},
            submitted: new Date()
        });

        var eventId = Events.insert(event);

        return {
            _id: eventId
        };
    }
});

usersEventsIds = function(userId){
    var usersEvents = Events.find({'owner._id': userId}).fetch();
    return _.map(usersEvents, function (event) {
        return event._id;
    });
};
isMyEvent = function (eventId) {
    return !!Events.findOne({'owner._id': Meteor.userId(), _id: eventId});
};
