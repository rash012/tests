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
  }
});

Router.route('/create-event', {
  name: 'createEvent',

});

Router.route('/date/:year/:month/:day', {
  name: 'day',
  data: function () {
    return {
      events1: Events.find({date: formatDateToIso(this.params.year, this.params.month, this.params.day)}),
      date: formatToLocalDate(this.params.year, this.params.month, this.params.day)
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

