Template.createEvent.events({
    'submit form': function (e) {
        e.preventDefault();

        //var convertedDate = convertDate($(e.target).find('[name=date]').val());

        var event = {
            eventName: $(e.target).find('[name=event-name]').val(),
            type: $(e.target).find('[name=type]').val(),
            description: $(e.target).find('[name=description]').val(),
            date: $(e.target).find('[name=date]').val(),
            begin: $(e.target).find('[name=begin]').val(),
            end: $(e.target).find('[name=end]').val(),
            membersMinimum: +$(e.target).find('[name=members-minimum]').val(),
            membersMaximum: +$(e.target).find('[name=members-maximum]').val(),
        };

        Meteor.call('insertEvent', event, function (error, result) {
            if (error) {
                return throwError(error.reason);
            }
            if (result) {
                //$('form').trigger('reset');
                if (result.wasHappenEventDeadline) {
                    throwError('Событие можно создавать минимум за ' + eventDeadline + ' часов до начала');
                }
                Router.go('event', {_id: result.eventId});
                showAlert('Событие успешно добавлено');
            }
        });
    }
});

