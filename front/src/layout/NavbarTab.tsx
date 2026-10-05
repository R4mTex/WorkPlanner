import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface INavbarTab {
    endpoint: string;
    iconify: ReactNode;
    dataCy?: string;
}

const NavbarTab = ({ endpoint, iconify, dataCy }: INavbarTab) => {
    return (
        <div
            data-cy={dataCy}
            className="navbar-tab rounded-full h-full aspect-square flex items-center justify-center"
        >
            <NavLink
                to={endpoint}
                className={({ isActive }) =>
                    `inline-block h-4/4 w-full text-4xl rounded-full ${
                        isActive ? " navtab-active" : undefined
                    }`
                }
            >
                <span className="h-full w-full  flex items-center justify-center">
                    {iconify}
                </span>
            </NavLink>
        </div>
    );
};

export default NavbarTab;
