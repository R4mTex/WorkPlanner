import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import CardTask from '@/components/Card/CardTask';
import ButtonAddTask from '@/components/ui/btn/ButtonAddTask';
import Search from '@/components/ui/Search';
import { formatDate } from '@/function';
import { useTasksStore } from '@/store/tasksStore';

const PlanningDetails = () => {
  const { id, dateparams } = useParams<{
    id: string;
    dateparams: string;
  }>();

  const worksiteId = Number(id);
  const { loading, tasks, fetchTasks, searchTask } = useTasksStore();
  const taskDate = formatDate(dateparams);

  const handleSearch = (value: string) => {
    try {
      searchTask(value);
    } catch (error) {
      toast.error('Erreur lors de la recherche');
    }
  };

  useEffect(() => {
    fetchTasks(worksiteId, dateparams); // Charge les tâches initiales
  }, [worksiteId, dateparams, fetchTasks]);

  return (
    <div>
      <div className="header">
        <h1>Tâches du {taskDate}</h1>
        <Search onSearch={handleSearch} label="Rechercher une tâche" />
      </div>
      {loading && <p>Chargement en cours...</p>}
      {!loading && tasks.length === 0 && <p>Aucune tâche trouvée.</p>}
      <div className="cardContainer">
        {!loading &&
          tasks &&
          tasks.map((task) => <CardTask key={task.id} task={task} />)}
      </div>

      <ButtonAddTask id={worksiteId} />
    </div>
  );
};

export default PlanningDetails;
