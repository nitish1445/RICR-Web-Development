import React, { useState } from "react";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClearForm = () => {
    setFullName("");
    setEmail("");
    setUserName("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      setTimeout(() => {
        const data = {
          fullName,
          email,
          userName,
          password,
          confirmPassword,
        };
        console.log(data);
      }, 5000);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
    handleClearForm();
  };
  return (
    <>
      <div className="flex justify-center mt-25">
        <div className="mb-5 border-2 border-[green] rounded flex flex-col gap-4 w-[50%] p-3">
          <h1 className="text-3xl text-center font-bold text-[red]">
            Signup Now
          </h1>

          <form onSubmit={handleLogin} onReset={handleClearForm}>
            <div className="flex my-2">
              <label
                htmlFor="fullName"
                className="text-[20px] font-bold text-black w-[25%]"
              >
                Full Name :
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="border rounded w-[75%] px-3"
                placeholder="Enter your your full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="flex my-2">
              <label
                htmlFor="email"
                className="text-[20px] font-bold text-black w-[25%]"
              >
                Email :
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border rounded w-[75%] px-3"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex my-2">
              <label
                htmlFor="userName"
                className="text-[20px] font-bold text-black w-[25%]"
              >
                User Name :
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                className="border rounded w-[75%] px-3"
                placeholder="Create user name"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex my-2">
              <label
                htmlFor="password"
                className="text-[20px] font-bold text-black w-[25%]"
              >
                Password :
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="border rounded w-[75%] px-3"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex my-2">
              <label
                htmlFor="confirmPassword"
                className="text-[20px] font-bold text-black w-[25%]"
              >
                Confirm Password :
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="border rounded w-[75%] px-3"
                placeholder="Confirm your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="text-center pt-2">
              <button
                type="submit"
                className="border-2 rounded-xl py-1 px-2 text-[18px] font-bold text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white hover:rounded-xl"
              >
                {isLoading ? "Loading..!!" : "Signup Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
