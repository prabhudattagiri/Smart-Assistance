document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        sendBtn: document.getElementById("sendBtn"),
        userInput: document.getElementById("userInput"),
        chatBox: document.getElementById("chatBox"),
        navigateBtn: document.getElementById("navigateChat"),
        clearBtn: document.getElementById("clearChat"),
        backBtn: document.getElementById("backBtn")
    };

    // Variable to hold the typing indicator element
    let typingIndicator = null;

    // Append a message to the chat box
    function appendMessage(message, sender) {
        if (!elements.chatBox) return;
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", sender);
        msgDiv.innerHTML = `<span class="text">${message}</span>`;
        elements.chatBox.appendChild(msgDiv);
        elements.chatBox.scrollTop = elements.chatBox.scrollHeight;
    }

    // Send a message to the backend API
    async function sendMessage() {
        if (!elements.userInput) return;
        const userText = elements.userInput.value.trim();
        if (userText === "") return;

        // Append the user message
        appendMessage(userText, "student");

        // Append and store the typing indicator
        typingIndicator = document.createElement("div");
        typingIndicator.classList.add("message", "teacher");
        typingIndicator.innerHTML = `<span class="text">Typing...</span>`;
        elements.chatBox.appendChild(typingIndicator);
        elements.chatBox.scrollTop = elements.chatBox.scrollHeight;

        elements.userInput.disabled = true;

        try {
            const response = await fetch("https://smart-assistantbot.onrender.com/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText })
            });
            const data = await response.json();

            // Remove the typing indicator
            if (typingIndicator) {
                typingIndicator.remove();
                typingIndicator = null;
            }
            appendMessage(data.bot_response || "No response from server.", "teacher");
        } catch (error) {
            console.error("Error:", error);
            if (typingIndicator) {
                typingIndicator.remove();
                typingIndicator = null;
            }
            appendMessage("Error connecting to server.", "teacher");
        } finally {
            elements.userInput.value = "";
            elements.userInput.disabled = false;
        }
    }

    // Event listeners
    if (elements.sendBtn) {
        elements.sendBtn.addEventListener("click", sendMessage);
    }
    if (elements.userInput) {
        elements.userInput.addEventListener("keypress", event => {
            if (event.key === "Enter") sendMessage();
        });
    }
    if (elements.navigateBtn) {
        elements.navigateBtn.addEventListener("click", () => {
            document.body.style.opacity = "0";
            setTimeout(() => (window.location.href = "chat.html"), 500);
        });
    }
    if (elements.clearBtn) {
        elements.clearBtn.addEventListener("click", () => {
            if (elements.chatBox) {
                elements.chatBox.innerHTML = "";
            }
        });
    }
    if (elements.backBtn) {
        elements.backBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
});
