import google.generativeai as genai
import os
import json

from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("models/gemini-flash-latest")



def generate_case():
    prompt = """
Create a detective murder case.

Rules:
- EXACTLY 3 suspects
- 1 must be the killer
- each suspect must have:
  name, role, personality, motive, secret, is_killer
- include title, case_summary, victim_name, location
- include solution_explanation

Return ONLY valid JSON.
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    # clean possible markdown
    text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)


def generate_suspect_reply(case_data, suspect, question):
    prompt = f"""
You are a suspect in a murder case.

Stay in character.

Case:
{case_data}

You are:
{suspect}

Question:
{question}

Rules:
- answer naturally
- stay in character
- do not reveal truth directly
"""

    response = model.generate_content(prompt)

    return response.text


def grade_accusation(case_data, chosen_suspect_id, reasoning):
    prompt = f"""
You are grading a detective answer.

Case truth:
{case_data}

Chosen suspect id: {chosen_suspect_id}

Reasoning:
{reasoning}

Return JSON:
- is_correct
- score (0-100)
- feedback
"""

    response = model.generate_content(prompt)

    text = response.text.strip()
    text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)

def grade_accusation(case_data, chosen_suspect_id, reasoning):
    prompt = f"""
You are grading a detective player's final accusation.

CASE DATA:
{case_data}

The player chose suspect id: {chosen_suspect_id}

Player reasoning:
{reasoning}

Your task:
- decide whether the chosen suspect is correct
- give a score from 0 to 100
- explain briefly what the player got right or wrong

Return ONLY valid JSON in this format:
{{
  "is_correct": true,
  "score": 85,
  "feedback": "Good logic. You identified the correct suspect and used motive well, but missed a clue."
}}
"""

    response = model.generate_content(prompt)
    text = response.text.strip()
    text = text.replace("```json", "").replace("```", "").strip()

    start = text.find("{")
    end = text.rfind("}") + 1
    text = text[start:end]

    return json.loads(text)