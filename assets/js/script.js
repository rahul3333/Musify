const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})


const player=document.getElementById('Audio');
var progress=$(".progress_bar")[0];

$("#vol_change_icon").on("click",function(){
  if(player.volume>0){
    $("#vol_change_icon").removeClass();
    $("#vol_change_icon").addClass("fas fa-sm fa-volume-mute");
    player.volume=0;
    $("#volume").attr("value",0);
  }
  else{
    $("#vol_change_icon").removeClass();
    $("#vol_change_icon").addClass("fas fa-sm fa-volume-down");
    player.volume=0.5;
    $("#volume").attr("value",0.5);
  }
})

$("#volume").on("click",function(event){
  var volume=$("#volume");
  var icon=$('#vol_change_icon');
  var test=document.getElementById("extra_controls_div");
  var test2=document.getElementById("volume");
  
  var xPosition = (event.pageX - test.offsetLeft-test2.offsetLeft);
        clickedValue = xPosition * this.max / this.offsetWidth;
        console.log('Value : ',clickedValue);
        clickedValue = (clickedValue > 1) ? 1 : clickedValue;
        clickedValue = (clickedValue < 0) ? 0 : clickedValue;
        if(clickedValue==0){
          icon.removeClass();
          icon.addClass("fas fa-sm fa-volume-mute")
        }
        else if(clickedValue>0.6){
          icon.removeClass();
          icon.addClass("fas fa-sm fa-volume-up");
        }
        else{
          icon.removeClass();
          icon.addClass("fas fa-sm fa-volume-down");
        }
        volume[0].value = clickedValue;
        player.volume = clickedValue;
})

$("#play").on("click", function playit(){ 
    var element=$("#play");
    if(!(player.paused)){
      element.removeClass();
      element.addClass("far fa-lg fa-play-circle");
      player.pause();
    }
    else {
      element.removeClass();
      element.addClass("far fa-lg fa-pause-circle");
      player.play();
    }
});

$("#Audio").on("loadeddata",function(){
  console.log(player.duration);
  
  var minutes=Math.floor(player.duration/60);
  var seconds=Math.ceil(player.duration-minutes*60);
  if(seconds<10){
    seconds='0'+seconds;
  }
  else if(seconds>=60){
    minutes+=1;
    seconds='00';
  }
document.getElementById("duration").innerHTML=minutes+':'+seconds;

var interval=setInterval(updateProgressBar,1000);
})

function play_song_list(element_id){
  console.log("Element id : ",element_id);
  
  player.src=element_id;
  player.play();
  $("#play").removeClass().addClass("far fa-lg fa-pause-circle");
  document.getElementById("audio_song_name").innerHTML=document.getElementById(element_id).getElementsByTagName('p')[0].innerHTML;
  document.getElementById("audio_singer_name").innerHTML=document.getElementById(element_id).getElementsByTagName('p')[1].innerHTML;
}

function updateProgressBar(){
  var progress_percentage=player.currentTime/player.duration;
  progress.value=progress_percentage;
}

$("#prog_bar").on("click",function(event){
  var test=document.getElementById("player_controls_div");
  var test2=document.getElementById("prog_bar");
  var xpos=event.pageX-test.offsetLeft-test2.offsetLeft;
  var clickedValue = xpos * this.max / this.offsetWidth
  console.log("x : ",clickedValue);
  progress.value=(clickedValue);
  var percentage=Math.round(clickedValue*100);
  player.currentTime=Math.round(parseFloat(percentage/100)*player.duration);
  console.log("Time : ",player.currentTime)
})

function play_search_result(element){
  player.src=element;
  player.play();
}

function calculateCurrentValue(currentTime) {
  var current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}

function initProgressBar() {
  var player = document.getElementById('Audio');
  var length = player.duration
  var current_time = player.currentTime;
  var currentTime = calculateCurrentValue(current_time);
  $("#start_time").html(currentTime);
  if (player.currentTime == player.duration) {
    $("#play").removeClass().addClass("far fa-lg fa-play-circle")
  }
}

var input = document.getElementById( 'file-upload' );
var infoArea = document.getElementById( 'file-upload-filename' );

input.addEventListener( 'change', showFileName );

function showFileName( event ) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
  infoArea.textContent =fileName;
}