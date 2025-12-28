import React, { useState } from "react";

const Contact = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleClearForm = () => {
    setFullName("");
    setEmail("");
    setMessage("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const respone = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      const data = {
        fullName,
        email,
        message,
      };
      console.log(data);
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
        <div className="container border border-2 border-info rounded py-3 w-50">
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-75"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="w-25">
                Message :
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Enter your message here..!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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

export default Contact;
