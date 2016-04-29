Meteor.publish('events', function () {
    return Events.find();
});

Meteor.publish('canceledEvents', function () {
    return CanceledEvents.find();
});

Meteor.publish('users', function () {
    return Meteor.users.find();
});

Meteor.publish('orders', function () {
    return Orders.find();
});

Meteor.publish('reviews', function () {
    return Reviews.find();
});

Meteor.publish('organizerVotes', function () {
    return OrganizerVotes.find();
});

//заявки пользователей на событие, создателем которого является текущий пользователь
// Meteor.publish('organizerUserOrders', function () {
//     var currentUserId = this.userId;
//     if (currentUserId) {
//         var myEventIds = currentUserCreatedEventsIds(currentUserId);
//         return Orders.find({$or:[{eventId: {$in: myEventIds}},{userId:currentUserId}]});
//     }
//     else return [];
// });

//заявки участников событий, в которых текущий пользователь также является участником
// Meteor.publish('eventMembersForMember', function () {
//     var currentUserId = this.userId;
//     var memberEventIds = function (currentUserId) {
//
//     };
//     return Orders.find({status: orderStatuses.accepted});
// });