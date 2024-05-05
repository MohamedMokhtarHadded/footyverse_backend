const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    Role: {
        type: String,
        required: true,
        enum: ["MedicalStaff", "TechnicalDirector","Player","Trainer","Coach"],
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String },
},
{
    timestamps: true
}
);

//module.exports = mongoose.model("user", userSchema);
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
