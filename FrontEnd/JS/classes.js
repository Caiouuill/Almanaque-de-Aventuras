document.querySelectorAll('.filter-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const panel = document.querySelector(button.dataset.target);
    panel.classList.toggle('open');
  });
});
