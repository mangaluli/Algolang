import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import HeroSection from "../common/HeroSection";
import Dashboard from "../common/Dashboard";

// interface HomeProps {}

interface Bin {
  number: number;
  binary: string;
  prime: boolean;
}

const Home: FunctionComponent = () => {
  const { user } = useContext(UserContext);

  return <>{!user ? <HeroSection /> : <Dashboard />}</>;
};

export default Home;
