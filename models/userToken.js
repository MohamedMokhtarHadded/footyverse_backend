const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const TokenSchema = mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId, 
            required: true,
            ref: "User"
        },
        token: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: new Date(),
            expires: 300
        }     
    }
);

module.exports = mongoose.model("Token", TokenSchema);