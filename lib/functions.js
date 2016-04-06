getMonthNameByNumber = function(monthNumber){
  switch (monthNumber){
    case 0: return 'январь';
    case 1: return 'февраль';
    case 2: return 'март';
    case 3: return 'апрель';
    case 4: return 'май';
    case 5: return 'июнь';
    case 6: return 'июль';
    case 7: return 'август';
    case 8: return 'сентябрь';
    case 9: return 'октябрь';
    case 10: return 'ноябрь';
    case 11: return 'декабрь';
  }
};

Date.prototype.isLeapYear = function()
{
  var y = (new Date).getFullYear();
  return y % 4 == 0 && y % 100 != 0 || y % 400 == 0;
};

Date.prototype.getDaysInMonth = function()
{
  return arguments.callee[this.isLeapYear() ? 'L' : 'R'][(new Date).getMonth()];
};

// durations of months for the regular year
Date.prototype.getDaysInMonth.R = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// durations of months for the leap year
Date.prototype.getDaysInMonth.L = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

getCurrentYear = function(){
  (new Date).getFullYear();
};
getCurrentMonth = function(){
  (new Date).getMonth();
};
getCurrentDay = function(){
  (new Date).getDay();
};