import { FunctionComponent, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import HeroSection from "../common/HeroSection";
import Dashboard from "../common/Dashboard";

// interface HomeProps {}

const Home: FunctionComponent = () => {
  const { user } = useContext(UserContext);

  return <>{!user ? <HeroSection /> : <Dashboard />}</>;
};

export default Home;
