// // routes/employeeRoutes.js
// const express = require('express');
// const {
//   createEmployee,
//   getEmployees,
//   updateEmployee,
//   deleteEmployee
// } = require('../controllers/employeeController');
// const router = express.Router();

// router.post('/', createEmployee);
// router.get('/', getEmployees);
// router.put('/:id', updateEmployee);
// router.delete('/:id', deleteEmployee);

// module.exports = router;

// routes/employeeRoutes.js
const express = require('express');
const {
  createEmployee,
  getEmployees,
  getEmployeeById, // Ensure this is imported
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

const upload = require('../middleware/multer'); // Import the Multer middleware
const router = express.Router();

// Routes
router.post('/newdata', upload.single('f_Image'), createEmployee); // Handle image upload for creating employee
router.get('/alldata', getEmployees); // Get all employees
router.get('/single/:id', getEmployeeById); // Get employee by ID
router.put('/update/:id', updateEmployee); // Update employee by ID
router.delete('/delete/:id', deleteEmployee); // Delete employee by ID

module.exports = router;


