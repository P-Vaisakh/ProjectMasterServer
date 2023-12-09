const multer = require("multer");

// storage location and filename
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}-${file.originalname}`);
  },
});

// filefilter
const filefilter = (req, file, callback) => {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// multer middleware
const upload = multer({ storage, filefilter });
module.exports = upload;
