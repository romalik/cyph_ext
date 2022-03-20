var messages = []
var max_messages = 10;

var feed = document.getElementById("feed");
var msg_input = document.getElementById("msg_input");

function send_msg() {
    let msg = msg_input.value;
    msg_input.value = '';
    messages.push(msg);
    while(messages.length > max_messages) messages.shift();

    feed.innerHTML = '';

    for(var i = 0; i<max_messages; i++) {
        var msg_idx = messages.length - max_messages + i;
        var text = "> ";
        if(msg_idx >= 0) text += messages[msg_idx];

        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let cont = document.createTextNode(text);
        tr.appendChild(td);
        td.appendChild(cont);
        feed.appendChild(tr);
    }

}

msg_input.addEventListener("keyup", function (event) {
 
    // Checking if key pressed is ENTER or not
    // if the key pressed is ENTER
    // click listener on button is called
    if (event.keyCode == 13) {
        send_msg();
    }
});