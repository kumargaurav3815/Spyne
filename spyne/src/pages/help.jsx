/** @format */

import Image from "../assets/pic2.jpg"; // Adjust the path according to your project structure

function Help() {
  return (
    <div className="mx-5 min-h-screen grid place-content-center">
      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl text-white p-8 text-center h-72 max-w-sm mx-auto">
        <h1 className="text-3xl mb-3">Hello !!</h1>
        <p className="text-lg">
          You can contact whenever you need help or are just curious about
          something.
        </p>
      </div>
      <div className="bg-white py-8 px-10 text-center rounded-md shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto">
        <h2 className="font-semibold text-2xl mb-6">Feel free to contact</h2>
        <img
          className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg"
          src={Image}
          alt="User avatar"
        />
        <p className="capitalize text-xl mt-1 mb-1 text-black">Kumar Gaurav</p>
        <button className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-xl text-white pt-3 pb-4 px-8 inline hover:pt-4 ">
          <a href="mailto:kumargaurav.3815@gmail.com">Send a message</a>
        </button>
      </div>
    </div>
  );
}

export default Help;
