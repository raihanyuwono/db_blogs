const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const defaultPath = "public/images";
const fileTypes = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
const maxSize = 1024 * 1024; // 1Mb

async function createDir(path) {
    const isDirExist = fs.existsSync(path);
    if (!isDirExist) {
        await fs.promises.mkdir(path, {
            recursive: true,
        });
    }
}

function getType(file) {
    return file.mimetype.split("/")[1];
}

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const path = `${defaultPath}/${file.fieldname}`;
        await createDir(path);
        cb(null, path);
    },
    filename: function (req, file, cb) {
        const fileType = getType(file);
        const fileName = `${Date.now()}-${uuidv4()}.${fileType}`;
        cb(null, fileName);
    },
});

function fileFilter(req, file, cb) {
    const fileType = getType(file);
    if (fileTypes.includes(fileType)) cb(null, true);
    else cb(new Error("Invalid file format"));
}

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: maxSize,
    },
});
