import { taskInterface } from '@/interfaces/taskInterface';
import { toast } from 'react-toastify';
import { useApi } from '../hooks/useApi';
const api = useApi();

export async function getPlanning(id: number) {
  try {
    const { data } = await api.get(`tasks/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    toast.error(`Une erreur est survenue ${error}`);
    throw error;
  }
}

export async function getTasks(id: number, date?: string) {
  try {
    const { data } = await api.get(`tasks/${id}/${date}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    toast.error(`Une erreur est survenue ${error}`);
    throw error;
  }
}

export async function getTaskById(id: number) {
  try {
    const { data } = await api.get(`tasks/detail/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    toast.error(`Une erreur est survenue ${error}`);
    throw error;
  }
}

export const updateTaskById = async (id: number, taskData: taskInterface) => {
  try {
    const response = await api.patch(`tasks/${id}`, taskData, {
      withCredentials: true,
    });
    toast.success('Tâche mise à jour avec succès');
    return response.data;
  } catch (error) {
    toast.error(`Une erreur est survenue ${error}`);
    throw error;
  }
};

export const createTask = async (taskData: taskInterface) => {
  try {
    const response = await api.post('/tasks', taskData, {
      withCredentials: true,
    });
    toast.success('Tâche créée avec succès');
    return response.data;
  } catch (error) {
    toast.error(`Une erreur est survenue ${error}`);
    throw error;
  }
};
