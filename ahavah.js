const nodemailer = require("nodemailer");
require('dotenv').config();
const sendEmail = require('./sendMail');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(express.json());
router.use(cors());

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AHAVAHEMAIL,
        pass: process.env.AHAVAHKEY
    }
});


router.post('/send-mail', (req, res) => {
    // setup email data with unicode symbols
    let mailOptions = {
        from: process.env.AHAVAHEMAIL, // sender address
        to: process.env.AHAVAHEMAIL, // list of receivers
        subject: 'CONTACTO', // Subject line
        html: `<p>Nombre: ${req.body.name}</p><br/> <p>Email: ${req.body.email}</p><br/> <p>Telefono: ${req.body.tel}</p><br/> <p>Mensaje: ${req.body.msg}</p><br/>` // html body
    };
    sendEmail(mailOptions, transporter, res);
});


module.exports = router;