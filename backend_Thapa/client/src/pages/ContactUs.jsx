import React, { useState } from "react";
import { useAuthToken } from "../contexts/context";

export default function ContactUs() {
  const [isUserData, setIsUserData] = useState(true);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { user } = useAuthToken();

  if (isUserData && user) {
    setContactData({
      name: user.username,
      email: user.email,
      message: "",
    });
    setIsUserData(false);
  }
  console.log("user in contact", user);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContactData((prev) => ({ ...prev, [name]: value }));
    console.log(contactData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message Sent");
  };
  return (
    <div className="p-4">
      <h3 className="text-3xl font-bold">Contact Us</h3>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="name">name</label>
          <input
            value={contactData.name}
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
