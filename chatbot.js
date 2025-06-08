function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    document.getElementById("chatLog").innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("chatLog").innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
        document.getElementById("userInput").value = "";
    })
    .catch(err => {
        console.error(err);
        document.getElementById("chatLog").innerHTML += `<p><strong>Bot:</strong> Sorry, I couldn't respond right now.</p>`;
    });
}
