Meteor.publish('events', function () {
    return Events.find();
});

//Meteor.publish('orders', function () {
//  return Orders.find();
//});


//todo подумать над реализацией заявок в бд

//пользователи с отображением заявок только на события текущего пользователя
Meteor.publish('usersSubmittedWithOrders', function () {
    var currentUserId = this.userId;
    if (currentUserId) {
        var myEvents = Events.find({'owner._id': currentUserId}).fetch();
        var myEventIds = _.map(myEvents, function (event) {
            return event._id;
        });
        return Meteor.users.find(
            {eventOrders: {$elemMatch: {eventId: {$in: myEventIds}}}}
        );
    }
    else return [];
});

//пользователи без отображения заявок
Meteor.publish('users', function () {
    return Meteor.users.find({}, {fields: {eventOrders: 0}});
});

//текущий пользователь полностью
Meteor.publish('currentUser', function () {
    var currentUserId = this.userId;
    if(currentUserId) return Meteor.users.find(currentUserId);
    else return [];
});
