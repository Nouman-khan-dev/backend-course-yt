import React from "react";
import { Link } from "react-router-dom";

export default function SideMenu() {
  return (
    <div>
      <div className="flex h-[calc(100vh-67px)] flex-col justify-between border-e ">
        <div className="px-2 py-2">
          <div className="w-full h-10 text-xl border-b-2 border-gray-300 text-gray-5000">
            Admin
          </div>

          <ul className="mt-6 ">
            <li className="my-4">
              <Link
                to="users"
                className="block hover:bg-gray-500 rounded-lg text-left bg-gray-600 px-4 py-2 text-lg font-medium text-gray-100">
                Users
              </Link>
            </li>

            <li className="my-4">
              <Link
                to="contacts"
                className="block hover:bg-gray-500 rounded-lg text-left bg-gray-600 px-4 py-2 text-lg font-medium text-gray-100">
                Contacts
              </Link>
            </li>

            <li className="my-4">
              <Link
                to="contacts"
                className="block hover:bg-gray-500 rounded-lg text-left bg-gray-600 px-4 py-2 text-lg font-medium text-gray-100">
                General
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
