import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Searchsection = () => {
  return (
    <>
      <div className="relative">
        <input
          type="text"
          name="q"
          className="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
          placeholder="Search your movies..."
        />
        <button className="absolute md:right-5 top-3 right-3" type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {/* <div className="sort">
        <select name="sort" id="sort">
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div> */}
    </>
  );
};

export default Searchsection;
