import User from "../models/userModel.js";

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
