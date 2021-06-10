const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

/* generate three users to begin w/ */
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {  /* async so we dont have to use .then syntax */
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)    /* under a million */
  };

  addData(newUser);
}

// Double eveyones money
function doubleMoney() {
  /* running an operation on each item in the array and returning it */
  data = data.map(user => {
    return { ...user, money: user.money * 2 };  /* puts anything you write in the return in an array as a value */
  });

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  console.log(123);
  data.sort((a, b) => b.money - a.money); /* (a, b) => b.money - a.money needed to sort numbers in an array 
                                              b - a b/c we want the richest first */

  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  // filter returns an array that meets the condition */
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  /* accumulator and current value and 0 is the number were adding these values to */
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  /* ude innerHTML when adding html elements */
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {   /* passing in the data array by default (es6) */
  // Clear main div back to what it was originally in index.html */
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'; /* clearing b/c we want to replace the data w/ new
                                                                 data each time */

  // item.name and item.money are the two properties we created in the newUser object */
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
