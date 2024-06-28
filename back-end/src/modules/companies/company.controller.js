const express = require("express");
const companyRouter = express.Router();
const { CompanyModel } = require("./company.model");
const { StudentModel } = require("../students/student.model");
const { companyValidator } = require("./company.validator");
const { formatError } = require("../../utils/format-error.utils");

const student_attributes = "name email roll session cgpa";

companyRouter.get("/", async (req, res) => {
    const companies = await CompanyModel.find()
        .populate({
            path: "manager",
            select: "name",
        })
        .populate({
            path: "interviewees.student",
            select: student_attributes,
        })
        .populate({
            path: "interns.student",
            select: student_attributes,
        })
        .populate({
            path: "suggested_students",
            select: student_attributes,
        });
    res.json(companies);
});

companyRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const company = await CompanyModel.findById(id)
        .populate({
            path: "manager",
            select: "name",
        })
        .populate({
            path: "interviewees.student",
            select: student_attributes,
        })
        .populate({
            path: "interns.student",
            select: student_attributes,
        })
        .populate({
            path: "suggested_students",
            select: student_attributes,
        });
    res.json(company);
});

companyRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const company = await CompanyModel.findById(id);
    if (!company) throw Error("Company not found");

    const existedCompany = await CompanyModel.findOne({ name: body.name });
    if (existedCompany && !existedCompany._id.equals(company._id)) throw Error("Company already exists already");

    await CompanyModel.updateOne({ _id: id }, { $set: { ...body } });

    res.json({ message: "updated successfully" });
});

companyRouter.delete("/:id", async (req, res) => {});

companyRouter.post("/:id/suggested-students", async (req, res) => {
    const { id } = req.params;
    const { studentId } = req.body;
    const company = await CompanyModel.findById(id);

    if (!company) throw new Error("company does not exist");

    const student = await StudentModel.findById(studentId);
    if (!student) throw new Error("student does not exist");

    if (student.selected_company.company) throw new Error("student already selected");

    // check duplicate
    for (const stdId of company.suggested_students) {
        if (stdId == studentId) throw new Error("already added");
    }

    company.suggested_students.push(studentId);
    await company.save();

    student.suggested_companies.push(id);
    await student.save();

    res.json({ message: "students added successfully" });
});

companyRouter.delete("/:id/suggested-students/:studentId", async (req, res) => {
    const { id, studentId } = req.params;
    const company = await CompanyModel.findById(id);

    if (!company) throw new Error("company does not exist");

    const student = await StudentModel.findById(studentId);
    if (!student) throw new Error("student does not exist");

    company.suggested_students = company.suggested_students.filter((stdId) => stdId != studentId);
    await company.save();

    student.suggested_companies = student.suggested_companies.filter((cmpId) => cmpId != id);
    await student.save();

    res.json({ message: "students removed successfully" });
});

companyRouter.post("/:id/interviewees", async (req, res) => {
    const { id } = req.params;
    const { studentId, date } = req.body;
    const company = await CompanyModel.findById(id);

    if (!company) throw new Error("company does not exist");

    const student = await StudentModel.findById(studentId);
    if (!student) throw new Error("student does not exist");

    if (student.selected_company.company) throw new Error("student already selected");

    // check duplicate
    for (const std of company.interviewees) {
        if (std.student == studentId) throw new Error("already added");
    }

    // update data
    company.interviewees?.push({ date, student: studentId });
    await company.save();

    student.call_for_interview.push({ date, company: id });
    await student.save();

    res.json({ message: "interviewee added successfully" });
});

companyRouter.delete("/:id/interviewees/:studentId", async (req, res) => {
    const { id, studentId } = req.params;
    const company = await CompanyModel.findById(id);

    if (!company) throw new Error("company does not exist");

    const student = await StudentModel.findById(studentId);
    if (!student) throw new Error("student does not exist");

    company.interviewees = company.interviewees.filter((std) => std.student != studentId);
    await company.save();

    student.call_for_interview = student.call_for_interview.filter((std) => std.company != id);
    await student.save();

    res.json({ message: "students removed successfully" });
});

companyRouter.post("/:id/interns", async (req, res) => {
    const { id } = req.params;
    const { studentId, startDate, endDate } = req.body;
    const company = await CompanyModel.findById(id);

    if (!company) throw new Error("company does not exist");

    const student = await StudentModel.findById(studentId);
    if (!student) throw new Error("student does not exist");

    if (student.selected_company.company) throw new Error("student already selected");

    // update data
    company.interns?.push({ startDate, endDate, student: studentId });
    await company.save();

    student.selected_company = { startDate, endDate, company: id };
    await student.save();

    res.json({ message: "intern added successfully" });
});

companyRouter.delete("/:id/interns/:studentId", async (req, res) => {
    const { id, studentId } = req.params;
    const company = await CompanyModel.findById(id);

    if (!company) throw new Error("company does not exist");

    const student = await StudentModel.findById(studentId);
    if (!student) throw new Error("student does not exist");

    company.interns = company.interns.filter((std) => std.student != studentId);
    await company.save();

    if (student.selected_company.company == id) {
        student.selected_company = {};
        await student.save();
    }

    res.json({ message: "students removed successfully" });
});

module.exports = { companyRouter };
