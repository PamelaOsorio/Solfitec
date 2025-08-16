async function enviarBinomialAPI() {
  const n = parseInt(document.getElementById('amostra').value);

  let pRaw = document.getElementById('sucesso').value.replace(',', '.');
  let pNum = parseFloat(pRaw);
  if (pNum > 1) pNum /= 100; // caso usuário coloque em %

  let qRaw = document.getElementById('fracasso').value.replace(',', '.');
  let qNum = parseFloat(qRaw);
  if (qNum > 1) qNum /= 100;

  const kInput = document.getElementById('evento').value;
  const k = kInput.split(';').map(v => parseInt(v.trim())).filter(v => !isNaN(v));

  if (isNaN(n) || isNaN(pNum) || isNaN(qNum) || k.length === 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  if (Math.abs(pNum + qNum - 1) > 0.0001) {
    alert('Os valores de p e q devem somar 1.');
    return;
  }

  try {
    const response = await fetch('/api/probability/binomial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ n, p: pNum, q: qNum, k })
    });

    if (!response.ok) throw new Error("Erro na API");

    const resultado = await response.json();

    document.getElementById('resultado').innerHTML = `Probabilidade: ${resultado.probabilidade.toFixed(2)}%`;
    document.getElementById('mediabinomial').innerHTML = `Média: ${resultado.media.toFixed(2)}`;
    document.getElementById('desviopadrao').innerHTML = `Desvio Padrão: ${resultado.dp.toFixed(2)}`;
    document.getElementById('variacao').innerHTML = `Coeficiente de Variação: ${resultado.cv.toFixed(2)}%`;

    document.getElementById('resultado').style.display = 'block';
    document.getElementById('mediabinomial').style.display = 'block';
    document.getElementById('desviopadrao').style.display = 'block';
    document.getElementById('variacao').style.display = 'block';

  } catch (err) {
    alert("Erro ao calcular binomial.");
    console.error(err);
  }
}
