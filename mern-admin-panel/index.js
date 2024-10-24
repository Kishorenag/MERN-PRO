// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const employeeRoutes = require('./routes/employeeRoutes'); // Assuming your routes are in a file named employeeRoutes.js
// const loginRoutes = require('./routes/loginRoutes');
// const cors = require('cors');

// const app = express();


// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/employees', employeeRoutes); // Adjust the path according to your routes
// app.use('/login', loginRoutes);

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/Admin_db')
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Start the server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// index.js
const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes'); // Assuming your routes are in a file named employeeRoutes.js
const loginRoutes = require('./routes/loginRoutes');
const cors = require('cors');
const path = require('path'); // Import the path module

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Add this line

app.use('/employees', employeeRoutes); // Adjust the path according to your routes
app.use('/login', loginRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Admin_db')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

