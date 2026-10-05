import { useApi } from "../hooks/useApi";
import { NotificationInterface } from "@/interfaces/notificationInterface";

const api = useApi();

export async function getNotifications() {
	try {
		const { data } = await api.get(`notification/`, { withCredentials: true });
		return data;
	} catch (error) {
		// console.log("GET All - Error fetching notifications : ", error);
		throw error;
	}
}

export async function createNotification(createNotification: NotificationInterface) {
	try {
		// console.log("POST - Payload send to the backend : ", createNotification);
		const { data } = await api.post(`notification/`, createNotification, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		// console.log("POST - Error creating notification : ", error);
		throw error;
	}
}

export async function deleteNotificationById(id: number) {
	try {
		const { data } = await api.delete(`notification/${id}`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		// console.log("DELETE - Error deleting notification by ID : ", error);
		throw error;
	}
}
