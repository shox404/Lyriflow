const { ID, Query } = require('node-appwrite');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { databases } = require("../database/appwrite");

const DB_ID = process.env.APPWRITE_DB_ID;
const USERS_COLLECTION = process.env.USERS_COLLECTION;

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: "Please fill in all required fields" });
    }

    try {
        const existingUsers = await databases.listDocuments(DB_ID, USERS_COLLECTION, [
            Query.equal("email", email)
        ]);

        if (existingUsers.total > 0) {
            return res.status(400).json({ message: "A user with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await databases.createDocument(DB_ID, USERS_COLLECTION, ID.unique(), {
            email,
            password: hashedPassword,
            name
        });

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
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all required fields" });
    }

    try {
        const usersList = await databases.listDocuments(DB_ID, USERS_COLLECTION, [
            Query.equal("email", email)
        ]);

        if (usersList.total === 0) {
            return res.status(400).json({ message: "Incorrect login or password" });
        }

        const user = usersList.documents[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect login or password" });
        }

        const token = createToken(user.$id);

        return res.status(200).json({
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

const logoutUser = async (req, res) => {
    return res.status(200).json({ message: 'Logged out successfully' });
};

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await databases.getDocument(DB_ID, USERS_COLLECTION, userId);

        return res.status(200).json({
            id: user.$id,
            email: user.email,
            name: user.name
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};
