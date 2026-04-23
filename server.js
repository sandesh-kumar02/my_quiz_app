import app from "./src/app.js";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT || 3000;

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}
import connectDB from "./src/Config/db.js";

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
