var timer; 
var timeLeft = 60; 

// What to do when the timer runs out
function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called
  clearInterval(timer);
  $(".piece_container").empty();
  $(".piece_container").text("Better Luck Next Time!!");
  $(".reset").hide();
  $(".formFail").show();
  var newPieces = createPieces(true);
  $(".puzzle_container").html(newPieces);
}

function gameWon(){
  clearInterval(timer);
  $(".piece_container").text("Yayy Congatulations!!");
  $(".reset").hide();
  $(".formSuccess").show();
}

function resetTimer(){
  clearInterval(timer);
  timeLeft = 60;
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if(timeLeft >= 0){
    $('.timer').html(timeLeft);
    if (timeLeft <= 9){
      timeLeft= "0" + timeLeft;
      $('.timer').html(timeLeft);
    }
  }
  else {
    gameOver();
  }
}

function start() {
  timer = setInterval(updateTimer, 1000);
  updateTimer();
}

function createPieces(withImage){
  var rows = 4, cols = 4;
  var pieces = "";
      //top,left = position of peice
      //order = order of peices in grid 
  for (var i=0, top=0, order = 0; i<rows; i++, top-=100){
      for (var j=0, left=0; j<cols; j++, left-=100,order++){
        pieces += "<div style='background-position:" + left + "px " + top + "px;' class = 'piece' data-order=" + order + "></div>";
      }
  } return pieces;
}