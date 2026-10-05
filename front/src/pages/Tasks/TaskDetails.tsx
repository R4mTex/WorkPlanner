import { useParams } from "react-router-dom";
import CardTask from "../../components/Card/CardTask";
import CardIncident from "@/components/Card/CardIncident";
import ButtonAddIncident from "@/components/ui/btn/ButtonAddIncident";
import { useTasksStore } from "@/store/tasksStore";
import { useEffect } from "react";

const TaskDetails = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const taskId = Number(id);
    const { currentTask, loading, fetchTaskById } = useTasksStore();

    useEffect(() => {
        fetchTaskById(taskId);
    }, [id]);

    return (
        <>
            <h1>Détails de la tâche</h1>
            {loading && <p>Chargement en cours...</p>}
            {!loading && currentTask && <CardTask task={currentTask} />}

            {currentTask?.incidents && currentTask.incidents.length > 0 ? (
                <div className="mt-5">
                    <h2>Liste des incidents</h2>

                    <div className="cardContainer">
                        {currentTask.incidents.map((incident) => (
                            <CardIncident
                                key={incident.incidentId}
                                incident={incident}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
            <ButtonAddIncident />
        </>
    );
};

export default TaskDetails;
