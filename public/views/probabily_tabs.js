// Função para exibir a aba selecionada e esconder as demais
function mostrarAba(abaSelecionada) {
  const abas = document.querySelectorAll('.aba');
  abas.forEach(aba => {
    aba.style.display = 'none';
  });

  const abaAtiva = document.getElementById(abaSelecionada);
  if (abaAtiva) {
    abaAtiva.style.display = 'block';
  }

  const links = document.querySelectorAll('#tabMenu .nav-link');
  links.forEach(link => link.classList.remove('active'));

  const activeLink = Array.from(links).find(link =>
    link.getAttribute('onclick')?.includes(abaSelecionada)
  );
  if (activeLink) activeLink.classList.add('active');
  // Corrige rolagem automática ou espaçamento ao trocar de aba
window.scrollTo(0, 0);

}

// Inicializa com a aba "binomial" visível
document.addEventListener('DOMContentLoaded', function () {
  mostrarAba('binomial');
  // Corrige rolagem automática ou espaçamento ao trocar de aba

});
