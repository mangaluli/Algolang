import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { FunctionComponent } from "react";
import { useDarkMode } from "../../providers/DarkModeProvider";

// interface DarkModeToggleProps {}

const DarkModeToggle: FunctionComponent = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <div
      className="fixed bottom-4 right-4 h-max w-max cursor-pointer rounded-full bg-black p-1 text-white dark:bg-white dark:text-black"
      onClick={() => {
        localStorage.setItem("algolangdarkmode", String(!darkMode));
        setDarkMode(!darkMode);
        console.log("aa");
      }}
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6 p-0.5" />
      )}
    </div>
  );
};

export default DarkModeToggle;
