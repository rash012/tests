getUsersSubmitted = function (eventId, status) {
    var orders = Orders.find({eventId:eventId, status:status}).fetch();
    var usersIds = _.map(orders,function(order){
        return order.userId;
    });
    var users = Meteor.users.find({_id: {$in: usersIds}});
    if(!_.isEmpty(users.fetch())) return users;
    else return false;
};