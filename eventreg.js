// eventreg.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("eventForm");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const clubName = localStorage.getItem("userName"); // logged-in club name
    const [name, date, time, location, category, description] = Array.from(form.elements)
      .filter(el => el.tagName === "INPUT" || el.tagName === "TEXTAREA")
      .map(el => el.value.trim());

    if (!name || !date || !time || !location || !category || !description) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clubName, name, date, time, location, category, description })
      });

      const data = await res.json();
      if (res.ok) {
        form.style.display = "none";
        confirmation.style.display = "block";
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  });
});