const audioContexts = new Map();

chrome.runtime.onMessage.addListener(function(request) {
    if(request.action === 'getCaptured'){
        getCapturedTags();
    }
    else if (request.action === "initCapture") {
        initCapture(request.getTabId, request.range);
    }
    else if(request.action === 'deleteCapture'){
        deleteCapture(request.getTabId);
    }
    else if(request.action === 'changeVolumen'){
        changeHandler(request.getTabId, request.range);
    }
});

function getCapturedTags(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTabId = tabs[0].id;
      
        chrome.runtime.sendMessage({
            action: 'showNotification',
            tabId: currentTabId,
            state: audioContexts.has(currentTabId) //false: se ejecutara initCapture() - true: se ejecutar deleteCapture()
        });
    });
}

function initCapture(tabId, value) {
    chrome.tabCapture.capture({
        audio: true,
        video: false,
        audioConstraints: {
            mandatory: {
                chromeMediaSource: 'tab',
            },
        },
    }, function(stream) {
        const audioContext = new AudioContext();
        const sourceNode = audioContext.createMediaStreamSource(stream);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = value;

        sourceNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
  
        //guardar en Map()
        audioContexts.set(tabId, {audioContext, sourceNode, gainNode});

        // Iniciar la reproducción del audio
        sourceNode.mediaStream.getAudioTracks()[0].enabled = true;
    });
}

function deleteCapture(tabId) {
    //verifica que el tabId actual exista en Map()
    if(audioContexts.has(tabId)){
        const { audioContext, sourceNode, gainNode } = audioContexts.get(tabId);
   
        sourceNode.mediaStream.getAudioTracks()[0].stop();
        sourceNode.disconnect(gainNode);
        gainNode.disconnect(audioContext.destination);
        audioContext.close();

        audioContexts.delete(tabId);
    }
}

function changeHandler(tabId, rangeVolumen) {
    if(audioContexts.has(tabId)){
        const { audioContext, sourceNode, gainNode } = audioContexts.get(tabId);
   
        gainNode.gain.value = rangeVolumen;
    }
}