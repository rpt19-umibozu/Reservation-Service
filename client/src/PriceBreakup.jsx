import React from 'react'

var PriceBreakup = (props) => {
var price = props.price;
var numOfNights = props.numOfNights;
var subTotal = (price * numOfNights).toFixed(0);
var tax = props.tax - 1;
var service = props.serviceFee;
var serviceSubtotal = (subTotal * service).toFixed(0);
var taxAndFeesSubtotal = (subTotal * tax).toFixed(0);
var total = Number(subTotal) + Number(serviceSubtotal) + Number(taxAndFeesSubtotal);

  return (
    <div>
      <table>
        <tbody>
     <tr>
       <td>${price}x{numOfNights} nights<span className="emoji">&#128359;</span></td>
       <td>${subTotal}</td>
       </tr>
       <tr>
     <td>ServiceFee<span className="emoji">&#128359;</span></td>
     <td>${serviceSubtotal}</td>
     </tr>
     <tr>
     <td>Occupancy taxes and fees<span className="emoji">&#128359;</span></td>
     <td>${taxAndFeesSubtotal}</td>
     </tr>
     <tr>
     <td>Total</td>
     <td>${total}</td>
     </tr>
     </tbody>
     </table>
     </div>

  )
}

export default PriceBreakup;