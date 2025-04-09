const { param } = require('../app');
const User = require('../models/users');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body
    try {


        const isExisitngUser = await User.findOne({ email });
        if (isExisitngUser) {
            return res.status(201).json("Uživatel už existuje")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()


        const token = jwt.sign(
            { userId: user._id },
            "acf09e5bbf9969944f5f156b461cf0b7011d43fa7809a404aa4adbf69e084c8adcbb799a54bb374e8c3271de17e9af007bc80a1555d4ca9c19181cd79fd6b4a4494e02de6b19677d4ef8b623c7047279a7125a3903f3359aa73ef5095f3b6c87631f1dd38d7f738dd668329957ef0499047c2fed676d2e169af3e29903f4b8abdc093f147873dce78f6e41eacfc91cc81e82b450fa0491a8bae892e06735ec21ac19e7b5643b0731b4f693bb83a0ca22f0a80e38dc413682c9a3692668f2edf2204b913709d840c28d0076e6fc0fcafdd61ab2ebc8609b8d4393de7ff617c406de25d616b7953ce04939e5a651f558814d75a08f184dca7f9f74d2d15e011a7e",
            { expiresIn: '7d' }
        );

        res.status(201).json({
            msg: "Uživatel je ready",
            token,
            user: {
                id: user._id,
                name: user.name
            }
        })


    } catch (err) {
        res.status(500).send(err);
    }
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    try {


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(402).send("Uživatel neexistuje")
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Nesprávný email nebo heslo' });
        }

        const token = jwt.sign(
            { userId: user._id },
            "acf09e5bbf9969944f5f156b461cf0b7011d43fa7809a404aa4adbf69e084c8adcbb799a54bb374e8c3271de17e9af007bc80a1555d4ca9c19181cd79fd6b4a4494e02de6b19677d4ef8b623c7047279a7125a3903f3359aa73ef5095f3b6c87631f1dd38d7f738dd668329957ef0499047c2fed676d2e169af3e29903f4b8abdc093f147873dce78f6e41eacfc91cc81e82b450fa0491a8bae892e06735ec21ac19e7b5643b0731b4f693bb83a0ca22f0a80e38dc413682c9a3692668f2edf2204b913709d840c28d0076e6fc0fcafdd61ab2ebc8609b8d4393de7ff617c406de25d616b7953ce04939e5a651f558814d75a08f184dca7f9f74d2d15e011a7e",
            { expiresIn: '7d' }
        );

        res.status(201).json({
            msg: "Uživatel je ready",
            token,
            user: {
                id: user._id,
                name: user.name
            }
        })


    } catch (err) {
        res.status(500).send(err);
    }
};


exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Uživatel nenalezen' });
        }
        res.json(user);
    } catch (error) {
        console.error('Chyba při získávání uživatele:', error);
        res.status(500).json({ message: 'Chyba serveru' });
    }
};