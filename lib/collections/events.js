Events = new Mongo.Collection('events');
CanceledEvents = new Mongo.Collection('canceledEvents');

Meteor.methods({
    insertEvent: function (eventObj) {
        check(Meteor.userId(), NonEmptyString);
        check(eventObj, {
            eventName: NonEmptyString,
            type: NonEmptyString,
            description: NonEmptyString,
            date: NonEmptyString,
            begin: NonEmptyString,
            end: NonEmptyString,
            membersMinimum: Match.Where(function (x) {
                return x >= 2;
            }),
            membersMaximum: Match.Where(function (x) {
                return x >= 2;
            }),
        });
        
        
        
        var date = new Date(eventObj.date + ' ' + eventObj.begin);
        
        if (wasHappenEventDeadline(date)) return {wasHappenEventDeadline: true};

        var user = Meteor.user();
        var event = _.extend(eventObj, {
            owner: {_id: user._id, name: user.username},
            submitted: new Date()
        });

        var eventId = Events.insert(event);

        //добавляем организатора в список участников
        var orderId = Orders.insert({
                userId: user._id,
                eventId: eventId,
                eventName: event.name,
                status: orderStatuses.accepted,
                isOwner: true
            }, function (error) {
                if (error) throw new Meteor.Error(error);
            }
        );

        return {
            eventId: eventId
        };
    },
    editEvent: function (eventId, eventObj) {
        check(eventId, NonEmptyString);

        var prevEvent = Events.findOne(eventId);

        var prevMembersMinimum = prevEvent.membersMinimum;
        var prevMembersMaximum = prevEvent.membersMaximum;

        check(Meteor.userId(), NonEmptyString);
        check(eventObj, {
            // eventName: NonEmptyString,
            // type: NonEmptyString,
            description: NonEmptyString,
            membersMinimum: Match.Where(function (x) {
                return x <= prevMembersMinimum && x >= 2;
            }),
            membersMaximum: Match.Where(function (x) {
                return x >= prevMembersMaximum;
            }),
        });

        if(!isOwner(eventId)) throw new Meteor.Error('Чужое событие');

        Events.update(eventId, {$set: eventObj}, function (error) {
            if (error) throw new Meteor.Error(error);
        });

        eventObj.eventId = eventId;

        return eventObj;
    },
    shiftEvent: function (eventId, eventObj) {
        check(eventId, NonEmptyString);
        check(Meteor.userId(), NonEmptyString);
        check(eventObj, {
            date: NonEmptyString,
            begin: NonEmptyString,
            end: NonEmptyString,
        });

        if(!isOwner(eventId)) throw new Meteor.Error('Чужое событие');

        if (isEventShifted(eventId)) return {alreadyShifted: true, eventId: eventId};

        eventObj.shifted = true;

        Events.update(eventId, {$set: eventObj}, function (error) {
            if (error) throw new Meteor.Error(error);
        });

        eventObj.eventId = eventId;

        return eventObj;
    },
    cancelEvent: function (eventId) {
        check(eventId, NonEmptyString);
        check(Meteor.userId(), NonEmptyString);

        if(!isOwner(eventId)) throw new Meteor.Error('Чужое событие');
        
        var event = Events.findOne(eventId);

        CanceledEvents.insert(event,function (error) {
            if (error) throw new Meteor.Error(error);
        });

        Events.remove(eventId, function (error) {
            if (error) throw new Meteor.Error(error);
        });

        return {
            canceled: true,
            eventId: eventId
        }
    }
});

/**
 *  Возврщает массив id событий, создателем которых является пользователь
 */
currentUserCreatedEventsIds = function (userId) {
    var userEvents = Events.find({'owner._id': userId}).fetch();
    return _.map(userEvents, function (event) {
        return event._id;
    });
};

/**
 * является ли пользователь создателем события
 * @param eventId
 * @param {string=} userId
 * @returns {boolean}
 */
isOwner = function (eventId, userId) {
    if (!_.isString(userId)) userId = Meteor.userId();
    return !!Events.findOne({'owner._id': userId, _id: eventId});
};

isEventHappen = function (eventId) {
    var event = Events.findOne(eventId);

    if(!event) return false;
    
    var dateTime = event.date + " " + event.end;

    return new Date() > new Date(dateTime);
};

/**
 * проверяет началось ли событие
 * @param {string|object} event  - event id or event object
 * @returns {boolean}
 */
isEventStarted = function (event) {
    if (_.isString(event)) event = Events.findOne(event);

    var dateTime = event.date + " " + event.begin;

    return new Date() > new Date(dateTime);
};

isEventShifted = function (eventId) {
    return Events.findOne(eventId).shifted;
};

