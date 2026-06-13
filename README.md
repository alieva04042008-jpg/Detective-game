# Detective Game

This is a small fullstack detective game where the player solves a generated crime case.

The player can start a new case, talk to suspects, ask questions, choose who they think is guilty, and explain their reasoning. The AI is used to create the story, answer as the suspects, and evaluate the final answer.

## Features

* Generated detective cases
* 3 suspects in each case
* Suspects with different personalities and motives
* Interrogation system
* Final accusation step
* AI feedback and score for the player’s reasoning
* Frontend and backend version
* SQLite database

## Tech Stack

**Frontend**

* React
* Vite
* CSS

**Backend**

* Python
* FastAPI
* SQLite
* SQLAlchemy

**AI**

* Google Gemini API

**Deployment**

* Railway

## Project Structure

```text
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

## How the Game Works

1. The user starts a new case.
2. The backend creates the case description and suspects.
3. The user asks suspects questions.
4. The suspects answer based on their role in the case.
5. The user chooses who they think committed the crime.
6. The user writes an explanation.
7. The AI checks the explanation and gives feedback.

## Running the Project Locally

### Backend

```bash
cd detective-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API docs:

```text
http://127.0.0.1:8000/docs
```

### Frontend

```bash
cd detective-frontend
npm install
npm run dev
```

Create a frontend environment variable:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Live Demo

Frontend: add your frontend link here
Backend API docs: add your backend link here

## Future Improvements

* More detailed suspect personalities
* Different difficulty levels
* Saved game history
* User accounts
* More case types
* Better scoring system
* Multiple endings

## Why I Made This

I wanted to build something more interesting than a basic CRUD app. This project helped me practice working with a backend, frontend, database, API routes, and AI integration in one project.

## Author

Alina
Harbour.Space University student

GitHub: @alieva04042008-jpg
Email: [alieva04042008@gmail.com](mailto:alieva04042008@gmail.com)

