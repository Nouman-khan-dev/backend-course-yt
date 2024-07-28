import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function UpdateUser() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  // -------------------------------------
  // -- toastify
  // -------------------------------------
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
  const showSuccessToast = (message) =>
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

  // ====================================
  // -- Handling input
  // ====================================
  const getUserDataFromDb = async (id) => {
    const URL = `http://localhost:3000/api/admin/users/${id}`;
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonRes = await response.json();

      if (response.ok) {
        const data = jsonRes.user;
        setUserData({
          ...userData,
          email: data.email,
          username: data.username,
          phone: data.phone,
          isAdmin: data.isAdmin,
        });
      }
    } catch (error) {
      console.log(
        "error while getting user data for update :",
        error
      );
      showErrorToast("Something went wrong");
    }
  };
  // calling getUserDataFromDb
  useEffect(() => {
    getUserDataFromDb(id);
  }, []);
  // ====================================
  // -- update User, function
  // ====================================

  const updateUser = async (e, id) => {
    e.preventDefault();
    const URL = `http://localhost:3000/api/admin/users/${id}/update`;

    if (!id) return console.log("no Id found");

    try {
      const response = await fetch(URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("user updated successfully");
        showSuccessToast("Updated successfuly");
        navigate("/admin/users");
      } else {
        console.log(
          "error while updating user",
          await response.json()
        );
        showErrorToast("Could not delete user");
      }
    } catch (error) {
      console.log("Error While updating the User :", error);
    }
  };

  // ====================================
  // -- Handling input
  // ====================================
  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="w-full h-full">
        <div className="flex flex-col items-center justify-center h-full">
          <section className="max-w-4xl w-[80%] p-6 mx-auto bg-white rounded-md shadow-d shadow-gray-700 dark:bg-gray-800 my-8">
            <h2 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
              User Account settings
            </h2>

            <form onSubmit={(e) => updateUser(e, id)}>
              <div className="grid grid-cols-1 gap-6 mt-4 text-lg text-left">
                <div className="">
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="username">
                    Username
                  </label>
                  <input
                    value={userData.username}
                    onChange={(e) => handleInput(e)}
                    name="username"
                    id="username"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="emailAddress">
                    Email Address
                  </label>
                  <input
                    value={userData.email}
                    onChange={(e) => handleInput(e)}
                    name="email"
                    id="emailAddress"
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div className="">
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="password">
                    Phone
                  </label>
                  <input
                    value={userData.phone}
                    onChange={(e) => handleInput(e)}
                    name="phone"
                    id="phone"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div className="">
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="admin">
                    Admin
                  </label>
                  <select
                    value={userData.isAdmin}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        isAdmin:
                          e.target.value === "false" ? false : true,
                      })
                    }
                    id="admin"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg
                  white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark
                  :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring
                  -opacity-40 dark:focus:border-blue-300 focus:outline-none ">
                    <option className="py-3" value="false">
                      No
                    </option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>

              <div className="mt-9 text-lg">
                <button
                  type="submit"
                  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-cyan-800 rounded-md hover:bg-cyan-700 focus:outline-none focus:bg-gray-600">
                  Update
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
