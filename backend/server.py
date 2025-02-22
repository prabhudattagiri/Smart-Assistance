from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Sample responses (you can improve this with an AI model)
responses = {
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
}

def get_response(user_input):
    user_input = user_input.lower()
    for key in responses.keys():
        if key in user_input:
            return random.choice(responses[key])
    return random.choice(responses["default"])

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    bot_reply = get_response(user_message)
    return jsonify({"bot_response": bot_reply})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
