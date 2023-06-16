import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import { DarkModeProvider, useDarkMode } from "./providers/DarkModeProvider";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Home from "./components/pages/Home";
import Connect from "./components/pages/Connect";
import EditPost from "./components/pages/EditPost";
import PageNotFound from "./components/pages/PageNotFound";
import Post from "./components/pages/Post";
import Posts from "./components/pages/Posts";
import Profile from "./components/pages/Profile";
import VerifyEmail from "./components/pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import User from "./components/pages/User";
import DarkModeToggle from "./components/common/DarkModeToggle";
import Browse from "./components/pages/Browse";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/connect",
    element: <Connect />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  {
    path: "/verify",
    element: <VerifyEmail />,
  },

  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/new-post",
    element: <EditPost is_new={true} />,
  },
  {
    path: "/post/:post_id",
    element: <Post />,
  },
  {
    path: "/edit-post/:post_id",
    element: <EditPost is_new={false} />,
  },
  {
    path: "/user/:user_id",
    element: <User />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

function App() {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <UserProvider>
      <DarkModeProvider>
        <DarkModeToggle />
        <Router>
          <div className="flex min-h-screen flex-col justify-between bg-stone-50 dark:bg-stone-950">
            <Navbar />
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
            <Footer />
          </div>
        </Router>
        <Toaster />
      </DarkModeProvider>
    </UserProvider>
  );
}

export default App;
