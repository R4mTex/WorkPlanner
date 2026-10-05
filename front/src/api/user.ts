import { UserInterface } from "@/interfaces/userInterface";
import { toast } from "react-toastify";
import { useApi } from "../hooks/useApi";

const api = useApi();

export async function getUserById(id: any) {
	try {
		// console.log("here user.ts id : ", id);
		const { data } = await api.get(`user/${id}`);
		return data;
	} catch (error) {
		toast.error(`Une erreur est survenue ${error}`);
		throw error;
	}
}

export const login = async (userData: UserInterface) => {
	try {
		const response = await api.post("/login", userData, {
			withCredentials: true,
		});
		toast.success("Connexion réussi");
		return response;
	} catch (error) {
		toast.error(`Une erreur est survenue ${error}`);
		throw error;
	}
};

export const createUser = async (userData: UserInterface) => {
	try {
		const response = await api.post("/signup", userData, {
			withCredentials: true,
		});
		toast.success("Compte crée avec succès");
		return response.data;
	} catch (error) {
		toast.error(`Une erreur est survenu ${error}`);
	}
};
