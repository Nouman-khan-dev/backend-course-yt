import React, { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const URL = "http://localhost:3000/api/services";

  const getServicesData = async () => {
    if (services.length === 0) {
      try {
        const response = await fetch(URL, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setServices(await data.services);
        } else {
          console.log("error: services data not found");
        }
      } catch (error) {
        console.log("Error while fetching Services Data!");
      }
    }
  };

  useEffect(() => getServicesData, []);

  return (
    <div>
      {" "}
      <div className="min-w-screen">
        <h1 className="text-center text-4xl  py-4 font-bold text-white">
          Services
        </h1>
        <div className="my-4 border-black flex flex-wrap justify-center gap-y-7 gap-x-4">
          {services.map((item) => (
            <div
              key={item._id}
              className="max-w-sm p-6 bg-white border flex-grow border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.service}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.description}
              </p>
              <p className="mb-3 font-semibold   dark:text-gray-200">
                <span>Provider:</span> {item.provider}
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
