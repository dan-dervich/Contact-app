const express = require("express");
const app = express();
const cors = require("cors");
const AhavahContact = require("./ahavah");
// const sendScheduledMails = require("./wps-clients");

app.use(express.json());
app.use(cors());
app.use("/ahavah", AhavahContact);
// app.use("/scheduled", sendScheduledMails);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
  console.log("listening on port", PORT);
});
