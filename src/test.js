const fetch = require("node-fetch")
const jwt = require("jsonwebtoken")

const JWT_SECRET = "hahaha privacy yeah hight :-D BENIS"

let interval

const EMAIL = "klirikus@gmail.com"

async function runTests(){
  console.log("Trying to login")
  const ref = await fetch(`http://localhost:3000/enter/${EMAIL}`).then(x=> x.text())
  console.log("Got this: ", ref)
  console.log("Try looking into your gmail acc")
  interval = setInterval(async ()=>{
    const res = await fetch(`http://localhost:3000/check/${ref}`).then(x=> x.text())
    console.log("Got this: ", res)
    if (res !== "Not yet") {
      const {email} = jwt.verify(res, JWT_SECRET)
      console.assert(email !== undefined, "Email is wrong") 
      clearInterval(interval)
      console.log("Completed")
    }
  }, 1000)
}



runTests()