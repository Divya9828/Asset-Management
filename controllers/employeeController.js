// controllers/employeeController.js
const Employee = require("../models/employee");

// Get all employees
// exports.renderAllEmployee = (req, res) => {
//   res.render('employees/view');
// };
exports.getAllEmployees = async(req, res) => {
  try {
    const employees = await Employee.findAll({
      order:[['id','ASC']]
  });
    // res.json(employees);
    res.render('employees/view', { employees })
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
// Render Add Employee view
exports.renderAddEmployee = (req, res) => {
  res.render('employees/add');
};
// Create new employee
exports.createEmployee = async (req, res) => {
  const { firstName, lastName, email, position } = req.body;
  try {
    const employee =await Employee.create({ firstName, lastName, email, position });
    req.flash('success_msg', 'Employee successfully added')
    res.redirect('employees/add')
  } catch (error) {
    req.flash('error_msg', 'Failed to add employee');
    res.redirect('/');
  }
};

// Update employee by ID
exports.renderEditEmployeeForm = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      req.flash('error_msg', 'Employee not found');
      return res.redirect('/employees');
    }
    res.render('employees/edit', { employee });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      req.flash('error_msg', 'Employee not found');
      return res.redirect('/employees');
    }
    await employee.update(req.body);
    req.flash('success_msg', 'Employee updated successfully');
    res.redirect('/employees');
  } catch (error) {
    req.flash('error_msg', 'Failed to update employee');
    res.redirect(`/employees/${req.params.id}/edit`);
  }
};

// Delete employee by ID
exports.deleteEmployee =async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      req.flash('error_msg', 'Employee not found');
      return res.redirect('/employees');
    }
    await employee.destroy();
    req.flash('success_msg', 'Employee deleted successfully');
    res.redirect('/employees');
  } catch (error) {
    req.flash('error_msg', 'Failed to delete employee');
    res.redirect('/employees');
  }
};
