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

//get all
app.get("/mahasiswa",(req,res)=>{
  const sql = "SELECT * from mahasiswa"
  db.query(sql,(err,field)=>{
    if (err) {
    return response(500, null, err.message, res)
  }
   response(200,field,"cek aja", res)
  })  
 })
//get by parameter
 app.get("/mahasiswa/:nim",(req,res)=>{
  const nim = req.params.nim;

  //validasi harus angka yang dimasukan kedalam paramameter route
  if(isNaN(nim)){
    return response(400,null,"harus angka yang dikirim", res)
  }

  const sql = `SELECT * FROM mahasiswa WHERE nim = ?`
  db.query(sql,[nim],(err,field) => {

    // logika jika error
    if(err){
      return response(500,null, err.message, res)
    }
    // logika jika nim sama tidak ada
    if(field.length === 0 ) {
      return(404, null, "data tidak ditemukan", 0)
    }
    response(200,field,"mengambil data melalui parameter route", res)
  })

 })

app.put("/",(req,res)=>{})

app.delete("/",(req,res)=>{})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
