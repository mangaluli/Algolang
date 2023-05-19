import Navbar from "./components/Navbar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Connect from "./components/Connect";
import { Flex } from "@chakra-ui/react";
import Post from "./components/Post";
import NewPostForm from "./components/NewPostForm";

export const App = () => {
  const [user, setUser] = useState(undefined);

  return (
    <>
      <Router>
        <Flex direction="column" minHeight="100vh" flex="1" bgColor="gray.100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/post/:post_id" element={<Post />} />
            <Route path="/create-post" element={<NewPostForm />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Flex>
      </Router>
    </>
  );
};
