import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useAuth } from "../context/AuthContext";
import { AiOutlineSafety } from "react-icons/ai";
import { LuUser } from "react-icons/lu";
import gatewayImg from "../assets/gateway.avif";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { isLogin, user, role } = useAuth();
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);
  const [signupButtonClicked, setSignupButtonClicked] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("CraveIt Cart")),
  );

  console.log("CheckoutPage", cart);
  return (
    <>
      <div className="h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-3 px-4 ">
        <div>
          <div className="max-w-110 mx-auto">
            <div className="flex flex-col items-center space-y-1">
              <div className="text-3xl p-2 h-14 w-14 rounded-[50%] bg-white text-(--color-primary)">
                <div className="flex flex-col justify-between items-center text-green-700">
                  <AiOutlineSafety />
                  <p className="text-[10px]">Secure</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-(--color-secondary)">
                CHECKOUT
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-5 px-20 flex gap-10">
          <div className="w-6/10">
            <div className="space-y-10">
              {!isLogin && (
                <div className=" flex justify-between items-center rounded shadow p-7 bg-white">
                  <div className="space-y-5 ">
                    <div>
                      <h1 className="text-xl font-bold">Account</h1>
                      <p className="text-gray-500">
                        To place your order now, log in to your existing account
                        or sign up.
                      </p>
                    </div>
                    <div className="flex gap-10">
                      {!loginButtonClicked && !signupButtonClicked && (
                        <button
                          className="border py-2 px-6 border-(--color-secondary) rounded cursor-pointer hover:shadow-xl"
                          onClick={() => setLoginButtonClicked(true)}
                        >
                          <div className="text-sm font-semibold text-(--color-secondary)">
                            Have an Account?
                          </div>
                          <div className="text-sm font-semibold text-(--color-secondary)">
                            LOGIN NOW
                          </div>
                        </button>
                      )}
                      {loginButtonClicked && (
                        <div className="space-y-5 w-3/4">
                          <div className="relative">
                            <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                              type="text"
                              name="email"
                              placeholder="Enter you registered email "
                              // value={detail.email}
                              // onChange={handleChange}
                              // disabled={isLoading}
                              required
                              className="w-full h-fit px-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                            />
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="flex items-center justify-center bg-(--color-secondary) font-bold py-2 px-4 rounded-lg hover:bg-(--color-secondary-hover) transition  shadow-lg cursor-pointer w-fit disabled:cursor-not-allowed disabled:bg-(--color-secondary) text-white"
                            >
                              <span className="flex items-center gap-2">
                                GET OTP
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                      {!loginButtonClicked && !signupButtonClicked && (
                        <button
                          className="border py-2 px-6 bg-(--color-secondary) border-(--color-secondary) rounded cursor-pointer hover:shadow-xl"
                          onClick={() => setSignupButtonClicked(true)}
                        >
                          <div className="text-sm font-semibold text-white">
                            New to CraveIt?
                          </div>
                          <div className="text-sm font-semibold text-white">
                            SIGN UP
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                  <div><img src={gatewayImg} alt="" className="w-36 h-36" /></div>
                </div>
              )}
              <div className="space-y-5 rounded shadow p-7 bg-white">
                Saved Address
              </div>
              <div className="space-y-5 rounded shadow p-7 bg-white">
                Payment Gateway
              </div>
            </div>
          </div>
          <div className="w-4/10 space-y-5 rounded shadow p-7 bg-white">
            Order
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
