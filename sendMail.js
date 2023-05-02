function sendEmail(mailOptions, transporter, res) {
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      if (res) res.json({ message: "Error sending email", error: error });
      console.log(error);
      return;
    }
    console.log("Message sent: %s", info.messageId);
    if (res) res.json({ message: "Email sent successfully" });
  });
}

module.exports = sendEmail;
