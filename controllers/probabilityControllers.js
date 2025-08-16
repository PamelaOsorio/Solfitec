const binomialModel = require('../models/probabilityModels');
const normalModel = require('../models/probabilityModels');
const uniformeModel = require('../models/probabilityModels')


exports.calcularBinomial = (req, res) => {
  const { n, p, q, k } = req.body;

  // Converte valores (troca vírgula por ponto)
  const nNum = Number(String(n).replace(',', '.'));
  const pNum = Number(String(p).replace(',', '.'));
  const qNum = Number(String(q).replace(',', '.'));

  const kNums = Array.isArray(k)
    ? k.map(val => Number(String(val).replace(',', '.')))
    : [];

  // Validação básica
  if (
    isNaN(nNum) || isNaN(pNum) || isNaN(qNum) ||
    !Array.isArray(kNums) || kNums.some(val => isNaN(val)) ||
    Math.abs(pNum + qNum - 1) > 0.0001
  ) {
    return res.status(400).json({ error: 'Parâmetros inválidos ou p + q diferente de 1.' });
  }

  try {
    const resultado = binomialModel.calcularResultados(nNum, pNum, qNum, kNums);
    return res.json(resultado);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao calcular binomial.', detalhe: error.message });
  }
};




exports.calcularNormal = (req, res) => {
  const { tipo, media, dp, intervalo } = req.body;

  const mediaFloat = parseFloat(media);
  const dpFloat = parseFloat(dp);

  if (isNaN(mediaFloat) || isNaN(dpFloat)) {
    return res.status(400).json({ error: 'Média e desvio padrão devem ser números.' });
  }

  try {
    const resultado = normalModel.calcularProbabilidadeNormal(tipo, mediaFloat, dpFloat, intervalo);

    if (resultado === null) {
      return res.status(400).json({ error: 'Valor Z fora da tabela ou dados inválidos.' });
    }

    return res.status(200).json({ probabilidade: resultado.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular distribuição normal.', detalhe: error.message });
  }
};

exports.calcularUniforme = (req, res) => {
  const { a, b, intervaloArray, medida } = req.body;

  // Validar entradas
  const aNum = Number(String(a).replace(',', '.'));
  const bNum = Number(String(b).replace(',', '.'));

  if (isNaN(aNum) || isNaN(bNum) || aNum >= bNum) {
    return res.status(400).json({ error: "Parâmetros inválidos: 'a' deve ser menor que 'b'." });
  }

  if (!Array.isArray(intervaloArray) || intervaloArray.some(v => isNaN(Number(v)))) {
    return res.status(400).json({ error: "Intervalo inválido ou contém valores não numéricos." });
  }

  try {
    const resultado = uniformeModel.calcularUniforme(aNum, bNum, intervaloArray, medida);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular distribuição uniforme.', detalhe: error.message });
  }
};