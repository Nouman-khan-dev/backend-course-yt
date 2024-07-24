import React, { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const URL = "http://localhost:3000/api/services";

  const getServicesData = async () => {
    if (services.length === 0) {
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("200 success, response: ", data);
          setServices(await data.services);
          console.log("services:", services);
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
        <div className="my-4 border-black border-t-2">
          {services.map((item) => (
            <div className="m-4 ">{item.provider}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
