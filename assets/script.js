const captureButton = document.getElementById('captureButton');
const spliter = document.getElementById('rangeVolumen');
let state = null;
let tabId = null;

document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ action: 'getCaptured' });
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "showNotification") {
          state = message.state;
          tabId = message.tabId;
        }
    });
})

captureButton.addEventListener('click', function() {
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
    chrome.runtime.sendMessage({
        action: "changeVolumen",
        range: +spliter.value
    });
}) 

