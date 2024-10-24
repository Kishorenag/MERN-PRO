import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import Axios from "axios";

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: "",
    f_Image: null, // For image upload
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false); // To manage the popup

  // Handle form inputs
  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setEmployeeData({
      ...employeeData,
      f_Image: e.target.files[0], // Get the image file
    });
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    if (!employeeData.f_Name) errors.f_Name = "Name is required";
    if (!employeeData.f_Email) errors.f_Email = "Email is required";
    if (!employeeData.f_Mobile) errors.f_Mobile = "Mobile is required";
    if (!employeeData.f_Designation)
      errors.f_Designation = "Designation is required";
    if (!employeeData.f_gender) errors.f_gender = "Gender is required";
    if (!employeeData.f_Course) errors.f_Course = "Course is required";
    if (!employeeData.f_Image) errors.f_Image = "Image is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // If form validation fails, don't submit
    }

    // const formData = new FormData();
    // for (let key in employeeData) {
    //     formData.append(key, employeeData[key]);
    //   }
    //   console.log("this is formdata = "+formData);

    try {
      const response = await Axios.post(
        "http://localhost:8000/employees/newdata",
        employeeData
      );
      console.log("Employee created:", response.data);

      // Show the success popup
      setOpenSnackbar(true);

      // Reset form fields after successful creation
      setEmployeeData({
        f_Name: "",
        f_Email: "",
        f_Mobile: "",
        f_Designation: "",
        f_gender: "",
        f_Course: "",
        f_Image: null,
      });
      setFormErrors({});
    } catch (error) {
      if (
        error.response &&
        error.response.data.msg === "Email is already taken"
      ) {
        setFormErrors({ ...formErrors, f_Email: "Email is already taken" });
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  // Handle closing of Snackbar (popup)
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create Employee
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Name"
          name="f_Name"
          value={employeeData.f_Name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          error={Boolean(formErrors.f_Name) ? true : undefined}
          helperText={formErrors.f_Name}
        />

        <TextField
          label="Email"
          name="f_Email"
          value={employeeData.f_Email}
          onChange={handleChange}
          type="email"
          fullWidth
          required
          margin="normal"
          error={Boolean(formErrors.f_Email)}
          helperText={formErrors.f_Email || ""}
        />

        <TextField
          label="Mobile"
          name="f_Mobile"
          value={employeeData.f_Mobile}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          error={Boolean(formErrors.f_Mobile) ? true : undefined}
          helperText={formErrors.f_Mobile}
        />

        <TextField
          label="Designation"
          name="f_Designation"
          value={employeeData.f_Designation}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          error={Boolean(formErrors.f_Designation) ? true : undefined}
          helperText={formErrors.f_Designation}
        />

        <FormControl
          component="fieldset"
          margin="normal"
          error={Boolean(formErrors.f_gender)}
        >
          <RadioGroup
            name="f_gender"
            value={employeeData.f_gender}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
          {formErrors.f_gender && (
            <Typography color="error">{formErrors.f_gender}</Typography>
          )}
        </FormControl>
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(formErrors.f_Course)}
        >
          <InputLabel>Course</InputLabel>
          <Select
            name="f_Course"
            value={employeeData.f_Course}
            onChange={handleChange}
          >
            <MenuItem value="Course 1">Course 1</MenuItem>
            <MenuItem value="Course 2">Course 2</MenuItem>
            <MenuItem value="Course 3">Course 3</MenuItem>
          </Select>
          {formErrors.f_Course && (
            <Typography color="error">{formErrors.f_Course}</Typography>
          )}
        </FormControl>
        <Button
          variant="contained"
          component="label"
          fullWidth
          style={{ margin: "20px 0" }}
          error={Boolean(formErrors.f_Image)}
        >
          Upload Image
          <input
            type="file"
            name="f_Image"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
        {formErrors.f_Image && (
          <Typography color="error">{formErrors.f_Image}</Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}

        {/* Success Popup */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000} // Duration of 3 seconds
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Successfully created!
          </Alert>
        </Snackbar>
      </form>
    </Container>
  );
};

export default CreateEmployee;
