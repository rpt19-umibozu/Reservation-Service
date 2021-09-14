import React from 'react';
import { zeroPadding } from './helperFunc.js'

const DayComponent = (props) => {
  let day = props.days;
  let month = zeroPadding(props.month);
  let value = `${month}-${day}`;
  if (day !== '') {
    value = `${month}-${day}`;
  } else {
    value = 'empty'
  }
  let name;
  if (props.newBookedDateRange.includes(value)){
    console.log('wentIn newbookedDates')
    name = 'bookedDates';
  }
  if (!props.booked.includes(value)) {
   name = 'availableDay'
  } else {
    name = 'unavailableDay'
  }
  if (value === 'empty') {
    name = 'empty'
  }
  return (

<td className={name} onClick={props.onDayClick} id={value}>{props.days}</td>

  )

}

export default DayComponent;