import { useApi } from "../hooks/useApi";
import { WorksiteInterface } from "@/interfaces/worksiteInterface";

const api = useApi();

export async function getWorksites() {
	try {
		const { data } = await api.get(`worksite/`, { withCredentials: true });
		return data;
	} catch (error) {
		// console.log("GET All - Error fetching worksites : ", error);
		throw error;
	}
}

export async function getWorksiteById(id: number) {
	try {
		const { data } = await api.get(`worksite/${id}`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		// console.log("GET by ID - Error fetching worksite by ID : ", error);
		throw error;
	}
}

export async function createWorksite(createdWorksite: WorksiteInterface) {
	try {
		// console.log("POST - Payload send to the backend : ", createdWorksite);
		const { data } = await api.post(`worksite/`, createdWorksite, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		// console.log("POST - Error creating worksite : ", error);
		throw error;
	}
}

export interface UploadResponse {
	url: string;
}

export async function uploadImage(file: File): Promise<UploadResponse> {
	const formData = new FormData();
	formData.append("file", file);

	try {
		// console.log("POST - File send to the backend : ", file);
		const { data } = await api.post("/upload/worksite-image", formData, {
			withCredentials: true,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return data;
	} catch (error) {
		// console.error("POST - Error upload file : ", error);
		throw error;
	}
}

export async function patchWorksiteById(id: number, updatedWorksite: WorksiteInterface) {
	try {
		// console.log("PATCH - Payload send to the backend : ", updatedWorksite);
		const { data } = await api.patch(`worksite/${id}`, updatedWorksite, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		// console.log("PATCH - Error patching worksite by ID : ", error);
		throw error;
	}
}

export async function deleteWorksiteById(id: number) {
	try {
		const { data } = await api.delete(`worksite/${id}`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		// console.log("DELETE - Error deleting worksite by ID : ", error);
		throw error;
	}
}
