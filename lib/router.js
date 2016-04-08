Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [Meteor.subscribe('events'),Meteor.subscribe('orders'),Meteor.subscribe('users')];
  }
});

Router.route('/user/:username', {
  name: 'userPage',
  data: function () {
    return Meteor.users.findOne({username:this.params.username});
  }
});

Router.route('/event/:_id', {
  name: 'event',
  data: function () {
    return Events.findOne(this.params._id);
  }
});

Router.route('/create-event', {
  name: 'createEvent',

});

Router.route('/date/:year/:month/:day', {
  name: 'day',
  data: function () {
    return {
      socialEvents: Events.find({date: formatDateToIso(this.params.year, this.params.month, this.params.day)},{sort:{begin:1}}),
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

//Router.route('/my-events', {
//  name: 'myEvents',
//  data: function(){
//    return {
//      //myCreatedEvents: Events.find({userId:Meteor.userId()})
//    }
//  }
//});

Router.route('/my-created-events', {
  name: 'myCreatedEvents',
  data: function(){
    return {
      socialEvents: Events.find({userId:Meteor.userId()})
    }
  }
});

Router.route('/my-event-orders', {
  name: 'myEventOrders',
  data: function(){
    var orders = Orders.find({userId:Meteor.userId()},{fields:{eventId:1}}).fetch();
    var eventIds = _.map(orders,function(order){
      return order.eventId;
    });
    return {
      socialEvents: Events.find({_id:{$in:eventIds}},{sort:{begin:1}})
    }
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

