


const zeroPad = (value, length) => {
  return `${value}`.padStart(length, '0');
}

var padding = (n, weekArr) => {
  var pad = '';
  var j = 0;
  while (j < n) {
    weekArr.push(pad);
    j++;
  }
}

export var createMonth = (monthDays, firstDayOfTheMonth) => {
  console.log('went inside createMonth Func')
  var board = [];
  var week = [];
  var padNum = 7 - firstDayOfTheMonth;
  //adding spaces before first day of the month on the first week
  padding(firstDayOfTheMonth, week);
  for (var i = 1; i <= monthDays; i++) {
    week.push(i)
    if (i === monthDays) {
      while (week.length < 7) {
     //   console.log('a', i)
        var padNeeded = 7 - week.length;
        //adding spaces after the last day of the month on the last week
        padding(padNeeded, week);
      }
    }
    if (week.length === 7) {
      board.push(week);
      week = [];
    }
   // console.log('3')
 }
 //console.log('2')
 return board;

}

export var currentYear = +(new Date().getFullYear());

export var currentMonth = +(new Date().getMonth()) + 1;


export var getMonthDays = (month, year) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;

  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
      ? 30
      : 31;
}





export const getMonthFirstDay = (month, currentYear) => {
  var value;
  value = Math.abs(new Date(`${currentYear}-${zeroPad(month, 2)}`).getDay() + 1);
  if (value === 7) {
    return 0;
  } else {
    return value;
  }
}
//get the month in words
export const getMonth = (value) => {
  var months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  }
  return months[value];
}

export const zeroPadding = (n) => {
  if (String(n).length === 1) {
    n =`0${n}`;
  }
  return n;
}


