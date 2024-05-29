//--------------------------------- Manejo de dark mode / light mode ---------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('darkModeToggle');
    const body = document.body;
  
    // Cargar el modo guardado del localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark-mode');
      toggleButton.textContent = 'Modo Claro';
    }
  
    toggleButton.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
  
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        toggleButton.textContent = 'Modo Claro';
      } else {
        localStorage.setItem('darkMode', 'disabled');
        toggleButton.textContent = 'Modo Oscuro';
      }
    });
  });