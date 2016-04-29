Template.shiftEvent.events({
    'submit form': function (e) {
        e.preventDefault();

        var event = {
            date: $(e.target).find('[name=date]').val(),
            begin: $(e.target).find('[name=begin]').val(),
            end: $(e.target).find('[name=end]').val(),
        };

        var eventId = Router.current().params._id;

        Meteor.call('shiftEvent', eventId, event, function (error, result) {
            if (error) {
                return throwError(error.reason);
            }
            if (result) {
                if(result.alreadyShifted) {
                    throwError('Событие можно перенести только один раз');
                    return
                }
                Router.go('event', {_id: result.eventId});
                showAlert('Событие успешно перенесено');
            }
        });
    }
});