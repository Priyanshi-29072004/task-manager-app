// server.js
require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./index"); // ← use the app exported from index.js

const PORT = process.env.PORT || 5000;

// Connect DB and start server
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
