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
                if (result.wasHappenEventDeadline) {
                    throwError('Событие можно создавать минимум за ' + eventDeadline + ' часов до начала');
                    return;
                }
                Router.go('event', {_id: result.eventId});
                showAlert('Событие успешно добавлено');
            }
        });
    }
});


Template.createEvent.helpers({
    hint: "Создавать события можно минимум за " + eventDeadline + " часов до его начала.\
    <br><br>Участником события может стать пользователь, подавший заявку на участие и принятый создателем\
        события.\
        <br><br>Участник может снять заявку, принятую создателем события, при этом в его профиле будет указано\
        количество отказов\
        от участия.\
    <br><br>Созданное событие можно отменить, в таком случае создатель события лишится права создавать события в\
течение 2 недель, в профиле создателя события будет указано количество отмененённых событий, а участники\
отменённого события смогут оставить создателю события отзывы.\
<br><br>Созданное событие можно перенести 1 раз, не менее чем за " + eventDeadline + " часов до его начала, в профиле создателя\
события будет отображено количество перенесённых событий. Участник перенесённого события сможет свободно\
отказаться от участия в нём или не явиться, в его профиле отказ или неявка учтены не будут.\
<br><br>Все поля обязательны для заполнения."
});

//todo нельзя создать событие в прошлом
