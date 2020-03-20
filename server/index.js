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

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => {
  //default listing id is 10001;
  //should give listingId 10001 back to the client when page first renders
  var reqId = 10001;
  getListingInfo(reqId, (err, results) => {
    if (err) {
      res.status(404).end('NOT FOUND')
      console.log('err', err);
    } else {
      var stringifyResults = JSON.stringify(results);
      console.log('stringifyResults', stringifyResults)
      console.log('results', results)
      res.status(202).end(stringifyResults);
    }
  })
})









var port = 3001;

app.listen(port, () => {
  console.log(`server listening at ${port}`)
})





