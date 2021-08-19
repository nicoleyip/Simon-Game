var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var index = 0;

var buttonColor = ["red", "blue", "green", "yellow"];

$(document).keydown(function() {
  if(gameStarted === false) {
    $("#level-title").text("Level " + level);
    $(".suggestion").addClass("hide");
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //nextSequence();
  checkAnswer(level);
});

function checkAnswer(currentLevel) {
  console.log("level" + level);
  if(userClickedPattern[index] === gamePattern[index]) {
    console.log("success");
    ++index;
    console.log("index" + index);
    if(index == level) {
      setTimeout(function() {
        nextSequence();
      },1000);
      index = 0;
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    suggestion();
    startOver();
  }
}

function suggestion() {
  $(".suggestion").text("You should press as follows: " + gamePattern);
  $(".suggestion").removeClass("hide");
}

function startOver() {
  level = 0;
  index = 0;
  gamePattern = [];
  gameStarted = false;
}

function nextSequence() {
  userClickedPattern = [];
  ++level;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
