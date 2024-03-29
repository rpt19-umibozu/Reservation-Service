import CalendarBoard from "./CalendarBoard.jsx";
import GuestsDisplay from "./GuestsDisplay.jsx";
import PriceBreakup from "./PriceBreakup.jsx";
import {
  getMonthDays,
  getMonthFirstDay,
  createMonth,
  getMonth,
  iterateOverDataArray,
  calculateNumOfNights,
  getDatesRange,
} from "./utils.js";
import "../dist/style.css";

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: null, //calendarComponent
      monthName: null, //calendarComponent
      monthNumber: null, //calendarComponent
      grid: [], //monthGrid
      toggleCheckinToDisplayCalendar: false,
      timesToggledonCheckinAndCheckOut: 0,
      displayCheckOut: false,
      checkin: null, //input from user
      checkout: null, //input from user
      bookedDates: [], //fetched from db
      listingName: "",
      price: null,
      tax: null,
      serviceFee: 0.1,
      numOfNights: null,
      maxGuests: null,
      weekedBoolean: null,
      displayPriceBreakup: false,
      displayGuestsMenu: false,
      toggleGuestsMenuCount: 0,
      guests: 1,
      numOfChildren: 0,
      numOfInfants: 0,
      reviews: "",
      msgUnderReserveButton: "You won't be charged yet.",
      newBookedDateRange: [],
    };
    //bookedDates inside state are manually entered mock data for testing
    this.goToNextMonth = this.goToNextMonth.bind(this);
    this.goToPreviousMonth = this.goToPreviousMonth.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.onClickCheckinButton = this.onClickCheckinButton.bind(this);
    this.displayCheckOutDate = this.displayCheckOutDate.bind(this);
    this.clearDatesButton = this.clearDatesButton.bind(this);
    this.getBookedDates = this.getBookedDates.bind(this);
    this.getListingInfoFromServer = this.getListingInfoFromServer.bind(this);
    this.onHandleGuestsClick = this.onHandleGuestsClick.bind(this);
    this.onIncreaseOfAdults = this.onIncreaseOfAdults.bind(this);
    this.onDecreaseOfAdults = this.onDecreaseOfAdults.bind(this);
    this.onHandleCloseGuestsDisplay =
      this.onHandleCloseGuestsDisplay.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }
  componentDidMount() {
    let currentYear = +new Date().getFullYear();
    let currentMonth = +new Date().getMonth() + 1;
    let monthFirstDay = getMonthFirstDay(currentMonth, currentYear);
    let days = getMonthDays(currentMonth);
    let monthName = getMonth(currentMonth);

    let grid = createMonth(days, monthFirstDay);
    this.setState({
      currentYear: currentYear,
      monthName: monthName,
      grid: grid,
      monthNumber: currentMonth,
    });
    let listingId = 10001;
    let urlOne = "http://localhost:3001/listingInfo";
    let windowUrlString = window.location.href;

    if (windowUrlString[windowUrlString.length - 1] === "/") {
      listingId = 10001;
    } else {
      listingId = Number(windowUrlString.slice(-5));
    }
    let reviewUrl = "http://localhost:3004/averageScore" + listingId;

    this.getListingInfoFromServer(urlOne, listingId);
    this.getBookedDates("http://localhost:3001/getBookedDates", listingId);
    this.getReviews(reviewUrl);
  }
  onClickCheckinButton() {
    this.setState({
      toggleCheckinToDisplayCalendar:
        !this.state.toggleCheckinToDisplayCalendar,
    });
  }

  //Calendar Component methods
  goToNextMonth() {
    let currentYear = this.state.currentYear;
    let currentMonth = this.state.monthNumber;
    let newMonth = currentMonth + 1;

    let monthFirstDay = getMonthFirstDay(newMonth, currentYear);
    let days = getMonthDays(newMonth);
    let monthName = getMonth(newMonth);
    let grid = createMonth(days, monthFirstDay);
    this.setState({
      grid: grid,
      currentYear: currentYear,
      monthName: monthName,
      monthNumber: newMonth,
    });
  }
  goToPreviousMonth() {
    let currentYear = this.state.currentYear;
    let currentMonth = this.state.monthNumber;
    let newMonth = currentMonth - 1;
    let monthFirstDay = getMonthFirstDay(newMonth, currentYear);
    let days = getMonthDays(newMonth);
    let monthName = getMonth(newMonth);
    let grid = createMonth(days, monthFirstDay);
    this.setState({
      grid: grid,
      currentYear: currentYear,
      monthName: monthName,
      monthNumber: newMonth,
    });
  }
  onDayClick(e) {
    let checkInDate = e.target.id;
    let clickedTimes = this.state.timesToggledonCheckinAndCheckOut;
    let bookedDates = this.state.bookedDates;
    if (!bookedDates.includes(checkInDate) && checkInDate !== "empty") {
      this.setState({
        timesToggledonCheckinAndCheckOut: clickedTimes + 1,
      });
      if (this.state.timesToggledonCheckinAndCheckOut < 1) {
        let newStr = checkInDate.replace("-", "/");
        newStr = "2020/" + newStr;
        this.setState({
          checkin: newStr,
          displayCheckOut: !this.state.displayCheckOut,
        });
      }
    }
    if (this.state.checkin) {
      this.displayCheckOutDate(e);
    }
  }

  displayCheckOutDate(e) {
    let checkOutDate = e.target.id;
    if (this.state.checkin) {
      let checkInDate = this.state.checkin;
      let checkIn = checkInDate.slice(5);
      let checkInFormatted = checkIn.replace("/", "-");
      let numOfNights = calculateNumOfNights(checkInFormatted, checkOutDate);

      let newBookedRangeOfDates = getDatesRange(checkInFormatted, checkOutDate);

      this.setState({
        numOfNights: numOfNights,
        newBookedDateRange: newBookedRangeOfDates,
      });
    }
    let newStr = checkOutDate.replace("-", "/");
    newStr = "2020/" + newStr;

    this.setState({
      checkout: newStr,
      toggleCheckinToDisplayCalendar:
        !this.state.toggleCheckinToDisplayCalendar,
      displayPriceBreakup: true,
    });
  }
  clearDatesButton() {
    this.setState({
      checkin: null,
      checkout: null,
      timesToggledonCheckinAndCheckOut: 0,
      numOfNights: null,
      displayCheckOut: true,
      displayPriceBreakup: false,
    });
  }
  getReviews(endPoint) {
    fetch(endPoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        return response.json();
      })
      .then((results) => {
        let removeComma = results.split(",");

        this.setState({
          reviews: removeComma,
        });
      })
      .catch((err) => console.log(err));
  }
  getListingInfoFromServer(url, id) {
    let newUrl = `${url}/${id}`;

    fetch(newUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        return res.json();
      })
      .then((parsedData) => {
        let name = parsedData[0].listingName;
        let price = parsedData[0].pricePerNight;
        let maxGuests = parsedData[0].maxGuests;
        let tax = parsedData[0].tax;
        this.setState({
          listingName: name,
          price: price,
          maxGuests: maxGuests,
          tax: tax,
        });
      })
      .catch((err) => console.log(err));
  }

  getBookedDates(url, id) {
    let fetchUrl = `${url}/${id}`;
    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        return res.json();
      })
      .then((parsedData) => {
        let bookedDatesArray = iterateOverDataArray(parsedData);
        this.setState({
          bookedDates: bookedDatesArray,
        });
      })
      .catch((err) => console.log(err));
  }

  onHandleGuestsClick() {
    if (this.state.toggleGuestsMenuCount === 0) {
      this.setState({
        displayGuestsMenu: true,
        toggleGuestsMenuCount: this.state.toggleGuestsMenuCount + 1,
      });
    } else {
      this.setState({
        displayGuestsMenu: false,
        toggleGuestsMenuCount: this.state.toggleGuestsMenuCount - 1,
      });
    }
  }
  onIncreaseOfAdults() {
    this.setState({
      guests: this.state.guests + 1,
    });
  }

  onDecreaseOfAdults() {
    this.setState({
      guests: this.state.guests - 1,
    });
  }
  onHandleCloseGuestsDisplay() {
    this.setState({
      displayGuestsMenu: false,
      toggleGuestsMenuCount: 0,
    });
  }

  render() {
    let placeHolderOne;
    let placeHolderTwo;
    let checkOutNewClassName;
    if (this.state.checkin !== null) {
      placeHolderOne = this.state.checkin;
    } else {
      placeHolderOne = "Check-in";
    }
    if (
      this.state.timesToggledonCheckinAndCheckOut > 1 &&
      this.state.checkin !== null
    ) {
      placeHolderTwo = this.state.checkout;
    } else {
      placeHolderTwo = "Checkout";
      checkOutNewClassName = "checkOutButton";
    }
    if (this.state.timesToggledonCheckinAndCheckOut !== 0) {
      checkOutNewClassName = "checkOutButtonTwo";
    }

    return (
      <div className="mainFrame">
        <p>
          ${this.state.price} <span className="perNight">per night</span>
        </p>
        <span>
          <img
            id="star"
            src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/airbnb_star.png"
          />
          {this.state.reviews[0]}
          <span className="numOfReview">{this.state.reviews[1]}</span>
        </span>
        <br></br>
        <span className="datesStr">Dates</span>
        <div className="dateFrame">
          <button className="checkInButton" onClick={this.onClickCheckinButton}>
            {placeHolderOne}
          </button>
          <span>&rarr;</span>
          <button className={checkOutNewClassName}>{placeHolderTwo}</button>
        </div>
        <div>
          {this.state.toggleCheckinToDisplayCalendar && (
            <CalendarBoard
              monthNum={this.state.monthNumber}
              month={this.state.monthName}
              year={this.state.currentYear}
              monthGrid={this.state.grid}
              onNext={this.goToNextMonth}
              onPrevious={this.goToPreviousMonth}
              onDayClick={this.onDayClick}
              onClear={this.clearDatesButton}
              booked={this.state.bookedDates}
              newBookedDateRange={this.state.newBookedDateRange}
            />
          )}
        </div>
        <div id="guestsStr">
          <span>Guests</span>
        </div>
        <div className="guestsFrame">
          <span className="guestsDiv" onClick={this.onHandleGuestsClick}>
            {" "}
            {this.state.guests} Guest
          </span>
        </div>
        <div className="guestsMenu">
          {this.state.displayGuestsMenu && (
            <GuestsDisplay
              guests={this.state.guests}
              numOfChildren={this.state.numOfChildren}
              numOfInfants={this.state.numOfInfants}
              onIncrease={this.onIncreaseOfAdults}
              onDecrease={this.onDecreaseOfAdults}
              onClose={this.onHandleCloseGuestsDisplay}
            />
          )}{" "}
          <br></br>
        </div>

        <div className="priceBreakup">
          {this.state.displayPriceBreakup && (
            <PriceBreakup
              numOfNights={this.state.numOfNights}
              serviceFee={this.state.serviceFee}
              price={this.state.price}
              tax={this.state.tax}
            />
          )}
        </div>
        <br></br>
        <button className="reserveButton">Reserve</button>
        <div className="underReserve">
          {this.state.displayPriceBreakup && this.state.msgUnderReserveButton}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Reservation />, document.getElementById("reservation"));
