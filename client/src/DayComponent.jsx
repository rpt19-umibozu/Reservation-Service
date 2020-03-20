import React from 'react';
import { zeroPadding } from './helperFunc.js'

var DayComponent = (props) => {
  var day = zeroPadding(props.days);
  var month = zeroPadding(props.month);
  var value = `${month}-${day}`;
  var style;
  if (props.booked.includes(value)) {
   style = {fontWeight: 'bold'}

  } else {
    style = {fontWeight: 'normal'}
  }
  return (

<td style={style} onClick={props.onDayClick} id={value}>{props.days}</td>

  )

}

export default DayComponent;