document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".events-container");

  try {
    const res = await fetch("http://localhost:3000/events");
    const events = await res.json();

    container.innerHTML += events.map(ev => `
      <div class="event-card">
        <div class="event-img">🎉</div>

        <div class="event-details">
          <h3>${ev.name}</h3>
          <p>${ev.description}</p>

          <div class="meta">
            <span>📅 ${ev.date}</span>
            <span>⏰ ${ev.time}</span>
            <span>📍 ${ev.location}</span>
            <span>👥 ${ev.clubName}</span>
          </div>
        </div>

        <div class="event-action">
          <span class="tag blue">${ev.category}</span>
          <button onclick="registerEvent('${ev.name}')">Register</button>
        </div>
      </div>
    `).join("");

  } catch (err) {
    console.error(err);
  }
});

async function registerEvent(eventName) {
  const studentName = localStorage.getItem("userName");

  await fetch("http://localhost:3000/register-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentName, eventName })
  });

  alert("Registered successfully!");
}