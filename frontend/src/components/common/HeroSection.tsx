import { Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useEffect, useState } from "react";

// interface HeroSectionProps {}

const HeroSection: FunctionComponent = () => {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <div className="m-auto flex max-w-screen-lg flex-col  items-center justify-center py-4 text-stone-900">
      <div className="">
        <p className="text-5xl font-bold">Welcome to AlgoLang!</p>
      </div>
      <div className="flex flex-col items-center justify-around py-8 lg:flex-row">
        <div className="lg:w-5/12">
          <p className="text-xl text-stone-700">
            Discover a vibrant community of programmers, mathematicians, and
            enthusiasts, all sharing their passion for algorithms, functions,
            and mathematical concepts. Dive into a world where complex equations
            and fascinating visual representations come to life. Engage in
            discussions, explore new concepts, and expand your knowledge
            alongside like-minded individuals.
          </p>
        </div>
        <Transition
          as={Fragment}
          show={animation}
          enter="transform duration-[1000ms]"
          enterFrom="scale-90 rotate-[-45deg] "
          enterTo="scale-100 rotate-0"
        >
          <img src="/vector.svg" alt="Hero" className=" lg:w-4/12" />
        </Transition>
      </div>

      <div className="flex flex-col items-center">
        <div className="px-8">
          <p className="text-center  text-lg text-stone-900">
            Join us today to contribute your own creations, interact with
            others, and witness the power of mathematics and programming
            combined. AlgoLang - the ultimate hub for all things algorithmic and
            mathematical!
          </p>
        </div>
        <div className="py-4">
          <button className="rounded-md border-2 border-stone-50 bg-blue-600 px-8 py-2 text-lg font-bold text-stone-50 hover:border-blue-600">
            JOIN NOW!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
