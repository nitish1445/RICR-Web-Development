import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
  restaurantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },

  cuisine: {
    type: String,
    required: true,
  },
  servingSize: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "veg",
      "non-veg",
      "vegan",
      "jain",
      "egg",
      "gulten-free",
      "contain-nuts",
      "dairy",
    ],
    required: true,
  },
  decription: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
    enum: ["available", "unavailable", "removed"],
    default: "available",
  },
  image: {
    type: [
      {
        url: { type: String, required: true },
        publicID: { type: String, required: true },
      },
    ],
    required: true,
  },
});

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
