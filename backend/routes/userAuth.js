const express = require("express")
const router = express.Router()
const usermodel = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fetchUser = require("../middleware/fetchUser")


router.post("/signup", async (req, res) => {
    try {

        const { username, password } = req.body

        const search = await usermodel.findOne({ username })
        if (search) return res.status(400).json({ msg: "User already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const user = await usermodel.create({
            username, password: hashed
        })

        if (!user) return res.status(400).json({ msg: "User Not Created" })

        return res.json({ msg: "User created Successfully" })
    } catch (e) { res.status(500) }
})

router.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body

        const search = await usermodel.findOne({ username })
        if (!search) return res.status(401).json({ token: null })

        const passmatch = await bcrypt.compare(password, search.password)
        if (!passmatch) return res.status(401).json({ token: null })

        const data = {
            id: search._id
        }

        const token = jwt.sign(data, "shhh")

        return res.json({ token })


    } catch (e) { res.status(500) }
})

router.get("/fetch", fetchUser, async (req, res) => {
    try {

        const user = await usermodel.findById(req.id)
        if (!user) return res.status(400).json({ msg: "user not found" })

        return res.json(user)
    } catch (e) { res.status(500) }
})

router.post("/fetchbyid", async (req, res) => {
    try {

        const user = await usermodel.findById(req.body.id)
        if (!user) return res.status(400).json({ msg: "user not found" })

        return res.json(user)
    } catch (e) { res.status(500) }
})


module.exports = router