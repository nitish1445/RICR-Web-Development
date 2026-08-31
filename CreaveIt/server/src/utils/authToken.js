import jwt from "jsonwebtoken";

export const genToken = (user, res) => {
  try {
    const payload = {
      id: user._id,
      role: user.role || "admin",
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("parle", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return token;
  } catch (error) {
    throw error;
  }
};

export const genOTPToken = (user, res) => {
  try {
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("otpToken", token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });
  } catch (error) {
    throw error;
  }
};
