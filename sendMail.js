function sendEmail(mailOptions, transporter, res) {
// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({message: 'Error sending email', error: error})
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.json({message: 'Email sent successfully'})
    });
    
}

module.exports = sendEmail;