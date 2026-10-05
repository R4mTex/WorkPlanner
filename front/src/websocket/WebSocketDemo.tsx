// WebSocketDemo.tsx

import { createNotification } from "@/api/notification";
import React, { useEffect, useState } from "react";

const userId = "1";

const WebSocketDemo: React.FC = () => {
	const [notifications, setNotifications] = useState<string[]>([]);
	const [notificationCount, setNotificationCount] = useState(0);

	useEffect(() => {
		const socket = new WebSocket("ws://localhost:8080");

		socket.onopen = () => {
			socket.send(JSON.stringify({ type: "identify", userId }));
			console.log("[WebSocket] Connected and identified");
		};

		socket.onmessage = (event) => {
			try {
				const notification = JSON.parse(event.data);
				if (notification.type === "identify") return;

				console.log("[WebSocket] Notification reçue :", notification);

				setNotifications((prev) => [...prev, notification.description || JSON.stringify(notification)]);
				setNotificationCount((count) => count + 1);

				const audio = new Audio("src/assets/sounds/system-notification.mp3");
				audio.volume = 0.3;
				audio.play();
			} catch (error) {
				console.error("Erreur de parsing", error);
			}
		};

		return () => {
			socket.close();
		};
	}, []);

	const triggerNotification = async () => {
		await createNotification({
			tag: "ParticipantAdded",
			description: "Un participant a été ajouté au chantier",
			author: "Admin",
			read: false,
			worksiteId: 1,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		});
	};

	return (
		<div className="p-4 max-w-xl mx-auto mb-10">
			<h2 className="text-2xl font-bold mb-4">WebSocket Demo</h2>
			<p className="mb-4 font-semibold">Notifications reçues : ({notificationCount})</p>
			<div className="space-y-4">
				{notifications.map((notification, index) => (
					<div key={index} className="bg-white shadow-md rounded-md p-4 break-words max-w-full box-border">
						<pre className="whitespace-pre-wrap text-sm text-gray-700">
							{typeof notification === "string" ? notification : JSON.stringify(notification, null, 2)}
						</pre>
					</div>
				))}
			</div>
			<button
				onClick={triggerNotification}
				className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
			>
				Envoyer une notification <b>test</b>
			</button>
		</div>
	);
};

export default WebSocketDemo;
