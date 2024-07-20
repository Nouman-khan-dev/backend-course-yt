import { useState } from "react";
import { Navigate } from "react-router-dom";

function Register() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // here is a tip for dynomic value update in an object
    setUserData({ ...userData, [name]: value });
    // console.log(userData);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        setUserData({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        alert("User created successfully");
        setAuthenticated(true);
      }
      console.log("form submitted: response: ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  if (authenticated) {
    <Navigate to="/" />;
  } else
    return (
      <div>
        <h1>Register</h1>
        {/* form  */}
        <form
          onSubmit={handelSubmit}
          className="form"
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "",
          }}>
          <label htmlFor="username">Username</label>
          <input
            value={userData.username}
            onChange={handleInput}
            autoComplete="off"
            type="text"
            name="username"
            placeholder="username"
            id="username"
          />
          <label htmlFor="email">email</label>
          <input
            value={userData.email}
            onChange={handleInput}
            autoComplete="off"
            type="email"
            name="email"
            placeholder="email"
            id="email"
          />
          <label htmlFor="phone">Phone</label>
          <input
            value={userData.phone}
            onChange={handleInput}
            autoComplete="off"
            type="phone"
            name="phone"
            placeholder="phone"
            id="phone"
          />
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
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default Register;
