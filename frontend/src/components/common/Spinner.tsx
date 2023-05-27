import { Transition } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useEffect, useState } from "react";

interface SpinnerProps {
  size: string;
  fullscreen?: boolean;
}

const Spinner: FunctionComponent<SpinnerProps> = ({
  size,
  fullscreen = false,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Transition
      show={show}
      enter="transition transform duration-[4000ms]"
      enterFrom="transform rotate-[0deg]"
      enterTo="transform rotate-[360deg]"
    >
      <div
        className={
          "flex items-center justify-center " +
          (fullscreen ? "w-screen h-screen" : "w-full h-full")
        }
      >
        <ArrowPathIcon className={size} />
      </div>
    </Transition>
  );
};

export default Spinner;
