const express = require("express");
const authRouter = express.Router();
const { UserModel } = require("../users/user.model");
const { authValidator } = require("./auth.validator");
const { verifyPassword, generateJwtToken } = require("../../utils/common.utils");
const { formatError } = require("../../utils/format-error.utils");
const { checkAuthentication } = require("../../middlewares/auth.middleware");

authRouter.post("/login", async (req, res) => {
    const body = req.body;

    const { error } = authValidator.validate(body);

    if (error) return res.status(400).json({ error: formatError(error.details) });

    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const verified = await verifyPassword(req.body.password, user.password);

    if (!verified) return res.status(401).json({ message: "Invalid email or password" });

    const accessToken = generateJwtToken(
        {
            userId: user._id,
            userType: user.userType,
        },
        "6000000000000"
    );

    res.cookie("access-token", accessToken, {
        httpOnly: true,
        maxAge: 100000000000,
    });

    res.status(200).json({ message: "successfully logged in", accessToken });
});

authRouter.get("/profile", checkAuthentication, async function (req, res) {
    const user = req.user;
    let userData = await UserModel.findById(user?.userId);

    userData = userData.toJSON();

    const { password, ...response } = userData;

    res.json(response);
});

authRouter.delete("/logout", function (req, res) {
    res.clearCookie("access-token");
    res.status(200).json({ message: "successfully logged out" });
});

module.exports = { authRouter };
