const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getListingInfo = (listingId, callback) => {
  var queryStr = `Select * from listingItems Where listingId=${listingId};`

  connection.query(queryStr, (err, results) => {
    if (err) {
      callback(err, null);
      console.log('err from db')
    } else {
      callback(null, results);
      ('succss from db')
    }
  })

}


module.exports = {
  connection, getListingInfo
}