const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
let sourceNode = null;

chrome.runtime.onMessage.addListener(function(request) {
    if(request.action === 'getCaptured'){
        getCapturedTags();
    }
    else if (request.action === "initCapture") {
        initCapture(request.range);
    }
    else if(request.action === 'deleteCapture'){
        deleteCapture();
    }
    else if(request.action === 'changeVolumen'){
        gainNode.gain.value = request.range;
    }
});

function getCapturedTags(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTabId = tabs[0].id;
      
        chrome.tabCapture.getCapturedTabs(function(capturedTabs) {
            const isCurrentTabCaptured = capturedTabs.some(tab => tab.tabId === currentTabId);
        
            chrome.runtime.sendMessage({ action: 'showNotification', state: isCurrentTabCaptured });
            console.log(isCurrentTabCaptured);
        });
        console.log(tabs, currentTabId);
    });
}

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