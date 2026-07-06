// ===== Role Tabs =====
const tabs = document.querySelectorAll(".role-tabs button");
const forms = document.querySelectorAll(".form");

function showForm(role) {
  // Hide all forms
  forms.forEach(form => form.classList.remove("active"));
  // Remove active class from all tabs
  tabs.forEach(tab => tab.classList.remove("active"));

  // Show selected form
  document.getElementById(role).classList.add("active");
  // Set active class on clicked tab
  event.currentTarget.classList.add("active");
}

// ===== Handle Form Submissions =====
forms.forEach(form => {
  form.addEventListener("submit", async function(e) {
    e.preventDefault(); // Prevent page reload

    // Get all input fields in the form
    const inputs = form.querySelectorAll("input");
    let valid = true;

    // Check if all fields are filled
    inputs.forEach(input => {
      if (input.value.trim() === "") valid = false;
    });

    if (!valid) {
      alert("Please fill in all fields!");
      return;
    }

    // Collect form data
    const role = form.id; // 'student', 'club', or 'admin'
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelector('input[type="password"]').value.trim();

    // Collect extra fields for each role
    const extra = {};
    inputs.forEach(input => {
      const type = input.getAttribute("type");
      const placeholder = input.getAttribute("placeholder");
      if (type !== "text" && type !== "email" && type !== "password") {
        extra[placeholder] = input.value.trim();
      }
    });

    try {
      // Send signup request to backend
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, email, password, extra })
      });

      const data = await response.json();

      if (response.ok) {
        // Save user info in localStorage
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", name);
        localStorage.setItem("userRole", role);

        alert("Signup successful! Redirecting to Home Page...");
        window.location.href = "home.html"; // replace with actual home page
      } else {
        alert(data.message || "Signup failed!");
      }

    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }

  });
});