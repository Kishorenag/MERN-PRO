const Login = require("../models/Login");

// User Admin
exports.loginUser = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  try {
    // Find user by username
    const user = await Login.findOne({ f_userName });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Username" });
    }

    // Compare password (assuming not hashed)
    if (f_Pwd !== user.f_Pwd) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    // Login successful, return response
    res.json({ msg: "Login successful", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
