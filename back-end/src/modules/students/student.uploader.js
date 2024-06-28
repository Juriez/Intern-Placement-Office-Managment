const multer = require("multer");
const path = require("path");
const cvStorage = multer.diskStorage({
    destination: "./public/",
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext != ".pdf" || ext != ".PDF") return cb(null, req.params.id + ext);
        else return cb(new Error("Only PDF files are allowed"));
    },
});

const cvUploader = multer({ storage: cvStorage });

module.exports = { cvUploader };
