
// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         files: ['content.js']
//     });
// });

// chrome.tabCapture.capture({ audio: true, video: false }, function(stream) {
//   // Manejar el flujo de audio capturado
//   if (stream) {
//     // Hacer algo con el flujo de audio, por ejemplo, reproducirlo en un elemento de audio HTML
//     var audioElement = document.createElement('audio');
//     audioElement.srcObject = stream;
//     audioElement.play();
//   }
// });
// console.log("action");


// chrome.browserAction.onClicked.addListener(function(tab) {
//     chrome.tabCapture.capture({
//         audio: true,
//         video: false,
//         audioConstraints: {
//             mandatory: {
//                 chromeMediaSource: 'tab',
//             },
//         },
//     }, function(stream) {
//         if (stream) {
//             const audioContext = new AudioContext();

//             const sourceNode = audioContext.createMediaStreamSource(stream);
//             const gainNode = audioContext.createGain();
      
//             gainNode.gain.value = 2.0; // Ajusta este valor para cambiar la amplificación

//             sourceNode.connect(gainNode);
//             gainNode.connect(audioContext.destination);
      
//             // Iniciar la reproducción del audio
//             sourceNode.mediaStream.getAudioTracks()[0].enabled = true;
//         }
//     });
// });
const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
let sourceNode = null;

chrome.runtime.onMessage.addListener(function(request) {
    if (request.action === "initCapture") {
        initCapture(request.range);
    }
    else if(request.action === 'deleteCapture'){
        deleteCapture();
    }
    else if(request.action === 'changeVolumen'){
        gainNode.gain.value = request.range;
    }
});

function initCapture(value) {
    chrome.tabCapture.capture({
        audio: true,
        video: false,
        audioConstraints: {
            mandatory: {
                chromeMediaSource: 'tab',
            },
        },
    }, function(stream) {
        sourceNode = audioContext.createMediaStreamSource(stream);
        gainNode.gain.value = value;

        sourceNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
  
        // Iniciar la reproducción del audio
        sourceNode.mediaStream.getAudioTracks()[0].enabled = true;
    });
}

function deleteCapture() {
    if(sourceNode != null){
        //detener la reproducción del audio and this tab's content is being shared
        sourceNode.mediaStream.getAudioTracks()[0].stop();
        sourceNode.disconnect(gainNode);
        gainNode.disconnect(audioContext.destination);
    }
}