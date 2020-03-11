const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { connection } = require ('../database');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());








app.use(express.static(__dirname + '/../client/dist'));

// app.get('/', (req, res) => {

//   res.end('hello world')
// })




var port = 3001;

app.listen(port, () => {
  console.log(`server listening at ${port}`)
})





