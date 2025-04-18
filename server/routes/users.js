const express = require('express');
const User = require('../controllers/users');
const router = express.Router();
const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Prosím přihlaste se' });
        }
        const decoded = jwt.verify(token, "acf09e5bbf9969944f5f156b461cf0b7011d43fa7809a404aa4adbf69e084c8adcbb799a54bb374e8c3271de17e9af007bc80a1555d4ca9c19181cd79fd6b4a4494e02de6b19677d4ef8b623c7047279a7125a3903f3359aa73ef5095f3b6c87631f1dd38d7f738dd668329957ef0499047c2fed676d2e169af3e29903f4b8abdc093f147873dce78f6e41eacfc91cc81e82b450fa0491a8bae892e06735ec21ac19e7b5643b0731b4f693bb83a0ca22f0a80e38dc413682c9a3692668f2edf2204b913709d840c28d0076e6fc0fcafdd61ab2ebc8609b8d4393de7ff617c406de25d616b7953ce04939e5a651f558814d75a08f184dca7f9f74d2d15e011a7e");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Prosím přihlaste se' });
    }
};

router.post('/register', User.createUser);
router.post("/login", User.loginUser);
router.get("/me", auth, User.getUser);
router.post("/logout", User.logoutUser);

module.exports = router;