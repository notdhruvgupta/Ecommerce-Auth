// Backend API to update user preferences
import { UserModel } from "../models/User.js";

const UpdatePreferences = async (req, res) => {
  try {
    const { userId, genres } = req.body;

    if (!userId || !genres) {
      return res
        .status(400)
        .json({ success: false, message: "User ID and genres are required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user preferences
    user.preferences = genres;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Preferences updated successfully" });
  } catch (error) {
    console.error("Error updating preferences:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const GetPreferences = async (req, res) => {
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

    // Return the user's saved preferences
    return res
      .status(200)
      .json({ success: true, preferences: user.preferences || [] });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { UpdatePreferences, GetPreferences };
