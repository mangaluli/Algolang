import { FunctionComponent } from "react";

// interface FooterProps {}

const Footer: FunctionComponent = () => {
  return (
    <>
      {/* main */}
      <header className="dark:bg-stone-900">
        {/* container */}
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {/* space-between */}
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="font-bold text-stone-500">
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
