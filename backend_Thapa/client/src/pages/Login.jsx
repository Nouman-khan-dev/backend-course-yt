import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../contexts/context";

function Register() {
  const { storeTokenInLS, token } = useAuthToken();

  const Navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

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

      storeTokenInLS(jsonResponse.token);

      console.log("submitt successfully : ", jsonResponse);

      if (response.ok) {
        Navigate("/");
      } else if (!response.ok) {
        alert(jsonResponse.message);
      }
    } catch (error) {
      console.log("the Error: ", error);

      throw error;
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {/* form  */}
      <form
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
      </form>
    </div>
  );
}

export default Register;
