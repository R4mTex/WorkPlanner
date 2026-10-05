import { Icon } from "@iconify/react";
import { NavLink, useNavigate } from "react-router-dom";

import { calculateDuration, formatDate } from "@/function";
import { taskInterface } from "@/interfaces/taskInterface";
import { useTasksStore } from "@/store/tasksStore";

import ModalDelete from "../Modals/ModalDelete";
import Button from "../ui/btn/Button";

const CardTask = ({ task }: { task: taskInterface }) => {
    const debut = formatDate(task.start.toString());
    const fin = formatDate(task.end.toString());
    const { deleteTask } = useTasksStore();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await deleteTask(task.id);
        navigate(-1);
    };

    let status = "";
    switch (task.status) {
        case "OnHold":
            status = "En attente";
            break;
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

    const dure = calculateDuration(new Date(task.start), new Date(task.end));

    return (
        <div className="card ">
            <div className="mb-2">
                <h2>{task.name}</h2>
                <p>
                    <strong>Début : </strong>
                    {debut}
                </p>
                <p>
                    <strong>Fin prévu : </strong>
                    {fin}
                </p>
                <p>
                    <strong>Statut : </strong>
                    {status}
                </p>
                <p>
                    <strong>Durée : </strong>
                    {dure}
                </p>
                <p>
                    <strong>Description : </strong>
                    {task.description && task.description.length < 160
                        ? task.description
                        : `${task.description?.slice(0, 80)}...`}
                </p>
            </div>

            {location.pathname.includes("tache") && (
                <div className="flex justify-between">
                    <ModalDelete
                        label={`la tâche ${task.name} ${task.id}`}
                        onDelete={handleDelete}
                    />
                    <NavLink to={`/tache/edition/`}>
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

            {!location.pathname.includes("tache") && (
                <div className="flex justify-end">
                    <NavLink to={`/planning/tache/${task.id}`}>
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

export default CardTask;
