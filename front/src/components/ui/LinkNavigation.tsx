import { NavLink } from "react-router-dom";

const LinkNavigation = ({ path, label }: { path: string; label: string }) => {
  return (
    <div className="cursor-pointer block underline hover:no-underline">
      <NavLink to={path}>{label}</NavLink>
    </div>
  );
};

export default LinkNavigation;
