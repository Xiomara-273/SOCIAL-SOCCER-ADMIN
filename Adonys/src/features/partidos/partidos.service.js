// src/features/partidos/partidos.service.js

class PartidosService {
    constructor() {
        this.partidos = [];
    }

    getAll() {
        return this.partidos;
    }

    getByStatus(status) {
        return this.partidos.filter(p => p.status === status);
    }

    create(data) {
        const newMatch = {
            id: Date.now(),
            ...data,
            scoreHome: 0,
            scoreAway: 0,
            status: 'programado', // programado, en juego, finalizado, cancelado
            events: [],
            mvp: ''
        };
        this.partidos.push(newMatch);
        return newMatch;
    }

    update(id, data) {
        const index = this.partidos.findIndex(p => p.id === Number(id));
        if (index !== -1) {
            this.partidos[index] = { ...this.partidos[index], ...data };
        }
    }

    delete(id) {
        this.partidos = this.partidos.filter(p => p.id !== Number(id));
    }

    updateStatus(id, status) {
        const match = this.partidos.find(p => p.id === Number(id));
        if (match) match.status = status;
    }
}

export const partidosService = new PartidosService();