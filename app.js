const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const smsFunction = require("./controllers/smsFunction");
const callFunction = require("./controllers/callFunction");
const whatsappFunction = require("./controllers/whatsappFunction");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/sms", smsFunction);
app.use("/call", callFunction);
app.use("/whatsapp", whatsappFunction);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
