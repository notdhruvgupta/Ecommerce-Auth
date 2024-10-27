import { sendVerificationEmail } from "../middleware/Email.js";
import { generateTokenAndSetCookies } from "../middleware/GenerateToken.js";
import { UserModel } from "../models/User.js";
import bcryptjs from "bcryptjs";

const Register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const UserExists = await UserModel.findOne({ email });
    if (UserExists) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists Please Login" });
    }

    const hashPass = bcryptjs.hashSync(password, 10);
    const verficationToken = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();

    const user = new UserModel({
      email,
      password: hashPass,
      name,
      verficationToken,
      verficationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();
    generateTokenAndSetCookies(res, user._id);
    await sendVerificationEmail(user.email, verficationToken);
    return res
      .status(200)
      .json({ success: true, message: "User Register Successfully", user });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "internal server error" });
  }
};

const VerfiyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await UserModel.findOne({
      verficationToken: code,
      verficationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or Expired Code" });
    }
    user.isVerified = true;
    user.verficationToken = undefined;
    user.verficationTokenExpiresAt = undefined;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Email Verifed Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found. Please register." });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Email not verified. Please verify your email.",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = generateTokenAndSetCookies(res, user._id);
    return res.status(200).json({ success: true, message: "Login successful", token, userId: user._id});
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const GetUsername = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, username: user.name || null });
  } catch (error) {
    console.error("Error fetching username:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export { Register, VerfiyEmail, Login, GetUsername };
