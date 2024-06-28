const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    manager: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    details: { type: String },
    location: { type: String },
    techStack: { type: [String] },
    suggested_students: [{ type: mongoose.Schema.ObjectId, ref: "students" }], // suggested by ipoc member
    interns: [
        {
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            student: { type: mongoose.Schema.ObjectId, ref: "students" },
        },
    ],
    interviewees: [
        {
            date: { type: Date, required: true },
            student: { type: mongoose.Schema.ObjectId, ref: "students" },
        },
    ],
});

const CompanyModel = mongoose.model("companies", CompanySchema);
module.exports = { CompanyModel };
