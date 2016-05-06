Orders = new Mongo.Collection('orders');

Meteor.methods({
    insertOrder: function (eventId) {
        check(Meteor.userId(), NonEmptyString);
        check(eventId, NonEmptyString);

        var user = Meteor.user();

        var isSubmitted = Orders.findOne({userId: user._id, eventId: eventId});
        if (isSubmitted) {
            return {
                eventId: eventId,
                orderExists: true
            }
        }

        if (isOwner(eventId)) {
            return {
                eventId: eventId,
                isOwner: true,
                orderSubmit: false
            }
        }

        Orders.insert({
                userId: user._id,
                eventId: eventId,
                status: orderStatuses.expects
            }, function (error) {
                if (error) throw new Meteor.Error(error);
            }
        );

        return {
            eventId: eventId,
            orderSubmit: true,
            orderStatus: orderStatuses.expects
        };
    },
    acceptOrder: function (eventId, submitterId) {
        check(Meteor.userId(), NonEmptyString);
        check(eventId, NonEmptyString);
        check(submitterId, NonEmptyString);

        if (!isOwner(eventId)) throw new Meteor.Error('Принять заявку может только создатель события!');

        var event = Events.findOne(eventId);
        var date = new Date(event.date + ' ' + event.begin);
        if (wasHappenAcceptOrderDeadline(date)) {
            throw new Meteor.Error('Наступил дэдлайн по принятию заявок');
        }

        Orders.update({
                userId: submitterId,
                eventId: eventId
            }, {$set: {status: orderStatuses.accepted}}
        );

        return {
            submitterId: submitterId,
            eventId: eventId,
            orderStatus: orderStatuses.accepted
        }
    },
    rejectOrder: function (eventId, submitterId) {
        check(Meteor.userId(), NonEmptyString);
        check(eventId, NonEmptyString);
        check(submitterId, NonEmptyString);

        if (!isOwner(eventId)) throw new Meteor.Error('Отклонить заявку может только создатель события!');

        Orders.update({
                userId: submitterId,
                eventId: eventId
            }, {$set: {status: orderStatuses.rejected}},
            function (error) {
                if (error) throw new Meteor.Error(error.reason);
            }
        );

        return {
            submitterId: submitterId,
            eventId: eventId,
            orderStatus: orderStatuses.rejected
        }
    },
    removeOrder: function (eventId) {
        check(Meteor.userId(), NonEmptyString);
        check(eventId, NonEmptyString);

        Orders.remove({userId: Meteor.userId(), eventId: eventId}, function (error) {
            if (error) throw new Meteor.Error(error.reason);
        });

        return {
            eventId: eventId,
            orderRemove: true
        };
    }
});

getOrderStatus = function (eventId, userId) {
    return Orders.findOne({userId: userId, eventId: eventId}).status;
};

/**
 * возвращает количество заявок на событие
 * @param eventId {string}
 * @param status {string=}
 * @returns {number}
 */
getOrdersCount = function (eventId, status) {
    if (_.isString(status)) {
        if (status == orderStatuses.accepted) return Orders.find({eventId: eventId, status: status}).count() - 1;//вычитаем организатора
        return Orders.find({eventId: eventId, status: status}).count();
    }
    else return Orders.find({eventId: eventId}).count() - 1;//вычитаем организатора
};

wasHappenAcceptOrderDeadline = function (date) {
    return (date.getTime() - new Date().getTime()) < (1000 * 60 * 60);
};
wasHappenAcceptOrderDeadline.fromEventId = function (eventId) {
    var date = Events.findOne(eventId).date;
    var time = Events.findOne(eventId).begin;

    return wasHappenAcceptOrderDeadline(new Date(date + ' ' + time));
};