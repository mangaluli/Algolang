import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Burgir from "./Burgir";
import UserButton from "./UserButton";
import { UserContext } from "../../providers/UserProvider";

const links = [
  { to: "/", label: "Home" },
  { to: "/posts", label: "Browse" },
  { to: "/about", label: "About" },
];

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {/* main */}
      <header className="bg-stone-100 shadow-md">
        {/* container */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* space-between */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div>
              <a href="/" className="text-stone-900 font-bold text-xl">
                AlgoLang
              </a>
            </div>

            {/* big navigation */}
            <div className="hidden sm:block">
              <nav>
                {links.map((link, index) => (
                  <NavLink
                    key={index}
                    className={({ isActive }) =>
                      `px-3 py-1 text-sm font-medium  ${
                        isActive &&
                        "border-t-2 border-stone-200 text-stone-900 bg-gradient-to-b from-white bg-opacity-80 rounded-b-xl"
                      } ${!isActive && "text-stone-500"}`
                    }
                    to={link.to}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Connect / User */}
            <div className="hidden sm:flex">
              {user ? (
                <UserButton user={user} />
              ) : (
                <NavLink
                  to="/connect"
                  className="px-4 py-1 shadow-md rounded-lg bg-stone-900 text-stone-50 text-lg"
                >
                  Connect
                </NavLink>
              )}
            </div>

            {/* Small Navigation (BURGIR) */}
            <div className="flex sm:hidden">
              <Burgir links={links} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
