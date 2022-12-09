//create our users with the properties
let User = {
    username: "YD",
    pin: "0000",
    balance: 12625
}

//create variables
let content = document.getElementsByClassName('content')[0]
let amountToTransfer = document.getElementById("amountTransfer");
let transferTo = document.getElementById("transferTo");
let loanAmount = document.getElementById("loanAmount")
let balance = document.getElementById("account_balance");
let logoutBtn = document.getElementById("logoutBtn");

//function that allows to see our current balance
function bal_init() {
    balance.innerHTML = User.balance + " KZT";
    content.classList.add('disable')
}
//our login form that appears at the start
let login_form = document.getElementById("login_form");

let login_form_div = document.getElementsByClassName('login_form')[0];

//When page loads we hide content and show our login form
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('username') && localStorage.getItem('pin')) {
        content.classList.remove('disable')
        login_form_div.classList.add('disable')
    } else {
        content.classList.add('disable')
        login_form_div.classList.remove('disable')
        logoutBtn.classList.add('disable')
    }
});
//our logout function
//we remove our username and pin from localstorage
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('pin');
    login_form_div.classList.remove('disable');
    content.classList.add('disable');
    logoutBtn.classList.add('disable');
}

//our login function
function loginSubmit(e) {
    e.preventDefault();

    if (document.getElementById("username").value === User.username && document.getElementById("pin").value === User.pin) {
        login_form_div.classList.add('disable')
        content.classList.remove('disable')
        logoutBtn.classList.remove('disable')
        localStorage.setItem('username', document.getElementById("username").value)
        localStorage.setItem('pin', document.getElementById("pin").value)
    } else {
        alert("Wrong")
    }
}
//here we transfer money to another person
function transfer(e) {
    e.preventDefault();
    User.balance = User.balance - amountToTransfer.value;
    balance.innerHTML = User.balance + " KZT"
}
//our load(creadit) function
function loan(e) {
    e.preventDefault();
    User.balance = User.balance + parseFloat(loanAmount.value);
    balance.innerHTML = User.balance + " KZT"
}
//account close function that disables everything
function close(e) {
    e.preventDefault();
    if (document.getElementById("close_username").value == User.username && document.getElementById("close_pin").value == User.pin) {
        var blurDiv = document.createElement("div");
        blurDiv.id = "blurDiv";
        blurDiv.style.cssText = "position:absolute; top:0; right:0; width:" + screen.width + "px; height:" + screen.height + "px; background-color: #000000; opacity:0.5; filter:alpha(opacity=50)";

        document.getElementsByTagName("body")[0].appendChild(blurDiv);
    } else {
        alert("Username/Pin is wrong");
    }
}
//our timer that makes user logout after 100s
setTimeout(logout, 100000);
//call our function of current balance
bal_init()