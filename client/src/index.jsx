import React from 'react';
import ReactDOM from 'react-dom';
import CalendarBoard from './CalendarBoard.jsx';
import { getMonthDays, getFullYear, getMonthFirstDay, createMonth, getMonth } from './help.js';


class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currentYear: null,
      monthName: null,
      monthNumber: null,
      grid: []
    }
    this.goToNextMonth = this.goToNextMonth.bind(this);
    this.goToPreviousMonth = this.goToPreviousMonth.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

  }
  componentDidMount() {
    var currentYear = +(new Date().getFullYear());
    var currentMonth = +(new Date().getMonth()) + 1;
    var monthFirstDay = getMonthFirstDay(currentMonth, currentYear);
    var days = getMonthDays(currentMonth);
    var monthName = getMonth(currentMonth);
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
  goToNextMonth () {
    console.log('next')
    var currentYear = this.state.currentYear;
    var currentMonth = this.state.monthNumber;
    var newMonth = currentMonth +1;
    console.log('newMonth', newMonth)
    var monthFirstDay = getMonthFirstDay(newMonth, currentYear);
    var days = getMonthDays(newMonth);
    console.log('daysOfNext', days)
    console.log('monthFirstDay', monthFirstDay)
    var monthName = getMonth(newMonth);
    var grid = createMonth(days, monthFirstDay);
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
    var monthFirstDay = getMonthFirstDay(newMonth, currentYear);
    var days = getMonthDays(newMonth)
    console.log('daysOfNext', days)
    console.log('monthFirstDay', monthFirstDay);
    var monthName = getMonth(newMonth);
    var grid = createMonth(days, monthFirstDay);
    this.setState({
      grid: grid,
      currentYear: currentYear,
      monthName: monthName,
      monthNumber: newMonth
    })
 }
//clicking on day component and returns the value which is 'month-day' clicked on
 onDayClick(e) {
   console.log('clicked on day');
   console.log(e.target.id);

 }

  render () {
   // var monthAndYear = `${this.state.month} ${this.state.currentYear}`;
    return (
      <div><CalendarBoard monthNum={this.state.monthNumber} month={this.state.monthName} year={this.state.currentYear}monthGrid={this.state.grid} onNext={this.goToNextMonth} onPrevious={this.goToPreviousMonth} onDayClick={this.onDayClick}/></div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));