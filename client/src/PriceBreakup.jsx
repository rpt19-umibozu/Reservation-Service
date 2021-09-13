import React from 'react'

let PriceBreakup = (props) => {
let price = props.price;
let numOfNights = props.numOfNights;
let subTotal = (price * numOfNights).toFixed(0);
let tax = props.tax - 1;
let service = props.serviceFee;
let serviceSubtotal = (subTotal * service).toFixed(0);
let taxAndFeesSubtotal = (subTotal * tax).toFixed(0);
let total = Number(subTotal) + Number(serviceSubtotal) + Number(taxAndFeesSubtotal);

  return (
    <div>
      <table>
        <tbody>
     <tr className="priceTable">
       <td className="priceData">${price}x{numOfNights} nights <img className="circle" src="https://rptfecservice.s3-sa-east-1.amazonaws.com/circleTwo.png"/></td>
       <td className="priceData">${subTotal}</td>
       </tr>
       <tr className="priceTable">
     <td className="priceTable">Service fee <img className="circle" src="https://rptfecservice.s3-sa-east-1.amazonaws.com/circleTwo.png"/></td>
     <td className="priceData">${serviceSubtotal}</td>
     </tr>
     <tr className="priceTable">
     <td className="priceTable">Occupancy taxes and <br></br><span>fees </span><img className="circle" src="https://rptfecservice.s3-sa-east-1.amazonaws.com/circleTwo.png"/></td>
     <td className="priceData">${taxAndFeesSubtotal}</td>
     </tr>
     <tr className="priceTable">
     <td className="priceTable">Total </td>
     <td className="priceData">${total}</td>
     </tr>
     </tbody>
     </table>

     </div>

  )
}

export default PriceBreakup;