import React from 'react';

var GuestsDisplay = (props) => {


  return (
  <div>
    <table className="guestDisplay">
  <tr>
    <td>Adults</td>
    <td className="guestButton" ><button onClick={props.onDecrease} className="guestButton">-</button></td>
    <td>{props.guests}</td>
    <td className="guestButton"><button onClick={props.onIncrease}>+</button></td>
  </tr>
  <tr>
    <td>Children</td>
    <td><button>-</button ></td>
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

    <p className="underGuests">2 guests maximum. Infants don’t count toward the number of guests.</p>
    <button className="closeButton"
  onClick={props.onClose}>Close</button>
  </div>
  )
}


export default GuestsDisplay;