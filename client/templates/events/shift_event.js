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
                if (result.alreadyShifted) {
                    throwError('Событие можно перенести только один раз');
                    return
                }
                if (result.wasHappenEventCreateDeadline) {
                    throwError('Событие можно перенести минимум за ' + eventCreateDeadline + ' часов до начала');
                    return;
                }
                Router.go('event', {_id: result.eventId});
                showAlert('Событие успешно перенесено');
            }
        });
    }
});

Template.shiftEvent.helpers({
    hint: 'Созданное событие можно перенести 1 раз, не менее чем за ' + eventCreateDeadline + ' часов до его начала, в профиле создателя\
        события будет отображено количество перенесённых событий. Участник перенесённого события сможет свободно\
        отказаться от участия в нём или не явиться, в его профиле отказ или неявка учтены не будут.'
});