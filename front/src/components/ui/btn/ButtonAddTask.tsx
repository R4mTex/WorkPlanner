import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const ButtonAddTask = ({ id }: { id?: number }) => {
    return (
        <NavLink to={`/tache/ajout/${id}`} className="btn add btn-shadow">
            <Icon
                className="svg"
                icon="ic:baseline-plus"
                style={{
                    color: "white",
                }}
            />
            Ajouter une tâche
        </NavLink>
    );
};

export default ButtonAddTask;
