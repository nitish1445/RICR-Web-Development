import React, { useState } from "react";

const ContactBox = () => {
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    message: "",
    religion: "",
    skill:""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let temp = contactData.skill;
      if (checked) {
        temp.push(value);
        setContactData((previousData) => ({ ...previousData, [name]: temp }));
      } else {
        temp = Object.values(temp); //Convert to Array
        temp = temp.filter((word) => word !== value); //Remove the Undersired Value
        setContactData((previousData) => ({ ...previousData, [name]: temp }));
      }
    } else {
      setContactData((previousData) => ({ ...previousData, [name]: value }));
    }
  };

  const handleClearForm = () => {
    setContactData({
      fullName: "",
      email: "",
      message: "",
      religion: "",
      skill:"",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(contactData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
    handleClearForm();
  };

  return (
    <>
      <div className=" text-center py-3">
        <h1>Contact Form</h1>
        <div className="container border border-info rounded py-3 w-50">
          <form
            onReset={handleClearForm}
            onSubmit={handleSubmit}
            className=" d-flex flex-column gap-2"
          >
            <div className="">
              <label htmlFor="fullName" className="w-25">
                Full Name :
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter your full name"
                onChange={handleChange}
                value={contactData.fullName}
                className="w-75"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="w-25">
                Email :
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={contactData.email}
                className="w-75"
                required
              />
            </div>
            <div>
              <label htmlFor="religion" className="w-25">
                Religion :
              </label>
              <select
                name="religion"
                id="religion"
                className="w-75"
                onChange={handleSubmit}
                value={contactData.religion}
              >
                <option value="">--Select Religion--</option>
                <option value="hindu">Hinduism</option>
                <option value="muslim">Muslim</option>
                <option value="christian">Christianity</option>
                <option value="buddhism">Buddhism</option>
                <option value="jain">Jainism</option>
                <option value="sikh">Sikhism</option>
                <option value="other">Others</option>
              </select>
            </div>
            <div className="d-flex justify-content-between">
              <label htmlFor="gender">Gender : </label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
                checked={contactData.gender === "male"}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={contactData.gender === "female"}
              />{" "}
              Female
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={handleChange}
                checked={contactData.gender === "other"}
              />{" "}
              Other
            </div>
            <div>
              <label htmlFor="skill">Skill : </label>
              <input
                type="checkbox"
                name="skill"
                value="html"
                onChange={handleChange}
                checked={
                  Object.values(contactData.skill).find(
                    (word) => word === "html"
                  )
                    ? true
                    : false
                }
              />{" "}
              <span>HTML</span>
              <input
                type="checkbox"
                name="skill"
                value="css"
                onChange={handleChange}
                checked={
                  Object.values(contactData.skill).find(
                    (word) => word === "css"
                  )
                    ? true
                    : false
                }
              />{" "}
              CSS
              <input
                type="checkbox"
                name="skill"
                value="js"
                onChange={handleChange}
                checked={
                  Object.values(contactData.skill).find((word) => word === "js")
                    ? true
                    : false
                }
              />{" "}
              JS
              <input
                type="checkbox"
                name="skill"
                value="react"
                onChange={handleChange}
                checked={Object.values(contactData.skill).includes("react")}
              />{" "}
              React
            </div>
            <div>
              <label htmlFor="message" className="w-25">
                Message :
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Enter your message here..!"
                onChange={handleChange}
                value={contactData.message}
                className="w-75"
                required
              ></textarea>
            </div>
            <div className="d-flex gap-2 justify-content-center py-3">
              <button type="reset" className="btn btn-outline-danger px-4">
                Clear Form
              </button>
              <button type="submit" className="btn btn-outline-primary px-4">
                {isLoading ? "Loading..!!" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactBox;
