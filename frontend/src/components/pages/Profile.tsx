import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getProfile } from "../../apis/profile";
import Spinner from "../common/Spinner";
import VerifyEmailBanner from "../common/VerifyEmailBanner";
import PageNotFound from "./PageNotFound";

interface User {
  _id: string;
  is_verified: boolean;
  privilege: string;
  date: string;

  username: string;
  email: string;

  followers: User[];
  folowing: User[];

  post_count: number;
  comment_count: number;

  liked_post_count: number;
  liked_comment_count: number;
}

const toDate = (date_string: string) => {
  return new Date(Number(date_string)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// interface ProfileProps {}

const Profile: FunctionComponent = () => {
  const [user, setUser] = useState<User>();
  const [fetchingUser, setFetchingUser] = useState(false);

  const handleFetchProfile = () => {
    if (!fetchingUser) {
      setFetchingUser(true);
      getProfile()
        .then((res) => {
          setUser(res.data);
          setFetchingUser(false);
        })
        .catch((error) => {
          toast.error("Error Fetching Profile: " + error);
          setFetchingUser(false);
        });
    }
  };

  useEffect(() => {
    handleFetchProfile();
  }, []);

  if (fetchingUser) {
    return <Spinner size="w-[22%] h[22%]" />;
  }

  if (!user) {
    return <PageNotFound />;
  }

  return (
    <div className="flex grow flex-col">
      <VerifyEmailBanner />
      <div className="my-4 flex flex-col gap-3 border-2 bg-stone-50 py-4 shadow-md">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <span className="w-1/2 text-right text-stone-500">Username: </span>
            <span className="w-1/2">{user.username}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-1/2 text-right text-stone-500">Email: </span>
            <span className="w-1/2">{user.email}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-1/2 text-right text-stone-500">User from: </span>
            <span className="w-1/2">{toDate(user.date)}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <span className="w-1/2 text-right text-stone-500">Posts: </span>
            <span className="w-1/2">{user.post_count}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-1/2 text-right text-stone-500">Comments: </span>
            <span className="w-1/2">{user.comment_count}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <span className="w-1/2 text-right text-stone-500">
              Liked posts:{" "}
            </span>
            <span className="w-1/2">{user.liked_post_count}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-1/2 text-right text-stone-500">
              Like comments:{" "}
            </span>
            <span className="w-1/2">{user.liked_comment_count}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <span className="cursor-pointer text-blue-600 hover:underline">
          Edit Profile
        </span>
        <span className="cursor-pointer text-red-600 hover:underline">
          Delete User
        </span>
      </div>
    </div>
  );
};

export default Profile;
