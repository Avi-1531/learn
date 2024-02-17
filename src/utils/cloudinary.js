import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadoncloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_path: "auto",
    });

    // file has been uploaded successfully
    console.log(
      "file has been uploaded succcesfully on cloudinary",
      response.url
    );

    fs.unlinkSync(localfilepath);
    // we will receive the path as the url when it gets uploaded

    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    // remove the locally saved temporary file as the upload operation gets failed

    return null;
  }
};

export { uploadoncloudinary };
