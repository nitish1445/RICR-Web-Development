import User from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";

export const UserUpdate = async (req, res, next) => {
  try {
    const { fullName, email, phone } = req.body;
    const currentUser = req.user;
    if (!fullName || !email || !phone) {
      const error = new Error("All field Required.");
      error.statusCode = 400;
      return next(error);
    }

    // // old way

    console.log("OldData: ", currentUser); //old user data in JSON format
    // currentUser.fullName = fullName;
    // currentUser.email = email;
    // currentUser.phone = phone;
    // await currentUser.save();
    // console.log("NewData:", currentUser);

    //Second Way

    const updatedUser = await User.findByIdAndUpdate(
      { _id: currentUser._id },
      {
        fullName,
        email,
        phone,
      },
      { new: true },
    );

    console.log("Updated User: ", updatedUser);

    res
      .status(200)
      .json({ message: "User Updated Successfully", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const UserChangePhoto = async (req, res, next) => {
  try {
    // console.log("body: ", req.body);
    const currentUser = req.user;
    const dp = req.file;

    if (!dp) {
      const error = new Error("Profile picture required");
      error.statusCode = 400;
      return next(error);
    }

    if (currentUser.photo.publicID) {
      await cloudinary.uploader.destroy(currentUser.photo.publicID);
    }

    const b64 = Buffer.from(dp.buffer).toString("base64");
    const dataURI = `data:${dp.mimetype};base64,${b64}`;
    console.log("Data URI : ", dataURI.slice(0, 100));

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "CraveIt/User",
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log("Image Upload Done ", result);
    currentUser.photo.url = result.secure_url;
    currentUser.photo.publicID = result.publicID;

    await currentUser.save();

    res.status(200).json({ message: "Photo Updated", data: currentUser });
  } catch (error) {
    next(error);
  }
};
