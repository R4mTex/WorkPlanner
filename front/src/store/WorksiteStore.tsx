import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WorksiteInterface } from "@/interfaces/worksiteInterface";
import { getWorksites, patchWorksiteById, getWorksiteById, createWorksite } from "@/api/worksite";
import { mergeEntity } from "@/function";

interface WorksiteStoreState {
	worksites: WorksiteInterface[];
	worksite: WorksiteInterface | null;
	error: string | null;
	isLoading: boolean;

	loadWorksites: () => Promise<void>;
	addWorksite: (worksite: WorksiteInterface) => Promise<void>;
	setWorksiteById: (id: number) => Promise<void>;
	updateWorksite: (updatedWorksite: WorksiteInterface) => Promise<void>;
	removeWorksite: (id: number) => void;
}

export const worksiteStore = create<WorksiteStoreState>()(
	persist(
		(set) => ({
			worksites: [],
			worksite: null,
			error: null,
			isLoading: false,

			loadWorksites: async () => {
				set({ isLoading: true, error: null });
				try {
					const response = await getWorksites();
					console.log("Worksites loaded:", response);
					set({ worksites: response });
				} catch (error: any) {
					console.error("Error loading worksites:", error);
					set({
						error: error.message || "Error when loading worksites.",
					});
				} finally {
					set({ isLoading: false });
				}
			},

			addWorksite: async (worksite: WorksiteInterface) => {
				set({ isLoading: true, error: null });
				try {
					const createdWorksite = await createWorksite(worksite);
					set((state) => {
						const worksitesArray = Array.isArray(state.worksites) ? state.worksites : [];
						return {
							worksites: [...worksitesArray, createdWorksite],
						};
					});

					console.log("Worksite created and added to store:", createdWorksite);
				} catch (error: any) {
					console.error("Error adding worksite:", error);
					set({
						error: error.message || "Error when adding worksite.",
					});
				} finally {
					set({ isLoading: false });
				}
			},

			setWorksiteById: async (id: number) => {
				set({ isLoading: true, error: null });
				try {
					const worksiteData = await getWorksiteById(id);
					console.log("Worksite set:", worksiteData);
					set({ worksite: worksiteData });
				} catch (error: any) {
					console.error("Error setting worksite by ID:", error);
					set({
						error: error.message || "Error during worksite recovery.",
					});
				} finally {
					set({ isLoading: false });
				}
			},

			updateWorksite: async (updatedWorksite: WorksiteInterface) => {
				set({ isLoading: true, error: null });
				try {
					const worksiteUpdated = await patchWorksiteById(updatedWorksite.id, updatedWorksite);
					console.log("Worksite updated:", worksiteUpdated);
					set((state) => ({
						worksite: mergeEntity(state.worksite, worksiteUpdated),
						worksites: state.worksites.map((worksite) =>
							worksite.id === worksiteUpdated.id ? { ...worksite, ...worksiteUpdated } : worksite
						),
					}));
				} catch (error: any) {
					console.error("Error updating worksite:", error);
					set({ error: error.message || "Error updating worksite." });
				} finally {
					set({ isLoading: false });
				}
			},

			removeWorksite: (id: number) => {
				set((state) => ({
					worksites: state.worksites.filter((worksite) => worksite.id !== id),
				}));
			},
		}),
		{
			name: "worksite-storage",
		}
	)
);
