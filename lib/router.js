Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return [Meteor.subscribe('events'),
            Meteor.subscribe('users'),
            Meteor.subscribe('orders')
        ];
    }
});

Router.route('/db', {
    name: 'db'
});



Router.route('/user/:username', {
    name: 'userPage',
    data: function () {
        return Meteor.users.findOne({username: this.params.username});
    }
});

//event begin
Router.route('/event/:_id', {
    name: 'event',
    data: function () {
        return Events.findOne(this.params._id);
    }
});

Router.route('/event/:_id/accepted-orders', {
    name: 'eventAcceptedOrders',
    data: function () {
        var eventId = this.params._id;
        var eventName = Events.findOne(eventId).eventName;
        return {
            users: function () {
                var orders = Orders.find({eventId: eventId, status: orderStatuses.accepted}).fetch();
                var userIds = _.map(orders, function (order) {
                    return order.userId;
                });

                return Meteor.users.find({_id: {$in: userIds}});
            },
            eventId:eventId,
            eventName: eventName
        }
    },
    onBeforeAction: function () {
        if (isMyEvent(this.params._id)) this.next();
        else this.render('accessDenied');
    }
});

Router.route('/event/:_id/rejected-orders', {
    name: 'eventRejectedOrders',
    data: function () {
        var eventId = this.params._id;
        var eventName = Events.findOne(eventId).eventName;
        return {
            users: function () {
                var orders = Orders.find({eventId: eventId, status: orderStatuses.rejected}).fetch();
                var userIds = _.map(orders, function (order) {
                    return order.userId;
                });

                return Meteor.users.find({_id: {$in: userIds}});
            },
            eventId:eventId,
            eventName: eventName
        }
    }, onBeforeAction: function () {
        if (isMyEvent(this.params._id)) this.next();
        else this.render('accessDenied');
    },
});
//event end

Router.route('/create-event', {
    name: 'createEvent',
});

Router.route('/date/:year/:month/:day', {
    name: 'day',
    data: function () {
        var params = this.params;
        return {
            socialEvents: function () {
                var types = getTypesFromQuery();
                if (types) {
                    return Events.find({date: formatDateToIso(params.year, params.month, params.day), type:{$in:types}}, {sort: {begin: 1}});
                }
                return Events.find({date: formatDateToIso(params.year, params.month, params.day)}, {sort: {begin: 1}});
            },
            date: formatToLocalDate.from3args(params.year, params.month, params.day),
            monthName: getMonthNameByNumber(params.month),
            month:params.month,
            year:params.year
        }
    }
});

//month begin

//Router.route('/popular/date/:year/:month/', {
//    name: 'monthPopular',
//    data: function () {
//        return {
//            socialEvents: function(){
//
//                return Events.find({date:{$regex:'^2016-04'}});
//            }
//        }
//    }
//});

Router.route('/date/:year/:month', {
    name: 'monthCalendar',
    data: function () {
        return {
            year: +this.params.year,
            month: +this.params.month
        }
    }
});


//month end


Router.route('/my-created-events', {
    name: 'myCreatedEvents',
    data: function () {
        return {
            socialEvents: Events.find({'owner._id': Meteor.userId()})
        }
    }
});

Router.route('/my-event-orders', {
    name: 'myEventOrders',
    data: function () {
        if (Meteor.userId()) { //todo
            var orders = Orders.find({userId: Meteor.userId()}).fetch();
            var eventIds = _.map(orders, function (order) {
                return order.eventId;
            });
            return {
                socialEvents: Events.find({_id: {$in: eventIds}}, {sort: {begin: 1}})
            }
        }
    }
});


// Router.route('/', function () {
//     this.response.writeHead(301, {'Location': '/date/' + getCurrentYear() + '/' + getCurrentMonth()});
//     this.response.end();
// }, {where: 'server', name: 'main'});

Router.route('/', {
    name: 'mainCalendar',
    data: function () {
        
        return {
            year: +getCurrentYear(),
            month: +getCurrentMonth()
        }
    }
});


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

var requireAdmin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        if (!isAdmin()) {
            this.render('accessDenied');
        } else {
            this.next();
        }
    }
};

Router.onBeforeAction('dataNotFound', {only: ['event']});

Router.onBeforeAction(requireLogin, {only: ['createEvent', 'myEventOrders', 'myCreatedEvents']});
Router.onBeforeAction(requireAdmin, {only: ['db']});

