
let inGame = 0;
let portrait = document.getElementById('portrait')
let waldo1 = document.getElementById('waldo1')
let waldo2 = document.getElementById('waldo2')
let waldo3 = document.getElementById('waldo3')
let waldo4 = document.getElementById('waldo4')
let final = document.getElementById('final')
let boxTimer = document.getElementById('boxTimer')
let display;
let user;
let score;
let minutes;
let seconds;
let tim = 300;
// let min2;
// let sec2;

function gameBegin() {
    timer()
    portrait.className = 'gameOff';
    waldo1.classList.remove('gameOff')
    user = document.getElementById('user').value
    boxTimer.classList.remove('gameOff')
    


    // score = setInterval(function () {
    //     var d = new Date(); //get current time
    //     var seconds = d.getMinutes() * 60 + d.getSeconds(); //convet current mm:ss to seconds for easier caculation, we don't care hours.
    //     var fiveMin = 60 * 5; //five minutes is 300 seconds!
    //     var timeleft = fiveMin - seconds % fiveMin; // let's say now is 01:30, then current seconds is 60+30 = 90. And 90%300 = 90, finally 300-90 = 210. That's the time left!
    //     var result = parseInt(timeleft / 60) + ':' + timeleft % 60; //formart seconds back into mm:ss 
    //     document.getElementById('time').innerHTML = result;
    //     console.log(result)
    // }, 500) //calling it every 0.5 second to do a count down
}

let found = document.getElementById('found')
found.addEventListener('click', foundWaldo)

function foundWaldo() {
    let h2 = document.createElement('h2')
    h2.textContent = 'Congrats you found Waldo 1/4'
    h2.className = 'h2'
    waldo1.appendChild(h2)
    setTimeout(() => {
        waldo1.className = 'gameOff';
        waldo2.classList.remove('gameOff')
    }, 1000);
}

let found2 = document.getElementById('found2')
found2.addEventListener('click', foundWaldo2)

function foundWaldo2() {
    let h2 = document.createElement('h2')
    h2.textContent = 'Congrats you found Waldo 2/4'
    h2.className = 'h2'
    waldo2.appendChild(h2)
    setTimeout(() => {
        waldo2.className = 'gameOff';
        waldo3.classList.remove('gameOff')
    }, 1000);
}

let found3 = document.getElementById('found3')
found3.addEventListener('click', foundWaldo3)

function foundWaldo3() {
    let h2 = document.createElement('h2')
    h2.textContent = 'Congrats you found Waldo 3/4'
    h2.className = 'h2'
    waldo3.appendChild(h2)
    setTimeout(() => {
        waldo3.className = 'gameOff';
        waldo4.classList.remove('gameOff')
    }, 1000);
}

let found4 = document.getElementById('found4')
found4.addEventListener('click', foundWaldo4)
let tru= true
function foundWaldo4() {

    score = tim - minutes * 60 + seconds
    console.log(tim)
    sendData()
    
    // console.log(min2,sec2)
    if (tru) {
        let h2 = document.createElement('h2')
        h2.textContent = 'Congrats you found Waldo 4/4'
        h2.className = 'h2'
        waldo4.appendChild(h2)
        tru = false
        

    }
    setTimeout(() => {
        waldo4.className = 'gameOff';
        boxTimer.className = 'gameOff';
        final.classList.remove('gameOff')
        getData()
    }, 1000);
    
}


function startTimer(duration, display) {
    var start = Date.now(),
        diff;
        // minutes,
        // seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = 'Time '+minutes + ":" + seconds; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}

function timer() {
    var fiveMinutes = 60 * 5;
    display = document.getElementById('time');
    startTimer(fiveMinutes, display);
};


// function scoreData(name, time) {
    
// }



function sendData() {
    // let user = document.getElementById('user').value;
    let userdata = {
      user: user,
      score: score
    }
    fetch('http://localhost:3000/user',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(userdata)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      document.getElementById('root').innerHTML = `${data.message}`
    })
    .catch(err => {
      console.log(err);
    })
  }


  function getData() {
    fetch('http://localhost:3000/show')
    .then(res => res.json())
    .then(data => {
      showUsers(data);
    })
  }

  function showUsers(data) {
        console.log(data)

    let root = document.getElementById('root');
    root.innerHTML = "";
    data.forEach(item =>{
        
        let div = document.createElement('div');
        if (item.user === '') {
            div.innerText= `Some Stranger finish in ${item.score} seconds`;
        } else {
            div.innerText= `${item.user} finish in ${item.score} seconds`;
        }
        
        root.appendChild(div)
    })
  }
  