import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const ButtonAddAchat = () => {
    return (
        <NavLink
            
            to="/achat/add"
            className="btn add btn-shadow"
        >
            <Icon
                className="svg"
                icon="ic:baseline-plus"
                style={{
                    color: "white",
                }}
            />
            Ajouter un achat
        </NavLink>
    );
};

export default ButtonAddAchat;
