/**
 * Created by Florian on 02/10/2017.
 */

// Effects on Button Click

var buttons = document.getElementsByClassName("button");
document.cover = document.querySelector(".cover");

function handeled(e){
    e.target.classList.toggle("handeled");
    window.setTimeout(function(){
        e.target.classList.toggle("handeled");
    }, 100)
}

for(var i = 0; i< buttons.length; i++){
    buttons[i].addEventListener("click", handeled);
}

// Switch Playbutton

document.isPlaying = false;

var playButton = document.getElementById("play-btn");
playButton.addEventListener("click", function(){
    if(!document.isPlaying) {
        this.src = "files/img/icons/pause.svg";
        document.cover.classList.toggle("triggered");
        document.isPlaying = true;
    }else{
        this.src = "files/img/icons/play.svg";
        document.cover.classList.toggle("triggered");
        document.isPlaying = false;
    }

});


// Switch RepeatButton

document.repeat = false;

var repeatButton = document.getElementById("repeat-btn");
repeatButton.addEventListener("click", function(){
    if(!document.repeat) {
        this.style.transform = "rotate(360deg)";
        this.src = "files/img/icons/repeatfull.svg";
        document.repeat = true;
    }else{
        this.style.transform = "rotate(0deg)";
        this.src = "files/img/icons/repeat.svg";
        document.repeat = false;
    }

});


// Switch Playbutton

document.like = false;

var likeButton = document.getElementById("like-btn");
likeButton.addEventListener("click", function(){
    if(!document.like) {
        this.src = "files/img/icons/likefull.svg";
        document.like = true;
    }else{
        this.src = "files/img/icons/like.svg";
        document.like = false;
    }

});
