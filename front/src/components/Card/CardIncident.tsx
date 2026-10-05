import { Icon } from "@iconify/react";
import { NavLink, useParams } from "react-router-dom";

import { IncidentInterface } from "@/interfaces/incidentInterface";
import { useTasksStore } from "@/store/tasksStore";

import ModalDelete from "../Modals/ModalDelete";
import Button from "../ui/btn/Button";
import { calculateDuration } from "@/function";

const CardIncident = ({
    incident,
}: {
    incident: { incident: IncidentInterface };
}) => {
    const { id } = useParams<{ id: string | undefined }>();
    const taskId = Number(id);
    const incidentId = Number(incident.incident.id);

    const { deleteIncident } = useTasksStore();
    const handleDelete = () => {
        deleteIncident(taskId, incidentId);
    };

    let status = "";
    switch (incident.incident.status) {
        case "InProgress":
            status = "En progression";
            break;
        case "Finished":
            status = "Fini";
            break;
        default:
            status = "Inconnu";
            break;
    }
    const dure = calculateDuration(
        new Date(incident?.incident.start),
        new Date(incident.incident.end)
    );

    return (
        <div className="card ">
            <div className="mb-2">
                <h2 className="text-bold">{incident.incident.name}</h2>

                <p>
                    <strong>Type :</strong>{" "}
                    {incident.incident.incidentTypes?.[0]?.incidentType.name}
                </p>
                <p>
                    <strong>Durée : </strong> {dure}
                </p>
                <p>
                    <strong>Statut :</strong> {status}
                </p>

                <p>
                    <strong>Description : </strong>
                    {incident.incident.description &&
                    incident.incident.description.length < 160
                        ? incident.incident.description
                        : `${incident.incident.description?.slice(0, 80)}...`}
                </p>
            </div>
            {location.pathname.includes("incident") && (
                <div className="flex justify-between">
                    <ModalDelete
                        label={`l'incident ${incident.incident.name}`}
                        onDelete={handleDelete}
                    />

                    <NavLink to={`/incident/edition/${incident.incident.id}`}>
                        <Button>
                            <Icon
                                className="svg"
                                icon="solar:pen-linear"
                                style={{
                                    fontSize: "18px",
                                }}
                            />
                            Modifier
                        </Button>
                    </NavLink>
                </div>
            )}
            {!location.pathname.includes("incident") && (
                <div className="flex justify-end">
                    <NavLink to={`/incident/${incident.incident.id}`}>
                        <Button>
                            <Icon
                                className="svg"
                                icon="material-symbols:search-rounded"
                            />
                            Voir +
                        </Button>
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default CardIncident;
