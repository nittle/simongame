var isGameGoing = false;
var currentSequence = [];
var userSequence = [];
var level = 1;
var trial = 1;

$(document).keypress(startGame);
$(document).on("touchend", startGame);
$(".btn").click((e) => buttonClick(e.target.id));

function startGame() {
  if (isGameGoing) {
    return;
  }
  $("body").removeClass("game-over");
  currentSequence = [];
  level = 1;

  generateNewTile();

  isGameGoing = true;
}

function buttonClick(key) {
  if (!isGameGoing) {
    return;
  }
  userSequence.push(key);
  animateButton(key, 100);

  check();
  console.log(userSequence);
  console.log(currentSequence);
}

function getTile(number) {
  switch (number) {
    case 1:
      return "green";
    case 2:
      return "red";
    case 3:
      return "yellow";
    case 4:
      return "blue";
    default:
      alert("error in getTile");
      return "";
  }
}

function check() {
  if (currentSequence.toString() === userSequence.toString()) {
    userSequence = [];
    generateNewTile();
    console.log("you win");
  } else if (
    currentSequence[userSequence.length - 1] !==
    userSequence[userSequence.length - 1]
  ) {
    gameOver();
    console.log("you lose");
  }
}

function addTile(newTile) {
  currentSequence.push(newTile);

  $("#" + newTile).animate({ opacity: 0.3, duration: 100 });
  $("#" + newTile).animate({ opacity: 1, duration: 100 });
}

function generateNewTile() {
  var newTile = getTile(Math.floor(Math.random() * 4) + 1);
  addTile(newTile);

  $("h1").text("Level " + level);
  level++;
}

function animateButton(buttonColor, timeOut) {
  var btnSound = new Audio("sounds/" + buttonColor + ".mp3");
  btnSound.volume = 0.1;
  btnSound.play();

  $("#" + buttonColor).addClass("pressed");
  setTimeout(function () {
    $("#" + buttonColor).removeClass("pressed");
  }, timeOut);
}

function gameOver() {
  if (trial === 3) {
    $(".screamer").removeClass("invisible");
    new Audio("sounds/scream.mp3").play();

    setTimeout(function () {
      $(".screamer").addClass("invisible");
    }, 5000);
  }

  $("body").addClass("game-over");
  $("h1").text("Game Over!");

  new Audio("sounds/wrong.mp3").play();

  currentSequence = [];
  userSequence = [];
  isGameGoing = false;
  trial++;
}
