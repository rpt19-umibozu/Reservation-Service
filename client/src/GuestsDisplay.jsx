import React from 'react';

var GuestsDisplay = (props) => {


  return (
  <div>
    <table>
  <tr>
    <td>Adults</td>
    <td><button onClick={props.onDecrease}>-</button></td>
    <td>{props.guests}</td>
    <td><button onClick={props.onIncrease}>+</button></td>
  </tr>
  <tr>
    <td>Children</td>
    <td><button>-</button></td>
    <td>{props.numOfChildren}</td>
    <td><button >+</button></td>
  </tr>
  <tr>
    <td>Infants</td>
    <td><button>-</button></td>
    <td>{props.numOfInfants}</td>
    <td><button>+</button></td>
  </tr>
  </table>
  <button onClick={props.onClose}>Close</button>
  </div>
  )
}


export default GuestsDisplay;