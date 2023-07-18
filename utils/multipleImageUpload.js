const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an Image! please upload an image"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: multerFilter });

exports.uploadProductImage = upload.array("image", 5);

exports.uploadProductImageResize = async (req, res, next) => {
  req.body.image = [];
  req.body.imgUrl = [];
  req.files.forEach(async (file, i) => {
    const fileName = `pro_${Date.now()}_${Math.round(Math.random() * 1e9)}_${
      i + 1
    }.jpeg`;
    const imUrl = `http://127.0.0.1:5000/public/image/products/${fileName}`;
    req.body.image.push(fileName);
    req.body.imgUrl.push(imUrl);

    await sharp(file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/image/products/${fileName}`);
  });
  next();
};
