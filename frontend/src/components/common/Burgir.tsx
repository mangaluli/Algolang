import { FunctionComponent, Fragment } from "react";
import { Menu } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface BurgirProps {
  links: Link[];
}

interface Link {
  to: string;
  label: string;
}

const Burgir: FunctionComponent<BurgirProps> = ({ links }) => {
  return (
    <div className="relative inline-block">
      <Menu>
        <Menu.Button>
          <Bars3Icon className="w-10 h-10 p-1 bg-stone-100 rounded-md shadow-md" />
        </Menu.Button>
        <Menu.Items className="absolute p-1 bg-stone-100 rounded-md shadow-md right-0 border-2">
          {links.map((link, index) => (
            /* Use the `active` state to conditionally style the active item. */
            <Menu.Item key={index} as={Fragment}>
              {({ active }) => (
                <NavLink
                  to={link.to}
                  className="w-full block px-3 py-2 rounded-md text-base font-medium text-stone-900 hover:bg-stone-200"
                >
                  {link.label}
                </NavLink>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Burgir;
