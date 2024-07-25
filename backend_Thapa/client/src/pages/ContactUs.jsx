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
      return showErrorToast("fill the input properly");
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
    <div className="p-4">
      <h3 className="text-3xl font-bold">Contact Us</h3>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="name">name</label>
          <input
            value={contactData.username}
            onChange={handleInput}
            autoComplete="off"
            type="name"
            name="name"
            placeholder="name"
            id="name"
          />
        </div>
        <div className="">
          <label htmlFor="email">email</label>
          <input
            value={contactData.email}
            onChange={handleInput}
            autoComplete="off"
            type="email"
            name="email"
            placeholder="email"
            id="email"
          />
        </div>
        <div className="">
          <label htmlFor="message">message</label>
          <textarea
            className="w-full p-2"
            value={contactData.message}
            onChange={handleInput}
            autoComplete="off"
            type="message"
            name="message"
            placeholder="message"
            id="message"
          />
        </div>

        <button type="submit" className="w-30">
          Submit
        </button>
      </form>
    </div>
  );
}
