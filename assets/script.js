const captureButton = document.getElementById('captureButton');
const spliter = document.getElementById('rangeVolumen');

let state = false;
captureButton.addEventListener('click', function() {
    if(!state){
        chrome.runtime.sendMessage({ 
            action: "initCapture",
            range: +spliter.value
        });
        state = true;
        captureButton.textContent = 'Delete Capture';
    }
    else{
        chrome.runtime.sendMessage({ action: "deleteCapture" });
        state = false;
        captureButton.textContent = 'Init Capture';
    }
    
});

spliter.addEventListener('change', function() {
    // console.log(+this.value + "%");
    chrome.runtime.sendMessage({
        action: "changeVolumen",
        range: +spliter.value
    });
}) 

