document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userRole", data.role);

        console.log(`[LOGIN SUCCESS] ${data.name} (${data.role})`);

        if (data.role === "student") window.location.href = "home.html";
        else if (data.role === "club") window.location.href = "home.html";
        else if (data.role === "admin") window.location.href = "home.html";

      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error("[LOGIN ERROR]", err);
      alert("Server error. Please try again later.");
    }
  });

});