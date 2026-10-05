import axios, { AxiosInstance } from "axios";

export function useApi() {
	const headers = {
		"Content-Type": "application/json",
		"Access-control-Allow-Origin": "*",
	};

	const api: AxiosInstance = axios.create({
		baseURL: "http://localhost:3000/",
		headers,
		withCredentials: true,
	});

	/* axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }); */

	// Intercepteur de réponse Axios
	api.interceptors.response.use(
		// Si la réponse est valide (statut 2xx), on la retourne telle quelle
		(response: any) => response,

		// Sinon, on intercepte l'erreur
		async (error: any) => {
			// Si l'erreur est une 401 (non autorisé)
			if (error.response && error.response.status === 401) {
				const originalRequest = error.config;

				// 1. Éviter refresh infini
				// Si la requête échouée est déjà un appel vers /refresh, inutile de tenter à nouveau
				if (originalRequest.url?.includes("/refresh")) {
					window.location.href = "/signin";
					return Promise.reject(error);
				}

				// 2. Éviter retry infini
				// Si la requête a déjà été réessayée, on évite une boucle infinie
				if (originalRequest._retry) {
					window.location.href = "/signin";
					return Promise.reject(error);
				}

				// 3. Sinon, on tente un refresh une seule fois
				// On marque la requête comme ayant été réessayée
				originalRequest._retry = true;
				try {
					// Tentative de renouvellement du token via /refresh
					await api.post("/refresh");

					// Si le refresh réussit, on relance la requête originale
					return api(originalRequest);
				} catch (refreshError) {
					// Si le refresh échoue (token expiré ou invalide), on redirige vers /signin
					window.location.href = "/signin";
					return Promise.reject(refreshError);
				}
			}

			// Si l'erreur est une 500 (erreur serveur), redirection vers la page d'accueil
			if (error.response && error.response.status === 500) {
				location.href = "/";
				// HS : Pour une meilleure UX, peut-être avoir une page dédiée à l'erreur 500
			}

			// Pour toutes les autres erreurs, on les rejette normalement
			return Promise.reject(error);
		}
	);

	// On retourne l'instance Axios configurée avec les intercepteurs
	return api;
}
