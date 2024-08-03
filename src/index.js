import express from "express";
import routes from "./routes";
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

// Sync database and start server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
