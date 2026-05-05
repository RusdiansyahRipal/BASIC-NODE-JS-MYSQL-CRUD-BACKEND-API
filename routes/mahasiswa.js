const express = require("express")
const router = express.Router()
const controller = require("../controllers/mahasiswaController.js")

router.get("/", controller.getAll)
router.get("/:nim", controller.getByNim)
router.post("/", controller.create)
router.put("/:nim", controller.update)
router.delete("/:nim", controller.remove)

module.exports = router