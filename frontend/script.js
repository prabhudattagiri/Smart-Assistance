document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        sendBtn: document.getElementById("sendBtn"),
        userInput: document.getElementById("userInput"),
        chatBox: document.getElementById("chatBox"),
        navigateBtn: document.getElementById("navigateChat"),
        clearBtn: document.getElementById("clearChat"),
        backBtn: document.getElementById("backBtn")
    };

    // Define the intents object with key phrases
    const intents = {
        "hello": ["hii", "what's up", "hello", "hi", "hey"],
        "courses": ["what are the courses", "give me courses"],
        "fee": ["what's the fee", "fee structure", "my next payment"],
        "syllabus": ["what's the syllabus for my course", "where can i download my syllabus"],
        "exam timetable": ["when is exam", "exam", "exam schedule"],
        "holidays": ["next holidays"],
        "results": ["topper's list", "university topper"],
        "clubs": ["what clubs available", "clubs detail", "how many clubs"],
        "library timings": [
            "when is library open", "library timing", "what are library hours", "library open time", "until what time is the library open"
        ],
        "canteen hour": [
            "canteen timing", "brakfast time", "lunch", "dinner", "when does the canteen open",
            "what time is breakfast in the canteen", "when is lunch served", "dinner time in the canteen", "canteen open hours"
        ],
        "hostel facilities": ["where can i stay", "hostel", "hostel details"],
        "unknown": ["sorry! i don't know"]
    };

    // Define the responses object with reply text
    const responses = {
        "hello": ["Hello! How can I assist you with your college related work today?"],
        "courses": "The college offers BBA, BCA, BA, PSC. See details on the college website.",
        "fee": "💰The fee structure depends on the course. To know about installments or payment deadlines, check here (https://www.imperial.edu.in/fee-details)",
        "syllabus": "📚You can find the syllabus for your course at (https://www.imperial.edu.in/downloads/Syllabus#programme-syllabus)",
        "exam timetable": "The exam schedule 🗓️ will be published by the university. Keep an eye on the noticeboard.",
        "holidays": "For holidays, you can check the academic calendar in your Sahaj app.",
        "results": "Want to know who aced it 🏆? For the latest ranking, visit https://www.imperial.edu.in/academic-achievements.",
        "clubs": "Clubs run the show! 🎤 Cultural, sports, social activities and more—find your place! Check details here https://www.imperial.edu.in/campus-life/clubs",
        "library timings": "📖 Books, Peace, and Knowledge! Visit the library from 10 AM to 4 PM.",
        // For canteen, note the key difference between intent and response (we use "Canteen hours")
        "Canteen hours": "🍕 Hungry! Breakfast: 8:30 AM to 8:45 AM, Lunch: 1:15 PM to 2:00 PM, Dinner: 7:30 PM to 8:00 PM.",
        "hostel facilities": "🏡 Hostel life is fun! The details are available with the warden.",
        "unknown": "I'm sorry, I don't understand. Can you rephrase it?"
    };

    // Function to retrieve a response based on user input
    function getResponse(userInput) {
        const lowerInput = userInput.toLowerCase();
        console.log("Processing input:", lowerInput);
        // Loop through each intent (except "unknown")
        for (const key in intents) {
            if (key === "unknown") continue;
            for (let phrase of intents[key]) {
                // Check if the input contains the phrase
                if (lowerInput.includes(phrase.toLowerCase())) {
                    let matchedKey = key;
                    // If the key is "canteen hour", use the response key "Canteen hours"
                    if (matchedKey === "canteen hour") {
                        matchedKey = "Canteen hours";
                    }
                    console.log("Matched intent:", key, "-> using response key:", matchedKey);
                    const reply = responses[matchedKey];
                    if (Array.isArray(reply)) {
                        return reply[Math.floor(Math.random() * reply.length)];
                    } else if (typeof reply === "string") {
                        return reply;
                    }
                }
            }
        }
        // If no matching intent is found, return unknown response
        console.log("No matching intent found. Using unknown response.");
        const unknownReply = responses["unknown"];
        return typeof unknownReply === "string"
            ? unknownReply
            : unknownReply[Math.floor(Math.random() * unknownReply.length)];
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

        // Append the user's message
        appendMessage(userText, "student");

        // Append and store the typing indicator
        typingIndicator = document.createElement("div");
        typingIndicator.classList.add("message", "teacher");
        typingIndicator.innerHTML = `<span class="text">Typing...</span>`;
        elements.chatBox.appendChild(typingIndicator);
        elements.chatBox.scrollTop = elements.chatBox.scrollHeight;

        elements.userInput.disabled = true;

        // Simulate a delay (e.g., 500ms) to mimic processing time
        setTimeout(() => {
            if (typingIndicator) {
                typingIndicator.remove();
                typingIndicator = null;
            }
            const botResponse = getResponse(userText);
            appendMessage(botResponse, "teacher");

            elements.userInput.value = "";
            elements.userInput.disabled = false;
        }, 500);
    }

    // Set up event listeners
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
