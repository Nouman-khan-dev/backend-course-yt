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
        <h1 className="text-center text-3xl font-bold">Services</h1>
        <div className="my-4 border-black border-t-2 flex flex-wrap justify-center gap-y-7 gap-x-4">
          {services.map((item) => (
            <article className="min-w-[300px] text-left max-w-[350px] basis[350px] flex-1 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25">
              <div className="rounded-[10px] bg-white px-4 !p-8 sm:p-6 dark:bg-gray-900 min-h-full">
                <h3 className="mt-0.5 text-xl font-bold text-gray-900 dark:text-white">
                  {item.service}
                </h3>
                <h2 className="mt-0.5 font-medium text-gray-900 dark:text-gray-300">
                  {item.description}
                </h2>

                <div className="mt-4 flex flex-wrap gap-1">
                  <span className="whitespace-nowrap text-xl font-semibold rounded-xl bg-purple-100 px-2.5 py-0.5  text-purple-600">
                    <span className="text-gray-500">Provider:</span>{" "}
                    {item.provider}
                  </span>
                </div>
                <div className="mt-3 text-left">
                  <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
                    <span className="text-white">Price:</span>{" "}
                    {item.price} $
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
