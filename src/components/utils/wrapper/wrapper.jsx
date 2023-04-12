import { Outlet } from "react-router-dom";
import "./wrapper.styles.scss";

const Wrapper = ({ children }) => {
  return (
    <div className="wrapper">
      <Outlet />
      {children}
    </div>
  );
};

export default Wrapper;
