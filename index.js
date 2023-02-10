// Create a new Webex app instance
var app = new window.Webex.Application();

// Wait for onReady() promise to fulfill before using framework
app.onReady().then(() => {
    log("App ready. Instance", app);
}).catch((errorcode) =>  {
    log("Error with code: ", Webex.Application.ErrorCodes[errorcode])
});

function send() {
    console.log("In send func");
    fetch('http://127.0.0.1:5000/send')
    .then(response => response.json())
    .then((data) => {
      let transcript = data.transcript
      let transcriptContainer = document.getElementById('transcriptContainer')
      transcriptContainer.innerHTML = `<p>${transcript}</p>`
    })

    setTimeout(send, 5000);
}

send(); 



// Get the meeting transcript
// window.webex.meetings.getTranscript().then((transcript) => {
//     // Create a list element
//     const transcriptList = document.createElement('ul');
     
//     // Iterate through each line of the transcript
//     transcript.forEach((line) => {
//         // Create a list item for each line
//         const lineItem = document.createElement('li');

//         // Set the inner text of the list item to the line
//         lineItem.innerText = line;

//         // Append the list item to the list
//         transcriptList.appendChild(lineItem);
//     });

//     // Append the list to the transcript container
//     transcriptContainer.appendChild(transcriptList);
// });

// Button click handler to set share URL
function handleSetShare() {
    // Replace this with the URL of your shared page
    var url = "https://www.example.com/shared.html"
    // "Shared App" is the title of the window or tab that will be created
    app.setShareUrl(url, "", "Shared App").then(() => {
        log("Set share URL", url);
    }).catch((errorcode) => {
        log("Error: ", Webex.Application.ErrorCodes[errorcode])
    });
}

// Utility function to log app messages
function log(type, data) {
    var ul = document.getElementById("console");
    var li = document.createElement("li");
    var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
    li.appendChild(payload)
    ul.prepend(li);
}