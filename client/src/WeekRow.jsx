import React from 'react';
import DayComponent from './DayComponent.jsx';

var WeekRow = (props) => (
<tr>
{props.week.map((day) => {
    return <DayComponent onDayClick={props.onDayClick} month={props.month} days={day} booked={props.booked}/>
   })}
</tr>
)

export default WeekRow;




