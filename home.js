// home.js
document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("userName");
  const role = localStorage.getItem("userRole");

  if (!name || !role) return; // user not logged in

  // Update welcome banner
  const welcomeHeading = document.querySelector(".welcome h1");
  welcomeHeading.textContent = `Welcome, ${name}!`;

  // Update nav bar
  const navUserName = document.querySelector(".nav-right .user strong");
  const navUserRole = document.querySelector(".nav-right .user small");
  if (navUserName) navUserName.textContent = name;
  if (navUserRole) navUserRole.textContent = role.charAt(0).toUpperCase() + role.slice(1);

  // Logout functionality
  const logoutBtn = document.querySelector(".logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
      const navName = document.querySelector(".nav-right .user strong");
const navRole = document.querySelector(".nav-right .user small");
if (navName && navRole) {
  navName.textContent = localStorage.getItem("userName") || "Guest";
  navRole.textContent = (localStorage.getItem("userRole") || "Visitor").toUpperCase();
}
    });
  }
});

// home.js
document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");

  // Find the dashboard link
  const dashboardLink = document.querySelector('a[href="studash.html"]');

  if (dashboardLink) {
    // Update the href dynamically
    if (role === "student") dashboardLink.href = "studash.html";
    else if (role === "club") dashboardLink.href = "clubdash.html";
    else if (role === "admin") dashboardLink.href = "admdash.html";
    else dashboardLink.href = "#"; // fallback

    // Optional: prevent clicking if no role
    dashboardLink.addEventListener("click", (e) => {
      if (!role) {
        e.preventDefault();
        alert("Please log in first!");
        window.location.href = "index.html";
      }
    });
  }
});