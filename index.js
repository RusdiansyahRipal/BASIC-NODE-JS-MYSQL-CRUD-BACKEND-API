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

//  manmabah data atau menginput data
 app.post("/mahasiswa",(req,res)=>{
  // mengambil data dari request body
  const {nim,nama,alamat,jenis_kelamin,tanggal_lahir} = req.body;

  // validasi agar data yang diinput tidak boleh kosong

  if(!nim || !nama || !alamat || !jenis_kelamin || !tanggal_lahir) {
    return response(400,null,"semual data harus diisi",res)
  }

  // validasi nim harus angka

  if(isNaN(nim)){
    response(400,null,"nim harus angka",res);
  }

  
  
  // insert data
  const sql = `INSERT INTO mahasiswa (nim,nama,alamat,jenis_kelamin,tanggal_lahir) VALUE (?,?,?,?,?)`;
  
  db.query(sql,[nim,nama,alamat,jenis_kelamin,tanggal_lahir],(err,field)=>{
    if (err.code === "ER_DUP_ENTRY") {
        return response(400, null, `NIM ${nim} sudah terdaftar`, res)
      }

    if(err){
      return response(400,null,err.message,res);
    }
    
    response(200,field,"data berhasil disimpan",res)
  })

 })

//  EDIT ATAU UPDATE DATA
app.put("/mahasiswa/:nim",(req,res)=>{
// ======= ALUR PUT ======
// 1. ambil NIM dari parameter dengan  req.params
const nim = req.params.nim;
// 2. ambil DATA dari req.body
const { nama, alamat, jenis_kelamin, tanggal_lahir} = req.body
// 3. Validasi
      // nim harus angka
      if(isNaN(nim)){
        return response(400,null,"NIM harus angka", res)
      }
      // tidak boleh ada yang kosong
      if(!nama || !alamat || !jenis_kelamin || !tanggal_lahir) {
        return response(400,null,"DATA TIDAK BOLEH KOSONG",res)
      }
// 4. jalankan query UPDATE
const sql = "UPDATE mahasiswa SET nama = ?, alamat = ?,  jenis_kelamin = ?, tanggal_lahir = ? WHERE nim = ? "

// 5. cek apakah data ada atau tidak

db.query(sql,[nama,alamat,jenis_kelamin,tanggal_lahir,nim],(err,field)=>{
   if (err) {
    return response(500, null, err.message, res)
  }

  if (field.affectedRows === 0) {
    return response(404, null, "DATA TIDAK DITEMUKAN", res)
  }

  response(200,field,"DATA BERHASIL DIUBAH",res)
})

})


// DELETE

app.delete("/mahasiswa/:nim",(req,res)=>{
  //ALUR DELETE
  //1. AMBIL DATA DARI req.params.nim
  const nim = req.params.nim;

  //2. VALIDASI (nim harus anggka)
  if(isNaN(nim)){
    return response(404,null,"NIM HARUS ANGKA",res)
  }

  //3. QUERY DELETE
  const sql = `DELETE FROM mahasiswa WHERE nim= ?`
  //4.EKSESKUSI QUERY
  db.query(sql,[nim],(err,field)=>{
    //cek error
    if(err){
      return response(400,null,err.message,res)
    }

    //cek apakah data ada
    if(field.affectedRows === 0){
      return response(400,null,"DATA TIDAK DITEMUKAN",res)
    }
    //sukses
    response(400,field,"DATA BERHASIL DIHAPUS",res)
  })
  /*
  🎯 Kesimpulan

DELETE itu:

ambil parameter
validasi
query
cek affectedRows
kirim response 
  */
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
