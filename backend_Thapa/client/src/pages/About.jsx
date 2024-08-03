import React from "react";

export default function About() {
  return (
    <div>
      <div className="bg-gray-800">
        <header className="bg-cyan-0 text-white text-center py-12">
          <h1 className="text-4xl font-bold mt-16">About Us</h1>
        </header>

        <section className="text-center text-gray-100 py-12 px-4 bg-gray-700">
          <h2 className="text-2xl font-bold">
            Hello, I am Nouman khan
          </h2>
          <p className="mt-4 text-xl text-gray-200 text-center max-w-2xl mx-auto">
            Welcome to my website! I'm an aspiring full-stack web
            developer, passionate about crafting innovative digital
            experiences. Currently working with Mongodb, Express.js,
            Node.js, and React.js.
          </p>
        </section>

        <section className="bg-gray-800 py-12 px-4">
          <div className="my-8 border-b boder-b-gray-300 pb-3">
            <h2 className="text-3xl font-bold text-center text-white">
              About this website
            </h2>
            <p className="mt-4 text-xl text-gray-200 text-center max-w-2xl mx-auto">
              I created this website as my very first mern stack
              backend project
            </p>
          </div>
          <h3 className="text-left pl-5  text-2xl font-semibold text-white my-4">
            Tech stack of this project:
          </h3>
          <div className="grid grid-cols-1 text-gray-100 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
            <div className="p-4 shadow-lg rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors">
              <h3 className="text-xl font-bold">Node-js</h3>
            </div>
            <div className="p-4 shadow-lg rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors">
              <h3 className="text-xl font-bold">Express-js</h3>
            </div>
            <div className="p-4 shadow-lg rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors">
              <h3 className="text-xl font-bold">React-js</h3>
            </div>
            <div className="p-4 shadow-lg rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors">
              <h3 className="text-xl font-bold">MongoDB</h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
