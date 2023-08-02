import { FunctionComponent, useContext, useState } from "react";
import { Tab } from "@headlessui/react";
import LoginForm from "../common/LoginForm";
import RegisterForm from "../common/RegisterForm";
import { UserContext } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

interface ConnectProps {
  defaultTab?: number;
}

const Connect: FunctionComponent<ConnectProps> = ({ defaultTab }) => {
  const navigate = useNavigate();

  const handleTabChange = (index: number) => {
    switch (index) {
      case 0:
        navigate("/connect/login");
        break;
      case 1:
        navigate("/connect/register");
        break;
      default:
        navigate("/connect/login");
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="container max-w-sm rounded-2xl border-2 border-stone-50 bg-stone-100 p-3 shadow-md">
          <Tab.Group
            manual
            defaultIndex={defaultTab || 0}
            onChange={handleTabChange}
          >
            <Tab.List className="text-stone-900">
              <Tab
                className={({ selected }) =>
                  `px-3 py-1 text-sm font-medium  ${
                    selected &&
                    "text-blue-600 underline underline-offset-4 dark:text-blue-400"
                  }`
                }
              >
                Login
              </Tab>
              <Tab
                className={({ selected }) =>
                  `px-3 py-1 text-sm font-medium  ${
                    selected &&
                    "text-blue-600 underline underline-offset-4 dark:text-blue-400"
                  }`
                }
              >
                Register
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <LoginForm />
              </Tab.Panel>
              <Tab.Panel>
                <RegisterForm />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
};

export default Connect;
