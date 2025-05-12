const jwt = require('jsonwebtoken');
const { ID } = require('node-appwrite');
const { account } = require("../database/appwrite");

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        const userExists = await account.get();
        if (userExists) {
            return res.status(400).json({ message: "A user with this email already exists" });
        }

        const user = await account.create(ID.unique(), email, password, name);

        const token = createToken(user.$id);

        return res.status(201).json({
            id: user.$id,
            email: user.email,
            name: user.name,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all required fields" });
        }

        await account.createEmailSession(email, password);

        const user = await account.get();

        const token = createToken(user.$id);

        return res.status(200).json({
            id: user.$id,
            email: user.email,
            name: user.name,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Incorrect login or password" });
    }
};

const logoutUser = async (req, res) => {
    try {
        await account.deleteSessions();
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await account.get();
        return res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
};
