const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const config = require("config");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
    const transporter = nodemailer.createTransport({
      service: config.get("nodemailer.service"),
      auth: {
        user: config.get("nodemailer.user"),
        pass: config.get("nodemailer.pass"),
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");

    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: config.get("nodemailer.user"),
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    transporter.sendMail(options(), (err, info) => {
      if (err) {
        return err;
      } else {
        console.log("Email sent: ", info.response);
        return;
      }
    });
  } catch (err) {
    throw err;
  }
};

module.exports = sendEmail;
