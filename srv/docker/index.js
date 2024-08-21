// backend/dockerManager.js
import Docker from 'dockerode';
import { config } from '../config/index.js';

const docker = new Docker();

export function initDockerManager(io) {
    io.on('connection', (socket) => {
        socket.on('startSession', async () => {
            const container = await docker.createContainer({
                Image: config.dockerImage,
                Tty: true,
            });
            await container.start();
            // Handle WebRTC signaling and stream setup
        });

        socket.on('endSession', async (containerId) => {
            const container = docker.getContainer(containerId);
            await container.stop();
            await container.remove();

            socket.emit('sessionEnded', '/main'); // Redirect to main page
        });
    });
}
