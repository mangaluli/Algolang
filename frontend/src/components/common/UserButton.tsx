import { FunctionComponent, Fragment, useContext } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { logout } from "../../apis/authApi";
import { toast } from "react-hot-toast";
import { UserContext } from "../../providers/UserProvider";

interface UserButtonProps {
  user: any;
}

const UserButton: FunctionComponent<UserButtonProps> = ({ user }) => {
  const { refreshUser } = useContext(UserContext);

  const handleLogout = () => {
    const id = toast.loading("Logging out..");
    logout()
      .then((res) => {
        toast.success(res.data.message, { id });
        refreshUser();
      })
      .catch((err) => toast.error(err.response.data.message, { id }));
  };

  return (
    <div className="relative inline-block">
      <Menu>
        <Menu.Button>
          {user.username}
          <ChevronDownIcon className="w-4 h-4 inline" />
        </Menu.Button>
        <Menu.Items className="absolute p-1 bg-stone-100 rounded-md shadow-md right-0 border-2">
          <Menu.Item as={Fragment}>
            <NavLink
              to="/"
              className="w-full block px-3 py-2 rounded-md text-base font-medium text-stone-900 hover:bg-stone-200"
            >
              Profile
            </NavLink>
          </Menu.Item>
          <Menu.Item as={Fragment}>
            <NavLink
              to="/"
              className="w-full block px-3 py-2 rounded-md text-base font-medium text-stone-900 hover:bg-stone-200"
            >
              Dark Mode
            </NavLink>
          </Menu.Item>
          <Menu.Item as={Fragment}>
            <NavLink
              to="/"
              className="w-full block px-3 py-2 rounded-md text-base font-medium text-stone-900 hover:bg-stone-200"
              onClick={() => handleLogout()}
            >
              Logout
            </NavLink>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default UserButton;
