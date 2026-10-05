import CardIncident from "@/components/Card/CardIncident";
import { useTasksStore } from "@/store/tasksStore";
import { useParams } from "react-router-dom";

const IncidentDetails = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const incidentId = Number(id);
    const { currentTask } = useTasksStore();

    const incident = currentTask?.incidents?.find(
        (incident) => incident.incidentId === incidentId
    );

    return (
        <>
            <h1>Incident</h1>
            {incident && <CardIncident incident={incident} />}
        </>
    );
};

export default IncidentDetails;
