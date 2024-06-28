const express = require("express");
const mongoose = require("mongoose");
const companyManager = express.Router();
const { UserModel } = require("../users/user.model");
const { CompanyModel } = require("../companies/company.model");
const { companyManagerValidator } = require("./company-manager.validator");
const { formatError } = require("../../utils/format-error.utils");
const { hashPassword } = require("../../utils/common.utils");

companyManager.post("/", async (req, res) => {
    const body = req.body;
    const { error } = companyManagerValidator.validate(body);

    if (error) return res.status(400).json({ error: formatError(error.details) });

    body.userType = "company_manager";
    body.password = await hashPassword(body.password);

    const existedUser = await UserModel.findOne({ email: body.email });
    if (existedUser) return res.status(400).json({ email: "email already exists" });

    const existedCompany = await CompanyModel.findOne({ name: body.companyName });
    if (existedCompany) return res.status(400).json({ email: "company already exists" });

    // create manager and company
    const { companyName, ...data } = body;
    const user = await UserModel.create(data);
    const manager = user._id;
    const company = await CompanyModel.create({ name: companyName, manager });

    const { password, ...response } = user.toJSON();
    response.company = company;

    res.status(201).json(response);
});

companyManager.get("/", async (req, res) => {
    const managers = await UserModel.aggregate([
        {
            $match: { userType: "company_manager" },
        },
        {
            $lookup: {
                from: "companies", // the name of the collection to join with
                localField: "_id", // field from the users collection
                foreignField: "manager", // field from the companies collection
                as: "company", // the field to store the joined documents
            },
        },
        {
            $unwind: "$company", // deconstruct the array of joined documents
        },
        {
            $project: {
                password: 0, // exclude the password field
            },
        },
    ]);

    res.json(managers);
});

companyManager.get("/:id", async (req, res) => {
    const { id } = req.params;

    const manager = await UserModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
                userType: "company_manager",
            },
        },
        {
            $lookup: {
                from: "companies",
                localField: "_id",
                foreignField: "manager",
                as: "company",
            },
        },
        {
            $unwind: "$company",
        },
        {
            $project: {
                password: 0,
            },
        },
    ]);

    if (manager.length === 0) {
        return res.status(404).json({ message: "Manager not found" });
    }

    res.json(manager[0]);
});

module.exports = { companyManager };
