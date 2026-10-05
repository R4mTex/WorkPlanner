import { IncidentInterface } from '@/interfaces/incidentInterface';
import { toast } from 'react-toastify';
import { useApi } from '../hooks/useApi';

const api = useApi();

export async function getIncidentById(id: number) {
  try {
    const { data } = await api.get(`incident/${id}`);
    return data;
  } catch (error) {
    toast.error(`Une erreur est survenue ${error}`);
    throw error;
  }
}

export const updateIncidentById = async (
  id: number,
  data: IncidentInterface
) => {
  try {
    const response = await api.patch(`incident/task/${id}`, data);
    toast.success('Incident mise à jour avec succès');
    return response.data;
  } catch (error) {
    toast.error(`Une erreur est survenu ${error}`);
  }
};

export const createIncident = async (
  taskId: number,
  data: IncidentInterface
) => {
  try {
    const response = await api.post(`incident/task/${taskId}`, data, {
      withCredentials: true,
    });
    toast.success('Incident créée avec succès');
    return response.data;
  } catch (error) {
    toast.error(`Une erreur est survenu ${error}`);
  }
};

export async function getIncidentType() {
  try {
    const { data } = await api.get(`incident-type`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    toast.error(`Une erreur est survenue ${error}`);
    throw error;
  }
}
export async function getIncidentTypeById(id: number) {
  try {
    const { data } = await api.get(`incident-type/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    toast.error(`Une erreur est survenue ${error}`);
    throw error;
  }
}
