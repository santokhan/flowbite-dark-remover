import React, { useState } from "react";

export default function Alert() {
  const [hide, sethide] = useState(false);
  if (!hide) {
    return (
      <div
        className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg max-w-xl mx-auto flex items-center gap-4"
        role="alert"
      >
        <span>
          <span className="font-medium">Alert:</span> Does not work for SVG
          elements.
        </span>
        <button
          type="button"
          onClick={() => {
            sethide(true);
          }}
        >
          <i class="fa fa-plus rotate-45" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}
