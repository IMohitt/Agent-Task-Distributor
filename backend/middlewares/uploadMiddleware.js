const multer = require("multer");

// Configure storage for file uploads (in-memory)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ["csv", "xlsx", "xls"];
        const fileExt = file.originalname.split(".").pop().toLowerCase();
        
        if (!allowedExtensions.includes(fileExt)) {
            return cb(new Error("Invalid file format. Only CSV, XLSX, and XLS allowed."));
        }
        cb(null, true);
    }
});

module.exports = upload;
