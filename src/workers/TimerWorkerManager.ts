let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
    private worker: Worker;

    private constructor() {
        this.worker = new Worker(new URL("./timerWorker.js", import.meta.url));
    }

    public static getInstance(): TimerWorkerManager {
        if (!instance) {
            instance = new TimerWorkerManager();
        }
        return instance;
    }

    postMessage(message: any): void {
        console.log("Enviando mensagem para o worker: ", message);
        this.worker.postMessage(message);
    }

    onMessage(callback: (event: MessageEvent) => void): void {
        this.worker.onmessage = callback;
    }

    terminate(): void {
        this.worker.terminate();
        instance = null;
    }
}