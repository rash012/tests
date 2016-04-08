Template._usersSubmitted.helpers({
    users: function(){
        var event = this;
        var orders = Orders.find({eventId:event._id}).fetch();
        var userIds = _.map(orders,function(order){
            return order.userId;
        });
        return Meteor.users.find({_id:{$in:userIds}});
    }
});