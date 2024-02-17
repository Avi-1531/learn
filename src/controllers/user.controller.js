import { asynchandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { User } from "../models/user.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";

const registeruser = asynchandler(async (req, res) => {
  // get user details from frontend
  const { fullname, username, email, password } = req.body;
  // check if details are in valid format (validation-not empty)

  // could do it with lots of if else statements
  // if (fullname === "") {
  //   throw new apierror(400, "fullname is required");
  // }

  if (
    [fullname, username, email, password].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new apierror(400, "All fields are required");
  }

  // check if user already exist :username ,email

  const existeduser = await User.findOne({ $or: [{ username }, { email }] });
  if (existeduser) {
    throw new apierror(409, "user with email or username already exists");
  }

  // check for images ,check for avatar
  console.log("multer files ");

  // there is a problem out there in req.files
  console.log("&&&&&&&&&&&&&");
  console.log(req.files);
  // req.files is not properly functioning and the error cannot convert object to primitive value

  // take it from req.files ->as it is uploaded on the local server
  const avatarlocalpath = req.files?.avatar[0]?.path;
  // const coverimagelocalpath = req.files?.coverimage[0]?.path;

  console.log(Array.isArray(req.files.coverimage));
  console.log("$$$$$$$$$$$$");
  let coverimagelocalpath;
  if (
    req.files &&
    Array.isArray(req.files.coverimage) &&
    req.files.coverimage.length > 0
  ) {
    coverimagelocalpath = req.files.coverimage[0].path;
  }

  if (!avatarlocalpath) {
    throw new apierror(400, "avatar file is required");
  }

  console.log("avatarlocalpath->", avatarlocalpath);

  // upload them on cloudinary -avatar

  const avatar = await uploadoncloudinary(avatarlocalpath);
  const coverimage = await uploadoncloudinary(coverimagelocalpath);

  console.log("avatar->", avatar);
  if (!avatar) {
    throw new apierror(400, "avatar file is required");
  }

  // create user object -create entry in db

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    email,
    coverimage: coverimage?.url || "",
    password,
    username: username.toLowerCase(),
  });

  // remove password and refersh token field from the response that we have to send at the frontend
  const createduser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );
  // check for user creation

  if (!createduser) {
    throw new apierror(500, "something went wrong while register the user");
  }
  // return res
  return res
    .status(201)
    .json(new apiresponse(200, createduser, "user registered successfully"));
});

export { registeruser };
