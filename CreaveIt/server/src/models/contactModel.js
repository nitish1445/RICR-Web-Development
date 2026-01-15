import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
},{timestamps:true});

const Contact = mongoose.model("Contact",contactSchema)

export default Contact;
