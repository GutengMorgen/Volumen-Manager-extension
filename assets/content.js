// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     var activeTab = tabs[0];
    
//     // Iniciar la captura de la pestaña
//     chrome.tabCapture.capture({ audio: true, video: false }, function(stream) {
//       // Manejar el flujo de audio capturado
//       if (stream) {
//         // Hacer algo con el flujo de audio, por ejemplo, reproducirlo en un elemento de audio HTML
//         var audioElement = document.createElement('audio');
//         audioElement.srcObject = stream;
//         audioElement.play();
//       }
//     });
//   });

// alert('nigger');

// const testing = navigator.mediaSession.metadata;

// const elmnt = document.querySelector('video');
// const ratedValue = 5;

// const audioCtx = new AudioContext();
// const result = {
//     context: audioCtx,
//     source: audioCtx.createMediaElementSource(elmnt),
//     gain: audioCtx.createGain(),
//     media: elmnt,
//     amplify: (multiplier) => { result.gain.gain.value = multiplier },
//     getAmpLevel: () => { return result.gain.gain.value }
// };

// result.source.connect(result.gain);
// result.gain.connect(audioCtx.destination);
// result.amplify(ratedValue);

// console.log('exit');

// const filter = audioCtx.createGain();
// filter.gain.value = 10;

// filter.connect(audioCtx.destination);

// document.addEventListener('play', () => {
//     alert("is play");
// })

// chrome.action.onClicked.addListener(function(tab) {
//     console.log('testing');
    
// });