const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const validator = require("validator");
const { User } = require("./schema/schema");
const { chats } = require("./schema/chatschema");
const { message2 } = require("./schema/messageschema");

const app = express();

mongoose.connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Increase server selection timeout
    socketTimeoutMS: 45000, // Increase socket timeout
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: true, message: "Enter a valid email" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: true, message: "Enter a strong password" });
        }

        // Check if user already exists
        let user1 = await User.findOne({ email });
        if (user1) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json(newUser); // Return the new user object
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: error.message });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate fields
        if (!email || !password) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: true, message: "Invalid User" });
        }

        // Compare passwords
        if (user.password !== password) {
            return res.status(400).json({ error: true, message: "Wrong password" });
        }

        res.status(200).json(user); // Return the user object
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: error.message });
    }
});

app.post("/createchat", async (req, res) => {
    const { first, second } = req.body;
    console.log('Received IDs in backend:', first, second); // Log the received IDs

    if (!first || !second) {
        return res.status(400).json({ error: true, message: 'Both user IDs are required' });
    }

    try {
        // Check if a chat already exists between these users
        const chat = await chats.findOne({
            members: { $all: [first, second] }
        });

        if (chat) {
            return res.status(200).json(chat);
        }

        // Create a new chat if it doesn't exist
        const newChat = new chats({
            members: [first, second]
        });

        const resp = await newChat.save();
        res.status(201).json(resp);
    } catch (error) {
        console.error("Error creating chat:", error);
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get("/:userID", async (req, res) => {
    const userID = req.params.userID;
    try {
        const chats1 = await chats.find({ members: userID });
        res.status(200).json(chats1);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get("/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: error.message });
    }
});


app.get("/find/:firstID/:secondID", async (req, res) => {
    const { firstID, secondID } = req.params;
    try {
        const chats1 = await chats.find({ members: { $all: [firstID, secondID] } });
        res.status(200).json(chats1);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: error.message });
    }
});

app.post("/createmessage", async (req, res) => {
    const { chatID, sender, messages1 } = req.body;

    const message3 = new message2({
        chatID, sender, messages1,
    });
    try {
        const response = await message3.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get("/dj/:chatID", async (req, res) => {
    const { chatID } = req.params;
    try {
        const messages = await message2.find({ chatID });
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: error.message });
    }
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});