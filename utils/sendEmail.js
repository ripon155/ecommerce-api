const nodemailer = require("nodemailer");
const fs = require("fs");
const htmToText = require("html-to-text");
const handlebars = require("handlebars");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.form = `Mohiuddin Saifullah <${process.env.EMAIL_FORM}>`;
  }

  newCreateTransport() {
    if (process.env.NODE_ENV === "production") {
      //Send Grid
      return 1;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAOL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async send(template, subject) {
    // Send the actual email

    //1) Render HTML based on a template
    const html = fs.readFileSync("./utils/test.html", "utf8");
    //${__dirname}/

    console.log(html);
    const template1 = handlebars.compile(html);
    // const replacements = {
    //      username: "John Doe"
    // };
    // const htmlToSend = template1(replacements);

    //2) Define email options
    const mailOptions = {
      from: this.form,
      to: this.to,
      subject: subject,
      html: template1,
      text: this.url,
    };
    //3) Create a transport and send email
    await this.newCreateTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("test", "welcome to the family");
  }
};

// function

// const sendEmail = async (options) => {
//   const transport = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAOL_PORT,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: "Mohiuddin Saifullah <riponecom@gmail>",
//     to: options.email,
//     subject: "Password Reset Link",
//     html: `<a href="${options.fullUrl}">Click this link to Reset Password</a>`,
//     text: options.fullUrl,
//   };

//   transport.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log("Message sent: %s", options.email);
//   });
// };
// module.exports = sendEmail;
