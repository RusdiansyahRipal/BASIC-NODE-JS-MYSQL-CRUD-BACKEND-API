const db = require("../connection")
const response = require("../response")

// GET ALL
const getAll = (req, res) => {
  const sql = "SELECT * FROM mahasiswa"

  db.query(sql, (err, field) => {
    if (err) {
      return response(500, null, err.message, res)
    }
    response(200, field, "cek aja", res)
  })
}

// GET BY NIM
const getByNim = (req, res) => {
  const nim = req.params.nim

  if (isNaN(nim)) {
    return response(400, null, "harus angka yang dikirim", res)
  }

  const sql = "SELECT * FROM mahasiswa WHERE nim = ?"

  db.query(sql, [nim], (err, field) => {
    if (err) {
      return response(500, null, err.message, res)
    }

    if (field.length === 0) {
      return response(404, null, "data tidak ditemukan", res)
    }

    response(200, field, "mengambil data melalui parameter route", res)
  })
}

// CREATE
const create = (req, res) => {
  const { nim, nama, alamat, jenis_kelamin, tanggal_lahir } = req.body

  if (!nim || !nama || !alamat || !jenis_kelamin || !tanggal_lahir) {
    return response(400, null, "semua data harus diisi", res)
  }

  if (isNaN(nim)) {
    return response(400, null, "nim harus angka", res)
  }

  const sql = `
    INSERT INTO mahasiswa (nim,nama,alamat,jenis_kelamin,tanggal_lahir)
    VALUES (?,?,?,?,?)
  `

  db.query(sql, [nim, nama, alamat, jenis_kelamin, tanggal_lahir], (err, field) => {
    if (err?.code === "ER_DUP_ENTRY") {
      return response(400, null, `NIM ${nim} sudah terdaftar`, res)
    }

    if (err) {
      return response(500, null, err.message, res)
    }

    response(200, field, "data berhasil disimpan", res)
  })
}

// UPDATE
const update = (req, res) => {
  const nim = req.params.nim
  const { nama, alamat, jenis_kelamin, tanggal_lahir } = req.body

  if (isNaN(nim)) {
    return response(400, null, "NIM harus angka", res)
  }

  if (!nama || !alamat || !jenis_kelamin || !tanggal_lahir) {
    return response(400, null, "DATA TIDAK BOLEH KOSONG", res)
  }

  const sql = `
    UPDATE mahasiswa 
    SET nama = ?, alamat = ?, jenis_kelamin = ?, tanggal_lahir = ?
    WHERE nim = ?
  `

  db.query(sql, [nama, alamat, jenis_kelamin, tanggal_lahir, nim], (err, field) => {
    if (err) {
      return response(500, null, err.message, res)
    }

    if (field.affectedRows === 0) {
      return response(404, null, "DATA TIDAK DITEMUKAN", res)
    }

    response(200, field, "DATA BERHASIL DIUBAH", res)
  })
}

// DELETE
const remove = (req, res) => {
  const nim = req.params.nim

  if (isNaN(nim)) {
    return response(400, null, "NIM HARUS ANGKA", res)
  }

  const sql = "DELETE FROM mahasiswa WHERE nim = ?"

  db.query(sql, [nim], (err, field) => {
    if (err) {
      return response(500, null, err.message, res)
    }

    if (field.affectedRows === 0) {
      return response(404, null, "DATA TIDAK DITEMUKAN", res)
    }

    response(200, field, "DATA BERHASIL DIHAPUS", res)
  })
}

module.exports = {
  getAll,
  getByNim,
  create,
  update,
  remove
}