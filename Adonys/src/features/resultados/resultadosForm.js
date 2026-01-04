import { resultadosService } from './resultados.service.js';
import { partidosService } from '../partidos/partidos.service.js';

export function renderResultsConsole(matchId, containerId, onUpdate) {
    const container = document.getElementById(containerId);
    const match = partidosService.partidos.find(p => p.id === matchId);
    if (!match) return;

    let selectedTeam = 'home'; 

    // Helper para generar botones de acción bonitos
    function generateButton(type, color, icon) {
        const colors = {
            indigo: 'from-indigo-600 to-indigo-800 border-indigo-500/30',
            yellow: 'from-yellow-400 to-yellow-600 border-yellow-400/30 text-black',
            rose: 'from-rose-600 to-rose-800 border-rose-500/30',
            amber: 'from-amber-400 to-amber-600 border-amber-400/30 text-black'
        };
        
        return `
        <button class="btn-action group relative overflow-hidden bg-gradient-to-br ${colors[color]} p-4 rounded-2xl border hover:-translate-y-1 transition-all shadow-lg active:scale-95 active:translate-y-0" data-type="${type}">
            <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex flex-col items-center gap-1">
                <i data-lucide="${icon}" class="w-6 h-6 group-hover:scale-110 transition-transform"></i>
                <span class="text-[8px] font-black uppercase tracking-widest mt-1 opacity-90">${type.replace('T.', '')}</span>
            </div>
        </button>`;
    }

    container.innerHTML = `
        <div class="mt-6 glass-panel p-6 rounded-[35px] shadow-2xl animate-fade" style="animation-delay: 0.1s">
            
            <div class="flex bg-black/40 p-1.5 rounded-2xl mb-4 border border-white/5 relative">
                <button id="btn-team-home-${matchId}" class="flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-indigo-600 text-white shadow-lg border border-indigo-400/30">
                    ${match.home}
                </button>
                <button id="btn-team-away-${matchId}" class="flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-500 hover:text-white">
                    ${match.away}
                </button>
            </div>

            <div class="relative mb-6 group">
                <input id="input-player-${matchId}" 
                    placeholder="NOMBRE DEL JUGADOR..." 
                    class="w-full bg-white/5 text-white h-14 pl-12 pr-4 rounded-2xl font-black uppercase text-sm outline-none border-2 border-white/10 focus:border-indigo-500 focus:bg-black/50 transition-all placeholder:text-slate-500 text-center backdrop-blur-md">
                <i data-lucide="user" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors"></i>
            </div>

            <div class="grid grid-cols-4 gap-3">
                ${generateButton('GOL', 'indigo', 'trophy')}
                ${generateButton('T.AMARILLA', 'yellow', 'alert-triangle')}
                ${generateButton('T.ROJA', 'rose', 'alert-octagon')}
                ${generateButton('MVP', 'amber', 'crown')}
            </div>
        </div>
    `;

    // --- LÓGICA ---
    const btnHome = document.getElementById(`btn-team-home-${matchId}`);
    const btnAway = document.getElementById(`btn-team-away-${matchId}`);
    const inputPlayer = document.getElementById(`input-player-${matchId}`);

    const updateTeamSelection = (team) => {
        selectedTeam = team;
        const activeClass = "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-indigo-600 text-white shadow-lg border border-indigo-400/30 scale-105";
        const inactiveClass = "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-500 hover:text-white bg-transparent";
        
        if (team === 'home') {
            btnHome.className = activeClass;
            btnAway.className = inactiveClass;
        } else {
            btnAway.className = activeClass;
            btnHome.className = inactiveClass;
        }
        inputPlayer.focus();
    };

    btnHome.addEventListener('click', () => updateTeamSelection('home'));
    btnAway.addEventListener('click', () => updateTeamSelection('away'));

    container.querySelectorAll('.btn-action').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            const player = inputPlayer.value.trim().toUpperCase();

            if (!player) {
                inputPlayer.classList.add('border-rose-500', 'animate-pulse');
                setTimeout(() => inputPlayer.classList.remove('border-rose-500', 'animate-pulse'), 500);
                inputPlayer.focus();
                return;
            }

            // CONFETI TRIGGER
            if (type === 'GOL' || type === 'MVP') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: type === 'GOL' ? ['#4f46e5', '#ffffff'] : ['#fbbf24', '#ffffff']
                });
            }

            if (type === 'MVP') {
                resultadosService.setMVP(matchId, player);
            } else {
                resultadosService.addEvent(matchId, { player, team: selectedTeam, type, minute: '90' });
            }

            inputPlayer.value = '';
            onUpdate();
        });
    });

    if(window.lucide) window.lucide.createIcons();
}