const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:3001", // allow your frontend
}));
app.use(express.json());

// ✅ Sample in-memory data (replace with DB later)
let patients = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
];

// ✅ Routes
app.get("/api/patients", (req, res) => {
  res.json(patients);
});

app.post("/api/patients", (req, res) => {
  const newPatient = {
    id: Date.now(),
    ...req.body,
  };
  patients.push(newPatient);
  res.status(201).json(newPatient);
});

app.put("/api/patients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  patients = patients.map((p) =>
    p.id === id ? { ...p, ...req.body } : p
  );
  res.json({ message: "Patient updated" });
});

app.delete("/api/patients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  patients = patients.filter((p) => p.id !== id);
  res.json({ message: "Patient deleted" });
});

// ✅ Port (FIXED)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});