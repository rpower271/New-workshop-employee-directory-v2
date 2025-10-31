import express from "express";
const router = express.Router();
export default router;

import employees, {
  addEmployee,
  getEmployeeById,
  getRandomEmployee,
} from "#db/employees";

router.get("/", (req, res) => {
  {
    res.send(employees);
  }
});

router.post("/", (req, res) => {
  if (!req.body) return res.status(400).send("body is required.");

  const { name } = req.body;
  if (!name) return res.status(400).send("Name is required.");

  const employee = addEmployee(name);
  res.status(201).send(employee);
});

router.get("/random", (req, res) => {
  const employee = getRandomEmployee();
  res.send(employee);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const employee = getEmployeeById(+id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});
