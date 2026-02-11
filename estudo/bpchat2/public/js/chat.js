var socket = io();
var messages = document.getElementById("messages");

var myloc = {};

    if ("geolocation" in navigator) {
        console.log("geolocation is available");
    
        navigator.geolocation.getCurrentPosition(function(position) {

          var latitude            = position.coords.latitude;
          var longitude           = position.coords.longitude;
          var altitude            = position.coords.altitude;
          var accuracy            = position.coords.accuracy;
          var altitudeAccuracy    = position.coords.altitudeAccuracy;
          var heading             = position.coords.height;
          var speed               = position.coords.speed;
          var timestamp           = position.timestamp;


          console.log("### latitude=["+position.coords.latitude+"]  - longitude=["+position.coords.longitude+"]");
          document.querySelector(".myposition").innerHTML = "Estou aqui" + position.coords.latitude  + "," + 
                                                                           position.coords.longitude + "(" + 
                                                                           new Date(position.timestamp)+")";

          myloc = {"email": "mario.bacellar@gmail.com", "longitude": position.coords.latitude, "latitude": position.coords.longitude} ;
          console.log("myloc=["+myloc.latitude+"],["+myloc.longitude+"]");

          // Passa a posição para o servidor
          socket.emit("sayMyLocation",  myloc);

          // Watching the current position
          // a acada segundo
          var locId = navigator.geolocation.watchPosition(function(position) {
            socket.emit("sayMyLocationId",  position);
          });

        });

    } else {
        console.log(" geolocation IS NOT available ");
    }



(function() {

  $("form").submit(function(e) {
  
    let li = document.createElement("li");
    
    e.preventDefault(); // prevents page reloading
    
    socket.emit("chat message", $("#message").val());

    messages.appendChild(li).append($("#message").val());
    
    let span = document.createElement("span");

    messages.appendChild(span).append("by " + "Anonymous" + ": " + "just now");

    $("#message").val("");

    return false;
  });


  socket.on("received", data => {

    let li       = document.createElement("li");
    let span     = document.createElement("span");
    var messages = document.getElementById("messages");

    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by " + "anonymous" + ": " + "just now");
    console.log("Hello bingo!");
  });


})();

// fetching initial chat messages from the database
(function() {

  fetch("/chats")
    .then(data => {
      return data.json();
    })
    .then(json => {
      json.map(data => {
        let li   = document.createElement("li");
        let span = document.createElement("span");
        messages.appendChild(li).append(data.message);
        messages.appendChild(span)
                .append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));
      });
    });
})();

//is typing...

let messageInput = document.getElementById("message");
let typing       = document.getElementById("typing");

//isTyping event
messageInput.addEventListener("keypress", () => {
  socket.emit("typing", { user: "Someone", message: "is typing..." });
});

socket.on("notifyTyping", data => {
  typing.innerText = data.user + " " + data.message;
  console.log(data.user + data.message);
});

//stop typing
messageInput.addEventListener("keyup", () => {
  socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
  typing.innerText = "";
});



