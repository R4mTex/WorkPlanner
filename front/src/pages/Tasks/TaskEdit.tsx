import FormTask from "../../components/form/FormTask";
import { useTasksStore } from "@/store/tasksStore";

const TaskEdit = () => {
    const { loading, currentTask } = useTasksStore();
    console.log("🏙 currentTask:", currentTask);

    return (
        <>
            <h1>Modifier la tâche {currentTask?.name}</h1>
            {loading && <p>Chargement en cours...</p>}
            {!loading && currentTask && <FormTask task={currentTask} />}
        </>
    );
};

export default TaskEdit;
