import { getPlanning } from "@/api/tasks";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface planning {
    date: string;
    count: number;
}

interface planningStore {
    planning: planning[];
    error: string | null;
    loadPlanning: (id: number) => Promise<void>;
}

export const planningStore = create<planningStore>()(
    persist(
        (set) => ({
            planning: [],
            error: null,
            loadPlanning: async (id: number) => {
                try {
                    const response = await getPlanning(id);
                    interface Accumulator {
                        [date: string]: { date: string; count: number };
                    }
                    const result: planning[] = Object.values(
                        (response as string[]).reduce(
                            // acc : l'accumulateur, ici un objet qui va contenir chaque date unique comme clé
                            // dateStr : la date courante du tableau d'origine
                            (acc: Accumulator, dateStr: string) => {
                                const date: string = dateStr.slice(0, 10); // Garde uniquement la partie YYYY-MM-DD
                                if (!acc[date]) {
                                    // Si la date n'existe pas encore dans l'accumulateur, on l'ajoute avec un count à 1
                                    acc[date] = { date, count: 1 };
                                } else {
                                    // Si la date existe déjà, on incrémente simplement le count
                                    acc[date].count += 1;
                                }
                                return acc; // On retourne l'accumulateur à chaque itération
                            },
                            {} as Accumulator // L'accumulateur commence comme un objet vide
                        )
                    );
                    set({ planning: result, error: null });
                } catch (error) {
                    console.error("Error loading planning:", error);
                    set({ error: "Error when loading planning." });
                    toast.error("Error when loading planning.");
                }
            },
        }),
        {
            name: "planning-storage",
        }
    )
);
