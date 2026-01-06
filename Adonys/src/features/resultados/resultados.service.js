// src/features/resultados/resultados.service.js
import { partidosService } from '../partidos/partidos.service.js';

class ResultadosService {
    addEvent(matchId, eventData) {
        const match = partidosService.partidos.find(p => p.id === Number(matchId));
        if (!match) return;

        // Lógica de Goles
        if (eventData.type === 'GOL') {
            if (eventData.team === 'home') match.scoreHome++;
            else match.scoreAway++;
        }

        match.events.unshift({
            id: Date.now(),
            ...eventData
        });
    }

    deleteEvent(matchId, eventId) {
        const match = partidosService.partidos.find(p => p.id === Number(matchId));
        if (!match) return;

        const eventIndex = match.events.findIndex(e => e.id === Number(eventId));
        if (eventIndex !== -1) {
            const event = match.events[eventIndex];
            // Si borramos gol, restamos marcador
            if (event.type === 'GOL') {
                if (event.team === 'home') match.scoreHome--;
                else match.scoreAway--;
            }
            match.events.splice(eventIndex, 1);
        }
    }

    setMVP(matchId, playerName) {
        const match = partidosService.partidos.find(p => p.id === Number(matchId));
        if (match) match.mvp = playerName;
    }
}

export const resultadosService = new ResultadosService();