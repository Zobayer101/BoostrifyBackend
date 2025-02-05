const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const route = require("./Server/routes/routes");
const app = express();
dotenv.config();
const port = process.env.port || 8800;
app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: "*" }));
app.use("/routes", route);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ err });
  } else {
    res.status(500).json({ err: "server side error" });
  }
});
app.listen(port, () => {
  console.log(`server was run http://localhost:${port}`);
});
