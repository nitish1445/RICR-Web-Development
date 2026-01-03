import React, { useState } from "react";
import CountryData from "../assets/CountryData.json";
import { AiOutlineSwap } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

const Currency = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromAmt, setFromAmt] = useState();
  const [toAmt, setToAmt] = useState();

  const ClearAmt = () => {
    setFrom("");
    setTo("");
    setFromAmt("");
    setToAmt("");
  };

  const Convert = async () => {
    if (!from || !to || !fromAmt) {
      toast.error("Some Info. Missing");
      return;
    }
    try {
      const res = await axios.get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from
          .split(" ")[0]
          .toLowerCase()}.json`
      );

      setToAmt(
        fromAmt *
          res.data[from.split(" ")[0].toLowerCase()][
            to.split(" ")[0].toLowerCase()
          ]
      );
      toast.success("Amount converted.");
    } catch (error) {}
  };

  const swap = () => {
    let temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <>
      <div className="bg-blue-400 h-screen pt-30">
        <div className="w-xl bg-red-50 rounded shadow border p-3 mx-auto space-y-5">
          <div className="grid grid-cols-2 gap-10 items-center relative">
            {/* Amount to be Converted */}

            <div className="flex gap-3 border rounded px-2 bg-gray-100">
              {from && (
                <img
                  src={`https://flagsapi.com/${from.split(" ")[1]}/flat/64.png`}
                  alt=""
                  className="w-15 h-10"
                />
              )}
              <select
                name="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="overflow-hidden p-2 w-full focus: outline-none font-bold"
              >
                <option value="">--Select Country--</option>
                {CountryData.map((country, idx) => (
                  <option
                    value={country.CurrencyCode + " " + country.CountryCode}
                    key={idx}
                  >
                    {country.CountryName}
                  </option>
                ))}
              </select>
            </div>

            {/* SWAP BUTTON */}
            <div className=" absolute translate-x-66">
              <button
                className="font-bold text-2xl cursor-pointer hover:scale-150"
                onClick={swap}
              >
                <AiOutlineSwap />
              </button>
            </div>

            {/*Converted Amount*/}

            <div className="flex gap-3 border rounded px-2 bg-gray-100">
              {to && (
                <img
                  src={`https://flagsapi.com/${to.split(" ")[1]}/flat/64.png`}
                  alt=""
                  className="w-15 h-10"
                />
              )}
              <select
                name="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="overflow-hidden p-2 w-full focus: outline-none font-bold"
              >
                <option value="">--Select Country--</option>
                {CountryData.map((country, idx) => (
                  <option
                    value={country.CurrencyCode + " " + country.CountryCode}
                    key={idx}
                  >
                    {country.CountryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Enter Amount to Convert */}

          <div className="flex gap-3 items-center ">
            <label htmlFor="fromAmt" className=" font-medium text-2xl">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              value={fromAmt}
              onChange={(e) => setFromAmt(e.target.value)}
              placeholder="Enter the Amount to be Convert"
              className="border rounded px-3 py-1 w-full bg-gray-100"
            />
          </div>
          {/* Button */}

          <div className="grid grid-cols-2 gap-5">
            <button
              className="bg-green-300 text-green-950 hover:bg-green-600 hover:text-white px-3 py-2 border rounded hover:shadow-md w-full cursor-pointer font-bold hover:scale-99 hover:duration-300 duration-300 scale-100"
              onClick={Convert}
            >
              Convert Amount
            </button>
            <button
              className="bg-red-300 text-red-950 hover:bg-red-600 hover:text-white px-3 py-2 border rounded hover:shadow-md w-full cursor-pointer font-bold hover:scale-99 hover:duration-300 duration-300 scale-100"
              onClick={ClearAmt}
            >
              Clear All
            </button>
          </div>

          <div className="border border-blue-800" />

          {/* Converted Amount to print */}

          <div className="flex gap-3 items-center">
            <label htmlFor="toAmt">
              <span className="text-2xl font-medium">Converted Amount : </span>
              <span className="text-[22px] ps-5">
                {toAmt ? Number(toAmt).toFixed(2) : ""}
              </span>
              <span className="ps-3 text-xs">{to.split(" ")[0]}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Currency;
