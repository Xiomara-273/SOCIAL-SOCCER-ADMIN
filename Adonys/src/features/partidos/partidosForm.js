// src/features/partidos/partidosForm.js
import { partidosService } from './partidos.service.js';

export function renderMatchModal(initialData = null, onClose, onSave) {
    const isEdit = !!initialData;
    const container = document.getElementById('modal-container');
    
    container.innerHTML = `
        <div class="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div class="bg-[#0d1117] border border-white/10 p-8 rounded-[40px] w-full max-w-md shadow-2xl relative animate-fade">
                <button id="close-modal" class="absolute top-6 right-6 text-slate-500 hover:text-white">
                    <i data-lucide="x"></i>
                </button>
                
                <h2 class="text-2xl font-black italic uppercase text-white mb-6 border-b border-white/10 pb-4">
                    ${isEdit ? 'Editar Partido' : 'Nuevo Partido'}
                </h2>

                <form id="match-form" class="space-y-4">
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-[9px] font-black uppercase text-indigo-500 ml-2">Local</label>
                            <input name="home" value="${initialData?.home || ''}" placeholder="LOCAL" required 
                                class="w-full bg-white text-black p-3 rounded-xl font-black uppercase text-xs outline-none border-2 border-transparent focus:border-indigo-500">
                        </div>
                        <div>
                            <label class="text-[9px] font-black uppercase text-indigo-500 ml-2">Visitante</label>
                            <input name="away" value="${initialData?.away || ''}" placeholder="VISITANTE" required 
                                class="w-full bg-white text-black p-3 rounded-xl font-black uppercase text-xs outline-none border-2 border-transparent focus:border-indigo-500">
                        </div>
                    </div>

                    <div>
                        <label class="text-[9px] font-black uppercase text-indigo-500 ml-2">Cancha</label>
                        <input name="court" value="${initialData?.court || ''}" placeholder="EJ: CANCHA 1" required 
                            class="w-full bg-white text-black p-3 rounded-xl font-black uppercase text-xs outline-none focus:border-indigo-500">
                    </div>

                    <div>
                        <label class="text-[9px] font-black uppercase text-indigo-500 ml-2">Árbitro</label>
                        <input name="referee" value="${initialData?.referee || ''}" placeholder="NOMBRE ÁRBITRO" required 
                            class="w-full bg-white text-black p-3 rounded-xl font-black uppercase text-xs outline-none focus:border-indigo-500">
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-[9px] font-black uppercase text-indigo-500 ml-2">Fecha</label>
                            <input type="date" name="date" value="${initialData?.date || ''}" required 
                                class="w-full bg-white text-black p-3 rounded-xl font-bold uppercase text-xs cursor-pointer">
                        </div>
                        <div>
                            <label class="text-[9px] font-black uppercase text-indigo-500 ml-2">Hora</label>
                            <input type="time" name="time" value="${initialData?.time || ''}" required 
                                class="w-full bg-white text-black p-3 rounded-xl font-bold uppercase text-xs cursor-pointer">
                        </div>
                    </div>

                     <div>
                        <label class="text-[9px] font-black uppercase text-indigo-500 ml-2">Tipo</label>
                        <select name="type" class="w-full bg-white text-black p-3 rounded-xl font-black uppercase text-xs outline-none">
                            <option value="amistoso" ${initialData?.type === 'amistoso' ? 'selected' : ''}>Amistoso</option>
                            <option value="reto" ${initialData?.type === 'reto' ? 'selected' : ''}>Reto</option>
                            <option value="torneo" ${initialData?.type === 'torneo' ? 'selected' : ''}>Torneo</option>
                        </select>
                    </div>

                    <button type="submit" class="w-full bg-indigo-600 text-white p-4 rounded-2xl font-black uppercase italic tracking-widest mt-2 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all">
                        ${isEdit ? 'Guardar Cambios' : 'Confirmar Registro'}
                    </button>
                </form>
            </div>
        </div>
    `;

    // Re-iniciar iconos
    lucide.createIcons();

    // Eventos
    document.getElementById('close-modal').addEventListener('click', () => {
        container.innerHTML = '';
        if(onClose) onClose();
    });

    document.getElementById('match-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.home = data.home.toUpperCase();
        data.away = data.away.toUpperCase();
        data.court = data.court.toUpperCase();
        data.referee = data.referee.toUpperCase();

        if (isEdit) {
            partidosService.update(initialData.id, data);
        } else {
            partidosService.create(data);
        }
        
        container.innerHTML = '';
        onSave();
    });
}