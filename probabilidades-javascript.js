function binomial() {
  const n = parseInt(document.getElementById('amostra').value);
  const p = parseFloat(document.getElementById('sucesso').value) / 100;
  const q = parseFloat(document.getElementById('fracasso').value) / 100;
  const kInput = document.getElementById('evento').value;

  if (isNaN(n) || isNaN(p) || isNaN(q) || !kInput) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const kValores = kInput.split(";").map(k => parseInt(k.trim()));
  let somaProbabilidades = 0;

  // Função para calcular fatorial
  const fatorial = num => {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  };

  // Função para calcular a probabilidade binomial
  const calcularBinomial = (n, k, p, q) => {
    const combinacao = fatorial(n) / (fatorial(k) * fatorial(n - k));
    const probabilidade = combinacao * Math.pow(p, k) * Math.pow(q, n - k);
    return probabilidade;
  };

  // Cálculo de probabilidade total
  kValores.forEach(k => {
    if (k <= n && k >= 0) {
      const prob = calcularBinomial(n, k, p, q);
      somaProbabilidades += prob;
    }
  });

  const probFinal = (somaProbabilidades * 100).toFixed(2);
  document.getElementById('resultado').innerHTML = `Probabilidade: ${probFinal}%`;

  // Média
  const media = (n * p).toFixed(2);
  document.getElementById('mediabinomial').innerHTML = `Média: ${media}`;

  // Desvio padrão
  const dp = Math.sqrt(n * p * q).toFixed(2);
  document.getElementById('desviopadrao').innerHTML = `Desvio Padrão: ${dp}`;

  // Coeficiente de variação
  const cv = ((dp / media) * 100).toFixed(2);
  document.getElementById('variacao').innerHTML = `Coeficiente de variação: ${cv}%`;

  document.getElementById('resultado').style.display = 'block';
  document.getElementById('mediabinomial').style.display = 'block';
  document.getElementById('desviopadrao').style.display = 'block';
  document.getElementById('variacao').style.display = 'block';
}


