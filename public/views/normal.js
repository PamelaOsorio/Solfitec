function EnviarNormalAPI() {
  const tipo = document.getElementById('opcao').value;
  const media = document.getElementById('media').value;
  const dp = document.getElementById('dp').value;
  const intervalo = document.getElementById('intervalo').value;

  fetch('/api/probability/nominal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo, media, dp, intervalo })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        document.getElementById('probnormal').textContent = `Probabilidade: ${data.probabilidade}%`;
        document.getElementById('probnormal').style.display = 'block';
      }
    })
    .catch(() => alert('Erro ao calcular'));
}
