// controllers/employeeController.js
const Employee = require('../models/employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.query;
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create new employee
exports.createEmployee = async (req, res) => {
  const { firstName,lastName,email,position } = req.body;
  try {
    const employee = await Employee.create({ firstName,lastName,email,position });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update employee by ID
exports.updateEmployee = async (req, res) => {
  const { id } = req.query;
  const { firstName,lastName,email,position } = req.body;
  try {
    let employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    employee = await employee.update({ firstName,lastName,email,position });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete employee by ID
exports.deleteEmployee = async (req, res) => {
  const { id } = req.query;
  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    await employee.destroy();
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
