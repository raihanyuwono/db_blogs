const multer = require("multer");
const fs = require("fs");

const defaultPath = "public/images";
const fileTypes = ["jpg", "jpeg", "png", "gif", "webp", "svg"];

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, defaultPath);
    },
    filename: (req, file, cb) => {
        cb(null, "FILE_NAME" + file.mimetype.split("/")[1]);
    },
});

function fileFilter(req, file, cb) {
    const fileType = file.mimetype.split("/")[1];

    if (fileTypes.includes(fileType)) {
        cb(null, true);
    } else {
        cb(new Error("File format is not valid"));
    }
}

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });
