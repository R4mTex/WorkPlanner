import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TaskIncident, taskInterface } from "@/interfaces/taskInterface";
import { getTasks, getTaskById, updateTaskById, createTask } from "@/api/tasks";
import { deleteById } from "@/api/deleteById";
import { IncidentInterface } from "@/interfaces/incidentInterface";
import {
    createIncident,
    getIncidentTypeById,
    updateIncidentById,
} from "@/api/incident";

/**
 * Interface définissant la structure du store des tâches
 * @property tasks - Liste des tâches
 * @property currentTask - Tâche actuellement sélectionnée
 * @property loading - État de chargement
 * @property error - Message d'erreur éventuel
 */
interface TasksState {
    tasks: taskInterface[];
    currentTask: taskInterface | null;
    loading: boolean;
    error: string | null;
    originalTasks: taskInterface[];
    // Actions
    fetchTasks: (id: number, date?: string) => Promise<void>;
    fetchTaskById: (id: number) => Promise<void>;
    updateTask: (id: number, taskData: taskInterface) => Promise<void>;
    addTask: (taskData: taskInterface) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    clearCurrentTask: () => void;
    manageIncident: (
        taskId: number,
        incidentData: IncidentInterface,
        incidentId?: number
    ) => Promise<void>;
    deleteIncident: (taskId: number, incidentId: number) => Promise<void>;
    setTasks: (newTasks: taskInterface[]) => void;
    searchTask: (value: string) => void;
}

export const useTasksStore = create<TasksState>()(
    persist(
        (set, get) => ({
            tasks: [],
            originalTasks: [],
            currentTask: null,
            loading: false,
            error: null,

            fetchTasks: async (id: number, date?: string) => {
                set({ loading: true, error: null });
                try {
                    const tasks = await getTasks(id, date);
                    set({ tasks, originalTasks: tasks, loading: false });
                } catch (error) {
                    set({
                        error: "Erreur lors de la récupération des tâches",
                        loading: false,
                    });
                }
            },

            searchTask: async (value: string) => {
                set({ loading: true, error: null });
                try {
                    const originalTasks = get().originalTasks;
                    const filteredTasks = originalTasks.filter(
                        (task: taskInterface) => {
                            return value
                                ? task.name
                                      .toLowerCase()
                                      .includes(value.toLowerCase())
                                : true;
                        }
                    );
                    set({ tasks: filteredTasks, loading: false });
                } catch (error) {
                    set({
                        error: "Erreur lors de la récupération des tâches",
                        loading: false,
                    });
                }
            },

            setTasks: (newTasks: taskInterface[]) => {
                set({ tasks: newTasks, originalTasks: newTasks });
            },
            /**
             * Récupère une tâche spécifique par son ID
             * Vérifie d'abord le cache avant de faire un appel API
             * @param id - ID de la tâche à récupérer
             */
            fetchTaskById: async (id: number) => {
                const existingTask = get().tasks.find((task) => task.id === id);
                if (existingTask) {
                    set({ currentTask: existingTask });
                    return;
                }
                set({ loading: true, error: null });
                try {
                    const task = await getTaskById(id);
                    set({ currentTask: task, loading: false });
                } catch (error) {
                    set({
                        error: "Erreur lors de la récupération de la tâche",
                        loading: false,
                    });
                }
            },

            /**
             * Met à jour une tâche existante
             * Conserve les incidents existants lors de la mise à jour
             * @param id - ID de la tâche à mettre à jour
             * @param taskData - Nouvelles données de la tâche
             */
            updateTask: async (id: number, taskData: taskInterface) => {
                set({ loading: true, error: null });
                try {
                    const updatedTask = await updateTaskById(id, taskData);
                    set((state) => {
                        // Trouver la tâche existante pour conserver ses incidents
                        const existingTask = state.tasks.find(
                            (task) => task.id === id
                        );
                        const taskWithIncidents = {
                            ...updatedTask,
                            incidents: existingTask?.incidents || [],
                        };

                        return {
                            tasks: state.tasks.map((task) =>
                                task.id === id ? taskWithIncidents : task
                            ),
                            currentTask:
                                state.currentTask?.id === id
                                    ? taskWithIncidents
                                    : state.currentTask,
                            loading: false,
                        };
                    });
                } catch (error) {
                    set({
                        error: "Erreur lors de la mise à jour de la tâche",
                        loading: false,
                    });
                }
            },

            /**
             * Crée une nouvelle tâche
             * @param taskData - Données de la nouvelle tâche
             */
            addTask: async (taskData: taskInterface) => {
                set({ loading: true, error: null });
                try {
                    const newTask = await createTask(taskData);
                    set((state) => ({
                        tasks: [...state.tasks, newTask],
                        loading: false,
                    }));
                } catch (error) {
                    set({
                        error: "Erreur lors de la création de la tâche",
                        loading: false,
                    });
                }
            },

            /**
             * Supprime une tâche
             * Réinitialise currentTask si la tâche supprimée était la tâche courante
             * @param id - ID de la tâche à supprimer
             */
            deleteTask: async (id: number) => {
                set({ loading: true, error: null });
                try {
                    await deleteById(id, "la tâche", "tasks");
                    set((state) => ({
                        tasks: state.tasks.filter((task) => task.id !== id),
                        currentTask:
                            state.currentTask?.id === id
                                ? null
                                : state.currentTask,
                        loading: false,
                    }));
                } catch (error) {
                    set({
                        error: "Erreur lors de la suppression de la tâche",
                        loading: false,
                    });
                }
            },

            /**
             * Réinitialise la tâche courante
             * Utilisé pour nettoyer l'état après une action
             */
            clearCurrentTask: () => {
                set({ currentTask: null });
            },

            /**
             * Gère l'ajout ou la mise à jour d'un incident
             * @param taskId - ID de la tâche concernée
             * @param incidentData - Données de l'incident
             * @param incidentId - ID de l'incident (optionnel, pour mise à jour uniquement)
             */
            manageIncident: async (
                taskId: number,
                incidentData: IncidentInterface,
                incidentId?: number
            ): Promise<void> => {
                set({ loading: true, error: null });
                try {
                    const isUpdate = incidentId !== undefined;
                    let incidentID: number;
                    let incident;
                    if (isUpdate) {
                        incidentID = Number(incidentId);
                        await updateIncidentById(incidentID, incidentData);
                        incident = {
                            ...incidentData,
                            id: incidentID,
                        };
                    } else {
                        incident = await createIncident(taskId, incidentData);
                        incidentID = Number(incident.id);
                    }

                    const incidentTypeData = await getIncidentTypeById(
                        incidentData.incidentTypeId
                    );

                    // Crée un objet incident avec le format correct
                    const formattedIncident = {
                        ...incident,
                        incidentTypes: [
                            {
                                incidentId: incidentID,
                                incidentTypeId: incidentTypeData.id,
                                incidentType: {
                                    id: incidentTypeData.id,
                                    name: incidentTypeData.name,
                                },
                            },
                        ],
                    };

                    // Mise à jour du store local
                    set((state) => {
                        // Mise à jour des tâches
                        const updatedTasks = state.tasks.map((task) => {
                            if (task.id === taskId) {
                                let incidents;

                                if (isUpdate && task.incidents) {
                                    // Mise à jour d'un incident existant
                                    incidents = task.incidents.map(
                                        (taskIncident: TaskIncident) =>
                                            taskIncident.incidentId ===
                                            incidentID
                                                ? {
                                                      ...taskIncident,
                                                      incident:
                                                          formattedIncident,
                                                  }
                                                : taskIncident
                                    );
                                } else {
                                    // Ajout d'un nouvel incident
                                    const newTaskIncident: TaskIncident = {
                                        taskId: taskId,
                                        incidentId: incidentID,
                                        incident: formattedIncident,
                                    };

                                    incidents = task.incidents
                                        ? [...task.incidents, newTaskIncident]
                                        : [newTaskIncident];
                                }

                                return { ...task, incidents: incidents };
                            }
                            return task;
                        });

                        // Mise à jour de la tâche courante si nécessaire
                        let updatedCurrentTask = state.currentTask;

                        if (state.currentTask?.id === taskId) {
                            if (isUpdate && state.currentTask.incidents) {
                                // Mise à jour d'un incident existant dans la tâche courante
                                updatedCurrentTask = {
                                    ...state.currentTask,
                                    incidents: state.currentTask.incidents.map(
                                        (taskIncident: TaskIncident) =>
                                            taskIncident.incidentId ===
                                            incidentID
                                                ? {
                                                      ...taskIncident,
                                                      incident:
                                                          formattedIncident,
                                                  }
                                                : taskIncident
                                    ),
                                };
                            } else {
                                // Ajout d'un nouvel incident à la tâche courante
                                const newTaskIncident: TaskIncident = {
                                    taskId: taskId,
                                    incidentId: incidentID,
                                    incident: formattedIncident,
                                };

                                updatedCurrentTask = {
                                    ...state.currentTask,
                                    incidents: state.currentTask.incidents
                                        ? [
                                              ...state.currentTask.incidents,
                                              newTaskIncident,
                                          ]
                                        : [newTaskIncident],
                                };
                            }
                        }

                        return {
                            tasks: updatedTasks,
                            currentTask: updatedCurrentTask,
                            loading: false,
                        };
                    });
                } catch (error) {
                    console.error(
                        `Erreur lors de ${
                            incidentId ? "la mise à jour" : "l'ajout"
                        } de l'incident:`,
                        error
                    );
                    set({
                        error: `Erreur lors de ${
                            incidentId ? "la mise à jour" : "l'ajout"
                        } de l'incident`,
                        loading: false,
                    });
                }
            },
            /**
             * Supprime un incident du cache
             * @param taskId - ID de la tâche contenant l'incident
             * @param incidentId - ID de l'incident à supprimer
             */
            deleteIncident: async (
                taskId: number,
                incidentId: number
            ): Promise<void> => {
                set({ loading: true, error: null });
                try {
                    await deleteById(incidentId, "l'incident", "incident");
                    set((state) => {
                        const updatedTasks = state.tasks.map((task) => {
                            if (task.id === taskId && task.incidents) {
                                const incidents = task.incidents.filter(
                                    (taskIncident: TaskIncident) =>
                                        taskIncident.incidentId !== incidentId
                                );
                                return { ...task, incidents: incidents };
                            }
                            return task;
                        });

                        const updatedCurrentTask =
                            state.currentTask?.id === taskId &&
                            state.currentTask.incidents
                                ? {
                                      ...state.currentTask,
                                      incidents:
                                          state.currentTask.incidents.filter(
                                              (taskIncident: TaskIncident) =>
                                                  taskIncident.incidentId !==
                                                  incidentId
                                          ),
                                  }
                                : state.currentTask;

                        return {
                            tasks: updatedTasks,
                            currentTask: updatedCurrentTask,
                            loading: false,
                        };
                    });
                } catch (error) {
                    set({
                        error: "Erreur lors de la suppression de l'incident",
                        loading: false,
                    });
                }
            },
        }),
        {
            name: "tasks-storage",
            partialize: (state) => ({
                tasks: state.tasks,
                currentTask: state.currentTask,
            }),
        }
    )
);
