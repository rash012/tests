Meteor.startup(function () {
  if (Events.find().count() === 0) {
    Events.insert({
      name:'пенная вечеринка',
      type:'вечеринка',
      date:'2016-04-15',
    });
  }
  if (Meteor.users.find().count() === 0) {

  }
});

