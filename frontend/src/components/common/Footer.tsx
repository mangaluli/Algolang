import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      {/* main */}
      <header className="bg-stone-100">
        {/* container */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* space-between */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-stone-500 font-bold">
                c2020 Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Footer;
