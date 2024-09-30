import React, { useState } from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [icon, setIcon] = useState(faBars);

  const toggleIcon = () => {
    icon === faBars ? setIcon(faClose) : setIcon(faBars);
  };
  return (
    <header className="h-20 w-full">
      <nav className="h-20 w-[90%] mx-auto flex items-center justify-between">
        <a
          className="logo font-[Poppins] text-blue-700 font-extrabold tracking-wider text-4xl"
          href="/"
        >
          Movie<span className="text-[#e36414]">Mania</span>
        </a>
        <div
          className="nav-links duration-500 absolute md:static md:min-h-fit min-h-fit left-0 top-[-100%] w-full md:w-fit flex items-center"
          style={{ top: icon === faClose ? 9 + "%" : "" }}
        >
          <ul className="flex w-full md:w-fit md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li className="text-center">
              <a
                className="text-xl font-semibold hover:text-gray-500 capitalize"
                href="/"
              >
                home
              </a>
            </li>
            <li className="text-center">
              <a
                className="text-xl font-semibold hover:text-gray-500 capitalize"
                href="/"
              >
                news
              </a>
            </li>
            <li className="text-center">
              <a
                className="text-xl font-semibold hover:text-gray-500 capitalize"
                href="/"
              >
                in theaters
              </a>
            </li>
            <li className="text-center">
              <a
                className="text-xl font-semibold hover:text-gray-500 capitalize"
                href="/"
              >
                coming soon
              </a>
            </li>
            <li className="text-center">
              <a
                className="text-xl font-semibold hover:text-gray-500 capitalize"
                href="/"
              >
                contact
              </a>
            </li>
            <li className="text-center">
              <a
                className="text-xl font-semibold hover:text-gray-500 capitalize"
                href="/"
              >
                advertisement
              </a>
            </li>
          </ul>
        </div>
        <div>
          <button onClick={toggleIcon} className="md:hidden text-xl p-2">
            <FontAwesomeIcon className="" icon={icon} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
