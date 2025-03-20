const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    firstName: String,
    phone: Number,
    notes: String,
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Task", taskSchema);
