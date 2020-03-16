import React from 'react';
import DayComponent from './DayComponent.jsx';

var WeekRow = (props) => (
<tr>
{props.week.map((day) => {
    return <DayComponent onDayClick={props.onDayClick} month={props.month} days={day}/>
   })}
</tr>
)

export default WeekRow;




