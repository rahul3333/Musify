const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})
function toggleSidebar(){
  document.getElementById("sidebar").classList.toggle('active');
 }
var id;
var width=1;
 $('#play').click(function(e){
   e.preventDefault();
   if(document.getElementById('play').src=='http://localhost:8000/images/playbutton.png')
    {
      document.getElementById('play').src='/images/pause.png';
      id=setInterval(progress,10);
    }
    else{
      document.getElementById('play').src='/images/playbutton.png';
      clearInterval(id);
      document.getElementById('go_progress').style.width=width + "%";
      document.getElementById('tracker').style.marginLeft=width + "%";
    }
 })

 function progress(){
   var tracker=document.getElementById('tracker');
   var element=document.getElementById('go_progress');
  if(width>=100){
    clearInterval(id);
    element.style.width=0;
    width=0;
    document.getElementById('play').src='/images/playbutton.png';
  }else{
    width++;
    
    tracker.style.marginLeft=width + "%";
    element.style.width = width + "%";
  }
 }