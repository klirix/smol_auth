const { send,  } = require('micro')
const { router, get, post } = require('micro-fork')
const uuid = require("uuid")
const Loki = require("lokijs")
const jwt = require("jsonwebtoken")
const { sendConfirmationMail } = require("./mailer")
const process = require("process")

const db = new Loki("codes.db")
const codes = db.addCollection("codes")
const JWT_SECRET = process.env['JWT_SECRET'] || "hahaha privacy yeah hight :-D BENIS"

module.exports = router()(
  get("/enter/:email", (req, res)=>{
    console.log(req)
    const code = uuid()
    const ref = uuid()
    let {email} = req.params
    email = email.trim().toLowerCase()
    codes.findAndRemove({email})
    codes.insert({email, code, ref, confirmed: false})
    sendConfirmationMail(email, code)
    console.log(code)
    send(res, 200, ref)
  }),
  get("/confirm/:code", (req, res)=>{
    const {code} = req.params
    const [confirmation] = codes.find({code})
    if (confirmation){
      confirmation.confirmed = true
      codes.update(confirmation)
      send(res, 200, "Good")
    } else{
      send(res, 400, "Yeah right fuck off")
    }
  }),
  get("/check/:ref", (req, res)=>{
    const {ref} = req.params
    const [confirmation] = codes.find({ref})
    console.log(confirmation)
    
    if(confirmation == undefined){
      send(res, 400, "Wrong code")
    }
    else if(confirmation.confirmed == false){
      send(res, 200, "Not yet")
    } else {
      codes.remove(confirmation)
      const token = jwt.sign({email: confirmation.email}, JWT_SECRET)
      send(res, 200, token)
    }
  })
)