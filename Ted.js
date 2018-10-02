const colorTed = [
  '0,162,232', '0,162,232', '0,162,232', '0,162,232', '0,162,232', '0,162,232','255,201,14', '255,201,14', '255,201,14', '255,201,14','0,0,0', '0,0,0', '0,0,0','239,228,176', '239,228,176','239,228,176','185,122,87','255,131,6','255,119,164','0,125,179','34,177,76'
];
const txtArr = [
  'TWITTER','SOUNDCLOUD',
 'UNITY CONNECT','LUDUM DARE',
 'INSTAGRAM','ITCH.IO',
 'GAMEJOLT', 'MEDIUM'
];
const LINKS = [
  'https://twitter.com/Ratherjolly',  'https://soundcloud.com/ratherjolly', 
 'https://connect.unity.com/u/582531cc090915001d503f3e', 'https://ldjam.com/users/ratherjolly/games', 
 'https://www.instagram.com/ratherjolly/', 'https://ratherjolly.itch.io/',
 'https://gamejolt.com/@Ratherjolly', 'https://medium.com/@mattsponholz'
];
const lilDude = [
 'GET THE MATH<br/>OUT OF HERE!!!',
 'PLEASE LEAVE',
 'HOW COULD YOU?<br/>WHAT HAVE THEY<br/>DONE TO YOU???',
 'YOU ARE...<br/>A MONSTER',
 '*WEEPS*<br/>WHY!!!<br/>WHY WOULD YOU???',
 'PLEASE!!!<br/>STOP THIS!!!',
 'OH NO!!!<br/>WHAT HAVE YOU DONE<br/>??????????',
 'WHAT IS GOING ON<br>??????????',
 'Try not to touch<br/>the lil guys<br/>they are so fragile<br/><3'
];

const IMG_URL = {
"TED_WALKING":"https://github.com/Ratherjolly/Ratherjolly.github.io/blob/master/Assets/GIF/Ted_Walking.gif?raw=true",
"TUTOR_0":"https://github.com/Ratherjolly/Ratherjolly.github.io/blob/master/Assets/GIF/Tutor_Talking.gif?raw=true",
"TUTOR_1":"https://github.com/Ratherjolly/Ratherjolly.github.io/blob/master/Assets/GIF/Tutor_Talking_1.gif?raw=true",
"TUTOR_2":"https://github.com/Ratherjolly/Ratherjolly.github.io/blob/master/Assets/GIF/Tutor_Talking_2.gif?raw=true"
};

var shakes = 0;
var lastTed = 0;
var TotalTeds = 0;
const maxTeds = 8;
const maxPart = 100;
$(document).ready(function(){
 for(var t=0;t<maxTeds;t++){
    genTed();
 }
 setCommentText(TotalTeds);
});

function genTed()
{
 //YOU GET THAT POSITION, YOU!===================
 var newq = makeNewPosition();
 
 //YOU ASSIGN THOSE ELEMENT ATTRIBUTES, YOU!=====
 var ted = document.createElement('div');
 ted.id = lastTed;
 ted.style.top = newq[0]+"px";
 ted.style.left = newq[1]+"px";
 ted.setAttribute("class","tedsdad");
 ted.innerHTML = "<div class='ted img' onclick='ClickTed(this);'></div><div class='tedtext'>"+txtArr[lastTed]+"</div>";
 document.getElementsByTagName('body')[0].appendChild(ted);
 
 //YOU ANIMATE THAT LIL GUY, YOU!================
 animateSelf(ted);
 
 //YOU SET THOSE VARIABLES, YOU!=================
 lastTed = lastTed +1;
 TotalTeds = TotalTeds + 1;
}

function setCommentText(currT){
 //SET TEXT===================
 document.getElementsByClassName("CommentText")[0].innerHTML = lilDude[currT];
 
 //SET IMAGE==================
 var TutorImg = document.getElementById("Tutor");
 if(currT >6)
    TutorImg.src = IMG_URL.TUTOR_0;
 else if(currT >2)
    TutorImg.src = IMG_URL.TUTOR_1;
 else{
    TutorImg.src = IMG_URL.TUTOR_2;
 }
}

function ClickTed(t){
 var e = t.parentElement;
 if (!$(e).hasClass('WalkingDead')){
    if ($(e).length > 0){
       explode(getOffset(e).left+14, getOffset(e).top+115,e);
    }
    $(e).addClass('WalkingDead');
 }
}

