import Contact from "../models/contactModel.js";
import Menu from "../models/menuSchema.js";
import { User } from "../models/userModel.js";

export const NewContact = async (req, res, next) => {
  try {
    // fetch data from frontend
    const { fullName, email, subject, query } = req.body;

    // check all the required data
    if (!fullName || !email || !subject || !query) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    // save data to database
    const newContact = await Contact.create({
      fullName,
      email,
      subject,
      query,
    });

    // send respone to frontend
    console.log(newContact);
    res.status(201).json({
      message: "Thanks for contacting us. \nWe'll get back you in 24 hrs.",
    });
  } catch (error) {
    next(error);
  }
};

export const GetAllRestaurants = async (req, res, next) => {
  try {
    const restaurant = await User.find({ role: "manager" }).select("-password");

    res.status(200).json({
      message: "Restaurants fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
};

export const GetRestaurantDisplay = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    const restaurantMenuData = await Menu.find({ restaurantID: id })
      .sort({ updatedAt: -1 });
      // .populate("restaurantID");

    // console.log(restaurantMenuData);

    res.status(200).json({
      message: "Menu fetched successfully",
      data: restaurantMenuData,
    });
  } catch (error) {
    next(error);
  }
};
