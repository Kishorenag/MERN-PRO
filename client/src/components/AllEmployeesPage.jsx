import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const AllEmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("f_Name");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(
        "http://localhost:8000/employees/alldata"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setErrorMessage("Failed to fetch employees.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:8000/employees/delete/${id}`);
      fetchEmployees(); // Refresh the employee list after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
      setErrorMessage("Failed to delete employee.");
      setOpenSnackbar(true);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
    setPage(0); // Reset page to 0 when searching
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.f_Name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (employees.length === 0) {
    return <Typography>No employees found.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Employee List
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchKeyword}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <Button variant="contained" onClick={() => navigate("/create-employee")}>
        Create Employee
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "f_Id"}
                  direction={orderBy === "f_Id" ? sortDirection : "asc"}
                  onClick={() => handleSort("f_Id")}
                >
                  Unique Id
                </TableSortLabel>
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "f_Name"}
                  direction={orderBy === "f_Name" ? sortDirection : "asc"}
                  onClick={() => handleSort("f_Name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "f_Email"}
                  direction={orderBy === "f_Email" ? sortDirection : "asc"}
                  onClick={() => handleSort("f_Email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "f_Mobile"}
                  direction={orderBy === "f_Mobile" ? sortDirection : "asc"}
                  onClick={() => handleSort("f_Mobile")}
                >
                  Mobile
                </TableSortLabel>
              </TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "f_Course"}
                  direction={orderBy === "f_Course" ? sortDirection : "asc"}
                  onClick={() => handleSort("f_Course")}
                >
                  Course
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "f_Createdate"}
                  direction={orderBy === "f_Createdate" ? sortDirection : "asc"}
                  onClick={() => handleSort("f_Createdate")}
                >
                  Create Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee.f_Id}</TableCell>
                  <TableCell>
                    {employee.f_Image ? (
                      <img
                        src={`http://localhost:8000/uploads/${employee.f_Image}`}
                        alt={employee.f_Name}
                        style={{ width: "50px", height: "50px" }}
                        onError={(e) => {
                          e.target.onerror = null; // Prevents infinite loop
                          e.target.style.display = "none"; // Hide the image on error
                        }}
                      />
                    ) : (
                      <span>Image</span> // Show "Image" if there's no image path
                    )}
                    {/* Alternatively, show "Image" when the image fails to load */}
                    <span
                      style={{ display: employee.f_Image ? "none" : "inline" }}
                    >
                      Image
                    </span>
                  </TableCell>
                  <TableCell>{employee.f_Name}</TableCell>
                  <TableCell>{employee.f_Email}</TableCell>
                  <TableCell>{employee.f_Mobile}</TableCell>
                  <TableCell>{employee.f_Designation}</TableCell>
                  <TableCell>{employee.f_gender}</TableCell>
                  <TableCell>{employee.f_Course.join(", ")}</TableCell>
                  <TableCell>
                    {new Date(employee.f_Createdate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(employee._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(employee._id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AllEmployeePage;
