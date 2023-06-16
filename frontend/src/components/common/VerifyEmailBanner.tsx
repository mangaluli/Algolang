import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { FunctionComponent, useState } from "react";

// interface VerifyEmailBannerProps {}

const VerifyEmailBanner: FunctionComponent = () => {
  const [showing, setShowing] = useState(true);

  return (
    <>
      {showing && (
        <div className="my-4 flex justify-center gap-4 border-2 bg-stone-50 px-4 py-2 shadow-md">
          <ExclamationTriangleIcon className="w-14" />
          <p className="m-auto text-stone-600">
            Your email address has not been verified yet. To fully participate
            in our platform activities, such as creating new posts, commenting,
            and liking content, you need to verify your email. Please check your
            inbox for the verification email. If you haven&apos;t received it,
            or if the verification link has expired, please click{" "}
            <span className="cursor-pointer text-blue-600 hover:underline dark:text-blue-400">
              here
            </span>{" "}
            to request a new verification email.
          </p>
          <button className="cursor-pointer" onClick={() => setShowing(false)}>
            <XMarkIcon className="w-8" />
          </button>
        </div>
      )}
    </>
  );
};

export default VerifyEmailBanner;
