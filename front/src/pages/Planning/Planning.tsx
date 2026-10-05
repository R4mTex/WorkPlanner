import { useEffect } from "react";
import { useParams } from "react-router-dom";

import CardPlanning from "@/components/Card/CardPlanning";
import ButtonAddTask from "@/components/ui/btn/ButtonAddTask";
import { planningStore } from "@/store/planningStore";

const Planning = () => {
    const { id } = useParams();
    const newId = Number(id);
    const error = planningStore((state) => state.error);
    const { planning, loadPlanning } = planningStore();

    useEffect(() => {
        loadPlanning(newId);
    }, [newId]);

    useEffect(() => {
        if (error) {
        }
    }, [error]);

    return (
        <>
            <div className="header">
                <h1>Planning {id}</h1>
            </div>
            {planning.length === 0 ? (
                <p>Aucune tâche trouvée.</p>
            ) : (
                <div className="cardContainer">
                    {planning.map((planningItem) => (
                        <CardPlanning
                            id={newId}
                            key={planningItem.date}
                            data={planningItem}
                        />
                    ))}
                </div>
            )}

            <ButtonAddTask id={newId} />
        </>
    );
};

export default Planning;
