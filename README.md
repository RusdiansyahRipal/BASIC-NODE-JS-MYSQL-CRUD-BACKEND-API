# 🚀 BASIC NODE JS MYSQL CRUD API

Project ini adalah hasil pembelajaran saya dalam membangun REST API sederhana menggunakan Node.js, Express, dan MySQL.

## 📌 Deskripsi

Project ini berfokus pada implementasi operasi dasar CRUD (Create, Read, Update, Delete) dengan menggunakan arsitektur sederhana yang terstruktur (controller, model, utils).

Tujuan utama:

* Memahami alur backend development
* Menghubungkan Node.js dengan database MySQL
* Membangun REST API menggunakan Express
* Menyusun struktur project yang rapi dan scalable

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* JavaScript (ES6)

---

## 📂 Struktur Folder

```
basic_code/
│── controller/
│── model/
│── utils/
│── node_modules/
│── connection.js
│── index.js
│── response.js
│── package.json
```

---

## ⚙️ Instalasi & Setup

1. Clone repository

```
git clone https://github.com/RusdiansyahRipal/BASIC-NODE-JS-MYSQL-CRUD-BACKEND-API.git
```

2. Masuk ke folder project

```
cd BASIC-NODE-JS-MYSQL-CRUD-BACKEND-API
```

3. Install dependencies

```
npm install
```

4. Jalankan server

```
node index.js / npm run api-service
```

---

## 📡 Endpoint API

### 🔹 GET - Ambil semua data

```
GET /mahasiswa
```

### 🔹 POST - Tambah data

```
POST /mahasiswa
```

### 🔹 PUT - Update data

```
PUT /mahasiswa/:nim
```

### 🔹 DELETE - Hapus data

```
DELETE /mahasiswa/:nim
```

---

## 📊 Contoh Data

```json
{
  "nama": "Ripal Rusdiansyah",
  "alamat": "Batujaya",
  "jenis_kelamin": "Laki-laki",
  "tanggal_lahir": "1999-11-16"
}
```

---

## 🎯 Tujuan Pembelajaran

Melalui project ini, saya belajar:

* Konsep REST API
* Routing di Express
* Koneksi database MySQL
* Query dasar (SELECT, INSERT, UPDATE, DELETE)
* Struktur backend yang lebih terorganisir

---

## 🚧 Status Project

Masih dalam tahap pengembangan dan pembelajaran.

---

## 📌 Catatan

Project ini dibuat sebagai bagian dari perjalanan saya untuk menjadi seorang Backend Developer / Data Analyst.

---

## 🙌 Author

**Ripal Rusdiansyah**

---
