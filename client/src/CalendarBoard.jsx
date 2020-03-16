import React from 'react';
import WeekRow from './WeekRow.jsx';
//import createMonth from './help.js'

var CalendarBoard = (props) => {

 //const arr = createMonth(31, 6)

 return (
  <div>
    <h2>{props.month} {props.year}</h2>
    <button onClick={props.onPrevious}>Previous</button>
    <button onClick={props.onNext}>Next</button>

    <table>
      <thead>
        <th>Su</th>
        <th>Mo</th>
        <th>Tu</th>
        <th>We</th>
        <th>Th</th>
        <th>Fr</th>
        <th>Sa</th>
      </thead>
       <tbody>

        {props.monthGrid.map((dataArr, i) => {
          //maybe change <tb> to <tbody> as well?
          //maybe remove the <tr>s from below?
          return <WeekRow onDayClick={props.onDayClick} month={props.monthNum}key={i} week={dataArr} />
        })}
        </tbody>
    </table>
  </div>
 )
      }

export default CalendarBoard;