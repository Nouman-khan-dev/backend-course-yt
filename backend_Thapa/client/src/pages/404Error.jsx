import React from "react";

export default function Error() {
  return (
    <div className="min-w-screen min-h-[calc(100%-100px)] grid items-center text-7xl font-bold">
      <h1 className="text-red-500">404</h1>
      <p>page not found</p>
    </div>
  );
}
