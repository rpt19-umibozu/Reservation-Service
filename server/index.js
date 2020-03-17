const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { connection, getListingInfo } = require ('../database');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());



app.get('/', (req, res) => {
  var reqId = req.body.listingId;
 // getListingInfor

})




app.use(express.static(__dirname + '/../client/dist'));






var port = 3001;

app.listen(port, () => {
  console.log(`server listening at ${port}`)
})





