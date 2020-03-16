import React from 'react';
import { zeroPadding } from './help.js'

var DayComponent = (props) => {
  var day = zeroPadding(props.days);
  var month = zeroPadding(props.month);
  var value = `${month}-${day}`;
  return (

<td onClick={props.onDayClick} id={value}>{props.days}</td>

  )

}

export default DayComponent;