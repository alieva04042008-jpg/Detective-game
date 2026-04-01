# 🕵️‍♀️ AI Detective Game

An interactive detective game powered by AI where every case is unique.

Solve crimes, interrogate suspects, and prove your logic — then let AI judge your reasoning.

---

## ✨ Features

* 🧠 AI-generated crime cases
* 👥 3 unique suspects with personalities
* 💬 Interrogation system (ask questions)
* 🎯 Accusation phase
* 📝 AI evaluates your answer and gives a score
* 🌐 Fullstack app (Frontend + Backend)
* ☁️ Deployed online

---

## 🚀 Live Demo

* 🔗 Frontend: *(your frontend link here)*
* 🔗 Backend API Docs: *(your backend link here)/docs*

---

## 🏗️ Tech Stack

### Frontend

* ⚛️ React (Vite)
* 🎨 Custom CSS

### Backend

* 🚀 FastAPI
* 🐍 Python

### AI

* 🤖 Google Gemini API

### Database

* 🗄️ SQLite (SQLAlchemy)

### Deployment

* ☁️ Railway

---

## 📂 Project Structure

```
Detective-game/
│
├── detective-backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── main.py
│
├── detective-frontend/
│   ├── src/
│   ├── components/
│   └── App.jsx
```

---

## 🧠 How It Works

1. User starts a new case
2. Backend generates:

   * case description
   * 3 suspects
3. User asks questions to suspects
4. AI responds in character
5. User selects the murderer
6. User explains reasoning
7. AI evaluates and gives a score

---

## ⚙️ Setup Locally

### 1. Clone repo

```
git clone <your-repo-link>
cd Detective-game
```

### 2. Backend

```
cd detective-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open:

```
http://127.0.0.1:8000/docs
```

---

### 3. Frontend

```
cd detective-frontend
npm install
npm run dev
```

---

---

### Frontend

```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

---

## 🌍 Deployment

* Backend deployed with Railway
* Frontend deployed with Railway

---

## 🎯 Future Improvements

* 🎭 More complex AI personalities
* 📊 Score history
* 🔐 User accounts
* 🎮 Difficulty levels
* 🧩 Multiple endings

---

## 💡 Inspiration

Inspired by detective games and the idea of using AI as both:

* storyteller
* and judge

---

## 👩‍💻 Author

**Alina**
Harbour.Space University student

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!

Members :
GitHub: @alieva04042008-jpg
Email: alieva04042008@gmail.com
