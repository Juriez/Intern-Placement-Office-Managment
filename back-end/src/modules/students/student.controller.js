const express = require("express");
const studentRouter = express.Router();
const { StudentModel } = require("./student.model");
const { CompanyModel } = require("../companies/company.model");
const { studentValidator } = require("./student.validator");
const { formatError } = require("../../utils/format-error.utils");
const { hashPassword } = require("../../utils/common.utils");
const { cvUploader } = require("./student.uploader");

const company_attributes = "name details location";

studentRouter.post("/", async (req, res) => {
    const body = req.body;

    const { error } = studentValidator.validate(body);

    if (error) return res.status(400).json({ error: formatError(error.details) });

    body.userType = "student";
    body.password = await hashPassword(body.password);

    const student = await StudentModel.create(body);

    const { password, ...response } = student.toJSON();

    res.status(201).json(response);
});

studentRouter.post("/:id/cv", cvUploader.single("cv"), async (req, res) => {
    const { id } = req.params;
    const filename = req.file?.filename;

    if (!filename) throw new Error("File must be provided");

    await StudentModel.updateOne({ _id: id }, { $set: { cvUrl: filename } });

    res.json({ message: "uploaded successfully" });
});

studentRouter.get("/", async (req, res) => {
    const students = await StudentModel.find()
        .populate({
            path: "selected_company.company",
            select: company_attributes,
        })
        .populate({
            path: "preferred_companies",
            select: company_attributes,
        })
        .populate({
            path: "suggested_companies",
            select: company_attributes,
        })
        .populate({
            path: "call_for_interview.company",
            select: company_attributes,
        });

    const studentResponse = students.map((student) => {
        student = student.toJSON();
        const { password, ...response } = student;
        return response;
    });

    res.json(studentResponse);
});

studentRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    let student = await StudentModel.findById(id)
        .populate({
            path: "selected_company.company",
            select: company_attributes,
        })
        .populate({
            path: "preferred_companies",
            select: company_attributes,
        })
        .populate({
            path: "suggested_companies",
            select: company_attributes,
        })
        .populate({
            path: "call_for_interview.company",
            select: company_attributes,
        });

    if (!student) return res.status(404).json({ message: "Student not found" });

    student = student.toJSON();

    const { password, ...response } = student;

    res.json(response);
});

studentRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const student = await StudentModel.findById(id);
    if (!student) throw Error("Student not found");

    const existedStudent = await StudentModel.findOne({ email: body.email });
    if (existedStudent && !existedStudent._id.equals(student._id)) throw Error("Student already exists already");

    await StudentModel.updateOne({ _id: id }, { $set: { ...body } });

    res.json({ message: "updated successfully" });
});

studentRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    await StudentModel.deleteOne({ _id: id });

    res.json({ message: "Student deleted successfully" });
});

studentRouter.post("/:id/preferred-companies", async (req, res) => {
    const { id } = req.params;
    const { companyId } = req.body;

    let student = await StudentModel.findById(id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    console.log(CompanyModel, "model");

    const company = await CompanyModel.findById(companyId);
    if (!company) return res.status(404).json({ message: "company not found" });

    // check duplicate
    for (const compId of student.preferred_companies) {
        if (compId == companyId) throw new Error("already added");
    }

    student.preferred_companies.push(companyId);
    await student.save();

    res.json({ message: "added successfully" });
});

studentRouter.delete("/:id/preferred-companies/:companyId", async (req, res) => {
    const { id, companyId } = req.params;

    let student = await StudentModel.findById(id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    student.preferred_companies = student.preferred_companies.filter((cmpId) => cmpId !== companyId);
    await student.save();

    res.json({ message: "removed successfully" });
});

module.exports = { studentRouter };
