import {
  getUserByUsername,
  InsertInResume,
  InsertInSkills,
  InsertInUsers,
} from "../Model/userModel.js";
import cloudinary from "cloudinary";

import jwt from "jsonwebtoken";

export const registerController = async (req, res, next) => {
  //   console.log(req.files.resume);

  try {
    const {
      firstname,
      lastname,
      email,
      password,
      gender,
      status,
      description,
      skill,
    } = req.body;
    const { resume } = req.files;

    // console.log("Backend", req.body);

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !gender ||
      !status ||
      !description ||
      !resume ||
      !skill
    ) {
      return next("All Fields Are Required");
    }

    const allowedFormat = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    if (!allowedFormat.includes(resume.mimetype)) {
      return next("Resume Format Mismatched");
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      next("Failed To upload Resume in cloud");
    }

    const resumepath = cloudinaryResponse.secure_url;

    const users = await InsertInUsers({
      firstname,
      lastname,
      email,
      password,
      gender,
      status,
      description,
    });

    if (!users) {
      next("Errorr in InsertInUsers ");
    }

    const user_id = users.user_id;

    const skills = await InsertInSkills(user_id, skill);
    if (!skills) {
      next("Errorr in InsertInSkills ");
    }

    const resumes = await InsertInResume(user_id, resumepath);
    if (!resumes) {
      next("Errorr in InsertInSkills ");
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      users,
      skills,
      resumes,
    });
  } catch (error) {
    return next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { firstname, password, remember } = req.body;
    console.log("Body:", req.body);
    console.log(remember);

    // Step 1: Validate input
    if (!firstname || !password) {
      return next("Username and password are required");
    }

    // Step 2: Check user in DB
    const user = await getUserByUsername(firstname);
    if (!user) {
      return next("Invalid firstname or password");
    }

    // Step 3: Compare password (plain text for now)
    if (user.password !== password) {
      return next("Invalid firstname or password");
    }

    // Step 4: Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id, firstname: user.firstname },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    // Step 5: Send success response
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true, // more secure
        secure: process.env.NODE_ENV === "production", // true in prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // cross-site
        maxAge: remember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 1 day or 7 days if remember
      })
      .json({
        success: true,
        message: "Login successful",
      });
  } catch (error) {
    console.error("Login error:", error);
    return next(error);
  }
};
