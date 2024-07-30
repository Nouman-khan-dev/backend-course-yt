import React, { useEffect, useState } from "react";
import { useAuthToken } from "../../contexts/context";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Loading from "../../pages/Loading";
// ***************************************************
// ***************************************************
// there's one issue admin can delte himself,
// and the IsLogedIn state does'nt change
// ***************************************************
// ***************************************************

export default function AdminUsers() {
  const [users, setUsers] = useState(null);
  const { user } = useAuthToken();
  const logedInUser = user?.email;
  const [isLoading, setIsLoading] = useState(false);

  //  -----------------------------------------
  // toastify
  //  -----------------------------------------
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

  // -------------------------------------
  // --- Fetching data from database
  // -------------------------------------
  //
  const { token } = useAuthToken();
  const getAllData = async () => {
    const URL = "http://localhost:3000/api/admin/users";
    if (users) return;
    if (!token || token === "undefined")
      return console.log("no token");
    try {
      setIsLoading(true);
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        // sorting data to frst value will be the admin
        const allAdmins = data.data.filter(
          (user) => user.isAdmin === true
        );
        const allUsers = data.data.filter(
          (user) => user.isAdmin !== true
        );

        setUsers([...allAdmins, ...allUsers]);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log(data.message);
        showErrorToast(data.message);
      }
    } catch (error) {
      console.error(error);
      console.log("error while fetching all users in admin pane");
      showErrorToast("Something went wrong");
    }
  };
  // calling our GetAllData in a useEffect
  useEffect(() => getAllData, []);
  // -------------------------------------
  // --- Delete User, function
  // -------------------------------------

  const deleteUser = async (id) => {
    const URL = `http://localhost:3000/api/admin/users/delete/${id}`;

    if (!id) return console.log("no Id found");

    try {
      setIsLoading(true);
      const response = await fetch(URL, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== id));
        showSuccessToast("Deleted successfully");
      } else {
        showErrorToast("Could not deleted user");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error While Deleting the User :", error);
      showErrorToast("Could not deleted user");
    }
  };

  useEffect(() => {
    setIsLoading(!users ? true : false);
  }, [users]);

  if (isLoading) {
    return <Loading />;
  } else
    return (
      <div className="text-white text-3xl h-full">
        <div className="overflow-x-auto h-full">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
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
                {/* <th className="px-4 py-2"></th> */}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users?.map((user, index) => (
                <tr
                  key={index}
                  className={`${user.isAdmin ? "bg-gray-800 " : ""} ${
                    user.email === logedInUser ? "bg-zinc-700" : ""
                  }`}>
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
                        Admin{" "}
                        {user.email === logedInUser ? "(YOU)" : ""}
                      </span>
                    ) : (
                      "User"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <Link to={`${user._id}/edit`}>
                      {" "}
                      <button
                        id={index}
                        className="inline-block rounded bg-sky-900 px-2 w-14 py-2 text-xs font-medium text-white hover:bg-sky-800">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <button
                      disabled={
                        user.email === logedInUser ? true : false
                      }
                      onClick={() => deleteUser(user._id)}
                      className={`inline-block rounded ${
                        user.email === logedInUser
                          ? "cursor-not-allowed text-gray-400 bg-gray-700 hover:bg-gray-700"
                          : "text-red-100"
                      } bg-[#f0f0f053] px-4 py-2 text-xs font-medium text-gray-100 hover:bg-gray-600`}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
