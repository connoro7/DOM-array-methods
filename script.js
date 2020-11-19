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

//
function sortByWealth() {
  data.sort((apples, oranges) => oranges.money - apples.money)
  updateDOM()
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
// Add user
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByWealth)
