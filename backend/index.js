const express = require("express");
const app = express();
const port = 3000;
const http = require("http").Server(app);
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  console.log(req, res);
});

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
