var chat_space = document.getElementById("chat_space");
var roomCode = chat_space.getAttribute("room_code");
var username = chat_space.getAttribute("username");

var chat_box = document.getElementById("chat_box");
var chat_box_send = document.getElementById("chat_box_send");

var connectionString =
  "ws://" + window.location.host + "/ws/chat/" + roomCode + "/";
var wsSocket = new WebSocket(connectionString);

chat_box_send.addEventListener("click", (event) => {
  var message = { sender: username, text: chat_box.value };
  wsSocket.send(
    JSON.stringify({
      event: "MESSAGE",
      message,
    })
  );
  chat_space.innerHTML += '<p id="message">&#9633; ' + message.text + "</p>";
});

function add_message(message) {
  if (message.sender != username)
    chat_space.innerHTML += "<p>&#9658; " + message.text + "</p>";
}

function connect() {
  wsSocket.onopen = function open() {
    console.log("WebSockets connection created.");
    wsSocket.send(
      JSON.stringify({
        event: "START",
        message: "",
      })
    );
  };

  wsSocket.onclose = function (e) {
    console.log(
      "Socket is closed. Reconnect will be attempted in 1 second.",
      e.reason
    );
    setTimeout(function () {
      connect();
    }, 1000);
  };
  // Sending the info about the room
  wsSocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    data = data["payload"];
    let message = data["message"];
    let event = data["event"];
    switch (event) {
      case "START":
        break;
      case "END":
        alert(message);
        break;
      case "MESSAGE":
        add_message(message);
        break;
      default:
        console.log("No event");
    }
  };

  if (wsSocket.readyState == WebSocket.OPEN) {
    wsSocket.onopen();
  }
}

connect();
