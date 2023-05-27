import { FunctionComponent } from "react";
import { Tab } from "@headlessui/react";
import LoginForm from "../common/LoginForm";
import RegisterForm from "../common/RegisterForm";

interface ConnectProps {}

const Connect: FunctionComponent<ConnectProps> = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-stone-100 rounded-2xl shadow-md p-3 container max-w-sm border-2 border-stone-50">
        <Tab.Group>
          <Tab.List>
            <Tab
              className={({ selected }) =>
                `px-3 py-1 text-sm font-medium  ${
                  selected &&
                  "border-t-2 border-stone-200 text-stone-900 bg-gradient-to-b from-white bg-opacity-80 rounded-b-xl"
                } ${!selected && "text-stone-500"}`
              }
            >
              Login
            </Tab>
            <Tab
              className={({ selected }) =>
                `px-3 py-1 text-sm font-medium  ${
                  selected &&
                  "border-t-2 border-stone-200 text-stone-900 bg-gradient-to-b from-white bg-opacity-80 rounded-b-xl"
                } ${!selected && "text-stone-500"}`
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
  );
};

export default Connect;
