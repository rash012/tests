Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [Meteor.subscribe('events')];
  }
});

//Router.route('/', {
//  name: 'monthCalendar'
//});



Router.route('/events/:year/:month/:day', {
  name: 'day',
  data: function () {
    return {
      events: function () {
        return Events.find({date: this.params.year + '-' + this.params.month + '-' + this.params.day});
      },
      date: function () {
        return this.params.day + '-' + this.params.month + '-' + this.params.year;
      }
    }
  }
});

Router.route('/events/:year/:month', {
  name: 'monthCalendar',
  data: function(){
    return {
      year: this.params.year,
      month: this.params.month
    }
  }
});

Router.route('/', function () {
  this.response.writeHead(301, {'Location': '/events/' + getCurrentYear() + '/' + getCurrentMonth()});
  this.response.end();
}, {where: 'server'});


//Router.onBeforeAction('dataNotFound', {only: ['orderPage', 'adminUserPage']});
//
//Router.onBeforeAction(requireAdmin, {
//  only: ['orderSubmit', 'orderEdit', 'adminUserAdding', 'usersList', 'adminOrdersList', 'adminDoneOrdersList',
//    'adminUserOrdersList','adminUserUploads','adminUserEdit','adminUserPage']
//});
//
//Router.onBeforeAction(requireLoginNotAdmin, {only: ['acceptedOrdersList', 'doneOrdersList']});
//
