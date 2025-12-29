import React, { useState } from "react";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClearForm = () => {
    setUserName("");
    setPassword("");
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
          userName,
          password,
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
          <h1 className="text-3xl text-center font-bold text-black">
            <span id="spanText">Lo</span>gin
          </h1>

          <form onSubmit={handleLogin} onReset={handleClearForm}>
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
                placeholder="Enter your user name"
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
            <div className="text-center pt-2">
              <button
                type="submit"
                className="border-2 rounded py-1 px-4 text-[18px] font-bold text-blue-800 cursor-pointer hover:bg-[blue] hover:text-white hover:rounded"
              >
                {isLoading ? "Loading..!!" : "Login Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
