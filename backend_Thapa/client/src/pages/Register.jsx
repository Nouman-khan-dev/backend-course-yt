import { useState } from "react";

function Register() {
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
    console.log(userData);
  };

  return (
    <div>
      <h1>Register</h1>
      {/* form  */}
      <form
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
