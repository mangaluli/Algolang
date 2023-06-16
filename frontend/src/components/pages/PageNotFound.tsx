import { FunctionComponent } from "react";

// interface PageNotFoundProps {}

const PageNotFound: FunctionComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-[-3px] text-9xl">🤷🏻‍♂️</div>
      <span className="border-t-2 text-7xl font-bold text-slate-800">
        Page Not Found.
      </span>
    </div>
  );
};

export default PageNotFound;
