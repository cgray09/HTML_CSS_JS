const container = document.querySelector('.container');
// querySelectorAll puts them all in a node list which is like an array where we do operations on
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// must follow the flow of this application
// begin w/ populateUI since called at the start
// then just waits for an event

populateUI();

let ticketPrice = +movieSelect.value; 

// Save selected movie index and price (this function seems to be useless bc
// the code works fine w/o it)
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  
  // the spread operator passes in the all the individual values and not the 
  // array w/ the bracket and converts the node list into a regular array

  // forEach doesnt return anything just loops through and map returns an array

  // the matching index values of seats and selected seats returns the exact
  // seat selected in the container on the dom. since retuning only one thing can shorten syntax and not write return w/ map.
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));  // indexOf the particular value which 
                                                                                // in this case is seat and returns
                                                                                // -1 if not found
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // seatsIndex is an array with the index values of the divs/seats that were selected 

  // update count and total
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;   // innerText is the value inside the element
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  // change every seat in seats array w/ same index as a seat in selectedSeats to selected
  // this is where we make the seats blue when selected
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {    
        seat.classList.add('selected');           
      }
    });
  }

  // the rest of this code in this function seems useless bc the code
  // works fine w/o it
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value; 
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
// e gives us the exact element that is clicked
container.addEventListener('click', e => {
  // only respond to these elements when clicked and ignore all other clicks
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');    // can only do add, remove and toggle in general in javascript

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();  // so the total and count stay updated in the p if the page is reloaded while 
                        // seats are selected
