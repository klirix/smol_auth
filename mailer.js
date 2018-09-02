const mailgun = require("mailgun-js")
const process = require("process")

const BASE_HOST = process.env["BASE_HOST"] || "http://localhost:3000"

const mailer = mailgun({
  apiKey: process.env["MAILGUN_KEY"], 
  domain: process.env["MAILGUN_DOMAIN"]
})

function sendConfirmationMail(email, confirmation){
  mailer.messages().send({
    from: `Confirmation bot <auth@${process.env["MAILGUN_DOMAIN"]}>`,
    to: email,
    subject: "Here you go!",
    text: `Press this button to login!`,
    html: `
      <a href="${BASE_HOST}/confirm/${confirmation}">Press this button to login!</a>
    `
  })
}

module.exports = {
  sendConfirmationMail
}