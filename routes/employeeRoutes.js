// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const {getAllEmployees,getEmployeeById,createEmployee,updateEmployee,deleteEmployee} = require('../controllers/employeeController');

// Define routes for CRUD operations on employees
router.get('/getAllEmployees', getAllEmployees);
router.get('/getEmployeeById', getEmployeeById);
router.post('/createEmployee', createEmployee);
router.put('/updateEmployee',updateEmployee);
router.delete('/deleteEmployee',deleteEmployee);

module.exports = router;
