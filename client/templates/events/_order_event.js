Template._order_event.helpers({
    event: function(){
        return Events.findOne(this.eventId);
    }
});