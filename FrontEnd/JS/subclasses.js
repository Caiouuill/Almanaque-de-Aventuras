console.log("JS de subclasses carregado");


document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.sub-btn');
    const panels = document.querySelectorAll('.subclass-panel');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;

            // remove ativo
            buttons.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // ativa selecionado
            button.classList.add('active');
            document
                .querySelector(`.subclass-panel[data-content="${tab}"]`)
                .classList.add('active');
        });
    });
});
