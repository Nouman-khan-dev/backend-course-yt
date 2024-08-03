import React, { useState } from "react";
import { useAuthToken } from "../contexts/context";
import { Bounce, toast } from "react-toastify";
export default function ContactUs() {
  const [isUserData, setIsUserData] = useState(true);
  const [contactData, setContactData] = useState({
    username: "",
    email: "",
    message: "",
  });

  //  Toastify
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
  const notify = (message) =>
    toast.success(message, {
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

  const isEmpty = Object.values(contactData).every(
    (value) => value !== ""
  );

  const { user } = useAuthToken();
  if (isUserData && user) {
    setContactData({
      username: user.username,
      email: user.email,
      message: "",
    });
    setIsUserData(false);
  }
  //  handle input
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };
  //  handle submit
  const handleSubmit = async (e) => {
    const URL = "http://localhost:3000/api/contact/form";
    e.preventDefault();
    if (!isEmpty) {
      return showErrorToast("fill all the inputs properly");
    }
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });
      const jsonResponse = await response.json();
      if (response.ok) {
        notify(jsonResponse.message);
        setContactData({ ...contactData, message: "" });
      } else {
        showErrorToast(jsonResponse.extraDetails);
      }
    } catch (error) {
      console.log("Error while sending message data", error);
    }
  };
  return (
    <section className="bg-white h-[calc(100vh-65px)] dark:bg-gray-800 border border-gray-900">
      <div className="py-1 lg:py-1 px-4 mx-auto max-w-screen-md">
        <h2 className="my-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-4 lg:mb-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback? Need details
          about our Business plan? Let us know.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your name
            </label>
            <input
              value={contactData.username}
              onChange={handleInput}
              autoComplete="off"
              name="username"
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="john doe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Your email
            </label>
            <input
              value={contactData.email}
              onChange={handleInput}
              autoComplete="off"
              name="email"
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Your message
            </label>
            <textarea
              value={contactData.message}
              onChange={handleInput}
              autoComplete="off"
              name="message"
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
