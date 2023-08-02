import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import { DarkModeProvider, useDarkMode } from "./providers/DarkModeProvider";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Home from "./components/pages/Home";
import Connect from "./components/pages/Connect";
import EditPost from "./components/pages/EditPost";
import PageNotFound from "./components/pages/PageNotFound";
import Posts from "./components/pages/Posts";
import Profile from "./components/pages/Profile";
import VerifyEmail from "./components/pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import User from "./components/pages/User";
import DarkModeToggle from "./components/common/DarkModeToggle";
import Browse from "./components/pages/Browse";
import Postt from "./components/pages/Postt";
import About from "./components/pages/About";
import Disclaimer from "./components/pages/Disclaimer";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/connect/login",
    element: <Connect defaultTab={0} />,
  },
  {
    path: "/connect/register",
    element: <Connect defaultTab={1} />,
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
    element: <Postt />,
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
  { path: "/about", element: <About /> },
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
            <Disclaimer />
            <Navbar />
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
            <Footer />
          </div>
        </Router>
        <Toaster position="bottom-right" />
      </DarkModeProvider>
    </UserProvider>
  );
}

export default App;
