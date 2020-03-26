import React from 'react';
import ReactDOM from 'react-dom';
import CalendarBoard from './CalendarBoard.jsx';
import PriceBreakup from './PriceBreakup.jsx';
import { getMonthDays, getFullYear, getMonthFirstDay, createMonth, getMonth, iterateOverDataArray, calculateNumOfNights } from './helperFunc.js';
import $ from 'jquery';


class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currentYear: null, //calendarComponent
      monthName: null,  //calendarComponent
      monthNumber: null,  //calendarComponent
      grid: [], //monthGrid
      toggleCheckinToDisplayCalendar: false,
      timesToggledonCheckinAndCheckOut: 0,
      displayCheckOut: false,
      checkin: null,  //input from user
      checkout: null,  //input from user
      bookedDates: [], //fetched from db
      listingName: '',
      price: null,
      tax: null,
      serviceFee: 0.1,
      numOfNights: null,
      maxGuests: null,
      weekedBoolean: null,
      displayPriceBreakup: false


    }
    //bookedDates inside state are manually entered mock data for testing
    this.goToNextMonth = this.goToNextMonth.bind(this);
    this.goToPreviousMonth = this.goToPreviousMonth.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.onClickCheckinButton = this.onClickCheckinButton.bind(this);
    this.displayCheckOutDate = this.displayCheckOutDate.bind(this);
    this.clearDatesButton = this.clearDatesButton.bind(this);
    this.getBookedDates = this.getBookedDates.bind(this);
    this.getBookingInfo = this.getBookingInfo.bind(this);
    this.postIdToServer = this.postIdToServer.bind(this);


  }
  componentDidMount() {
    var currentYear = +(new Date().getFullYear());
    var currentMonth = +(new Date().getMonth()) + 1;
    var monthFirstDay = getMonthFirstDay(currentMonth, currentYear)
    var days = getMonthDays(currentMonth)
    var monthName = getMonth(currentMonth)
    //console.log('monthName', typeof monthName)
    //console.log(monthFirstDay)
    var grid = createMonth(days, monthFirstDay);
    this.setState({
      currentYear: currentYear,
      monthName: monthName,
      grid: grid,
      monthNumber: currentMonth
    })
    var urlOne = '/';
    var listingId = 10001
    this.postIdToServer(urlOne, listingId);
    this.getBookedDates('/getBookedDates', listingId);
  }
  onClickCheckinButton () {

     this.setState({
       toggleCheckinToDisplayCalendar: !this.state.toggleCheckinToDisplayCalendar,

     })

  }


  //Calendar Component methods
   goToNextMonth () {
     console.log('next')
    var currentYear = this.state.currentYear;
    var currentMonth = this.state.monthNumber
    var newMonth = currentMonth +1;
    console.log('newMonth', newMonth)
    var monthFirstDay = getMonthFirstDay(newMonth, currentYear)
    var days = getMonthDays(newMonth)
    console.log('daysOfNext', days)
    console.log('monthFirstDay', monthFirstDay)
    var monthName = getMonth(newMonth)
    var grid = createMonth(days, monthFirstDay)
    this.setState({
      grid: grid,
      currentYear: currentYear,
      monthName: monthName,
      monthNumber: newMonth
    })
  }
  goToPreviousMonth () {
    console.log('Previous')
   var currentYear = this.state.currentYear;
   var currentMonth = this.state.monthNumber;
   var newMonth = currentMonth -1;
   console.log('newMonth', newMonth)
   var monthFirstDay = getMonthFirstDay(newMonth, currentYear)
   var days = getMonthDays(newMonth)
   console.log('daysOfNext', days)
   console.log('monthFirstDay', monthFirstDay)
   var monthName = getMonth(newMonth)
   var grid = createMonth(days, monthFirstDay)
   this.setState({
     grid: grid,
     currentYear: currentYear,
     monthName: monthName,
     monthNumber: newMonth
   })
 }
 onDayClick(e) {
   console.log('onDayClick', e.target.id)
  var clickedTimes = this.state.timesToggledonCheckinAndCheckOut;
  this.setState({
    timesToggledonCheckinAndCheckOut: clickedTimes+1
  })
  if (this.state.timesToggledonCheckinAndCheckOut < 1) {
   var checkInDate = e.target.id;
   var newStr = checkInDate.replace('-', '/')
   console.log('newStr', newStr)
   newStr = '2020/' + newStr;
    this.setState({
      checkin: newStr,
      displayCheckOut: !this.state.displayCheckOut
    })
  }

  if (this.state.checkin) {
    this.displayCheckOutDate(e);
  }

 }

 displayCheckOutDate (e) {
 console.log('went in displayCheckOutDate')
  var checkOutDate = e.target.id;
  console.log('checkOutDate', checkOutDate)
  if (this.state.checkin) {
  var checkInDate = this.state.checkin;
  console.log('checkInDate', checkInDate)
  var checkIn = checkInDate.slice(5)
  var checkInFormatted = checkIn.replace('/', '-');
  var numOfNights = calculateNumOfNights(checkInFormatted, checkOutDate)
  this.setState({numOfNights: numOfNights})
  }
  var newStr = checkOutDate.replace('-', '/');
  newStr = '2020/' + newStr;


    this.setState({
      checkout: newStr,
      toggleCheckinToDisplayCalendar: !this.state.toggleCheckinToDisplayCalendar,
      displayPriceBreakup: true
    })


 }
 clearDatesButton () {
   console.log('clear Dates')

   this.setState({
     checkin: null,
     checkout: null,
     timesToggledonCheckinAndCheckOut: 0,
     numOfNights: null,
     displayCheckOut: true,
     displayPriceBreakup: false
   })
 }
 getDataFromDb (listingId, callback) {
   $.ajax({
     method: 'GET',
     url: endPoint,
     success: (data) => {
       callback(null, data);
     },
     error: (err) => {
       console.log('error', err);
     }
   })
 }
 postIdToServer (url, id) {
  var bodyObj = {
    listingId: id
  };
  $.ajax({
    method: 'POST',
    url: url,
    data: bodyObj,
    success: (data) => {
    var parsedData = JSON.parse(data);
    console.log('parsedData', parsedData)
    var name = parsedData[0].listingName;
    var price = parsedData[0].pricePerNight;
    var maxGuests = parsedData[0].maxGuests;
    var weekendBoolean = parsedData[0].weekend;
    var tax = parsedData[0].tax;
    this.setState({
      listingName: name,
      price: price,
      maxGuests: maxGuests,
      tax: tax
    })
    },
    error: (err) => {
      console.log('error', err);
    }
  })

 }
 getBookingInfo () {

 }

 getBookedDates (url, id) {
  var bodyObj = {
    listingId: id
  };
  $.ajax({
    method: 'POST',
    url: url,
    data: bodyObj,
    success: (data) => {
    var parsedData = JSON.parse(data);
    console.log('parsedData', parsedData)
    var checkIn = parsedData[0].checkIn;
    var checkOut = parsedData[0].checkOut;
    console.log('getBookedDates', parsedData)
    var bookedDatesArray = iterateOverDataArray(parsedData)
    this.setState({
      bookedDates: bookedDatesArray
    })
    },
    error: (err) => {
      console.log('error', err);
    }
  })

 }


  render () {
    var placeHolderOne;
    var placeHolderTwo;
    if (this.state.checkin !== null) {
      placeHolderOne = this.state.checkin;
    } else {
      placeHolderOne = 'Check-in';
    }
    if (this.state.timesToggledonCheckinAndCheckOut > 1 && this.state.checkin !== null) {
      placeHolderTwo = this.state.checkout;
    } else {
      placeHolderTwo = 'Checkout';
    }
    return (
      <>
      <p>${this.state.price} per night</p>
      <p>placeholder for average reviews</p>
     <button onClick={this.onClickCheckinButton}>{placeHolderOne}</button><button>{placeHolderTwo}</button>

    <div>{this.state.toggleCheckinToDisplayCalendar &&<CalendarBoard monthNum={this.state.monthNumber} month={this.state.monthName} year={this.state.currentYear}monthGrid={this.state.grid} onNext={this.goToNextMonth} onPrevious={this.goToPreviousMonth} onDayClick={this.onDayClick} onClear={this.clearDatesButton} booked={this.state.bookedDates}/>}</div>
    <div><select><option>Guests</option></select></div>
    <div>{this.state.displayPriceBreakup && <PriceBreakup numOfNights={this.state.numOfNights} serviceFee={this.state.serviceFee} price={this.state.price} tax={this.state.tax}/>}</div>
    <button>Reserve</button>
      </>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))