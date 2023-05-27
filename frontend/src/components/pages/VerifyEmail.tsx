import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { verifyEmail } from "../../apis/verifyApi";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleEmailVerification = async () => {
    verifyEmail(token!)
      .then()
      .catch((error) => {
        console.log(error.response.data.message);
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleEmailVerification();
    if (token) {
      console.log("Token:", token);
    } else {
      setError("No token provided");
      console.log("Token not found");
    }
  }, []);

  return (
    <>
      <div className="bg-stone-100 border-2 border-stone-50 shadow-md rounded-xl m-auto p-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl  font-bold">Email Verification</h1>
          {loading ? (
            <span className="text-lg text-stone-500">Loadin..</span>
          ) : error ? (
            <div className="flex flex-col gap-4">
              <span className="text-lg text-red-500">{error}</span>
              <button className="px-4 py-1 shadow-md rounded-lg bg-stone-900 text-stone-50 text-lg">
                Resend email
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="text-lg text-green-500">email verified</span>
              <button className="px-4 py-1 shadow-md rounded-lg bg-stone-900 text-stone-50 text-lg">
                Start Exploring!
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
