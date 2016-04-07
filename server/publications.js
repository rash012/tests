Meteor.publish('events', function () {
  return Events.find();
});

Meteor.publish('orders', function () {
  return Orders.find();
});