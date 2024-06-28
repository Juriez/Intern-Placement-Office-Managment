const mongoose = require("mongoose");
const { UserModel } = require("../users/user.model");

const StudentSchema = new mongoose.Schema({
    roll: { type: String, required: true, unique: true },
    session: { type: String, required: true },
    cgpa: { type: Number, required: true },
    skills: { type: [String] },
    address: { type: String },
    cvUrl: { type: String },
    preferred_companies: [{ type: mongoose.Schema.ObjectId, ref: "companies" }],
    suggested_companies: [{ type: mongoose.Schema.ObjectId, ref: "companies" }], // suggested by ipoc member
    call_for_interview: [
        {
            date: { type: Date, required: true },
            company: { type: mongoose.Schema.ObjectId, ref: "companies", required: true },
        },
    ],
    selected_company: [
        {
            company: { type: mongoose.Schema.ObjectId, ref: "companies" },

        }
    ],
});

const StudentModel = UserModel.discriminator("students", StudentSchema);
module.exports = { StudentModel };
