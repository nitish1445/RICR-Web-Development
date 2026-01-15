import Contact from "../models/contactModel.js";

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
    res
      .status(201)
      .json({
        message: "Thanks for contacting us. \nWe'll get back you in 24 hrs.",
      });
  } catch (error) {
    next(error);
  }
};
