const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("./user.model");
const { userValidator } = require("./user.validator");
const { formatError } = require("../../utils/format-error.utils");
const { hashPassword } = require("../../utils/common.utils");

userRouter.post("/", async (req, res) => {
    const body = req.body;

    const { error } = userValidator.validate(body);

    if (error) return res.status(400).json({ error: formatError(error.details) });

    body.password = await hashPassword(body.password);
    const user = await UserModel.create(body);

    const { password, ...response } = user.toJSON();

    res.status(201).json(response);
});

userRouter.get("/", async (req, res) => {
    const users = await UserModel.find({ userType: { $in: ["admin", "ipoc_head", "ipoc_member"] } });
    const response = users.map((user) => {
        user = user.toJSON();
        const { password, ...response } = user;
        return response;
    });
    res.json(response);
});

userRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    let user = await UserModel.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user = user.toJSON();

    const { password, ...response } = user;

    res.json(response);
});

userRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const user = await UserModel.findById(id);
    if (!user) throw Error("User not found");

    const existedUser = await UserModel.findOne({ email: body.email });
    if (existedUser && !existedUser._id.equals(user._id)) throw Error("User already exists already");

    await UserModel.updateOne({ _id: id }, { $set: { ...body } });

    res.json({ message: "updated successfully" });
});

userRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    await UserModel.deleteOne({ _id: id });

    res.json({ message: "User deleted successfully" });
});


module.exports = { userRouter };
