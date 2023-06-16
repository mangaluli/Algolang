import { createContext, useState, FunctionComponent, useEffect } from "react";
import { session } from "../apis/authApi";
import Spinner from "../components/common/Spinner";
import User from "../interfaces/User";

interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshUser: () => void;
  userLoading: boolean;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refreshUser: () => {},
  userLoading: true,
});

export const UserProvider: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    session()
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          setUserLoading(false);
        }
      })
      .catch(() => {
        setUser(null);
        setUserLoading(false);
      });
  }, [refresh]);

  const refreshUser = () => setRefresh(!refresh);
  if (userLoading) {
    return <Spinner size="max-w-[22%] max-h-[22%]" fullscreen={true} />;
  } else {
    return (
      <UserContext.Provider value={{ user, setUser, refreshUser, userLoading }}>
        {children}
      </UserContext.Provider>
    );
  }
};
