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
     <tr className="priceTable">
       <td className="priceData">${price}x{numOfNights} nights<span className="emoji">&#128359;</span></td>
       <td className="priceData">${subTotal}</td>
       </tr>
       <tr className="priceTable">
     <td className="priceTable">ServiceFee<span className="emoji">&#128359;</span></td>
     <td className="priceData">${serviceSubtotal}</td>
     </tr>
     <tr className="priceTable">
     <td className="priceTable">Occupancy taxes and fees<span className="emoji">&#128359;</span></td>
     <td className="priceData">${taxAndFeesSubtotal}</td>
     </tr>
     <tr className="priceTable">
     <td className="priceTable">Total</td>
     <td className="priceData">${total}</td>
     </tr>
     </tbody>
     </table>
     </div>

  )
}

export default PriceBreakup;