Meteor.startup(function () {
  if (Events.find().count() === 0) {
    Events.insert({
      eventName:'пенная вечеринка',
      type:'вечеринка',
      date:'2016-04-15',
      begin: '01:10'
    });
    Events.insert({
      eventName:'пенная вечеринка2',
      type:'вечеринка',
      date:'2016-04-15',
      begin: '01:00'
    });
  }
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'test',
      email: 'test@test.ru',
      password: ' ',
    });
  }
});

