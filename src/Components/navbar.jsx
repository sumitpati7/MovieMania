import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [icon, setIcon] = useState(faBars);

  const links = [
    "home",
    "news",
    "in theaters",
    "coming soon",
    "contact",
    "advertisement",
  ];

  const toggleIcon = () => {
    icon === faBars ? setIcon(faClose) : setIcon(faBars);
  };
  return (
    <header className="h-20 w-full">
      <nav className="h-20 w-[90%] mx-auto z-[10] flex items-center justify-between">
        <a
          className="logo font-[Poppins] text-blue-700 font-extrabold tracking-wider text-4xl"
          href="/"
        >
          Movie<span className="text-[#e36414]">Mania</span>
        </a>
        <div
          className="nav-links z-[10] duration-500 absolute h-[calc(100vh_-_80px)] md:h-fit bg-white md:static md:min-h-fit min-h-fit left-[-100%] top-[9%] w-full md:w-fit flex items-center"
          style={{ left: icon === faClose ? 0 + "%" : "" }}
        >
          <ul className="flex z-20 bg-white w-full md:w-fit md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            {links.map((value, index) => (
              <li key={index} className="text-center">
                <a
                  className="text-xl font-semibold hover:text-gray-500 capitalize"
                  href="/"
                >
                  {value}
                </a>
              </li>
            ))}
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
