var button = ["green","red","yellow","blue"];

var btnpattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$('.btn').click(function(){

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);

})

$(document).on("keydown",function(){
    if(!started){
        $(".level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = button[randomNumber];
    btnpattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(userChosenColour){
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#" + userChosenColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel] === btnpattern[currentLevel]){
       console.log("success");

       if(userClickedPattern.length === btnpattern.length){
           setTimeout(function(){
              nextSequence();
           },1000)
       }
   }
   else{
       console.log("wrong");
       playSound("wrong");
       $("body").addClass("game-over");
       setTimeout(function(){
           $("body").removeClass("game-over");
       },200);
       startOver();
   }

}

function startOver(){
   level = 0;
   btnpattern = [];
   started = false;
   $("#level-title").text("Game Over, Press Any Key To Continue...");
}

