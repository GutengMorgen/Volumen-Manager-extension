const captureButton = document.getElementById('captureButton');
const spliter = document.getElementById('rangeVolumen');
let state = null;
let tabId = null;

document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ action: 'getCaptured' });
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "showNotification") {
          alert("Se ha recibido una notificación desde el fondo. " + message.state);
          state = message.state;
          tabId = message.tabId;
        }
    });
})

captureButton.addEventListener('click', function() {
    // console.log(state);
    if(state === null){
        captureButton.textContent = 'Refresh!';
        return;    
    }

    if(state)
        chrome.runtime.sendMessage({ action: "deleteCapture", getTabId: tabId });
    else
        chrome.runtime.sendMessage({ action: "initCapture", getTabId: tabId, range: +spliter.value });

    state = null;
});

spliter.addEventListener('change', function() {
    // console.log(+this.value + "%");
    chrome.runtime.sendMessage({
        action: "changeVolumen",
        range: +spliter.value
    });
}) 

