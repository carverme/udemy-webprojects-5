const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();


//Array of objects, with name, first and last and then a money value.

//Intent: Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);

    console.log(newUser);
    //results.name.first.value?
}


//Fetch is asyncronous, so we have to wait for it to finish, and it returns a promise when it's finished, and we have to put await in front of it.
//Intent: Add new obj to data arr

function addData(obj) {
    data.push(obj);

    updateDOM();
}
//Notes
//Takes the data array and pushes the object onto the end of the array.


//Update Dom
//Intent: Take in providedData, set a default value.  IF nothing is passed in, just use data array.
function updateDOM(providedData = data) {
    //clear main div.. instead of just adding and adding to it.
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}
//Notes
//looping through the providedData, and adding an element for this data.  Then calling the element classList, and adding a new class of person.

//Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string - "short and fast soluction (works everywhere!)"...
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event listeners
addUserBtn.addEventListener('click', getRandomUser);