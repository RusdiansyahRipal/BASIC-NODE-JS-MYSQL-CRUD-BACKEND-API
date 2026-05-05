const express = require("express")
const app = express()
const port = 3000

const mahasiswaRoutes = require("./routes/mahasiswa")

app.use(express.json())

app.get("/", (req, res) => {
  res.send("API jalan ")
})

app.use("/mahasiswa", mahasiswaRoutes)

app.listen(port, () => {
  console.log(`Server jalan di port ${port}`)
})