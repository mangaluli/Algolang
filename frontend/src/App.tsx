import Navbar from "./components/Navbar";
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Connect from "./components/Connect";
import { Flex } from "@chakra-ui/react";

export const App = () => {
  const [user, setUser] = useState(undefined);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Flex
            direction="column"
            minHeight="100vh"
            flex="1"
            bgColor="gray.100"
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Flex>
        </Router>
      </UserContext.Provider>
    </>
  );
};
