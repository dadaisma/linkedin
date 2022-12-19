const express = require("express");
const router = express.Router()
const userRoutes = require("./user")
const jobRoutes = require("./job")



router.use("/user", userRoutes)
router.use("/job", jobRoutes)


module.exports = router;