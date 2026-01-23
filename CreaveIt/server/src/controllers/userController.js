export const UserUpdate = async (req, res, next) => {
  try {
    const { fullName, email, phone } = req.body;
    const currentUser = req.user;
    if (!fullName || !email || !phone) {
      const error = new Error("All field Required.");
      error.statusCode = 400;
      return next(error);
    }

    currentUser.fullName = fullName;
    currentUser.email = email;
    currentUser.phone = phone;
    await currentUser.save();

    res
      .status(200)
      .json({ message: "User Updated Successfully", data: currentUser });
  } catch (error) {
    next(error);
  }
};
