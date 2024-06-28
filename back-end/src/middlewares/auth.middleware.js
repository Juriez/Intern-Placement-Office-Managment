const { verifyJwtToken } = require("../utils/common.utils");

function checkAuthentication(req, res, next) {
    try {
        const bearerToken = req.headers.authorization;
        const authToken = bearerToken ? bearerToken.split(" ")[1] : null;
        const cookie = req.cookies["access-token"];

        const token = cookie || authToken;

        if (!token) return res.status(401).json({ message: "Authentication failed" });

        const decoded = verifyJwtToken(token);

        if (!decoded) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        console.log(decoded);

        req.user = decoded;

        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
}

function isAdmin(req, res, next) {
    const user = req.user;
    if (user.userType === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "you are not allowed" });
    }
}

function isTeacher(req, res, next) {
    const user = req.user;
    if (user.userType == "ipoc_head" || user.userType == "ipoc_member") {
        next();
    } else {
        return res.status(403).json({ message: "you are not allowed" });
    }
}

async function isStudent(req, res, next) {
    const user = req.user;
    if (user.userType === "student") {
        next();
    } else {
        return res.status(403).json({ message: "you are not allowed" });
    }
}

async function isCompanyManager(req, res, next) {
    const user = req.user;
    if (user.userType === "company_manager") {
        next();
    } else {
        return res.status(403).json({ message: "you are not allowed" });
    }
}

module.exports = {
    checkAuthentication,
    isAdmin,
    isTeacher,
    isStudent,
    isCompanyManager,
};
