import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const ButtonAddIncident = () => {
    return (
        <NavLink to={`/incident/ajout/`} className="btn add btn-shadow">
            <Icon
                className="svg"
                icon="ic:baseline-plus"
                style={{
                    color: "white",
                }}
            />
            Ajouter un incident
        </NavLink>
    );
};

export default ButtonAddIncident;
