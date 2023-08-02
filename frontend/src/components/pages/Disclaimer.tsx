import { Dialog } from "@headlessui/react";
import { FunctionComponent, useState } from "react";

const Disclaimer: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem("disclaimer") === "false" ? false : true
  );

  const handleUnderstood = () => {
    localStorage.setItem("disclaimer", "false");
    setIsOpen(false);
  };

  return (
    <Dialog
      as="div"
      open={isOpen}
      className="relative z-50"
      onClose={() => null}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4">
        <Dialog.Panel className="flex w-full max-w-lg flex-col gap-4 rounded-xl bg-white p-4 text-stone-700">
          <Dialog.Title className="text-center text-2xl font-medium text-black">
            Disclaimer
          </Dialog.Title>
          <Dialog.Description>
            Thank you for visiting my website. Please note that this site is a
            work in progress, and I will be continuously adding new features
            over time. Your patience and understanding are appreciated as I
            strive to enhance the user experience and showcase my portfolio more
            comprehensively. If you have any feedback or suggestions, I would be
            grateful to hear them. Thank you for your interest in my work!
          </Dialog.Description>
          <Dialog.Description>
            While you are encouraged to register and post your content here, I
            kindly request that you refrain from using passwords associated with
            other platforms. Although I have taken measures to secure the
            database to the best of my abilities, I cannot guarantee its
            absolute safety. Your understanding and cooperation in this matter
            are greatly appreciated. If you have any questions or concerns,
            please feel free to reach out to me. Thank you for visiting!
          </Dialog.Description>
          <button
            className=" rounded-md border-2 border-stone-800 px-8 py-2 text-lg font-bold text-stone-800 hover:bg-stone-800 hover:text-stone-50"
            onClick={handleUnderstood}
          >
            I understood
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Disclaimer;
