orderStatuses = {
    accepted: 'accepted',
    rejected: 'rejected',
    expects: 'expects'
};

//eventTypes = {
//    poker:'покер',
//    boardGame: 'настольная игра',
//    party: 'вечеринка',
//    meeting: 'встреча'
//};

eventTypes = ['покер', 'настольная игра', 'вечеринка', 'встреча','просмотр фильма','видеоигра','другое'];

eventThemes = ['кино','видеоигры','бизнес', 'другое'];

weekDays = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];

eventDeadline = 6; //дэдлайн по переносу и созданию события
orderAcceptingDeadline = 1;

//миллисекунд в дне
msInDay = 1000 * 60 * 60 * 24;