import { FunctionComponent, useContext } from "react";
import { Tab } from "@headlessui/react";
import LoginForm from "../common/LoginForm";
import RegisterForm from "../common/RegisterForm";
import { UserContext } from "../../providers/UserProvider";

// interface ConnectProps {}

const Connect: FunctionComponent = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        <div>You are already logged in man..</div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="container max-w-sm rounded-2xl border-2 border-stone-50 bg-stone-100 p-3 shadow-md">
            <Tab.Group>
              <Tab.List>
                <Tab
                  className={({ selected }) =>
                    `px-3 py-1 text-sm font-medium  ${
                      selected &&
                      "rounded-b-xl border-t-2 border-stone-200 bg-opacity-80 bg-gradient-to-b from-white text-stone-900"
                    } ${!selected && "text-stone-500"}`
                  }
                >
                  Login
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `px-3 py-1 text-sm font-medium  ${
                      selected &&
                      "rounded-b-xl border-t-2 border-stone-200 bg-opacity-80 bg-gradient-to-b from-white text-stone-900"
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
      )}
    </>
  );
};

export default Connect;
