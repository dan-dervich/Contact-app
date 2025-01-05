const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = require("./sendMail");
const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(express.json());
router.use(cors());

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "netsol-smtp-oxcs.hostingplatform.com",
  port: 587,
  auth: {
    user: process.env.AFWEMAIL,
    pass: process.env.AFWPASS,
  },
});

router.post("/send-mail", (req, res) => {
  // setup email data with unicode symbols
  let mailOptions = {
    from: process.env.AHAVAHEMAIL, // sender address
    to: "sales@allforwater.com", // list of receivers
    replyTo: req.body.email,
    subject: "CONTACTO", // Subject line
    html: `<p>Nombre: ${req.body.name}</p><br/> <p>Email: ${req.body.email}</p><br/> <p>Telefono: ${req.body.tel}</p><br/> <p>Mensaje: ${req.body.msg}</p><br/>`, // html body
  };
  sendEmail(mailOptions, transporter, res);
});

module.exports = router;
