async function enviarUniformeAPI() {
  const aRaw = document.getElementById('minimo').value.replace(',', '.');
  const bRaw = document.getElementById('maximo').value.replace(',', '.');
  const intervaloRaw = document.getElementById('dados').value;
  const medida = document.getElementById('opcao2').value;

  const a = parseFloat(aRaw);
  const b = parseFloat(bRaw);
  const intervaloArray = intervaloRaw.split(';').map(v => parseFloat(v.replace(',', '.').trim()));

  if (isNaN(a) || isNaN(b) || a >= b) {
    alert("Informe um ponto mínimo e máximo válidos (mínimo < máximo).");
    return;
  }
  if (intervaloArray.some(isNaN)) {
    alert("Informe um intervalo válido (exemplo: 5;10).");
    return;
  }

  const dados = { a, b, intervaloArray, medida };

  try {
    const response = await fetch('/api/probability/uniforme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);

    const resultado = await response.json();

    document.getElementById('prob').textContent = `Probabilidade: ${resultado.probabilidade.toFixed(2)}%`;
    document.getElementById('mediauniforme').textContent = `Média: ${resultado.media.toFixed(2)}`;
    document.getElementById('padrao').textContent = `Desvio Padrão: ${resultado.desvioPadrao.toFixed(2)}`;
    document.getElementById('coeficienteuniforme').textContent = `Coeficiente de variação: ${resultado.coeficienteVariacao.toFixed(2)}%`;

    ['prob', 'mediauniforme', 'padrao', 'coeficienteuniforme']
      .forEach(id => document.getElementById(id).style.display = 'block');

  } catch (error) {
    alert("Erro ao calcular distribuição uniforme.");
    console.error(error);
  }
}
