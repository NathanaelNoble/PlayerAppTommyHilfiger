/**
 * Created by Florian on 02/10/2017.
 */
var audioEle = document.querySelector('audio');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

// L'API web audio permet d'extraire une série de données de la source audio
// Fréquence, forme d'onde...

// Création d'un contexte audio
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Source du son : ici audioEle
var source = audioCtx.createMediaElementSource(audioEle);
source.crossOrigin = "anonymous";

// Pour extraire les données de votre source audio vous devez créer un 'AnalyserNode'
// avec la méthode du contexte createAnalyser()
var analyser = audioCtx.createAnalyser();

// Connection des différents noeuds : source > analyser > destination
source.connect(analyser);
analyser.connect(audioCtx.destination);


 // L'analyseur va alors capturer les données audio en usant 
 // une Transformation de Fourier Rapide (fft) à une certaine fréquence
  // Par défaut analyser.fftSize=2048 (puissance de 2);
 analyser.fftSize = 64;
 // Nombre de points de données qui seront collectées pour cette fréquence
 // analyser.fftSize/2
var bufferLength = analyser.frequencyBinCount;
  // Création d'un tableau Uint8Array (0 à 255 valeurs d'entier)
  // Pour stoker les données collectées.
  var dataArray = new Uint8Array(bufferLength);

  //canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

function getMinutes(nb) {
    if ( parseInt(nb / 60) > 10 ) {
    return parseInt(nb / 60)
    } else {
        return '0' + parseInt(nb / 60)
    }
}
function getSecondes(nb) {
    if ( parseInt(nb % 60) > 10 ) {
        return parseInt(nb % 60)
    } else {
        return '0' + parseInt(nb % 60)
    }
}

function drawFreq(){
    var drawVisual = requestAnimationFrame(drawFreq);
    document.querySelector('.timer').innerHTML = getMinutes(audioEle.currentTime) + ':' + getSecondes(audioEle.currentTime) + ' | ' + getMinutes(audioEle.duration) + ':' + getSecondes(audioEle.duration);    
    
    // AnalyserNode.getByteFrequencyData() pour récupérer les 'frequency data'
    // On places ces data dans notre tableau dataArray
    analyser.getByteFrequencyData(dataArray);
    
    var average1 = 0;
    var average2 = 0;
    var average3 = 0;
    var average4 = 0;

    for(var i = 0; i < bufferLength; i++) {
        if(i < bufferLength/4) {
            average1 += dataArray[i];
        } else if (i < (bufferLength/4)*2) {
            average2 += dataArray[i];
        } else if (i < (bufferLength/4)*3) {
            average3 += dataArray[i];
        } else {
            average4 += dataArray[i];
        }
    }
    
    average1 = ((average1 / (bufferLength / 4)) * (canvas.height/2 - 10)) / 255;
    average2 = ((average2 / (bufferLength / 4)) * (canvas.height/2 - 10)) / 255;
    average3 = ((average3 / (bufferLength / 4)) * (canvas.height/2 - 10)) / 255;
    average4 = ((average4 / (bufferLength / 4)) * (canvas.height/2 - 10)) / 255;

    console.log(average1, average2, average3, average4);

    averageA = (average1 + average2) / 2
    averageB = (average3 + average4) / 2

    //Dessiner un rectangle noir sur notre canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineWidth = 3;
    
    // ctx.strokeStyle = 'rgb(41, 171, 226)';
    
    ctx.save();
    ctx.beginPath();
    ctx.translate(0, canvas.height);
    ctx.scale(1,-1);
    
    /* var barWidth = canvas.width / bufferLength;
    var barHeight;
    var x = 0;
    var cpx;
    
    
        // Data de 0 à 255
        barHeight = (dataArray[i + 1] * (canvas.height - 10)) / 255;
        cpBarHeight = (dataArray[i] * (canvas.height - 10)) / 255;
        cpx = x + barWidth;
        
        ctx.strokeStyle = 'rgb(' + barHeight + ','+(255-barHeight)+',50)';
        ctx.fillStyle = 'rgb(' + barHeight + ','+(255-barHeight)+',50)';
        
        // ctx.fillRect(x,0,barWidth,barHeight);
        // ctx.lineTo(x, barHeight);
        ctx.quadraticCurveTo(x, cpBarHeight, cpx, barHeight);
        x += barWidth * 2; */

    /* ctx.moveTo(0, canvas.height/2);

    ctx.bezierCurveTo(canvas.width/4, canvas.height/2 + average1,(canvas.width/4)*3, canvas.height/2 - average4, canvas.width, canvas.height/2);
    
    //    ctx.quadraticCurveTo((canvas.width/4)*3, 0, canvas.width, 0);
    
    // ctx.lineTo(canvas.width, 0);
    ctx.lineTo(0, canvas.height/2);
    ctx.fill();
    
    ctx.beginPath(); */
    ctx.moveTo(0,canvas.height/2);
    ctx.strokeStyle = 'rgb(250,250,250)';
    ctx.bezierCurveTo(canvas.width/4, canvas.height/2 + averageA,(canvas.width/4)*3, canvas.height/2 - averageB, canvas.width, canvas.height/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height/2);
    // ctx.
    ctx.strokeStyle = 'rgba(250,250,250, 0.3)';
    ctx.lineTo(0, canvas.height/2);
    ctx.stroke();

    ctx.restore();
};

drawFreq();

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
