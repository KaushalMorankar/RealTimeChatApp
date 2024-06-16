const mongoose = require('mongoose');

const chatschema = new mongoose.Schema(
    {
        members: {
            type: [String], // Explicitly defining as an array of strings
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const chats = mongoose.model("Chat", chatschema);
module.exports = { chats };
