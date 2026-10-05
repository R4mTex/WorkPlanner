import { useParams } from 'react-router-dom';

import { TaskIncident } from '@/interfaces/taskInterface';
import { useTasksStore } from '@/store/tasksStore';

import FormIncident from '../../components/form/FormIncident';

const IncidentEdit = () => {
  const { id } = useParams<{ id: string }>();
  const incidentId = id ? Number(id) : undefined;
  const { loading, currentTask } = useTasksStore();
  const incident = currentTask?.incidents?.find(
    (taskIncident: TaskIncident) => taskIncident.incidentId === incidentId
  );

  return (
    <>
      <h1>Modifier un incident {id}</h1>
      {loading && <p>Chargement en cours...</p>}
      {!loading && currentTask && <FormIncident incident={incident} />}
    </>
  );
};

export default IncidentEdit;
