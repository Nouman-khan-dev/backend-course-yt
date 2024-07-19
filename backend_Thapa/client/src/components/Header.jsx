import React from "react";

export default function Header() {
  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Register",
      link: "register",
    },
    {
      name: "Login",
      link: "login",
    },
  ];
  return (
    <div>
      <div className="w-ful flex gap-5 list-none">
        {links.map((item) => (
          <Link href={"/" + item.link}>{item.name}</Link>
        ))}
      </div>
    </div>
  );
}
