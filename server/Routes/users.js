const express = require('express')
const router = express.Router();
const Users = require("../Modal/Users");
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fetchUser = require('../Middleware/fetchUser');
dotenv.config();

router.post('/register', async (req, res) => {
    let success = false;
    try {
        //check weather email is present in the database or not
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.REACT_APP_SALT));
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        var authtoken = jwt.sign(data, process.env.REACT_APP_JWT_SECRET);
        // res.json(user)
        success = true
        res.json({ success, authtoken })

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', async (req, res) => {
    let success = false;
    const email = req.body.email;
    try {
        let user = await Users.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.REACT_APP_JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;
