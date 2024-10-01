import React from "react";

export default function Chip({ name }) {
  return (
    <div className="p-4 border-solid border border-black bg-white text-black">
      {name}
    </div>
  );
}
