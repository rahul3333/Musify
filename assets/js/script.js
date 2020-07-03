const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})
// function toggleSidebar(){
//   document.getElementById("sidebar").classList.toggle('active');
//  }
var id;
var width=1;
//  $('#play').click(function(e){
//    e.preventDefault();
//    if(document.getElementById('play').src=='http://localhost:8000/images/playbutton.png')
//     {
//       document.getElementById('play').src='/images/pause.png';
//       id=setInterval(progress,10);
//     }
//     else{
//       document.getElementById('play').src='/images/playbutton.png';
//       clearInterval(id);
//       document.getElementById('go_progress').style.width=width + "%";
//       document.getElementById('tracker').style.marginLeft=width + "%";
//     }
//  })

//  function progress(){
//    var tracker=document.getElementById('tracker');
//    var element=document.getElementById('go_progress');
//   if(width>=100){
//     clearInterval(id);
//     element.style.width=0;
//     width=0;
//     document.getElementById('play').src='/images/playbutton.png';
//   }else{
//     width++;
    
//     tracker.style.marginLeft=width + "%";
//     element.style.width = width + "%";
//   }
//  }

//  function playMusicFromPlaylist(){
   
//   var audio=document.getElementById("Audio");
//   audio.play();
//  }


const player=document.getElementById('Audio');
// var progress=$("#progress_bar");

$("#vol_change_icon").on("click",function(){
  if(player.volume>0){
    $("#vol_change_icon").removeClass();
    $("#vol_change_icon").addClass("fas fa-volume-mute vol_icon");
    player.volume=0;
    $("#volume").attr("value",0);
  }
  else{
    $("#vol_change_icon").removeClass();
    $("#vol_change_icon").addClass("fas fa-volume-down vol_icon");
    player.volume=0.5;
    $("#volume").attr("value",0.5);
  }
})

$("#volume").on("click",function(event){
  var volume=$("#volume");
  var icon=$('#vol_change_icon');
  var xPosition = event.pageX - this.offsetLeft,
        clickedValue = xPosition * this.max / this.offsetWidth;
  
        clickedValue = (clickedValue > 1) ? 1 : clickedValue;
        clickedValue = (clickedValue < 0) ? 0 : clickedValue;
        if(clickedValue==0){
          icon.removeClass();
          icon.addClass("fas fa-volume-mute vol_icon")
        }
        else if(clickedValue>0.6){
          icon.removeClass();
          icon.addClass("fas fa-volume-up vol_icon");
        }
        else{
          icon.removeClass();
          icon.addClass("fas fa-volume-down vol_icon");
        }
        volume[0].value = clickedValue;
        player.volume = clickedValue;
})

$("#play").on("click", function playit(){ 

    if(!(player.paused)){
      document.getElementById('play').src='/images/playbutton.png';
      player.pause();
       var clear=setInterval(updateProgressBar,10);
    }
    else {
      document.getElementById('play').src='/images/pause.png';
      player.play();
      clearInterval(clear);
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
})

function play_song_list(element_id){
  player.src=element_id;
  
  player.play();
  document.getElementById('play').src='/images/pause.png';
  document.getElementById("audio_song_name").innerHTML=document.getElementById(element_id).getElementsByTagName('p')[0].innerHTML;
  document.getElementById("audio_singer_name").innerHTML=document.getElementById(element_id).getElementsByTagName('p')[1].innerHTML;
}

// function updateProgressBar(){
//   var progress_percentage=player.currentTime/player.duration;
//   console.log(progress_percentage);
  
//   progress.value=progress_percentage;
// }


