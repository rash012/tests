Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [Meteor.subscribe('events')];
  }
});

Router.route('/event/:_id', {
  name: 'event',
  data: function () {
    return Events.findOne(this.params._id);
  },
  waitOn: function(){
    return Meteor.subscribe('orders');
  }
});

Router.route('/create-event', {
  name: 'createEvent',

});

Router.route('/date/:year/:month/:day', {
  name: 'day',
  data: function () {
    return {
      socialEvents: Events.find({date: formatDateToIso(this.params.year, this.params.month, this.params.day)}),
      date: formatToLocalDate.from3args(this.params.year, this.params.month, this.params.day)
    }
  }
});

Router.route('/date/:year/:month', {
  name: 'monthCalendar',
  data: function(){
    return {
      year: +this.params.year,
      month: +this.params.month
    }
  }
});

Router.route('/my-events', {
  name: 'myEvents',
  data: function(){
    return {
      //myCreatedEvents: Events.find({userId:Meteor.userId()})
    }
  }
});

Router.route('/my-events/my-created-events', {
  name: 'myCreatedEvents',
  data: function(){
    return {
      socialEvents: Events.find({userId:Meteor.userId()})
    }
  }
});

Router.route('/my-events/my-event-orders', {
  name: 'myEventOrders',
  data: function(){
    return {
      orders: Orders.find({userId:Meteor.userId()})
    }
  },
  waitOn: function(){
    return Meteor.subscribe('orders');
  }
});



Router.route('/', function () {
  this.response.writeHead(301, {'Location': '/date/' + getCurrentYear() + '/' + getCurrentMonth()});
  this.response.end();
}, {where: 'server',name:'main'});

var requireLogin = function () {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {only: ['event']});

//Router.onBeforeAction(requireAdmin, {
//  only: ['orderSubmit', 'orderEdit', 'adminUserAdding', 'usersList', 'adminOrdersList', 'adminDoneOrdersList',
//    'adminUserOrdersList','adminUserUploads','adminUserEdit','adminUserPage']
//});
//
Router.onBeforeAction(requireLogin, {only: ['createEvent']});

