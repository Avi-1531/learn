import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb is nothing but the callback
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // in this we are saving the file with the name given by the user we could update that as well but the time it is on the localstorage is less as compared to the cloudinary time
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
});
