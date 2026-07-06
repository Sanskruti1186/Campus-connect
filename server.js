const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ===== DATABASE =====
let users = [
   {
    role: "student",
    name: "sans",
    email: "sans@123",
    password: "123"
  },
  {
    role: "club",
    name: "club",
    email: "club@123",
    password: "123"
  },
  {
    role: "admin",
    name: "admin",
    email: "admin@123",
    password: "123"
  }
];
let events = [];
let registrations = [];

// ===== SIGNUP =====
app.post("/signup", (req, res) => {
  const { role, name, email, password, extra } = req.body;

  if (!role || !name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email exists" });
  }

  users.push({ role, name, email, password, extra });
  console.log(`[SIGNUP] ${name} (${role})`);

  res.status(201).json({ message: "Signup success" });
});

// ===== LOGIN =====
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    console.log(`[LOGIN] ${user.name}`);
    return res.json({ role: user.role, name: user.name });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// ===== CREATE EVENT =====
app.post("/create-event", (req, res) => {
  const event = {
    id: Date.now(),
    ...req.body,
    status: "pending"
  };

  events.push(event);
  console.log(`[EVENT CREATED] ${event.name} by ${event.clubName}`);

  res.json({ message: "Event created", event });
});

// ===== GET PENDING EVENTS =====
app.get("/pending-events", (req, res) => {
  res.json(events.filter(e => e.status === "pending"));
});

// ===== APPROVE EVENT =====
app.post("/approve-event/:id", (req, res) => {
  const event = events.find(e => e.id == req.params.id);

  if (!event) return res.status(404).json({ message: "Not found" });

  event.status = "approved";
  console.log(`[EVENT APPROVED] ${event.name}`);

  res.json({ message: "Approved", event });
});

// ===== GET APPROVED EVENTS =====
app.get("/events", (req, res) => {
  res.json(events.filter(e => e.status === "approved"));
});

// ===== REGISTER EVENT =====
app.post("/register-event", (req, res) => {
  const reg = req.body;

  registrations.push(reg);
  console.log(`[REGISTERED] ${reg.studentName} → ${reg.eventName}`);

  res.json({ message: "Registered successfully" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});