import React from 'react';
import ReactDOM from 'react-dom';
import CalendarBoard from './CalendarBoard.jsx';
import { getMonthDays, getFullYear, getMonthFirstDay, createMonth, getMonth } from './help.js'


class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currentYear: null,
      monthName: null,
      monthNumber: null,
      grid: [],
      toggleCheckinToDisplayCalendar: false,
      timesToggledonCheckinAndCheckOut: 0,
      displayCheckOut: false,
      checkin: null,
      checkout: null,
      bookedDates: ['03-14','03-15', '03-16']
    }
    //bookedDates inside state are manually entered mock data for testing
    this.goToNextMonth = this.goToNextMonth.bind(this);
    this.goToPreviousMonth = this.goToPreviousMonth.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.onClickCheckinButton = this.onClickCheckinButton.bind(this);
    this.displayCheckOutDate = this.displayCheckOutDate.bind(this);
    this.clearDatesButton = this.clearDatesButton.bind(this);


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

  if (this.state.displayCheckOut) {
    this.displayCheckOutDate(e);
  }

 }

 displayCheckOutDate (e) {
 console.log('went in displayCheckOutDate')
  var checkOutDate = e.target.id;
  var newStr = checkOutDate.replace('-', '/')
  newStr = '2020/' + newStr;
    this.setState({
      checkout: newStr
    })
 }
 clearDatesButton () {
   console.log('clear Dates')
   this.setState({
     checkin: null,
     checkout: null,
     timesToggledonCheckinAndCheckOut: 0
   })
 }

  render () {
    var placeHolderOne;
    var placeHolderTwo;
    if (this.state.toggleCheckinToDisplayCalendar && this.state.checkin !== null) {
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
     <button onClick={this.onClickCheckinButton}>{placeHolderOne}</button><button>{placeHolderTwo}</button>

    <div>{this.state.toggleCheckinToDisplayCalendar &&<CalendarBoard monthNum={this.state.monthNumber} month={this.state.monthName} year={this.state.currentYear}monthGrid={this.state.grid} onNext={this.goToNextMonth} onPrevious={this.goToPreviousMonth} onDayClick={this.onDayClick} onClear={this.clearDatesButton} booked={this.state.bookedDates}/>}</div>
      </>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))