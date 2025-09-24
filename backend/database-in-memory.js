import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #clients = new Map()

    listClients() {
        return Array.from(this.#clients.values());
    }

    create(client) {
        const clientId = randomUUID();
        this.#clients.set(clientId, client);
        console.log('cliente criado')
    }

    update(id, client) {
        this.#clients.set(id, client);
    }
    
    delete(id) {
        this.#clients.delete(id);
    }
}