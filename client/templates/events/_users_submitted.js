Template._usersSubmitted.helpers({
    users: function(){
        var eventId = Router.current().params._id;
        var orders = Orders.find({eventId:eventId, status:orderStatuses.expects}).fetch();
        var userIds = _.map(orders,function(order){
            return order.userId;
        });
        return Meteor.users.find({_id: {$in: userIds}});
    }
});