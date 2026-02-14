import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["manager", "partner", "customer"],
      required: true,
      default: "customer",
    },
    dob: {
      type: String,
      required: true,
      default: "N/A",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "N/A"],
      required: true,
      default: "N/A",
    },
    address: {
      type: String,
      required: true,
      default: "N/A",
    },
    city: {
      type: String,
      required: true,
      default: "N/A",
    },
    pin: {
      type: String,
      required: true,
      default: "N/A",
    },
    photo: {
      url: {
        type: String,
        default: "",
      },
      publicID: {
        type: String,
        default: "",
      },
    },
    geolocation: {
      lat: {
        type: String,
        required: true,
        default: "N/A",
      },
      lon: {
        type: String,
        required: true,
        default: "N/A",
      },
    },
    paymentDetail: {
      upi: {
        type: String,
        required: true,
        default: "N/A",
      },
      account_number: {
        type: String,
        required: true,
        default: "N/A",
      },
      IFSC: {
        type: String,
        required: true,
        default: "N/A",
      },
    },
    restaurantName: {
      type: String,
      required() {
        return this.role === "manager";
      },
      default() {
        return this.role === "manager" ? "N/A" : null;
      },
    },
    cuisine: {
      type: String,
      required() {
        return this.role === "manager";
      },
      default() {
        return this.role === "manager" ? "N/A" : null;
      },
    },
    document: {
      gst: {
        type: String,
        default: "N/A",
      },
      fssai: {
        type: String,
        default: "N/A",
      },
      rc: {
        type: String,
        default: "N/A",
      },
      dl: {
        type: String,
        default: "N/A",
      },
      uidai: {
        type: String,
        default: "N/A",
      },
      pan: {
        type: String,
        default: "N/A",
      },
    },
    isActive: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      required: true,
      default: "active",
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);

const adminSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
      required: true,
    },
    dob: {
      type: String,
      required: true,
      default: "N/A",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "N/A"],
      required: true,
      default: "N/A",
    },
    address: {
      type: String,
      required: true,
      default: "N/A",
    },
    city: {
      type: String,
      required: true,
      default: "N/A",
    },
    pin: {
      type: String,
      required: true,
      default: "N/A",
    },
    photo: {
      url: {
        type: String,
        default: "",
      },
      publicID: {
        type: String,
        default: "",
      },
    },
    geolocation: {
      lat: {
        type: String,
        required: true,
        default: "N/A",
      },
      lon: {
        type: String,
        required: true,
        default: "N/A",
      },
    },
    paymentDetail: {
      upi: {
        type: String,
        required: true,
        default: "N/A",
      },
      account_number: {
        type: String,
        required: true,
        default: "N/A",
      },
      IFSC: {
        type: String,
        required: true,
        default: "N/A",
      },
    },
    document: {
      gst: {
        type: String,
        default: "N/A",
      },
      fssai: {
        type: String,
        default: "N/A",
      },
      rc: {
        type: String,
        default: "N/A",
      },
      dl: {
        type: String,
        default: "N/A",
      },
      uidai: {
        type: String,
        default: "N/A",
      },
      pan: {
        type: String,
        default: "N/A",
      },
    },
    isActive: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      required: true,
      default: "active",
    },
  },
  { timestamps: true },
);

export const Admin = mongoose.model("Admin", adminSchema);
// export default User;
