/**
 * Created by Florian on 02/10/2017.
 */
var audioEle = document.querySelector('audio');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 150;

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
 analyser.fftSize = 128;
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
    drawVisual = requestAnimationFrame(drawFreq);
    document.querySelector('.timer').innerHTML = getMinutes(audioEle.currentTime) + ':' + getSecondes(audioEle.currentTime) + ' | ' + getMinutes(audioEle.duration) + ':' + getSecondes(audioEle.duration);    

    // AnalyserNode.getByteFrequencyData() pour récupérer les 'frequency data'
    // On places ces data dans notre tableau dataArray
    analyser.getByteFrequencyData(dataArray);

    //Dessiner un rectangle noir sur notre canvas
    ctx.fillStyle = 'rgb(50,50,50)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 5;
    
    // ctx.strokeStyle = 'rgb(41, 171, 226)';
    
    ctx.save();
    ctx.translate(0, canvas.height);
    ctx.scale(1,-1);
    
    //largeur de chaque barre
    var barWidth = (canvas.width / bufferLength)-1;
    var barHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
          // Data de 0 à 255
          barHeight = dataArray[i];

          ctx.strokeStyle = 'rgb(' + barHeight + ','+(255-barHeight)+',50)';
          ctx.fillStyle = 'rgb(' + barHeight + ','+(255-barHeight)+',50)';
  
          // ctx.fillRect(x,0,barWidth,barHeight);
          ctx.lineTo(x, barHeight);
          x += barWidth + 1;
    }
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
};

drawFreq();