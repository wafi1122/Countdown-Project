const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('CountdownForm'); // Changed to match HTML
const dateEl = document.getElementById('date-picker'); // Changed from dataEl to dateEl

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn  = document.getElementById('countdown-button');
const timeElement = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn =  document.getElementById('complete-button')



// globle variables

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


// Set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// populated countdown /complete UI
countdownActive = setInterval(() => {
    
})

// populated countdown / complete ui
function updateDOM(){

    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
       
        
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day)/ hour);
        const minutes = Math.floor((distance % hour)/ minute);
        const seconds = Math.floor((distance % minute)/ second);
        

        // hide input
        inputContainer.hidden = true;

        //if the countdown has ended, show complete
        if (distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle}--finished on--${countdownDate}`;
            completeEl.hidden=false;
        }else{
            //else show the count down in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElement[0].textContent = `${days}`;
            timeElement[1].textContent = `${hours}`;
            timeElement[2].textContent = `${minutes}`;
            timeElement[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    },second);
    
}


// Take values from form input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.target[0].value; // Changed from e.srcElement to e.target
    countdownDate = e.target[1].value;
    savedCountdown = {
        title : countdownTitle,
        date : countdownDate,
    };
    console.log(savedCountdown);
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    if (countdownDate === ''){
        alert('Please Enter a Date')
    }else{
    // get number vision of current date
    countdownValue = new Date(countdownDate).getTime();
     
    updateDOM();
   
    }
}

// reset all values
function reset(){
    // hide countdowns , show input
    countdownEl.hidden = true;
    completeEl.hidden = true
    inputContainer.hidden = false;
    // stop the countdown
    clearInterval(countdownActive);
    // reset values
    countdownTitle = ' ';
    countdownDate = ' ';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown(){
    // get countdown from local storage
    if (localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset)

// on load check localstorage
restorePreviousCountdown();