// src/app.js
import { renderPartidosList } from './features/partidos/partidosList.js';
import { renderMatchModal } from './features/partidos/partidosForm.js';

let activeTab = 'programados';

function init() {
    renderApp();
}

function renderApp() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <header class="mb-12 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-4">
                <div class="bg-indigo-600 p-4 rounded-[28px] shadow-[0_0_40px_rgba(79,70,229,0.4)]">
                    <i data-lucide="trophy" class="w-8 h-8 text-white"></i>
                </div>
                <div>
                    <h1 class="text-3xl font-black italic tracking-tighter uppercase text-white">Social Soccer</h1>
                    <p class="text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em]">Panel Admin</p>
                </div>
            </div>

            <nav class="flex bg-[#0d1117] p-2 rounded-[30px] border border-white/5 shadow-2xl">
                ${['programados', 'envivo', 'finalizado', 'cancelados'].map(tab => `
                    <button class="nav-btn px-6 py-3 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}" data-tab="${tab}">
                        ${tab === 'envivo' ? 'En Vivo' : tab}
                    </button>
                `).join('')}
            </nav>

            <button id="btn-new" class="bg-white text-black px-8 py-4 rounded-[22px] font-black italic uppercase text-[11px] tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
                <i data-lucide="plus" class="w-5 h-5"></i> Nuevo Partido
            </button>
        </header>

        <main id="matches-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            </main>
    `;

    // Renderizar Lista
    renderPartidosList(activeTab, 'matches-container', renderApp);

    // Eventos del Header
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            activeTab = e.target.dataset.tab;
            renderApp();
        });
    });

    document.getElementById('btn-new').addEventListener('click', () => {
        renderMatchModal(null, null, renderApp);
    });

    lucide.createIcons();
}

// Arrancar
init();