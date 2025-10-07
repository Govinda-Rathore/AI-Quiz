# AI_Quiz

An interactive quiz generator powered by OpenAI’s GPT models.
Users select a topic, get AI-generated MCQs, attempt the quiz with navigation and progress tracking, and receive personalized feedback.

---

## ⚙️ 1. Project Setup & Demo

### 🖥 Web Setup

```bash
# Backend
cd generateQuiz
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

Then open your browser at:
**[http://localhost:5173](http://localhost:5173)** (React frontend)
**[http://localhost:5000](http://localhost:5000)** (Express backend)

###  Demo

Deployed on vercel: 
**https://ai-quiz-ruby.vercel.app**

---

## 🧩 2. Problem Understanding

The goal was to build an **AI-driven quiz app** that:

1. Lets users select a topic.
2. Uses OpenAI’s API to generate 5 MCQs dynamically.
3. Displays them with next/previous navigation and progress tracking.
4. Evaluates the score and generates personalized feedback based on performance.

**Assumptions made:**

* Each quiz topic generates unique questions via GPT (`gpt-4o-mini`).
* Questions and feedback follow consistent JSON formats.
* No database was required; the app fetches live AI responses each time.

---

## 🧠 3. AI Prompts & Iterations

### **Initial Prompt**

```text
Generate 5 MCQs about ${topic}. Each question must have 4 options and 1 correct answer.
```

**Issue:**
Responses were sometimes not valid JSON or repeated questions for the same topic.
Temperature is too low.
No variability instruction.

### **Refined Prompt**

```text
role: "system",
content: "You are a quiz generator. Always return **unique** and **non-repetitive** questions each time. Return ONLY valid JSON matching this schema: { questions: [{ question: string, options: string[], answer: string }] }",

role: "user",
content: `Generate exactly 5 MCQs about ${topic}. Each question must have 4 options and 1 correct answer.`,
```

**Fixes:**
Enhancement 1 — Enforce Output Schema & Types
* Added schema enforcement using `response_format: { type: "json_object" }`.
* Increased `temperature` to 0.9 for more variety.
* Added a variability hint in the prompt.

### **Feedback Generation Prompt**

```text
You are a quiz evaluator. Return ONLY valid JSON with this schema: { feedback: string }.
The user scored ${score} out of ${total} on a quiz about ${topic}.
Generate a short motivational feedback message mentioning their performance level.
```

---

## 🏗️ 4. Architecture & Code Structure

**Frontend (React + TypeScript):**

```
src/
 ├── components/
 |   ├── QuizQuestion.tsx
 ├── contexts/
 |   ├── QuizContext.tsx
 ├── screens/
 │   ├── Loading.tsx
 │   ├── NotFound.tsx
 │   ├── Quiz.tsx
 │   ├── Results.tsx
 │   └── TopicSelections.tsx
 ├── services/
 │   └── aiService.ts
 └── App.tsx
```

**Backend (Node + Express + TypeScript):**

```
src/
 ├── server.ts        → Handles API routes for quiz + feedback generation
├── .env              → Stores OPENAI_API_KEY
```

**State Management:**
Used **React Context** to store quiz state, topic, questions, current question index, userAnswers  and score across components.

---

## 🖼️ 5. Screenshots / Screen Recording

Attach:
-> TopicSelection:
<img width="1920" height="1080" alt="aiQuiz(TopicSelection)" src="https://github.com/user-attachments/assets/28624cff-637e-45d5-9b9b-b431d144dc6a" />
-> Loading:
<img width="1920" height="1080" alt="aiQuiz(Loading)" src="https://github.com/user-attachments/assets/f6002f7f-46f5-4df8-81f1-18ca0f7cba99" />
-> Question:
<img width="1920" height="1080" alt="aiQuiz(Quesion)" src="https://github.com/user-attachments/assets/2f556da0-6f1b-47e7-a41c-72b73049f384" />
<img width="1920" height="1080" alt="aiQuiz(Question selected)" src="https://github.com/user-attachments/assets/8534dc19-f680-4ff8-879c-5c4ada2a5999" />
-> Feedback:
<img width="1920" height="1080" alt="aiQuiz(Feedback)" src="https://github.com/user-attachments/assets/5617baf7-24ea-4887-a4af-312f16f6c740" />


---

## 🧪 6. Known Issues / Improvements

| Issue                 | Description                           | Improvement with time                       |
| --------------------- | ------------------------------------- | ------------------------------------------- |
| 🔁 Repeated questions | Similar questions sometimes generated | Add more randomness & topic subcategories   |
| ⚡ API delay          | OpenAI API can take a few seconds     | Use optimistic UI or background prefetching |
| 💾 No persistence     | Quiz data resets on refresh           | Use localStorage or backend database        |

---

## ✨ 7. Bonus Work

* Added **progress bar** and smooth screen transitions.
* Used **type-safe AI response parsing** with retry logic.
* Included **motivational feedback** screen powered by GPT.
* Followed **best practices** for separating API layer and UI logic.
* Responsive and mobile-friendly UI.

---

## 🔐 Environment Variables

Create a `.env` file in your backend root:

```
OPENAI_API_KEY=your_api_key_here
```


---

## 🧑‍💻 Tech Stack

**Frontend:** React + TypeScript + Vite
**Backend:** Node.js + Express + TypeScript
**AI Engine:** OpenAI GPT-4o-mini

---

## 📄 License

This project is for educational/demo purposes.

---