// Função que calcula a probabilidade binomial para k sucessos
function calcularBinomial(n, p, k) {
  return combinacao(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

// Função auxiliar para calcular combinações (n choose k)
function combinacao(n, k) {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let resultado = 1;
  for (let i = 1; i <= k; i++) {
    resultado *= (n - i + 1) / i;
  }
  return resultado;
}

function exibirResultado(prob) {
  document.getElementById('resultado').innerHTML = `Probabilidade: ${(prob * 100).toFixed(2)}%`;
}

function exibirMedia(n, p) {
  const media = n * p;
  document.getElementById('mediabinomial').innerHTML = `Média: ${media.toFixed(2)}`;
}

function exibirDesvioPadrao(n, p, q) {
  const dp = Math.sqrt(n * p * q);
  document.getElementById('desviopadrao').innerHTML = `Desvio Padrão: ${dp.toFixed(2)}`;
}

function exibirCoeficienteVariacao(n, p, q) {
  const media = n * p;
  const dp = Math.sqrt(n * p * q);
  const cv = (dp / media) * 100;
  document.getElementById('variacao').innerHTML = `Coeficiente de variação: ${cv.toFixed(0)}%`;
}
 
function normal() {
  const medidas = document.getElementById('opcao').value;
  const media = parseFloat(document.getElementById('media').value);
  const dp = parseFloat(document.getElementById('dp').value);
  const intervalo = document.getElementById('intervalo').value;

  // Separar e converter intervalo para números
  const valoresIntervalo = intervalo.split(";").map(Number);

  // Função para calcular o z-score
  function calcularZ(x) {
    return (x - media) / dp;
  }

  // Função para buscar valor na tabela da normal padrão
  function buscarNaTabela(z) {
    const absZ = Math.abs(z);
    const zStr = absZ.toFixed(2);
    const regex = /(\d)\.(\d)(\d)/;
    const match = zStr.match(regex);

    if (!match) return null;

    const linha = parseInt(match[1] + match[2]);   // ex: 1.23 -> linha 12
    const coluna = parseInt(match[3]) + 1;         // ex: 1.23 -> coluna 4 (3 + 1)

    if (!Tabela[linha] || Tabela[linha][coluna] === undefined) return null;

    return Tabela[linha][coluna];
  }

  // Tabela normal padrão (exemplo parcial)
  const Tabela = [
    [0.0, 0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359],
      [0.1, 0.0398, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0753],
      [0.2, 0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141],
      [0.3, 0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517],
      [0.4, 0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879],
      [0.5, 0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224],
      [0.6, 0.2257, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2517, 0.2549],
      [0.7, 0.2580, 0.2611, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852],
      [0.8, 0.2881, 0.2910, 0.2939, 0.2967, 0.2995, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133],
      [0.9, 0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389],
      [1.0, 0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621],
      [1.1, 0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830],
      [1.2, 0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015],
      [1.3, 0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177],
      [1.4, 0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319],
      [1.5, 0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441],
      [1.6, 0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545],
      [1.7, 0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633],
      [1.8, 0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706],
      [1.9, 0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767],
      [2.0, 0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4803, 0.4808, 0.4812, 0.4817],
      [2.1, 0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4954, 0.4857],
      [2.2, 0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890],
      [2.3, 0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916],
      [2.4, 0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936],
      [2.5, 0.4938, 0.4940, 0.4941, 0.4943, 0.4945, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952],
      [2.6, 0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964],
      [2.7, 0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974],
      [2.8, 0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981],
      [2.9, 0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986],
      [3.0, 0.4987, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990],
      [3.1, 0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993],
      [3.2, 0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995],
      [3.3, 0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997],
      [3.4, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998],
      [3.5, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998],
      [3.6, 0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
      [3.7, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
      [3.8, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
      [3.9, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000]
  ];

  let resultado = 0;

  if (medidas === 'Menor que') {
    // P(X < x)
    const z = calcularZ(valoresIntervalo[0]);
    const p = buscarNaTabela(z);

    if (p === null) return alert('Valor z fora da tabela');

    resultado = z < 0 ? (0.5 - p) * 100 : (0.5 + p) * 100;
  } 
  else if (medidas === 'Maior que') {
    // P(X > x) = 1 - P(X < x)
    const z = calcularZ(valoresIntervalo[0]);
    const p = buscarNaTabela(z);

    if (p === null) return alert('Valor z fora da tabela');

    resultado = z < 0 ? (0.5 + p) * 100 : (0.5 - p) * 100;
  } 
  else if (medidas === 'Entre dois números') {
    // P(a < X < b) = P(X < b) - P(X < a)
    const z1 = calcularZ(valoresIntervalo[0]);
    const z2 = calcularZ(valoresIntervalo[1]);
    const p1 = buscarNaTabela(z1);
    const p2 = buscarNaTabela(z2);

    if (p1 === null || p2 === null) return alert('Valor z fora da tabela');

    const px1 = z1 < 0 ? 0.5 - p1 : 0.5 + p1;
    const px2 = z2 < 0 ? 0.5 - p2 : 0.5 + p2;

    resultado = (px2 - px1) * 100;
  } 
  else {
    return alert('Selecione uma opção válida!');
  }
  document.getElementById('probnormal').textContent = `Probabilidade: ${resultado.toFixed(2)}%`;
  document.getElementById('probnormal').style.display = 'block';

}
function uniforme() {
  const a = parseFloat(document.getElementById('minimo').value);
  const b = parseFloat(document.getElementById('maximo').value);
  const intervaloInput = document.getElementById('dados').value;
  const medida = document.getElementById('opcao2').value;

  const intervaloArray = intervaloInput.split(";").map(Number);
  let probabilidade = 0;

  if (medida === 'Maior que') {
    // P(X > x)
    const x = intervaloArray[0];
    if (x < a) probabilidade = 1;
    else if (x > b) probabilidade = 0;
    else probabilidade = (b - x) / (b - a);

  } else if (medida === 'Menor que') {
    // P(X < x)
    const x = intervaloArray[0];
    if (x < a) probabilidade = 0;
    else if (x > b) probabilidade = 1;
    else probabilidade = (x - a) / (b - a);

  } else if (medida === 'Entre dois números') {
    // P(x1 < X < x2)
    let [x1, x2] = intervaloArray;

    // Garantir que x1 < x2
    if (x1 > x2) [x1, x2] = [x2, x1];

    if (x2 < a || x1 > b) {
      probabilidade = 0;
    } else {
      const limiteInferior = Math.max(x1, a);
      const limiteSuperior = Math.min(x2, b);
      probabilidade = (limiteSuperior - limiteInferior) / (b - a);
      if (probabilidade < 0) probabilidade = 0;
    }

  } else {
    probabilidade = 0;
  }

  const probabilidadePercentual = (probabilidade * 100).toFixed(2);
  const media = ((a + b) / 2).toFixed(2);
  const desvioPadrao = Math.sqrt(((b - a) ** 2) / 12).toFixed(2);
  const coeficienteVariacao = ((desvioPadrao / media) * 100).toFixed(2);

  // Atualizar o DOM
  document.getElementById('mediauniforme').textContent = `Média: ${media}`;
  document.getElementById('padrao').textContent = `Desvio Padrão: ${desvioPadrao}`;
  document.getElementById('coeficienteuniforme').textContent = `Coeficiente de variação: ${coeficienteVariacao}%`;
  document.getElementById('prob').textContent = `Probabilidade: ${probabilidadePercentual}%`;
  document.getElementById('mediauniforme').style.display = 'block';
  document.getElementById('padrao').style.display = 'block';
  document.getElementById('coeficienteuniforme').style.display = 'block';
  document.getElementById('prob').style.display = 'block';

  console.log({ a, b, intervaloArray, medida, probabilidadePercentual, media, desvioPadrao, coeficienteVariacao });
}
