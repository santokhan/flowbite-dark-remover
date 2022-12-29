import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import NavBar from "./NavBar";

export default function DarkRemover() {
  const [input, setinput] = useState({ value: "" });

  function handleSubmit(e) {
    setinput({ value: e });
    // console.log(e);
  }

  return (
    <div className="bg-gray-800 h-screen flex flex-col justify-between">
      <div>
        <div className="bg-white">
          <NavBar></NavBar>
        </div>
        <div className="container mx-auto flex flex-col xl:flex-row xl:justify-center items-center lg:items-start gap-8 lg:gap-16 py-10">
          <InputCode
            input={input.value}
            handleSubmit={handleSubmit}
          ></InputCode>
          <ExecuteCode input={input.value}></ExecuteCode>
        </div>
      </div>
      <Alert></Alert>
    </div>
  );
}

export function InputCode({ input, handleSubmit }) {
  return (
    <form>
      <textarea
        onChange={(e) => {
          handleSubmit(e.target.value);
        }}
        defaultValue={input}
        cols="68"
        rows="30"
        className="w-full mx-auto block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Paste your code"
        spellCheck="false"
      ></textarea>
    </form>
  );
}

export function ExecuteCode({ input }) {
  const htmls = Filter(input);

  return (
    <form>
      <textarea
        id="export"
        cols="68"
        rows="30"
        className="w-full mx-auto block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Copy your code"
        spellCheck="false"
        // readOnly="true"
        defaultValue={htmls}
      ></textarea>
      <CopyButton data=""></CopyButton>
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

/**
 * Keep in mind this function does not support for SVG elements
 * @param {*} input
 * @returns
 */
function Filter(input) {
  const parent = document.createElement("DIV");
  if (input) {
    parent.innerHTML = input;
    let targetElements = "";
    if (parent.children) {
      targetElements = parent.children;
    }

    function loop(elements) {
      for (const element of elements) {
        if (element.className) {
          // console.log(element.classList);
          element.className = Remover(element.className);
        }
        if (element.children && element.children.length > 0) {
          loop(element.children);
        }
      }
    }
    loop(targetElements);

    // Destructuring HTML
    let htmls = "";
    for (const e of targetElements) {
      htmls += e.outerHTML;
    }
    // console.log(htmls);
    return RenameClass(htmls);
  }
}
function Remover(classes) {
  if (classes.includes(" ")) {
    return classes
      .split(" ")
      .filter((e) => !e.includes("dark:"))
      .join(" ");
  } else {
    return classes;
  }
}
function ClassListRemover(classList) {
  let filter = {};
  for (const key in classList) {
    if (Object.hasOwnProperty.call(classList, key)) {
      const element = classList[key];

      // change md: to dark:
      if (element.includes("dark:") === false) {
        filter[key] = element;
      }
    }
  }
  return filter;
}
function RenameClass(htmls) {
  return htmls.replace(/class=/g, "className=");
}
