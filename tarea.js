const modal = document.getElementById('miModal');
const btnAbrir = document.getElementById('btnAbrir');
const btnCerrar = document.getElementById('btnCerrar');

btnAbrir.addEventListener('click', () => {
    modal.style.display = 'block';
});

btnCerrar.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});