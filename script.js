window.onload = function() {
    var savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
        document.getElementById("output").innerHTML = savedMessages;
    }
};
 
function sendMessage() {
    var message = document.getElementById("message").value;
    if (message.trim() !== "") {
        var currentTime = new Date();
        var day = currentTime.getDate();
        var month = currentTime.getMonth() + 1;
        var year = currentTime.getFullYear();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var time = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
       
        var outputDiv = document.getElementById("output");
        var messageId = "msg" + Date.now();
        outputDiv.innerHTML += "<p id='" + messageId + "'>" + day + "." + month + "." + year + " " + time + " - " + message  + "<input id='" + messageId + "' type=\"checkbox\"></input>" +  " <button onclick=\"deleteMessage('" + messageId + "')\">Vymazat</button>";
       
        localStorage.setItem('messages', outputDiv.innerHTML);
       
        document.getElementById("message").value = "";
    } else {
        alert("Nenapsal jste nic!");
    }
}

function deleteMessage(messageId) {
    var messageNode = document.getElementById(messageId);
    messageNode.parentNode.removeChild(messageNode);
 
    localStorage.setItem('messages', document.getElementById("output").innerHTML);
}
 
function editMessage(messageId) {
    var messageNode = document.getElementById(messageId);
    var messageText = messageNode.innerText.split(" - ")[1];
    var newText = prompt("Chcete si upravit zprávu? Napište zde co chcete upravit:", messageText);
    if (newText !== null) {
        messageNode.innerText = messageNode.innerText.split(" - ")[0] + " - " + newText + " ";
        messageNode.innerHTML += "<button onclick=\"deleteMessage('" + messageId + "')\">Smazat</button> <button onclick=\"editMessage('" + messageId + "')\">Upravit</button>";
       
        localStorage.setItem('messages', document.getElementById("output").innerHTML);
    }
}