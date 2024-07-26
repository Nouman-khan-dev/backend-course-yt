import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../contexts/context";
import { Bounce, toast } from "react-toastify";

function Register() {
  let {
    storeTokenInLS,
    token,
    isLogedIn,
    setIsLogedIn,
    removeTokenFromLS,
  } = useAuthToken();

  const Navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // ============================================
  const showErrorToast = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  const notify = (text) =>
    toast.success(text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  // ============================================

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // here is a tip for dynomic value update in an object
    setUserData({ ...userData, [name]: value });
  };

  const URL = "http://localhost:3000/api/auth/login";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const jsonResponse = await response.json();

      if (response.ok) {
        notify("Login successfull");
        storeTokenInLS(jsonResponse.token);
        token = jsonResponse.token;
        setIsLogedIn(!!token);
        // window.location.redirect("/");
        document.location.href = "/";
      } else if (!response.ok) {
        const errordetails = await jsonResponse.extraDetails;
        const errorMsg = await jsonResponse.message;
        const finalError = errordetails
          ? errordetails
          : errorMsg
          ? errorMsg
          : "Fill all the input properly";
        showErrorToast(finalError);
      }
    } catch (error) {
      console.log("the Error: ", error);

      throw error;
    }
  };

  return (
    <div>
      <h1 className="my-6 text-6xl font-bold text-gray-50">Login</h1>
      {/* form  */}
      {/* <form
        onSubmit={handleSubmit}
        className="form gap-5"
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "",
        }}>
        <div className="">
          <label htmlFor="email">email</label>
          <input
            value={userData.email}
            onChange={handleInput}
            autoComplete="off"
            type="text"
            name="email"
            placeholder="email"
            id="email"
          />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            value={userData.password}
            onChange={handleInput}
            autoComplete="off"
            type="password"
            name="password"
            placeholder="password"
            id="password"
          />
        </div>
        <button type="submit" className="w-30">
          Submit
        </button>
      </form> */}
      {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}
      <div className="flex justify-center">
        <div className="mx-auto max-w-screen-xl px-2 py-16 sm:px-2 lg:px-8 border-2 border-gray-200 rounded-2xl">
          <div className="mx-auto max-w-lg text-center ">
            <h1 className="text-2xl font-bold sm:text-3xl text-gray-100">
              Get started today!
            </h1>

            <p className="mt-4 text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Et libero nulla eaque error neque ipsa culpa autem, at
              itaque nostrum!
            </p>
          </div>

          <form
            action="#"
            className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative ">
                <input
                  type="email"
                  className="w-full rounded-lg bg-gray-900 text-gray-100 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg  bg-gray-900 text-gray-100 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-200">
                No account?
                <a className="underline  ml-2" href="#">
                  Sign up
                </a>
              </p>

              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
