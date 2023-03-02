import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("hej då");
});

app.listen(3000);
