const captureButton = document.getElementById('captureButton');
const spliter = document.getElementById('rangeVolumen');
let state = null;

document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ action: 'getCaptured' });
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "showNotification") {
          alert("Se ha recibido una notificación desde el fondo." + message.state);
          state = message.state;
        }
    });
})




captureButton.addEventListener('click', function() {
    // console.log(state);

    if(state)
        chrome.runtime.sendMessage({ action: "deleteCapture" });
    else
        chrome.runtime.sendMessage({ action: "initCapture", range: +spliter.value });
});

spliter.addEventListener('change', function() {
    // console.log(+this.value + "%");
    chrome.runtime.sendMessage({
        action: "changeVolumen",
        range: +spliter.value
    });
}) 

