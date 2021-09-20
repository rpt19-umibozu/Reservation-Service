const mysql = require("mysql");
const mysqlConfig = require("./config.js");

const connection = mysql.createConnection(mysqlConfig);

/**
 * Gets the listing id
 * @param {Number} listingId
 * @returns {Array}: array length 1, containing listing details object (or array length 0)
 */

const getListingInfo = (listingId, callback) => {
  var queryStr = `Select * from listingItems Where listingId=${listingId};`;

  connection.query(queryStr, (err, results) => {
    if (err) {
      callback(err, null);
      console.log("err from db");
    } else {
      callback(null, results);
      ("success from db");
    }
  });
};

const getBookedDates = (listingId, callback) => {
  var queryStr = `Select * from bookings Where listingId=${listingId};`;
  connection.query(queryStr, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  connection,
  getListingInfo,
  getBookedDates,
};
