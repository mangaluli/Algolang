import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useContext } from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../apis/authApi";
import { UserContext } from "../../providers/UserProvider";

const links = [
  { to: "/", label: "Home" },
  { to: "/posts", label: "Browse" },
  { to: "/about", label: "About" },
];

// interface NavbarProps {}

const Navbar: FunctionComponent = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout()
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error Looging Out!: " + error);
      });
  };

  return (
    <>
      {/* main */}
      <header className="bg-stone-100 text-stone-900 shadow-md dark:bg-stone-900 dark:text-stone-100">
        {/* container */}
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {/* space-between */}
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div>
              <a href="/" className="text-xl font-bold">
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
                        "text-blue-600 underline underline-offset-4 dark:text-blue-400"
                      }`
                    }
                    to={link.to}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex gap-4">
              {/* big screen */}
              <div className="hidden sm:flex">
                {user ? (
                  <div>
                    <Menu>
                      <Menu.Button className="relative flex items-center gap-1 py-1 underline-offset-2 hover:underline">
                        <span className="flex items-center gap-1">
                          {user.username}
                          <ChevronDownIcon className="h-4 w-4" />
                        </span>
                      </Menu.Button>
                      <Menu.Items className="absolute flex flex-col rounded-md border-2 bg-stone-50">
                        <Menu.Item>
                          <span
                            className="cursor-pointer px-2 py-1 hover:bg-gray-100 hover:text-blue-600"
                            onClick={() => navigate("/profile")}
                          >
                            Profile
                          </span>
                        </Menu.Item>

                        <Menu.Item>
                          <span
                            className="cursor-pointer px-2 py-1 hover:bg-gray-100 hover:text-blue-600"
                            onClick={() => navigate("/my-posts")}
                          >
                            My Posts
                          </span>
                        </Menu.Item>

                        <Menu.Item>
                          <span
                            className="cursor-pointer px-2 py-1 hover:bg-gray-100 hover:text-blue-600"
                            onClick={() => handleLogoutClick()}
                          >
                            Logout
                          </span>
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                ) : (
                  <button
                    className="h-max rounded-md border-2 border-blue-600 bg-white px-4 py-1 font-bold text-blue-600 hover:bg-blue-600 hover:text-stone-50"
                    onClick={() => navigate("/connect")}
                  >
                    Connect
                  </button>
                )}
              </div>

              {/* small screen */}
              <div className="flex sm:hidden"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
