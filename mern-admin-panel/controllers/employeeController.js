const { v4: uuidv4 } = require("uuid");
const Emp = require("../models/Employee"); // Ensure this import path is correct

exports.createEmployee = async (req, res) => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
    req.body;

  // Validate required fields
  if (!f_Name || !f_Email || !f_Mobile) {
    return res
      .status(400)
      .json({ msg: "Name, Email, and Mobile are required." });
  }

  // Ensure file is uploaded and is an image
  if (!req.file || !req.file.mimetype.startsWith("image/")) {
    return res.status(400).json({ msg: "A valid image file is required." });
  }

  try {
    const newEmployee = new Emp({
      f_Id: uuidv4(), // Generate a unique ID
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Image: req.file.filename, // Store just the filename
    });

    const employee = await newEmployee.save();
    res.json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);

    // Handle duplicate email error
    if (error.code === 11000) {
      if (error.keyPattern.f_Email) {
        return res.status(400).json({ msg: "Email is already taken." });
      }
    }
    res.status(500).send("Server error");
  }
};

// Get Employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Emp.find();
    res.json(employees);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
    req.body;

  try {
    // Prepare the updated data
    let updatedData = {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
    };

    // Handle the image file if provided
    if (req.file) {
      updatedData.f_Image = req.file.path;
    }

    const employee = await Emp.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json(employee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Emp.findByIdAndDelete(id);
    res.json({ msg: "Employee deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Emp.findById(id);
    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
