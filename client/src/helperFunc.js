const zeroPad = (value, length) => {
  return `${value}`.padStart(length, "0");
};

let padding = (n, weekArr) => {
  let pad = "";
  let j = 0;
  while (j < n) {
    weekArr.push(pad);
    j++;
  }
};

export let createMonth = (monthDays, firstDayOfTheMonth) => {
  console.log("went inside createMonth Func");
  let board = [];
  let week = [];
  let padNum = 7 - firstDayOfTheMonth;
  //adding spaces before first day of the month on the first week
  padding(firstDayOfTheMonth, week);
  for (let i = 1; i <= monthDays; i++) {
    week.push(i);
    if (i === monthDays) {
      while (week.length < 7) {
        //   console.log('a', i)
        let padNeeded = 7 - week.length;
        //adding spaces after the last day of the month on the last week
        padding(padNeeded, week);
      }
    }
    if (week.length === 7) {
      board.push(week);
      week = [];
    }
  }

  return board;
};

export let currentYear = +new Date().getFullYear();

export let currentMonth = +new Date().getMonth() + 1;

export let getMonthDays = (month, year) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;

  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
};

export const getMonthFirstDay = (month, currentYear) => {
  let value;
  value = Math.abs(
    new Date(`${currentYear}-${zeroPad(month, 2)}`).getDay() + 1
  );
  if (value === 7) {
    return 0;
  } else {
    return value;
  }
};
//get the month in words
export const getMonth = (value) => {
  let months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return months[value];
};

export const zeroPadding = (n) => {
  if (String(n).length === 1) {
    n = `0${n}`;
  }
  return n;
};

export const getDatesRange = (checkIn, checkOut) => {
  let storage = [];
  let year = 2020;
  let dateString;
  let checkInMonth = checkIn.slice(0, 2);
  let checkOutMonth = checkOut.slice(0, 2);
  let checkInMonthDays = Number(checkIn.slice(3));
  let checkOutMonthDays = Number(checkOut.slice(3));

  //same month for checkin date and checkout date
  if (checkInMonth === checkOutMonth) {
    for (let i = checkInMonthDays; i <= checkOutMonthDays; i++) {
      dateString = `${checkInMonth}-${i}`;
      storage.push(dateString);
    }
  }
  if (checkInMonth !== checkOutMonth) {
    let month;
    if (checkInMonth[0] === "0") {
      month = Number(checkInMonth.slice(1));
    } else {
      month = Number(checkInMonth);
    }
    let days = getMonthDays(month, year);

    for (let i = checkInMonthDays; i <= days; i++) {
      dateString = `${checkInMonth}-${i}`;
      storage.push(dateString);
    }
    for (let i = 1; i < checkOutMonthDays; i++) {
      dateString = `${checkOutMonth}-${i}`;
      storage.push(dateString);
    }
  }
  return storage;
};

export const iterateOverDataArray = (data) => {
  let storage = [];
  for (let i = 0; i < data.length; i++) {
    let eachObj = data[i];
    let checkIn = eachObj.checkIn;
    let checkOut = eachObj.checkOut;
    let storageRangePerDataSet = getDatesRange(checkIn, checkOut);
    storage = storage.concat(storageRangePerDataSet);
  }
  return storage;
};

export const calculateNumOfNights = (checkIn, checkOut) => {
  let numOfNights;
  let month;
  let year = 2020;
  let checkInMonth = checkIn.slice(0, 2);
  let checkOutMonth = checkOut.slice(0, 2);
  let checkInMonthDays = Number(checkIn.slice(3));
  let checkOutMonthDays = Number(checkOut.slice(3));
  if (checkInMonth === checkOutMonth) {
    numOfNights = checkOutMonthDays - checkInMonthDays;
  } else {
    if (checkInMonth[0] === "0") {
      month = Number(checkInMonth.slice(1));
    } else {
      month = Number(checkInMonth);
    }
    let days = getMonthDays(month, year);
    let firstSetOfDaysFromCheckInMonth = days - checkInMonthDays;
    let secondSetOfDaysFromCheckOutMonth = checkOutMonthDays;
    numOfNights =
      firstSetOfDaysFromCheckInMonth + secondSetOfDaysFromCheckOutMonth - 1;
  }
  return numOfNights;
};
