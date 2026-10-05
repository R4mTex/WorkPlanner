import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

import { formatDate } from "@/function";
import { planning } from "@/store/planningStore";

import Button from "../ui/btn/Button";

const CardPlanning = ({ id, data }: { id: number; data: planning }) => {
    const date = data.date.split("T");
    const datePlanning = formatDate(data.date);

    return (
        <div className="card">
            <h3 className="mb-2 font-bold">{datePlanning}</h3>
            <p>
                <strong>Nombre de tâche : {data.count}</strong>
            </p>
            <div className="flex justify-end mt-2">
                <NavLink to={`/planning/${id}/${date[0]}`}>
                    <Button dataCy="voir">
                        <Icon
                            className="svg"
                            icon="material-symbols:search-rounded"
                        />
                        Voir +
                    </Button>
                </NavLink>
            </div>
        </div>
    );
};

export default CardPlanning;
