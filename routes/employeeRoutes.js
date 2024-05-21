// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const {getAllEmployees,getEmployeeById,createEmployee,updateEmployee,deleteEmployee,renderAddEmployee,renderEditEmployeeForm} = require('../controllers/employeeController');

// Define routes for CRUD operations on employees
router.get('/', getAllEmployees);
router.get('/getEmployeeById', getEmployeeById);

router.get('/add',renderAddEmployee)    
router.post('/', createEmployee);

router.get('/:id/edit', renderEditEmployeeForm);
router.put('/:id',updateEmployee);
router.delete('/:id',deleteEmployee);

module.exports=router
