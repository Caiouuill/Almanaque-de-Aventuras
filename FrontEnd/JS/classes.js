document.querySelectorAll('.filter-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const panel = document.querySelector(button.dataset.target);
    panel.classList.toggle('open');
  });
});


 document.querySelectorAll('.sub-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;

            const aberto = content.style.display === 'block';
            content.style.display = aberto ? 'none' : 'block';
        });
    });