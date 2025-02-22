document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        sendBtn: document.getElementById("sendBtn"),
        userInput: document.getElementById("userInput"),
        chatBox: document.getElementById("chatBox"),
        navigateBtn: document.getElementById("navigateChat"),
        clearBtn: document.getElementById("clearChat"),
        backBtn: document.getElementById("backBtn")
    };

    // Response mapping: keywords to response arrays
    const responses = {
        "hello": [
            "hii", "what's up"
        ],
        "courses": [
            "What are the courses", "give me courses"
        ],
        "fee": [
            "What's the fee", "Fee structure", "my next payment"
        ],
        "syllabus": [
            "What's the syllabus for my course", "Where can i download my syllabus"
        ],
        "exam timetable": [
            "When is exam", "Exam", "Exam schedule"
        ],
        "holidays": [
            "Next holidays"
        ],
        "results": [
            "topper's list", "university topper"
        ],
        "clubs": [
            "What clubs available", "clubs detail", "how many clubs"
        ],
        "library timings": [
            "when is library open", "library timing", "what are library hours", "library open time", "until what time is the library open"
        ],
        "canteen hours": [
            "canteen timing", "breakfast time", "lunch", "dinner", "when does the canteen open", "what time is breakfast in the canteen", "when is lunch served", "dinner time in the canteen", "canteen open hours"
        ],
        "hostel facilities": [
            "where can i stay", "hostel", "hostel details"
        ],
        "unknown": [
            "Sorry! i don't know"
        ]
    };

    // Function to get a random response based on user input
    function getResponse(userInput) {
        const lowerInput = userInput.toLowerCase();
        // Iterate over the keys except for "unknown"
        for (const key in responses) {
            if (key === "unknown") continue;
            if (lowerInput.includes(key)) {
                const arr = responses[key];
                return arr[Math.floor(Math.random() * arr.length)];
            }
        }
        // If no matching key is found, return unknown response
        const unknownArr = responses["unknown"];
        return unknownArr[Math.floor(Math.random() * unknownArr.length)];
    }

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

    // Simulate sending a message and getting a response
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

        // Simulate a delay to mimic a backend call (e.g., 500ms)
        setTimeout(() => {
            // Remove the typing indicator
            if (typingIndicator) {
                typingIndicator.remove();
                typingIndicator = null;
            }
            // Get the response based on the user input
            const botResponse = getResponse(userText);
            appendMessage(botResponse, "teacher");

            elements.userInput.value = "";
            elements.userInput.disabled = false;
        }, 500);
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
