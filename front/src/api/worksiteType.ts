import { useApi } from "../hooks/useApi";
const api = useApi();

export async function getWorksiteType() {
    try {
        const { data } = await api.get(`worksite-type/`, {
            withCredentials: true,
        });
        return data;
    } catch (error) {
        console.log("GET All - Error fetching getWorksiteType:", error);
        throw error;
    }
}
