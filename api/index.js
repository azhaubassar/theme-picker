import express from "express";
import { config } from "dotenv";
import cors from "cors";
import ColorService from "./ColorService.js";

const app = express();
const colorService = new ColorService();
config();

app.use(cors());

app.get("/colors", (req, res) => {
  const query = req.query.q;
  const result = colorService.searchColors(query);

  res.json({ items: result });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running...`);
});
