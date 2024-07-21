import React from "react";
import { Link, NavLink } from "react-router-dom";
export default function Header() {
  const links = [
    {
      name: "Home",
      link: "",
    },
    {
      name: "Register",
      link: "register",
    },
    {
      name: "Login",
      link: "login",
    },
    {
      name: "Contact Us",
      link: "contactus",
    },
    {
      name: "Logout",
      link: "logout",
    },
  ];
  return (
    <div className="py-3 px-4 text-2xl">
      <div className="w-ful flex gap-5 list-none text-white">
        {links.map((item) => (
          <Link key={item.name} to={"/" + item.link}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
