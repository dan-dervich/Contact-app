const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = require("./sendMail");
const express = require("express");
const router = express.Router();

// create reusable transporter object using the default SMTP transport

// create a function that will send the email every 24 hours
let sendScheduledMails = async (transporter, fromMail, res) => {
  // get the current date
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  const response = await fetch(
    "https://leo.fly.dev/api/collections/clientes/records?filter=(contact = true)&perPage=10000&sort=+scheduledDate"
  );
  const scheduledMails = await response.json();
  // get the scheduled mails from the database
  // const scheduledMails = await pb.collection("clientes").getList(1, 50, {
  //   filter: `scheduledDate >= "${dateTime}" && contact = true`,
  // });
  // loop through the scheduled mails and send them
  scheduledMails.items.forEach(async (contactInfo) => {
    if (dateTime < contactInfo.scheduledDate) return;
    let mail = {
      from: fromMail, // change to parameter
      to: contactInfo.email,
      subject: contactInfo.subject,
      html: contactInfo.mensaje,
    };
    // send the mail
    sendEmail(mail, transporter, res);
  });
};

router.get("/check-scheduled/:name", async (req, res) => {
  console.log("hey");
  if (req.params.name == "leo") {
    let transporter = nodemailer.createTransport({
      host: "reseller60.webserversystems.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.WPSCLIENTSEMAIL,
        pass: process.env.WPSCLIENTKEY,
      },
    });
    await sendScheduledMails(transporter, process.env.WPSCLIENTSEMAIL, res);
  }
});

module.exports = router;
