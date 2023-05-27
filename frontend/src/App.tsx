import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
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
    element: <EditPost isNew={true} />,
  },
  {
    path: "/post/:post_id",
    element: <Post />,
  },
  {
    path: "/edit-post/:post_id",
    element: <EditPost />,
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
];

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col justify-between min-h-screen bg-stone-50">
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
    </UserProvider>
  );
}

export default App;

// const handleSubmit = async (
//   values: Values,
//   { setSubmitting }: FormikHelpers<Values>
// ) => {
//   const id = toast.loading("Logging in...");
//   const login_user = {
//     email: values.email,
//     password: values.password,
//   };
//   try {
//     const login_res = await login(login_user);

//     const { jwt } = login_res.data;
//     const decoded_token = (await jwtDecode(jwt)) as User;

//     const { _id, username, privilege } = decoded_token;
//     setUser({ _id, username, privilege });

//     console.log(user);

//     localStorage.setItem("session", jwt);
//     toast.success(`Hi ${jwt.username} 👋🏻`, { id });
//     navigate("/");
//   } catch (error: any) {
//     toast.error(
//       `Login failed: ${error.response.data.message || "Unexpected Error"}`,
//       { id }
//     );
//   }
//   setSubmitting(false);
// };

// <div className="relative inline-block">
//   <Menu>
//     <Menu.Button>
//       <Bars3Icon className="w-10 h-10 p-1 bg-stone-100 rounded-md shadow-md" />
//     </Menu.Button>
//     <Menu.Items className="absolute p-1 bg-stone-100 rounded-md shadow-md right-0 border-2">
//       {links.map((link, index) => (
//         /* Use the `active` state to conditionally style the active item. */
//         <Menu.Item key={index} as={Fragment}>
//           {({ active }) => (
//             <NavLink
//               to={link.to}
//               className="w-full block px-3 py-2 rounded-md text-base font-medium text-stone-900 hover:bg-stone-200"
//             >
//               {link.label}
//             </NavLink>
//           )}
//         </Menu.Item>
//       ))}
//     </Menu.Items>
//   </Menu>
// </div>;
