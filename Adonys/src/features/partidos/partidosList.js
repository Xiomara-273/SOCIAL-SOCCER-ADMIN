import { partidosService } from './partidos.service.js';
import { resultadosService } from '../resultados/resultados.service.js';
import { renderResultsConsole } from '../resultados/resultadosForm.js';
import { renderMatchModal } from './partidosForm.js';

export function renderPartidosList(tab, containerId, refreshApp) {
    const container = document.getElementById(containerId);
    let matches = [];

    // Filtros
    if (tab === 'programados') matches = partidosService.getByStatus('programado');
    else if (tab === 'envivo') matches = partidosService.getByStatus('en juego');
    else if (tab === 'finalizado') matches = partidosService.partidos.filter(p => p.status === 'finalizado' || p.status === 'correccion');
    else if (tab === 'cancelados') matches = partidosService.getByStatus('cancelado');

    if (matches.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-20 text-center opacity-40 flex flex-col items-center justify-center animate-fade">
                <i data-lucide="shield-alert" class="w-16 h-16 mb-4 text-white"></i>
                <p class="font-black italic text-xl uppercase text-white tracking-widest">No hay partidos aquí</p>
            </div>
        `;
        if(window.lucide) lucide.createIcons();
        return;
    }

    container.innerHTML = matches.map(m => `
        <div class="glass-panel rounded-[50px] p-8 relative overflow-hidden group animate-fade hover-lift ${m.status === 'en juego' || m.status === 'correccion' ? 'border-indigo-500/50 shadow-[0_0_50px_rgba(79,70,229,0.15)]' : ''}">
            
            <div class="flex justify-between items-center mb-6">
                <span class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest 
                    ${m.status === 'en juego' ? 'bg-rose-600 text-white animate-pulse' : 
                      m.status === 'correccion' ? 'bg-yellow-500 text-black animate-pulse' : 
                      'bg-white/5 text-slate-400'}">
                    ${m.status === 'correccion' ? 'EDITANDO' : m.status}
                </span>
                <div class="flex gap-2" id="actions-${m.id}"></div>
            </div>

            <div class="flex justify-between items-center gap-2 text-center mb-6">
                <h3 class="flex-1 text-xl font-black italic uppercase text-white leading-none">${m.home}</h3>
                <div class="bg-black/50 px-5 py-3 rounded-[25px] border border-white/5 shadow-inner min-w-[90px]">
                    <span class="text-4xl font-black text-white tabular-nums">${m.scoreHome}:${m.scoreAway}</span>
                </div>
                <h3 class="flex-1 text-xl font-black italic uppercase text-white leading-none">${m.away}</h3>
            </div>

            <div class="grid grid-cols-2 gap-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest border-t border-white/5 pt-4">
                <div class="flex items-center gap-2"><i data-lucide="map-pin" class="w-3 h-3 text-indigo-500"></i> ${m.court}</div>
                <div class="flex items-center gap-2"><i data-lucide="clock" class="w-3 h-3 text-indigo-500"></i> ${m.time}</div>
                <div class="flex items-center gap-2 col-span-2"><i data-lucide="user" class="w-3 h-3 text-indigo-500"></i> ${m.referee}</div>
            </div>

            <div id="console-${m.id}"></div>

            <div id="events-${m.id}" class="mt-4 space-y-2 max-h-40 overflow-y-auto pr-1"></div>
            
            ${m.mvp && m.status !== 'correccion' ? `
            <div class="mt-4 bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl flex items-center gap-3">
                <i data-lucide="crown" class="w-4 h-4 text-yellow-500"></i>
                <div><p class="text-[8px] font-black uppercase text-yellow-500">MVP</p><p class="text-xs font-black uppercase italic text-white">${m.mvp}</p></div>
            </div>` : ''}
        </div>
    `).join('');

    // Hidratación
    matches.forEach(m => {
        const actionContainer = document.getElementById(`actions-${m.id}`);
        
        if (m.status === 'programado') {
            actionContainer.innerHTML = `
                <button class="btn-edit p-2 bg-white/5 rounded-xl hover:text-indigo-400 transition-colors" data-id="${m.id}"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
                <button class="btn-start px-3 py-2 bg-indigo-600 rounded-xl text-[9px] font-black uppercase text-white flex items-center gap-1 hover:bg-indigo-500 transition-colors" data-id="${m.id}"><i data-lucide="play" class="w-3 h-3"></i> Iniciar</button>
                <button class="btn-cancel p-2 bg-white/5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors" data-id="${m.id}"><i data-lucide="ban" class="w-4 h-4"></i></button>
            `;
        } 
        else if (m.status === 'en juego') {
            actionContainer.innerHTML = `
                <button class="btn-end px-3 py-2 bg-emerald-600 rounded-xl text-[9px] font-black uppercase text-white hover:bg-emerald-500 transition-colors" data-id="${m.id}"><i data-lucide="check-circle" class="w-3 h-3"></i> Finalizar</button>
            `;
            renderResultsConsole(m.id, `console-${m.id}`, refreshApp);
        } 
        else if (m.status === 'finalizado') {
            actionContainer.innerHTML = `
                <button class="btn-rectify p-2 bg-white/5 rounded-xl text-slate-400 hover:text-white flex items-center gap-1 text-[9px] font-black uppercase transition-colors" data-id="${m.id}"><i data-lucide="pencil" class="w-3 h-3"></i> Rectificar</button>
            `;
        }
        else if (m.status === 'correccion') {
            actionContainer.innerHTML = `
                <button class="btn-save-rectify px-3 py-2 bg-emerald-600 rounded-xl text-[9px] font-black uppercase text-white hover:bg-emerald-500 transition-colors flex items-center gap-1" data-id="${m.id}"><i data-lucide="save" class="w-3 h-3"></i> Guardar</button>
            `;
            renderResultsConsole(m.id, `console-${m.id}`, refreshApp);
        }

        const eventsContainer = document.getElementById(`events-${m.id}`);
        if(m.events.length > 0) {
            const canDelete = m.status === 'en juego' || m.status === 'correccion';
            eventsContainer.innerHTML = m.events.map(e => `
                <div class="flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/5">
                    <span class="text-[10px] font-bold text-slate-300 uppercase italic">
                        ${e.player} <span class="${e.type === 'GOL' ? 'text-indigo-400' : 'text-yellow-500'}">(${e.type})</span>
                    </span>
                    ${canDelete ? `<button class="btn-delete-event text-rose-500 hover:scale-110 transition-transform p-1" data-match="${m.id}" data-event="${e.id}"><i data-lucide="trash-2" class="w-3 h-3"></i></button>` : ''}
                </div>
            `).join('');
        }
    });

    // Listeners
    container.querySelectorAll('.btn-edit').forEach(b => b.onclick = () => renderMatchModal(matches.find(p => p.id == b.dataset.id), null, refreshApp));
    container.querySelectorAll('.btn-start').forEach(b => { b.onclick = () => { partidosService.updateStatus(b.dataset.id, 'en juego'); refreshApp(); } });
    container.querySelectorAll('.btn-cancel').forEach(b => { b.onclick = () => { partidosService.updateStatus(b.dataset.id, 'cancelado'); refreshApp(); } });
    container.querySelectorAll('.btn-end').forEach(b => { b.onclick = () => { partidosService.updateStatus(b.dataset.id, 'finalizado'); refreshApp(); } });
    container.querySelectorAll('.btn-rectify').forEach(b => { b.onclick = () => { partidosService.updateStatus(b.dataset.id, 'correccion'); refreshApp(); } });
    container.querySelectorAll('.btn-save-rectify').forEach(b => { b.onclick = () => { partidosService.updateStatus(b.dataset.id, 'finalizado'); refreshApp(); } });
    container.querySelectorAll('.btn-delete-event').forEach(b => { b.onclick = () => { resultadosService.deleteEvent(b.dataset.match, b.dataset.event); refreshApp(); } });

    if(window.lucide) lucide.createIcons();
}