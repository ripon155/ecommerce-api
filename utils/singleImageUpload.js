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
  // const fileName = uniqueSuffix + "_" + req.user.id + ".jpeg";
  const fileName = uniqueSuffix + ".jpeg";
  const imUrl = `http://127.0.0.1:5000/public/image/products/${fileName}`;
  req.body.image = fileName;
  req.body.imgUrl = imUrl;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/image/products/${fileName}`);
  next();
};

//if we upload single image
// upload.single("image"); req.file

//if we upload multiple image
// upload.array("image", 5); req.files

//if we upload multiple and single image same time
// upload.fields([
//   { name: "imageField1", maxCount: 10 },
//   { name: "imageField2", maxCount: 1 },
// ]); req.files
