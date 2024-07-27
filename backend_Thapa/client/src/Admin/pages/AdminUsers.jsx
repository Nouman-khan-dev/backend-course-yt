import React, { useEffect, useState } from "react";
import { useAuthToken } from "../../contexts/context";

export default function AdminUsers() {
  const [users, setUsers] = useState(null);

  // -------------------------------------
  // --- Fetching data from data base
  // -------------------------------------
  //
  const { token } = useAuthToken();
  const getAllData = async () => {
    console.log("users:::", users);
    const URL = "http://localhost:3000/api/admin/users";
    if (users) return console.log("users: ", users);
    if (!token || token === "undefined")
      return console.log("no token");

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(response);
    if (response.ok) {
      // sorting data to frst value will be the admin
      const allAdmins = data.data.filter(
        (user) => user.isAdmin === true
      );
      const allUsers = data.data.filter(
        (user) => user.isAdmin !== true
      );

      setUsers([...allAdmins, ...allUsers]);
    } else {
      console.log(data.message);
    }
    try {
    } catch (error) {
      console.error(error);
      console.log("error while fetching all users in admin pane");
    }
    console.log("user sorted users", users);
  };
  // calling our GetAllData in a useEffect
  useEffect(() => getAllData, []);
  // -------------------------------------
  // --- Delete User function
  // -------------------------------------

  const delelteUser = async (token) => {
    const URL = "http://localhost:3000/api/admin/users";
  };

  return (
    <div className="text-white text-3xl h-full">
      <div className="overflow-x-auto h-full">
        <table className="min-w-full  h-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
          <thead className="ltr:text-left rtl:text-right text-[18px] ">
            <tr>
              <th className="whitespace-nowrap px-4 py-5 font-medium text-gray-900 dark:text-white">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-5 font-medium text-gray-900 dark:text-white">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-5 font-medium text-gray-900 dark:text-white">
                Phone
              </th>
              <th className="whitespace-nowrap px-4 py-5 font-medium text-gray-900 dark:text-white">
                Role
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 overflow-x-auto dark:divide-gray-700">
            {users?.map((user, index) => (
              <tr
                key={index}
                className={`${user.isAdmin ? "bg-gray-800 " : ""}`}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  {user.username}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                  {user.phone}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                  {user.isAdmin === true ? (
                    <span className="font-bold text-white">
                      Admin
                    </span>
                  ) : (
                    "User"
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
