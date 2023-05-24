const gameContainer = document.getElementById("game");
const h1 = document.querySelector('h1');
const score = document.querySelectorAll('h3');

const startbtn = document.createElement('button');
const restartbtn = document.createElement('button');
restartbtn.innerHTML = "RESTART";
let scoreVar =0;
let min_score = 9999999;
startbtn.innerHTML = "START";
let win_condition = false;
startbtn.addEventListener('click', function(){
  // when the DOM loads
  
  createDivsForColors(shuffledColors);
})
h1.appendChild(startbtn);
h1.appendChild(restartbtn);
let clickCount =0;
let canClick = true;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let array =[];
let matchcount =0;
// TODO: Implement this function!
function handleCardClick(event) {
  if(!canClick){return;}
  //console.log(event); 
  //Clicking a card should change the background color to be the color of the class it has.
  //Users should only be able to change at most two cards at a time.
  if(clickCount ==2)
    clickCount =0;
  
  if(clickCount<2 && event.target.classList[1] !== "on"){
    event.target.style.backgroundColor = event.target.classList[0];
    event.target.classList.add("on");
    array.push(event.target);
    clickCount++;
    scoreVar++;
    
    score[0].innerHTML = "Score: " + scoreVar;
    
  }
  if(array.length>1){
    if(array[array.length-1].className === array[0].className){
      console.log("match");
      matchcount +=2;
      array = [];
    }
    else{
      console.log("time out");
      canClick =false;
      setTimeout(function(){
        array[array.length-1].style.backgroundColor="";
        array[array.length-1].classList.remove("on");

        array[0].style.backgroundColor="";
        array[0].classList.remove("on");
        array =[];
       
        canClick = true;
      },1000)
    }
  }
  if(matchcount === COLORS.length){
    console.log("game done");
    if(min_score > scoreVar)
      min_score = scoreVar;
    localStorage.setItem("record", min_score);
    score[1].innerHTML = "Record: " + min_score;
    matchcount ==0;
  }
}


