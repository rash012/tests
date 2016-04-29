Template.editEvent.helpers({
    selectedType: function (type) {
        if (type == this.type) return 'selected';
        return '';
    }
});
Template.editEvent.events({
    'submit form': function (e) {
        e.preventDefault();

        var event = {
            // eventName: $(e.target).find('[name=event-name]').val(),
            // type: $(e.target).find('[name=type]').val(),
            description: $(e.target).find('[name=description]').val(),
            membersMinimum: +$(e.target).find('[name=members-minimum]').val(),
            membersMaximum: +$(e.target).find('[name=members-maximum]').val(),
        };

        var eventId = Router.current().params._id;

        Meteor.call('editEvent', eventId, event, function (error, result) {
            if (error) {
                return throwError(error.reason);
            }
            if (result) {
                Router.go('event', {_id: result.eventId});
                showAlert('Событие успешно изменено');
            }
        });
    }
});