const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    business_id: {
        type: String,
        required: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    display_name: {
        type: String,
        required: true,
    },
    project_ids: {
        type: [mongoose.Schema.Types.ObjectId], // Assuming project_ids are references to Project documents
        ref: "Project",
    },
    user_name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    company: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
      currency: {
        type: String,
        default: "INR",
    },
    timezone: {
        type: String,
        default: "Asia/Calcutta GMT+05:30",
    },
    type: {
        type: String,
        enum: ["owner", "admin", "user"], // You can add more types as needed
        default: "owner",
    },
    companySize: {
        type: Number,
        default: 1,
    },
    password: {
        type: String,
        required: true,
    },
});

const userModel = new mongoose.model("Users", userSchema);
module.exports = userModel;