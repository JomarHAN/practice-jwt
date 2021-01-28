const router = require('express').Router()
const pool = require('../dbSchema')
const jwtGenerator = require('../utils/jwtGenerator')
const bcrypt = require('bcrypt')
const validInfo = require('../middleware/validInfo')
const authentication = require('../middleware/authentication')

//register
router.post('/register', validInfo, async (req, res) => {
    try {
        //1. destructure the req.body
        const { name, email, password } = req.body

        //2. Check email exist, if it already , then throw error
        const verifyEmail = await pool.query("SELECT * FROM users2 WHERE user_email = $1", [email])
        if (verifyEmail.rows.length !== 0) {
            return res.status(401).json("Email Already Registered!")
        }

        //3. Bcrypt password before input into database
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)

        //4. Insert user's info into database then returning its back
        const newUser = await pool.query("INSERT INTO users2 (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword])

        //5. Generate user_id into a token
        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({ token })

    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server error")
    }
})

//login
router.post('/login', validInfo, async (req, res) => {
    //1. destructure the req.body
    const { email, password } = req.body

    //2. check email exist or not, if it does, then throw error
    const validUser = await pool.query("SELECT * FROM users2 WHERE user_email = $1", [email])
    if (validUser.rows.length === 0) {
        return res.status(401).json("Email or Password is Incorrect!")
    }

    //3. check if incoming password is the same the datababse password
    const validPassword = await bcrypt.compare(password, validUser.rows[0].user_password)
    if (!validPassword) {
        return res.status(401).json("Email or Password is Incorrect!")
    }

    //4. generate a token 
    const token = jwtGenerator(validUser.rows[0].user_id)
    res.json({ token })
})

router.get('/is-verify', authentication, async (req, res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error")
    }
})

module.exports = router