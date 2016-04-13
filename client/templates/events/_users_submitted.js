Template._usersSubmitted.helpers({
    users: function(){
        var eventId = Router.current().params._id;
        //var orders = Orders.find({eventId:event._id}).fetch();
        //var userIds = _.map(orders,function(order){
        //    return order.userId;
        //});
        return Meteor.users.find({eventOrders:{$elemMatch:{eventId:eventId, orderStatus:orderStatuses.expects}}});
    }
});