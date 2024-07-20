import { useState } from "react";

function Register() {
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

  return (
    <div>
      <h1>Login</h1>
      {/* form  */}
      <form
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
            type="email"
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
