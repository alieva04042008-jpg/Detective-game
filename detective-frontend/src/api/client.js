const API_BASE = "http://127.0.0.1:8000/api";

async function handleJson(res, label) {
  let data = null;

  try {
    data = await res.json();
  } catch {
    throw new Error(`${label} failed: invalid JSON response`);
  }

  if (!res.ok) {
    const detail = data?.detail || `${res.status}`;
    throw new Error(`${label} failed: ${detail}`);
  }

  return data;
}

export async function createNewGame() {
  const res = await fetch(`${API_BASE}/game/new`, {
    method: "POST",
  });

  return handleJson(res, "Create game");
}

export async function interrogateSuspect(data) {
  const res = await fetch(`${API_BASE}/interrogate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleJson(res, "Interrogate suspect");
}

export async function accuse(data) {
  const res = await fetch(`${API_BASE}/accuse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleJson(res, "Submit accusation");
}