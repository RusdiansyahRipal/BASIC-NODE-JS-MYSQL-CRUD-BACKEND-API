const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const db = require("./connection")
const response = require("./response.js")

app.use(bodyParser.json())

app.get("/", (req, res) => {
  response( 200, "ini data ", "ini pesan " , res )
})

app.get("/mahasiswa",(req,res)=>{
  const sql = "SELECT * from mahasiswa"
  db.query(sql,(err,field)=>{
   response(200,field,"cek aja", res)
  })  
 })

app.put("/",(req,res)=>{})

app.delete("/",(req,res)=>{})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
