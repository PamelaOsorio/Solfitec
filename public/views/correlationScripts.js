window.calcular = async function () {
  const xInput = document.getElementById('x').value;
  const yInput = document.getElementById('y').value;

  const x = xInput.split(';').map(Number);
  const y = yInput.split(';').map(Number);

  if (!validarVetores(x, y)) return;

  try {
    const resultado = await enviarDadosParaAPI(x, y);
    exibirResultados(resultado, x, y);
  } catch (error) {
    alert("Erro no cálculo");
    console.error(error);
  }
};

// Valida se os vetores são válidos
function validarVetores(x, y) {
  if (x.length !== y.length || x.length === 0 || x.includes(NaN) || y.includes(NaN)) {
    alert("Erro: Vetores inválidos");
    return false;
  }
  return true;
}

// Envia os dados para a API e retorna o resultado
async function enviarDadosParaAPI(x, y) {
  const response = await fetch('/api/correlacao/calcular', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ x, y }),
  });

  if (!response.ok) throw new Error('Erro na resposta da API');
  return response.json();
}

// Exibe os resultados na interface e gera o gráfico
function exibirResultados(resultado, x, y) {
  const { a, b } = resultado.regressao;

  document.getElementById('correlacao').innerText = 
    `Correlação: ${(resultado.correlacao * 100).toFixed(2)}% (${resultado.classificacao})`;

  document.getElementById('regressao').innerText = 
    `Equação da regressão: y = ${a.toFixed(4)} + ${b.toFixed(4)}x`;
    

  const pontos = x.map((xi, i) => [xi, y[i]]);
  const reta = gerarRetaDeRegressao(a, b, Math.min(...x), Math.max(...x));

  gerarGrafico(pontos, reta, x, y);
  document.getElementById('correlacao').style.display = 'block'
  document.getElementById('regressao').style.display = 'block'
}

// Gera os pontos da reta de regressão
function gerarRetaDeRegressao(a, b, xmin, xmax) {
  const reta = [];
  for (let x = xmin; x <= xmax; x += 0.1) {
    reta.push([x, a + b * x]);
  }
  return reta;

}

// Renderiza o gráfico com Highcharts
function gerarGrafico(pontos, reta, x, y) {
  Highcharts.chart('grafico', {
    chart: { type: 'line' },
    title: { text: 'Correlação e Regressão Linear' },
    xAxis: {
      title: { text: 'X' },
      min: Math.min(...x) - 1,
      max: Math.max(...x) + 1
    },
    yAxis: {
      title: { text: 'Y' },
      min: Math.min(...y) - 1,
      max: Math.max(...y) + 1
    },
    series: [
      { name: 'Reta de Regressão', data: reta, color: 'blue', marker: { enabled: false } },
      { type: 'scatter', name: 'Pontos Observados', data: pontos, color: 'red' }
    ]
  });

  document.getElementById('grafico').style.display = 'block';
}
