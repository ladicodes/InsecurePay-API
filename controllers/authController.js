const config = require("../config");


const mockUsers = [
  {
    email: "test@example.com",
    password: "123456", 
    role: "customer",
  },
];

async function login(req, res) {
  try {
    const { email, password } = req.body;

    console.log("Login request:", { email });

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    // If not found
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Create fake token (still simple, for testing)
    const tokenPayload = {
      email: user.email,
      role: user.role,
      time: Date.now(),
    };

    const token = Buffer.from(JSON.stringify(tokenPayload)).toString("base64");

    return res.json({
      message: "Login successful",
      token: `${token}.${config.jwtSecret}`,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login failed:", error);

    return res.status(500).json({
      message: "Login error",
      error: error.message,
    });
  }
}

module.exports = {
  login,
};