import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registeruser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverimage", maxCount: 1 },
  ]),
  registeruser
);

export default router;
