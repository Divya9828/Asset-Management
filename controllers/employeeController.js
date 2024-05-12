// controllers/employeeController.js
const Employee = require("../models/employee");

// Get all employees
exports.getAllEmployees = (req, res) => {
  try {
    const employees = Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get employee by ID
exports.getEmployeeById = (req, res) => {
  const { id } = req.query;
  try {
    const employee = Employee.findByPk(id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create new employee
exports.createEmployee = (req, res) => {
  const { firstName, lastName, email, position } = req.body;
  try {
    const employee = Employee.create({ firstName, lastName, email, position });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update employee by ID
exports.updateEmployee = (req, res) => {
  const { id } = req.query;
  const { firstName, lastName, email, position } = req.body;
  try {
    let employee = Employee.findByPk(id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    }
    employee = employee.update({ firstName, lastName, email, position });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete employee by ID
exports.deleteEmployee = (req, res) => {
  const { id } = req.query;
  try {
    const employee = Employee.findByPk(id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    }
    employee.destroy();
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
