const dotenv = require("dotenv");
const path = require("path");

const envPath = path.resolve(__dirname, "../.env.test");
dotenv.config({ path: envPath });

console.log("Loaded test environment:", envPath);