function animateSelf(el){
 var ted = document.getElementById(el.id);
 if ($(ted).length > 0) { 
    var newq = makeNewPosition();
    var oldq = $(ted).offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    if(newq[1]<oldq.left)
    {
       if (!$(ted).children().first().hasClass('img'))
          $(ted).children().first().addClass('img')
    }
    else if(newq[1]>oldq.left)
    {
       if ($(ted).children().first().hasClass('img'))
          $(ted).children().first().removeClass('img')
    }
    $(ted).animate({ top: newq[0], left: newq[1] }, speed, function(){
       animateSelf(this);
    });
 }
 else{
    clearTimeout(this);
 }
}

function explode(x, y,e) {
 shakes+=10;
 SHAKE($('body'));
 setTimeout(function() {
    shakes -=10;
    SHAKE($('body'));
 },1000);
 
 setTimeout(function() {
    if ($(e).length > 0){
       TotalTeds = TotalTeds - 1;
       setCommentText(TotalTeds);
       
       var ted = document.createElement('div');
       ted.style.top = getOffset(e).top+70+"px";
       ted.style.left = getOffset(e).left+"px";
       ted.setAttribute("class", "tedtextAfter");
       
       var LinkLbl = $(e).children(".tedtext")[0].innerHTML;
       ted.setAttribute("onclick","window.open('"+LINKS[txtArr.indexOf(LinkLbl)]+"','_blank');")
       ted.innerHTML = LinkLbl;
       document.getElementsByTagName('body')[0].appendChild(ted);
       e.remove();
    }
 }, 500);
 var particles = maxPart,
     
 // explosion container and ref to delete it on animation end
 explosion = $('<div class="explosion"></div>');
 
 // put the explosion container into the body to be able to get it's size
 $('body').append(explosion);
 
 // position the container to be centered on click
 explosion.css('left', x - explosion.width() / 2);
 explosion.css('top', y - explosion.height() / 2);

for (var i = 0; i < particles; i++)
{   
  // positioning x,y of the particle on the circle (little randomized radius)
  var x = (explosion.width() / 2) + rand(80, 150) * Math.cos(2 * Math.PI * i / rand(particles - 10, particles + 10)),
    y = (explosion.height() / 2) + rand(80, 150) * Math.sin(2 * Math.PI * i / rand(particles - 10, particles + 10)),
   color = colorTed[rand(0,20)],
      // particle element creation (could be anything other than div)
    elm = $('<div class="particle" style="' +
      'background-color: rgb(' + color + ') ;' +
      'top: ' + y + 'px; ' +
      'left: ' + x + 'px"></div>');

  if (i == 0)
  {
    // css3 animation end detection (remove explosion after animation ends)
    elm.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
      explosion.remove();
    });
  }
  explosion.append(elm);
}
}

function SHAKE(element){
 //I GOT THE SHAKES 0_0
 var coefficients = shakes;
 console.log(coefficients);
  $(element).css({"transition": "0.1s"});
  
  setInterval(function(){
     var coefficient = shakes;
     if(coefficient == 0)
        clearInterval(this);
      var randomInt1 = Math.floor((Math.random() * 3) + 1);
      var randomInt2 = Math.floor((Math.random() * 3) + 1);
      var randomInt3 = Math.floor((Math.random() * 2) + 1);
      
      var phase1 = (randomInt1 % 2) == 0 ? "+" : "-";
      var phase2 = (randomInt2 % 2) == 0 ? "+" : "-";
      var phase3 = (randomInt3 % 2) == 0 ? "+" : "-";
      
      var transitionX = ((phase1 + randomInt1) * (coefficient / 10)) + "px";
      var transitionY = ((phase2 + randomInt2) * (coefficient / 10)) + "px";
      var rotate = ((phase3 + randomInt3) * (coefficient / 10)) + "deg";
             
      $(element).css({"-webkit-transform": "translate("+transitionX+","+transitionY+") rotate("+rotate+")"});  
  }, 0.5);
};

//GENERAL CALCS=================
function calcSpeed(prev, next) {
 var x = Math.abs(prev[1] - next[1]);
 var y = Math.abs(prev[0] - next[0]);
 var greatest = x > y ? x : y;
 var speedModifier = 0.02;
 var speed = Math.ceil(greatest/speedModifier);
 return speed;
}
function makeNewPosition(){
 var h = $(window).height() - 256;
 var w = $(window).width() - 256;
 var nh = Math.floor(Math.random() * h);
 var nw = Math.floor(Math.random() * w);
 return [nh,nw];    
}
function rand(min, max) {
return Math.floor(Math.random() * (max + 1)) + min;
}
function getOffset(el) {
el = el.getBoundingClientRect();
return {
  left: el.left + window.scrollX,
  top: el.top + window.scrollY
}
}