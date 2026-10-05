import { useApi } from "../hooks/useApi";
import { toast } from "react-toastify";
const api = useApi();

export async function deleteById(id?: number, label?: string, path?: string) {
    try {
        const { data } = await api.delete(`${path}/${id}`, {
            withCredentials: true,
        });
        toast.success(`${label} supprimer avec succès`);
        return data;
    } catch (error) {
        toast.error(`Une erreur est survenu ${error}`);
    }
}
