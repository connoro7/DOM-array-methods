const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []
getRandomUser()
getRandomUser()
getRandomUser()

// Fetch random user and add some ca$h
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()
  // console.log(data)
  const user = data.results[0]
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  }

  addData(newUser)
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 }
  })
  updateDOM()
}

// Add new object to data array
function addData(object) {
  data.push(object)
  updateDOM()
}

// Sort users by richest in descending order
function sortByWealth() {
  data.sort((apples, oranges) => oranges.money - apples.money)
  updateDOM()
}

// Filters out any users that have less than $1,000,000
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000)
  updateDOM()
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0)
  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(wealthEl)

  //TODO: "Sum All Wealth" button spawns a child every time it is clicked, without removing/replacing the first spawn.
  // main.innerHTML.replace(wealthEl)
}

function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
  providedData.forEach((item, index, arr) => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
    // Add new element to DOM
    main.appendChild(element)
  })
}

// Format number as money
// Reference: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByWealth)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateWealth)
