import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    monileNumber: "",
    dob: "",
    qualification: "",
    score: "",
    course: "",
    batch: "",
    address: "",
    city: "",
    pinCode: "",
    guardianName: "",
    guardianContact: "",
    coachingInfo: "",
  });
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      dateOfBirth: "",
      lastQualification: "",
      percentageGrade: "",
      preferredCourse: "",
      batchTiming: "",
      residentialAddress: "",
      city: "",
      pinCode: "",
      guardianName: "",
      guardianContact: "",
      hearAboutUs: "",
      specialRequirements: "",
    });
  };
  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name should be More Than 3 Characters";
    } else {
      if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
        Error.fullName = "Only Contain A-Z , a-z and space";
      }
    }

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Only Indian Mobile Number allowed";
    }

    setValidationError(Error);

    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Fill the Form Correctly");
      return;
    }

    try {
      console.log(formData);
      toast.success("Regisrtation Successfull");
      handleClearForm();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="bg-amber-50 py-2 px-70">
        {/* Header */}

        <div className="text-center pb-2">
          <h1 className="text-gray-900 mb-1">Student Registration</h1>
          <p className="text-lg text-gray-600">
            Join our academy and start your learning journey
          </p>
        </div>
        {/* Form Container */}
        <form onSubmit={handleSubmit} onReset={handleClearForm}>
          <div className=" container border-2 border-blue-100 rounded shadow bg-white">
            {/* Personal Information */}

            <div className="mt-4 flex flex-col px-5 ">
              <h3>Personal Information</h3>
              <div className=" border border-e-black rounded shadow p-3 ">
                <div className="flex gap-4 px-2">
                  <label htmlFor="fullName" className="w-60 gap-3">
                    Full Name :
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  />
                  {validationError.fullName && (
                    <span className="text-xs text-red-500">
                      {validationError.fullName}
                    </span>
                  )}
                </div>
                <div className="mx-2 flex gap-4 pt-3">
                  <label htmlFor="email" className="gap-3 w-60">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  />
                </div>
                <div className="mx-2 flex gap-4 pt-3">
                  <label htmlFor="mobileNumber" className="gap-3 w-60 ">
                    Mob No. :
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    id="mobileNumber"
                    placeholder="Enter your mobile number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  />
                </div>
                <div className="mx-2 flex gap-4 pt-3 ">
                  <label htmlFor="D.O.B" className="gap-3 w-60">
                    D. O. B. :
                  </label>
                  <input
                    type="date"
                    name="Dob"
                    id="Dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  />
                </div>
              </div>
            </div>

            {/* Academic Details */}

            <div className="mt-4 flex flex-col px-5 ">
              <h3 className=" text-blue-500">Academic Details</h3>
              <div className="border border-e-black rounded shadow p-3">
                <div className="px-2 flex gap-4 pt-3 ">
                  <label htmlFor="qualification" className="">
                    Qualifications :
                  </label>
                  <select
                    name="qualification"
                    id="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  >
                    <option value="">--Select Qualification--</option>
                    <option value="10">High School</option>
                    <option value="12">Seconday School</option>
                    <option value="UG">Graduation</option>
                    <option value="PG">Post Graduation</option>
                    <option value="PHD">Phd</option>
                  </select>
                </div>
                <div className="mx-2 flex gap-4 pt-3 ">
                  <label htmlFor="score" className="gap-3 w-60">
                    Grade :
                  </label>
                  <input
                    type="text"
                    name="score"
                    id="score"
                    placeholder="Enter your grade in percentages"
                    value={formData.score}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  />
                </div>
              </div>
            </div>

            {/* course Information */}
            <div className="mt-4 flex flex-col px-5 ">
              <h3 className=" text-blue-500">Course Information</h3>
              <div className="border border-e-black rounded shadow p-3 ">
                <div className="mx-2 flex gap-4 pt-3 ">
                  <label htmlFor="course" className="gap-3 w-60">
                    Available Courses :
                  </label>
                  <select
                    name="course"
                    id="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  >
                    <option value="">--Select Course--</option>
                    <option value="FSD">Full Stack Development</option>
                    <option value="DS">Data Science</option>
                    <option value="DA">Data Analytics</option>
                    <option value="J-DSA">Java DSA</option>
                    <option value="P-DSA">Python DSA</option>
                  </select>
                </div>

                <div className="mx-2 flex gap-5 pt-3 ">
                  <label htmlFor="batch" className="">
                    Perfered Batch :
                  </label>
                  <div className="flex gap-3 cursor">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name="batch"
                        id="morning"
                        value="morning"
                        className=" cursor-pointer"
                      />
                      <span>Morning</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name="batch"
                        id="afternoon"
                        value="afternoon"
                        className=" cursor-pointer"
                      />
                      <span>Afternoon</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name="batch"
                        id="evening"
                        value="evening"
                        className=" cursor-pointer"
                      />
                      <span>Evening</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        name="batch"
                        id="weekends"
                        value="weekends"
                        className=" cursor-pointer"
                      />
                      <span>Weekends</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mt-4 flex flex-col px-5 ">
              <h3 className=" text-blue-500">Address</h3>
              <div className="border border-e-black rounded shadow p-3">
                <div className="mx-2 flex  gap-4 pt-3 ">
                  <label htmlFor="address" className="gap-3 w-60 ">
                    Residental :
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Street/Village/Mohalla/Colony"
                    value={formData.address}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  />
                </div>
                <div className="mx-2 flex  gap-4 pt-3 ">
                  <label htmlFor="city" className="gap-3 w-60">
                    City :
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="city/town/area"
                    value={formData.city}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  />
                </div>
                <div className="mx-2 flex  gap-4 pt-3 ">
                  <label htmlFor="Pincode" className="gap-3 w-60">
                    Pin Code:
                  </label>
                  <input
                    type="tel"
                    name="pinCode"
                    id="pinCode"
                    placeholder="Enter six digit code"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  />
                </div>
              </div>
            </div>

            {/* Graduation Details */}
            <div className="mt-4 flex flex-col px-5 ">
              <h3 className=" text-blue-500">Graduation Details</h3>
              <div className="border border-e-black rounded  shadow p-3">
                <div className="mx-2 flex  gap-4 pt-3 ">
                  <label htmlFor="graduationName" className="gap-3 w-60">
                    Graduation :
                  </label>
                  <input
                    type="text"
                    name="graduationName"
                    id="graduationName"
                    placeholder="Degree details"
                    value={formData.guardianName}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  />
                </div>
                <div className="mx-2 flex  gap-4 pt-3 ">
                  <label htmlFor="graduationNumber" className="gap-3 w-60">
                    Grade:
                  </label>
                  <input
                    type="text"
                    name="graduationNumber"
                    id="graduationNumber"
                    value={formData.guardianContact}
                    onChange={handleChange}
                    placeholder="Grades in CGPA"
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs w-7xl"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-4 flex flex-col px-5 ">
              <h3 className="text-blue-500">Additional Information</h3>
              <div className="border border-e-black rounded shadow p-3 ">
                <div className="mx-2 pt-3 grid grid-cols-2">
                  <label htmlFor="coachingInfo" className="">
                    How did you hear about us ? :
                  </label>
                  <select
                    name="coachingInfo"
                    id="coachingInfo"
                    value={formData.coachingInfo}
                    onChange={handleChange}
                    className="px-3 py-1 font-medium border border-gray-300 rounded shadow-2xs"
                  >
                    <option value="">--Select--</option>
                    <option value="Friend">Friends</option>
                    <option value="ads">Online Ads</option>
                    <option value="newspaper">Newspaper</option>
                    <option value="socialMedia">Social Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Button */}

            <div className="text-center text-[18px] font-bold mt-4 border-t-2 border-gray-200 p-3">
              <button
                // className="border-2 border-[#07a60b] rounded px-4 py-1.5 text-[#07a60b] hover:bg-[#07a60b] hover:text-white"
                className="bg-linear-to-r from-indigo-600 to-indigo-700 text-white py-2 px-10 border rounded hover:from-indigo-700 hover:to-indigo-800 transition duration-300 transform hover:scale-105 shadow-lg"
                type="submit"
              >
                Submit Registration
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}

        <div className="mt-3 text-center">
          <p>All fields marked are mandatory. We respect your privacy.</p>
        </div>
      </div>
    </>
  );
};

export default Register;
