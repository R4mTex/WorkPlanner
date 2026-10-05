// websocket.gateway.ts

import * as WebSocket from 'ws';
import * as http from 'http';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../prisma/prisma.service';

const prisma = new PrismaService();

const server = http.createServer();
const wss = new WebSocket.Server({ server });

interface Client {
    id: string;
    userId: string | null;
    webSocket: WebSocket;
}

const clients: Map<string, Client> = new Map();
const userToClientIds: Map<string, Set<string>> = new Map();

wss.on('connection', (webSocket: WebSocket) => {
    const clientId = uuidv4();
    clients.set(clientId, { id: clientId, webSocket, userId: null });

    webSocket.send(
        JSON.stringify({
            type: 'identify',
            message: 'Please provide userId after connecting',
        }),
    );

    webSocket.on('message', (message: string) => {
        try {
            const parsed = JSON.parse(message);
            const client = clients.get(clientId);
            if (!client) return;

            if (parsed.type === 'identify') {
                client.userId = parsed.userId;

                if (!userToClientIds.has(parsed.userId)) {
                    userToClientIds.set(parsed.userId, new Set());
                }
                userToClientIds.get(parsed.userId)?.add(clientId);
            }
        } catch (error) {
            console.error('Message error:', error);
        }
    });

    webSocket.on('close', () => {
        const client = clients.get(clientId);
        if (client?.userId) {
            userToClientIds.get(client.userId)?.delete(clientId);
        }
        clients.delete(clientId);
    });
});

export async function broadcastNotificationToWorksiteUsers(notification: {
    tag: 'ParticipantAdded' | 'WorksiteReminder' | 'Incident';
    worksiteId: number;
    data: any;
    timestamp: number;
}): Promise<void> {
    const { worksiteId } = notification;
    const userIds = await getAllUserIdsLinkedToWorksite(worksiteId);

    userIds.forEach((userId) => {
        const clientIds = userToClientIds.get(userId.toString());
        if (clientIds) {
            clientIds.forEach((clientId) => {
                const client = clients.get(clientId);
                if (client?.webSocket.readyState === WebSocket.OPEN) {
                    client?.webSocket.send(JSON.stringify(notification));
                }
            });
        }
    });
}

server.listen(8080, () => {
    console.log('WebSocket server running on port 8080');
});

async function getAllUserIdsLinkedToWorksite(
    worksiteId: number,
): Promise<number[]> {
    const userWorksites = await prisma.userHasWorksite.findMany({
        where: { worksiteId },
        select: { userId: true },
    });

    return userWorksites.map((entry) => entry.userId);
}
