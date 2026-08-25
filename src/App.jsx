import { Outlet } from "react-router";
import Navbar from "./components/nav/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;