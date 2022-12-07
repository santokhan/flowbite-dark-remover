/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
// eslint-disable-next-line jsx-a11y/anchor-is-valid
import React, { useState, useEffect, useRef } from "react";

export default function DarkRemover() {
  const [input, setinput] = useState("");

  // use this function to generate clean html
  function handleInput(params) {
    setinput((prevCount) => (prevCount = params));
  }

  return (
    <div className="bg-gray-800 py-12 h-screen">
      <div className="flex gap-2 justify-center pb-4">
        <img
          src="https://flowbite.com/images/logo.svg"
          alt="https://flowbite.com/images/logo.svg"
        />
        <span className="text-3xl font-medium text-white">
          Flowbite Converter
        </span>
      </div>
      <div className="max-w-screen-xl mx-auto flex flex-col xl:flex-row justify-center items-center lg:items-start gap-8 lg:gap-16 p-4">
        <InputCode input={input} handleInput={handleInput}></InputCode>
        <ExecuteCode filter={input}></ExecuteCode>
      </div>
    </div>
  );
}
export function InputCode({ input, handleInput }) {
  return (
    <form>
      <textarea
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        value={input}
        id="input"
        rows="30"
        cols="72"
        className="w-full max-w-md mx-auto block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Paste your code"
        spellCheck="false"
      />
    </form>
  );
}
export function generateHTML(params) {
  let data = params;
  if (params.includes("class=")) {
    data = params.replace(/class=/g, "className=");
  }

  data = data.split(" ");
  //   console.log(data);
  data = data
    .map((e) => {
      // remove dark:<>
      if (e.includes("dark:")) {
        // remove dark:<>">
        if (e.includes('">')) {
          return '">' + e.split('">')[1];
        } else {
          return "";
        }
      } else {
        return e;
      }
    })
    .filter(Boolean)
    .join(" ");

  return data;
}
export function ExecuteCode({ filter }) {
  const htmlFiltered = generateHTML(filter);
  return (
    <form>
      <textarea
        id="export"
        rows="30"
        cols="72"
        className="w-full max-w-md mx-auto block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Copy your code"
        spellCheck="false"
        // readOnly="true"
        defaultValue={htmlFiltered}
      />
      <CopyButton data={htmlFiltered}></CopyButton>
    </form>
  );
}

export function CopyButton({ data }) {
  const [copy, setcopy] = useState("Copy");

  return (
    <div className="py-4">
      <button
        onClick={() => {
          if (data) {
            setcopy("Copied");

            navigator.clipboard.writeText(data);
          }
        }}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ease-in"
      >
        {copy}
      </button>
    </div>
  );
}

export function Test() {
  return (
    <div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
      >
        Default
      </button>
      <button
        type="button"
        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
      >
        Alternative
      </button>
      <button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
      >
        Dark
      </button>
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
      >
        Light
      </button>
      <button
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
      >
        Green
      </button>
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
      >
        Red
      </button>
      <button
        type="button"
        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
      >
        Yellow
      </button>
      <button
        type="button"
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
      >
        Purple
      </button>
    </div>
  );
}
