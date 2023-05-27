import {
  FunctionComponent,
  useEffect,
  Fragment,
  useState,
  useContext,
} from "react";
import { Transition } from "@headlessui/react";
import { session } from "../../apis/authApi";
import { UserContext } from "../../providers/UserProvider";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { user } = useContext(UserContext);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
    session();
  }, []);

  return (
    <>
      {!user ? ( // Client not logged in = Show CTA
        <div className="flex flex-col justify-center items-center  max-w-screen-lg m-auto py-4 text-stone-900">
          <div className="">
            <p className="text-5xl font-bold">Welcome to AlgoLang!</p>
          </div>
          <div className="flex flex-col lg:flex-row justify-around items-center py-8">
            <div className="lg:w-5/12">
              <p className="text-xl text-stone-700">
                Discover a vibrant community of programmers, mathematicians, and
                enthusiasts, all sharing their passion for algorithms,
                functions, and mathematical concepts. Dive into a world where
                complex equations and fascinating visual representations come to
                life. Engage in discussions, explore new concepts, and expand
                your knowledge alongside like-minded individuals.
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
              <p className="text-lg  text-center text-stone-900">
                Join us today to contribute your own creations, interact with
                others, and witness the power of mathematics and programming
                combined. AlgoLang - the ultimate hub for all things algorithmic
                and mathematical!
              </p>
            </div>
            <div className="py-4">
              <button className="px-8 py-2 rounded-md shadow-md font-bold text-lg bg-stone-900 text-stone-50">
                JOIN NOW!
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Client IS logged in = Show logged in user home
        <>
          <h1>logged in home page :)</h1>
        </>
      )}
    </>
  );
};

export default Home;
