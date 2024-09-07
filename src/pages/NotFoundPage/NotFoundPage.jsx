import { NavLink } from "react-router-dom";


const NotFoundPage = () => {
  return (
    <>
      <h1>Page Not found</h1>
      <NavLink to="/">
        Home
      </NavLink>
    </>
  );
};

export default NotFoundPage;
