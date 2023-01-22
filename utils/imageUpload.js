const multer = require("multer");
const sharp = require("sharp");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/image/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "_" + file.originalname);
//   },
// });

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an Image! please upload an image"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: multerFilter });
exports.imageUpload = upload.single("image");

exports.resizeImage = (req, res, next) => {
  if (!req.file) return next();

  const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
  req.file.filename = uniqueSuffix + "_" + req.user.id + ".jpeg";

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/image/${req.file.filename}`);
  next();
};
