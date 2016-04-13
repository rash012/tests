Meteor.publish('events', function () {
    return Events.find();
});

//todo подумать над реализацией заявок в бд

Meteor.publish('users', function () {
    return Meteor.users.find();
});

Meteor.publish('orders', function () {
    var currentUserId = this.userId;
    if (currentUserId) {
        var myEvents = Events.find({'owner._id': currentUserId}).fetch();
        var myEventIds = _.map(myEvents, function (event) {
            return event._id;
        });
        return Orders.find({$or:[{eventId: {$in: myEventIds}},{userId:currentUserId}]});
    }
    else return [];
});